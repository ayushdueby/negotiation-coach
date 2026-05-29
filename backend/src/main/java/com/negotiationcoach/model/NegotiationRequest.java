package com.negotiationcoach.model;

import java.util.List;

public record NegotiationRequest(
        String scenario,            // "car", "rent", "market"
        String itemDescription,     // e.g. "2019 Honda City, 80,000 km"
        double askingPrice,         // seller's current asking price
        double budget,              // user's maximum budget
        double targetPrice,         // user's ideal price
        String currency,            // "INR", "USD", etc.
        List<ConversationMessage> history,  // conversation history
        String latestMessage        // what seller just said (null for initial analysis)
) {}
