package com.gau.booking.Controller;

import com.gau.booking.Entity.Role;
import com.gau.booking.Entity.User;
import com.gau.booking.Exception.RoleAlreadyExistException;
import com.gau.booking.Service.IRole;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.FOUND;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/role")
public class RoleController {
    private final IRole roleService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Role>> getAllRoles() {
        return new ResponseEntity<>(this.roleService.getRoles(), FOUND);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addRole(@RequestBody Role role) {
        try {
            this.roleService.createRole(role);
            return ResponseEntity.ok("Role added successfully");
        }
        catch (RoleAlreadyExistException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }catch (Exception ex){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }

    @DeleteMapping("/delete/{roleId}")
    public void DeleteRole(@PathVariable("roleId") Long roleId) {
        try {
            roleService.deleteRole(roleId);
        }
        catch (Exception e){
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/remove-all-user-from-role/{roleId}")
    public Role removeAllUserFromRole(@PathVariable("roleId") Long roleId) {
        return roleService.removeAllUsersFromRole(roleId);
    }


    @PostMapping("/remove-user-from-role")
    public User removeUserFromRole(@RequestParam("userId") Long userId,@RequestParam("roleId") Long roleId) {

            return roleService.removeUserFromRole(userId, roleId);
    }

    @PostMapping("/add-user-to-role")
    public User addUserToRole(@RequestParam("userId") Long userId,@RequestParam("roleId") Long roleId){
        return roleService.addUserToRole(userId, roleId);
    }

}
