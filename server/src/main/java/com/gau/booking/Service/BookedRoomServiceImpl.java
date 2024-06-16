package com.gau.booking.Service;

import com.gau.booking.Entity.BookedRoom;
import com.gau.booking.Repository.BookedRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookedRoomServiceImpl implements IBookedRoom{
    private final BookedRoomRepository bookedRoomRepository;


    @Override
    public List<BookedRoom> getAllBookingByRoomId(Long roomId) {
        return this.bookedRoomRepository.findByRoomId(roomId);
    }
}
