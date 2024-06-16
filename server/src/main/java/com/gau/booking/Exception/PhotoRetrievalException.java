package com.gau.booking.Exception;

public class PhotoRetrievalException extends RuntimeException {
    public PhotoRetrievalException(String errorRetrievingPhoto) {
        super(errorRetrievingPhoto);
    }
}
