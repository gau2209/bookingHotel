package com.gau.booking.Service;

import com.gau.booking.Repository.BookedRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookedRoomServiceImpl implements IBookedRoom{
    private final BookedRoomRepository bookedRoomRepository;
}
