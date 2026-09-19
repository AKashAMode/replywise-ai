package com.replywise.service;

import com.replywise.client.OllamaClient;
import com.replywise.dto.AnalysisResponse;

import org.springframework.stereotype.Service;

@Service
public class AIService {

    private final OllamaClient ollamaClient;

    public AIService(OllamaClient ollamaClient) {
        this.ollamaClient = ollamaClient;
    }

    /**
     * Analyze the user's message using the LLM.
     *
     * Currently the LLM provider is Ollama.
     *
     * Keeping this logic behind a service/client boundary makes it
     * easier to replace Ollama with another provider in the future.
     */
    public AnalysisResponse analyzeMessage(String message) {

        return ollamaClient.analyzeMessage(message);
    }
}