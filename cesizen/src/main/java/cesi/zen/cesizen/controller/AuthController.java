package cesi.zen.cesizen.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import cesi.zen.cesizen.dto.*;
import cesi.zen.cesizen.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService auth;

    public AuthController(AuthService auth) {
        this.auth = auth;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest req) {
        String token = auth.register(req.email(), req.password(), req.firstName(), req.lastName());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) {
        String token = auth.login(req.email(), req.password());
        return ResponseEntity.ok(new AuthResponse(token));
    }
}
