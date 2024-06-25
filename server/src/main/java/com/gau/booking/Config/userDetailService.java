package com.gau.booking.Config;

import com.gau.booking.Entity.User;
import com.gau.booking.Repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Component
@RequiredArgsConstructor
public class userDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = this.userRepository.findByEmail(username).orElseThrow(
//                () -> new UsernameNotFoundException("User not found"));
//    return userDetail.buildUserDetail(user);

        Optional<User> user = this.userRepository.findByEmail(username);
        return user.map(userDetail::buildUserDetail).orElseThrow(
                ()-> new UsernameNotFoundException("username not found")
        );
    }

}
