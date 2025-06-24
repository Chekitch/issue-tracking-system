package com.cmlcz.projects.its_backend.common.security.jwt;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

import static io.jsonwebtoken.Jwts.*;

@Component
@RequiredArgsConstructor
public class JwtUtils {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiryMs;

    public String generate(UserDetails principal){
        return builder()
                .subject(principal.getUsername())
                .claim("auth", principal.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .toList())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiryMs))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS512)
                .compact();
    }

    public String username(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
    public boolean isValid(String token) {
        try { username(token); return true; }
        catch (JwtException | IllegalArgumentException ex) { return false; }
    }
}
