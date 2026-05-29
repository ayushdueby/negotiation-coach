package com.negotiationcoach.controller;

import com.negotiationcoach.model.CoachResponse;
import com.negotiationcoach.model.NegotiationRequest;
import com.negotiationcoach.service.GroqService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/negotiate")
public class NegotiationController {

    private final GroqService groqService;

    public NegotiationController(GroqService groqService) {
        this.groqService = groqService;
    }

    @PostMapping("/coach")
    public ResponseEntity<?> getCoaching(@RequestBody NegotiationRequest request) {
        try {
            CoachResponse response = groqService.getCoaching(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body(Map.of("error", "Failed to get coaching: " + e.getMessage()));
        }
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "ok", "service", "negotiation-coach"));
    }
}
