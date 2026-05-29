package com.negotiationcoach.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.negotiationcoach.model.CoachResponse;
import com.negotiationcoach.model.ConversationMessage;
import com.negotiationcoach.model.NegotiationRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class GroqService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    @Value("${groq.api.key}")
    private String apiKey;

    private static final String GROQ_MODEL = "llama-3.3-70b-versatile";

    public GroqService() {
        this.webClient = WebClient.builder()
                .baseUrl("https://api.groq.com/openai/v1")
                .build();
        this.objectMapper = new ObjectMapper();
    }

    public CoachResponse getCoaching(NegotiationRequest request) {
        List<Map<String, String>> messages = buildMessages(request);

        Map<String, Object> body = Map.of(
                "model", GROQ_MODEL,
                "messages", messages,
                "temperature", 0.7,
                "max_tokens", 1024,
                "response_format", Map.of("type", "json_object")
        );

        try {
            String response = webClient.post()
                    .uri("/chat/completions")
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return parseResponse(response);
        } catch (Exception e) {
            throw new RuntimeException("Failed to get coaching from Groq: " + e.getMessage(), e);
        }
    }

    private List<Map<String, String>> buildMessages(NegotiationRequest req) {
        List<Map<String, String>> messages = new ArrayList<>();

        // System prompt
        messages.add(Map.of(
                "role", "system",
                "content", buildSystemPrompt(req)
        ));

        // Conversation history
        if (req.history() != null) {
            for (ConversationMessage msg : req.history()) {
                if ("seller".equals(msg.role())) {
                    messages.add(Map.of(
                            "role", "user",
                            "content", "Seller said: " + msg.content()
                    ));
                } else if ("coach".equals(msg.role())) {
                    messages.add(Map.of(
                            "role", "assistant",
                            "content", msg.content()
                    ));
                }
            }
        }

        // Latest user message
        String userPrompt = (req.latestMessage() == null || req.latestMessage().isBlank())
                ? "I haven't started negotiating yet. Give me an opening strategy and initial assessment."
                : "Seller just said: \"" + req.latestMessage() + "\"\n\nWhat should I say and do right now?";

        messages.add(Map.of("role", "user", "content", userPrompt));

        return messages;
    }

    private String buildSystemPrompt(NegotiationRequest req) {
        String scenarioContext = switch (req.scenario().toLowerCase()) {
            case "car" -> """
                    You are an expert car negotiation coach with 20 years of experience at dealerships and private sales.
                    You know market values (Blue Book, depreciation rates, common dealer tactics).
                    Key tactics: anchor low, highlight defects, create urgency with competing offers, request extras (warranty, service).
                    """;
            case "rent" -> """
                    You are an expert rental negotiation coach who helps tenants get better deals on apartments and homes.
                    You understand rental market dynamics, landlord motivations (vacancy cost, reliable tenant preference), and lease terms.
                    Key tactics: offer longer lease for lower rent, prepay months, highlight your credit/stability, point out comparable listings.
                    """;
            case "market" -> """
                    You are an expert market and bazaar negotiation coach who helps buyers get the best prices at markets, shops, and informal settings.
                    You understand vendor psychology, bulk buying leverage, walkaway power, and cultural negotiation norms.
                    Key tactics: show mild disinterest, offer cash, bundle items, always counter at 50-60% of asking, find flaws.
                    """;
            default -> "You are an expert negotiation coach with deep knowledge of pricing and negotiation tactics.";
        };

        String currency = req.currency() != null ? req.currency() : "INR";

        return scenarioContext + """

                NEGOTIATION CONTEXT:
                - Item: %s
                - Seller's asking price: %s %.0f
                - User's budget (max): %s %.0f
                - User's target price: %s %.0f

                Your job: Give real-time coaching to help the user get the best deal.

                ALWAYS respond with a valid JSON object in EXACTLY this format:
                {
                  "script": "The exact words the user should say right now (2-4 natural sentences)",
                  "strategy": "Brief explanation of why this approach works (1-2 sentences)",
                  "fairPriceMin": <number — lower bound of fair market price>,
                  "fairPriceMax": <number — upper bound of fair market price>,
                  "dealScore": <integer 1-10 — how good the current deal is (10=amazing, 1=terrible/walk away)>,
                  "walkAway": <true if user should walk away, false otherwise>,
                  "powerTip": "One advanced tactic specific to this situation",
                  "assessment": "1-2 sentence plain English summary of where the negotiation stands"
                }

                Be specific, practical, and confident. Use exact numbers. Do NOT add any text outside the JSON.
                """.formatted(
                req.itemDescription(),
                currency, req.askingPrice(),
                currency, req.budget(),
                currency, req.targetPrice()
        );
    }

    private CoachResponse parseResponse(String rawResponse) throws Exception {
        JsonNode root = objectMapper.readTree(rawResponse);
        String content = root
                .path("choices")
                .get(0)
                .path("message")
                .path("content")
                .asText();

        JsonNode json = objectMapper.readTree(content);

        return new CoachResponse(
                json.path("script").asText("Keep pushing — you're doing great."),
                json.path("strategy").asText(""),
                json.path("fairPriceMin").asDouble(0),
                json.path("fairPriceMax").asDouble(0),
                json.path("dealScore").asInt(5),
                json.path("walkAway").asBoolean(false),
                json.path("powerTip").asText(""),
                json.path("assessment").asText("")
        );
    }
}
