package com.gau.booking.Service;

import com.gau.booking.Entity.BookedRoom;

import java.util.List;

public interface IBookedRoom {
    List<BookedRoom> getAllBookedRooms();

    BookedRoom findByBookedConfirmationCode(String confirmationCode);

    String saveBooked(Long roomId, BookedRoom bookedRoomRequest);

    void cancelBooking(Long bookingId);
    List<BookedRoom> getAllBookedByRoomId(Long roomId);
}
