package com.gau.booking.Exception;

public class UserAlreadyExistException extends RuntimeException {
    public UserAlreadyExistException(String emailAlreadyExists) {
        super(emailAlreadyExists);
    }
}
