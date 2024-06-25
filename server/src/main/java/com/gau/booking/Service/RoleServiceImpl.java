package com.gau.booking.Service;

import com.gau.booking.Entity.Role;
import com.gau.booking.Entity.User;
import com.gau.booking.Exception.RoleAlreadyExistException;
import com.gau.booking.Exception.UserAlreadyExistException;
import com.gau.booking.Repository.RoleRepository;
import com.gau.booking.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements IRole {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    @Override
    public List<Role> getRoles() {
        return this.roleRepository.findAll();
    }

    @Override
    public Role createRole(Role role) {
        String roleName = "ROLE_" + role.getName().toUpperCase();
        Role newRole = new Role(roleName);
        if (this.roleRepository.existsByName(roleName)) {
            throw new RoleAlreadyExistException(newRole.getName() + "already exist");
        }
        return this.roleRepository.save(newRole);
    }

    @Override
    public void deleteRole(Long roleId) {
        this.removeAllUsersFromRole(roleId);
        this.roleRepository.deleteById(roleId);
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name).get();
    }

    @Override
    public User removeUserFromRole(Long userId, Long roleId) {
        Optional<User> user = this.userRepository.findById(userId);
        Optional<Role> role = this.roleRepository.findById(roleId);
        if (role.isPresent() && role.get().getUsers().contains(user.get())) {
            role.get().removeUserFromRole(user.get());
            roleRepository.save(role.get());
            return user.get();
        }
        throw new UsernameNotFoundException("User not found");
    }

    @Override
    public User addUserToRole(Long userId, Long roleId) {
        Optional<User> user = this.userRepository.findById(userId);
        Optional<Role> role = this.roleRepository.findById(roleId);
        if (role.isPresent() && user.get().getRoles().contains(role.get())) {
            throw new UserAlreadyExistException(user.get().getFirstName() + " is already have role " + role.get().getName());
        }

        if (role.isPresent()) {
            role.get().addRoleToUser(user.get());
            roleRepository.save(role.get());
        }
        return user.get();
    }

    @Override
    public Role removeAllUsersFromRole(Long roleId) {
        Optional<Role> role = this.roleRepository.findById(roleId);
        role.ifPresent(Role::removeAllUsersFromRole);
        return this.roleRepository.save(role.get());
    }
}

