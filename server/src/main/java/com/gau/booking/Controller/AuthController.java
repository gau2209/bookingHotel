package com.gau.booking.Controller;

import com.gau.booking.Config.userDetail;
import com.gau.booking.Entity.User;
import com.gau.booking.Exception.UserAlreadyExistException;
import com.gau.booking.Jwt.JwtUtils;
import com.gau.booking.Request.LoginRequest;
import com.gau.booking.Response.JwtRespone;
import com.gau.booking.Service.IUser;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
 @RequestMapping("/api/auth")
public class AuthController {
    private final IUser userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;


@PostMapping("/register-user")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            this.userService.registerUser(user);
            return ResponseEntity.ok("Registration successful");
        } catch (UserAlreadyExistException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtTokenForUser(authentication);
        userDetail userDetails = (userDetail) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities()
                .stream().
                map(GrantedAuthority::getAuthority).toList();
        return ResponseEntity.ok(new JwtRespone(
                userDetails.getId(),userDetails.getEmail(),jwt,roles
        ));
}
}
