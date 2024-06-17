package com.gau.booking.Service;

import com.gau.booking.Entity.BookedRoom;
import com.gau.booking.Entity.Room;
import com.gau.booking.Exception.InvalidBookingRequestException;
import com.gau.booking.Repository.BookedRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookedRoomServiceImpl implements IBookedRoom {
    private final BookedRoomRepository bookedRoomRepository;
    private final IRoom roomService;

    @Override
    public List<BookedRoom> getAllBookedRooms() {
        return this.bookedRoomRepository.findAll();
    }

    @Override
    public List<BookedRoom> getAllBookedByRoomId(Long roomId) {
        return this.bookedRoomRepository.findByRoomId(roomId);
    }

    @Override
    public BookedRoom findByBookedConfirmationCode(String confirmationCode) {
        return this.bookedRoomRepository.findByBookingConfirmationCode(confirmationCode);
    }

    @Override
    public String saveBooked(Long roomId, BookedRoom bookedRoomRequest) {
        if (bookedRoomRequest.getCheckOutDate().isBefore(bookedRoomRequest.getCheckInDate())) {
            throw new InvalidBookingRequestException("Check-in date must come before the check-out date");
        }
        Room room = roomService.getRoomById(roomId).get();
        List<BookedRoom> existingBookedRooms = room.getBookings();
        boolean roomAvailable = roomIsAvailable(bookedRoomRequest, existingBookedRooms);
        if (roomAvailable) {
            room.addBooking(bookedRoomRequest);
            bookedRoomRepository.save(bookedRoomRequest);
        }else {
            throw new InvalidBookingRequestException("This room have already been booked");
        }
        return bookedRoomRequest.getBookingConfirmationCode();
    }


    @Override
    public void cancelBooking(Long bookingId) {
        this.bookedRoomRepository.deleteById(bookingId);
    }

    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                                || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                                || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
                );
    }

}
