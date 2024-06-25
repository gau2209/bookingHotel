package com.gau.booking.Service;

import com.gau.booking.Entity.Role;
import com.gau.booking.Entity.User;
import com.gau.booking.Exception.UserAlreadyExistException;
import com.gau.booking.Repository.RoleRepository;
import com.gau.booking.Repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUser {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Override
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())){
            throw new UserAlreadyExistException(user.getEmail() + " already exists");
        }
        String encodePassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodePassword);
        Role userRole = this.roleRepository.findByName("ROLE_USER").get();
        user.setRoles(Collections.singletonList(userRole));
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    @Override
    public User getUserByEmail(String email) {
        return this.userRepository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("Can not found email: " + email));
    }

    @Transactional
    @Override
    public void deleteUser(String email) {
        User user = getUserByEmail(email);
        if(user != null) {
            this.userRepository.deleteByEmail(email);
        }
    }

    @Override
    public void updateUser(User user) {

    }

}
