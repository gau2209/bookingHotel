package com.gau.booking.Jwt;

import com.gau.booking.Config.userDetail;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${security.jwt.secrect}")
    private String jwtSecretKey;

    @Value("${security.jwt.expirationTime}")
    private int jwtExpirationTime;

    public String generateJwtTokenForUser(Authentication authen) {
        userDetail user = (userDetail) authen.getPrincipal();
        List<String> roles = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();
        return Jwts.builder().setSubject(user.getUsername())
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationTime))
                .signWith(key(), SignatureAlgorithm.HS256).compact();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecretKey));
    }

    public String getUserNameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(token);
            return true;
        } catch (MalformedJwtException a) {
            logger.error("Invalid jwt token: {}", a.getMessage());
        } catch (ExpiredJwtException b) {
            logger.error("Expired jwt token: {}", b.getMessage());
        } catch (UnsupportedJwtException c) {
            logger.error("This token is not supported: {}", c.getMessage());
        } catch (IllegalArgumentException a) {
            logger.error("No claims found: {}", a.getMessage());
        }
        return false;
    }
}
