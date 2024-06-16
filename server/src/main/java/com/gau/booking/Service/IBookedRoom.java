package com.gau.booking.Service;

import com.gau.booking.Entity.BookedRoom;

import java.util.List;

public interface IBookedRoom {
    List<BookedRoom> getAllBookingByRoomId(Long roomId);
}
