package com.negotiationcoach.model;

public record CoachResponse(
        String script,              // Exact words to say to the seller
        String strategy,            // Why this approach works
        double fairPriceMin,        // Fair market price range — lower bound
        double fairPriceMax,        // Fair market price range — upper bound
        int dealScore,              // 1–10 (10 = great deal, 1 = terrible)
        boolean walkAway,           // true if the user should walk away
        String powerTip,            // Advanced tactic for this situation
        String assessment           // Plain-English assessment of current state
) {}
