package com.gau.booking.Service;

import com.gau.booking.Entity.User;
import com.gau.booking.Exception.UserAlreadyExistException;

import java.util.List;

public interface IUser {
    User registerUser(User user) throws UserAlreadyExistException;
    List<User> getAllUsers();
    User getUserByEmail(String email);
    void deleteUser(String email);
    void updateUser(User user);

}
