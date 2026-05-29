package com.negotiationcoach.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Forwards all non-API, non-asset requests to index.html
 * so React Router can handle client-side navigation.
 */
@Controller
public class SpaController {

    @RequestMapping(value = {
            "/",
            "/negotiate",
            "/negotiate/**"
    })
    public String forward() {
        return "forward:/index.html";
    }
}
