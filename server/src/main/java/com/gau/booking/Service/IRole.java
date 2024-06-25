package com.gau.booking.Service;

import com.gau.booking.Entity.Role;
import com.gau.booking.Entity.User;

import java.util.List;
import java.util.Optional;

public interface IRole {
    List<Role> getRoles();
    Role createRole(Role role);
    void deleteRole(Long id);
//    Optional<Role> findRoleByName(String name);
    Role findByName(String name);
    User removeUserFromRole(Long userId, Long roleId);
    User addUserToRole(Long userId, Long roleId);
    Role removeAllUsersFromRole(Long roleId);

}
