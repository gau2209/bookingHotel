package com.gau.booking.Exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String roomNotFound) {
        super(roomNotFound);

    }
}
