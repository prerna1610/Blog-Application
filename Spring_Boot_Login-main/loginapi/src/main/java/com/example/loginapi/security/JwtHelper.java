package com.example.loginapi.security;

import com.example.loginapi.entity.user.Token;
import com.example.loginapi.repository.TokenRepository;
import com.example.loginapi.service.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtHelper {
    @Autowired
    TokenService tokenService;
    @Autowired
    TokenRepository tokenRepository;

    public static final long JWT_TOKEN_VALIDITY = 60 * 60 * 1000;


    final String secret = "afafasfafafasfasfasfafacasdasfasxASFACASDFACASDFASFASFDAFASFASDAADSCSDFADCVSGCFVADXCcadwavfsfarvf";

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    //for retrieving any information from token we will need the secret key
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    public Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public Boolean isExpired(String token){
        try {
            getExpirationDateFromToken(token);
            return false;
        } catch (io.jsonwebtoken.ExpiredJwtException e){
            return true;
        }
    }

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        String token = doGenerateToken(claims, username);
        Token token1 = tokenService.findToken(username);
        token1.setToken(token);
        tokenRepository.save(token1);
        return token;
    }


    private String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
                .signWith(SignatureAlgorithm.HS512, secret).compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        if (token == null || token.isEmpty()) {
            return false;
        }
        final String email = getUsernameFromToken(token);
        Token token1 = tokenService.findToken(email);
        return email.equals(userDetails.getUsername()) && token.equals(token1.getToken()) && !isTokenExpired(token);
    }



    public void invalidateToken(String token) {
        String email = getUsernameFromToken(token);
        Token token1 = tokenService.findToken(email);
        token1.setToken(null);
        tokenRepository.save(token1);
    }

    public String extractTokenFromRequest() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }




}

