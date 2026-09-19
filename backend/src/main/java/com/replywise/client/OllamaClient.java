package com.replywise.client;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import com.replywise.dto.AnalysisResponse;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Component
public class OllamaClient {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private final String model;

    public OllamaClient(
            ObjectMapper objectMapper,
            @Value("${ollama.base-url}") String baseUrl,
            @Value("${ollama.model}") String model
    ) {
        this.restClient = RestClient
                .builder()
                .baseUrl(baseUrl)
                .build();

        this.objectMapper = objectMapper;
        this.model = model;
    }

    /**
     * Sends the user's message to Ollama and converts
     * the structured AI response into AnalysisResponse.
     */
    public AnalysisResponse analyzeMessage(String message) {

        String prompt = buildPrompt(message);

        /*
         * JSON schema tells Ollama exactly what structure
         * the model must return.
         */
        Map<String, Object> schema = buildResponseSchema();

        OllamaRequest request = new OllamaRequest(
                model,
                prompt,
                schema,
                false,
                Map.of(
                        "temperature", 0
                )
        );

        try {

            OllamaResponse response = restClient
                    .post()
                    .uri("/api/generate")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(request)
                    .retrieve()
                    .body(OllamaResponse.class);

            if (response == null || response.response() == null) {

                throw new IllegalStateException(
                        "Ollama returned an empty response."
                );
            }

            /*
             * Because we are using structured output,
             * the response should already be valid JSON.
             */
            return parseAnalysisResponse(response.response());

        } catch (RestClientException exception) {

            throw new IllegalStateException(
                    "Unable to communicate with Ollama. " +
                    "Make sure Ollama is running and the configured model exists.",
                    exception
            );
        }
    }

    /**
     * Creates the instruction sent to the local LLM.
     *
     * The user can enter almost any kind of message.
     * The model will classify it into one of our supported categories.
     */
    private String buildPrompt(String message) {

        return """
                You are ReplyWise AI, an intelligent message analysis assistant.

                Analyze the user's message and extract useful information from it.

                The input may be any kind of text, including:

                - Job or interview messages
                - Bills or payment notifications
                - Appointment messages
                - Travel information
                - Personal messages
                - General messages
                - Casual messages
                - Messages containing deadlines
                - Messages without deadlines
                - Messages containing multiple actions
                - Messages containing no actions

                Your job is to understand the meaning of the message
                and return a structured analysis.

                CATEGORY RULES:

                JOB:
                Use for interviews, recruiters, jobs, employment,
                applications, assessments, joining information, etc.

                BILL:
                Use for payments, invoices, subscriptions,
                electricity bills, credit cards, fees, etc.

                APPOINTMENT:
                Use for doctor appointments, meetings,
                consultations, bookings, scheduled sessions, etc.

                TRAVEL:
                Use for flights, trains, buses, hotels,
                trips, travel bookings, etc.

                PERSONAL:
                Use for personal communication, friends,
                family, invitations, etc.

                GENERAL:
                Use when the message does not clearly belong
                to the other categories.

                PRIORITY RULES:

                HIGH:
                Use when the message contains an urgent action,
                important deadline, interview, payment due date,
                cancellation risk, or time-sensitive requirement.

                MEDIUM:
                Use when the message requires attention
                but is not immediately urgent.

                LOW:
                Use for informational or casual messages
                with little or no urgency.

                DEADLINE RULES:

                If the message contains a deadline, date or time,
                extract it in a clear human-readable format.

                If there is no deadline, return null.

                ACTION RULES:

                Extract every meaningful action the user needs to take.

                If there are no actions, return an empty array.

                SUGGESTED REPLY RULES:

                Generate a short, polite and professional reply
                appropriate to the message.

                If a reply is not really necessary,
                generate a simple acknowledgement.

                IMPORTANT:

                Do not invent facts that are not present in the message.

                User message:

                %s
                """.formatted(message);
    }

    /**
     * Defines the exact JSON structure expected from Ollama.
     */
    private Map<String, Object> buildResponseSchema() {

        return Map.of(
                "type", "object",

                "properties", Map.of(

                        "category", Map.of(
                                "type", "string",
                                "enum", List.of(
                                        "JOB",
                                        "BILL",
                                        "APPOINTMENT",
                                        "TRAVEL",
                                        "PERSONAL",
                                        "GENERAL"
                                )
                        ),

                        "summary", Map.of(
                                "type", "string"
                        ),

                        "priority", Map.of(
                                "type", "string",
                                "enum", List.of(
                                        "LOW",
                                        "MEDIUM",
                                        "HIGH"
                                )
                        ),

                        "deadline", Map.of(
                                "type", List.of(
                                        "string",
                                        "null"
                                )
                        ),

                        "actions", Map.of(
                                "type", "array",
                                "items", Map.of(
                                        "type", "string"
                                )
                        ),

                        "suggestedReply", Map.of(
                                "type", "string"
                        )
                ),

                "required", List.of(
                        "category",
                        "summary",
                        "priority",
                        "deadline",
                        "actions",
                        "suggestedReply"
                )
        );
    }

    /**
     * Converts Ollama's JSON string into our Java DTO.
     */
    private AnalysisResponse parseAnalysisResponse(
            String rawResponse
    ) {

        try {

            JsonNode root = objectMapper.readTree(rawResponse);

            if (root == null || !root.isObject()) {

                throw new IllegalStateException(
                        "Ollama returned an invalid JSON object."
                );
            }

            String category =
                    getTextValue(root, "category");

            String summary =
                    getTextValue(root, "summary");

            String priority =
                    getTextValue(root, "priority");

            String deadline =
                    getNullableTextValue(root, "deadline");

            String suggestedReply =
                    getTextValue(root, "suggestedReply");

            List<String> actions =
                    getActions(root);

            return new AnalysisResponse(
                    category,
                    summary,
                    priority,
                    deadline,
                    actions,
                    suggestedReply
            );

        } catch (Exception exception) {

            /*
             * Include the actual response in the error.
             * This makes future debugging much easier.
             */
            throw new IllegalStateException(
                    "Ollama returned an invalid analysis response. " +
                    "Raw response: " + rawResponse,
                    exception
            );
        }
    }

    /**
     * Safely extracts the actions array.
     */
    private List<String> getActions(JsonNode root) {

        JsonNode actionsNode = root.get("actions");

        if (actionsNode == null
                || actionsNode.isNull()
                || !actionsNode.isArray()) {

            return List.of();
        }

        return objectMapper.convertValue(
                actionsNode,
                objectMapper
                        .getTypeFactory()
                        .constructCollectionType(
                                List.class,
                                String.class
                        )
        );
    }

    /**
     * Safely extracts normal text fields.
     */
    private String getTextValue(
            JsonNode root,
            String field
    ) {

        JsonNode node = root.get(field);

        if (node == null || node.isNull()) {
            return "";
        }

        return node.asText().trim();
    }

    /**
     * Safely extracts a nullable field such as deadline.
     */
    private String getNullableTextValue(
            JsonNode root,
            String field
    ) {

        JsonNode node = root.get(field);

        if (node == null || node.isNull()) {
            return null;
        }

        String value = node.asText().trim();

        if (value.isEmpty()) {
            return null;
        }

        return value;
    }

    /**
     * Request object sent to Ollama.
     */
    private record OllamaRequest(
            String model,
            String prompt,
            Map<String, Object> format,
            boolean stream,
            Map<String, Object> options
    ) {
    }

    /**
     * Response returned by Ollama's /api/generate endpoint.
     */
    private record OllamaResponse(
            String response
    ) {
    }
}