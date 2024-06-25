package com.gau.booking.Exception;

public class RoleNotFoundException extends RuntimeException {
    public RoleNotFoundException(String roleNotFound) {
        super(roleNotFound);
    }
}
