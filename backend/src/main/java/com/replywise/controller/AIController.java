package com.replywise.controller;

import com.replywise.dto.AnalyzeRequest;
import com.replywise.dto.AnalysisResponse;
import com.replywise.service.AIService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

   
    @PostMapping("/analyze")
    public ResponseEntity<AnalysisResponse> analyzeMessage(
            @Valid @RequestBody AnalyzeRequest request
    ) {

        AnalysisResponse response =
                aiService.analyzeMessage(request.message());

        return ResponseEntity.ok(response);
    }
}