package com.negotiationcoach.model;

public record ConversationMessage(
        String role,    // "seller" or "coach"
        String content
) {}
