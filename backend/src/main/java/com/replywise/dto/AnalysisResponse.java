package com.replywise.dto;


import java.util.List;

public record AnalysisResponse(

        String category,

        String summary,

        String priority,

        String deadline,

        List<String> actions,

        String suggestedReply

) {
}