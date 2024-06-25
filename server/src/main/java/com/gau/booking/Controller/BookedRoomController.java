package com.gau.booking.Controller;

import com.gau.booking.Entity.BookedRoom;

import com.gau.booking.Entity.Room;
import com.gau.booking.Exception.InvalidBookingRequestException;
import com.gau.booking.Exception.ResourceNotFoundException;

import com.gau.booking.Response.BookedRoomResponse;

import com.gau.booking.Response.RoomResponse;
import com.gau.booking.Service.IBookedRoom;
import com.gau.booking.Service.IRoom;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/booked")
public class BookedRoomController {
    private final IBookedRoom bookedService;
    private final IRoom roomService;

    @GetMapping("/all-booked")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<BookedRoomResponse>> getAllBooked() {
        List<BookedRoom> bookeds = bookedService.getAllBookedRooms();
        List<BookedRoomResponse> bookedRoomResponses = new ArrayList<>();
        for (BookedRoom booked : bookeds) {
            BookedRoomResponse bookedRoomResponse = getBookedResponse(booked);
            bookedRoomResponses.add(bookedRoomResponse);
        }
        return ResponseEntity.ok(bookedRoomResponses);
    }

    @GetMapping("/confirmationCode/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode) {
        try {
            BookedRoom booked = bookedService.findByBookedConfirmationCode(confirmationCode);
            BookedRoomResponse bookedRoomResponse = getBookedResponse(booked);
            return ResponseEntity.ok(bookedRoomResponse);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/room/{roomId}/booking")
    public ResponseEntity<?> saveBookedRoom(@PathVariable Long roomId,
                                            @RequestBody BookedRoom bookedRoomRequest) {
        try {
            String confirmationCode = this.bookedService.saveBooked(roomId, bookedRoomRequest);
            return ResponseEntity.ok("Room booked successfully, Your booking confirmation code is : " + confirmationCode);
        } catch (InvalidBookingRequestException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{bookingId}/delete")
    public void cancelBooking(@PathVariable Long bookingId) {
        this.bookedService.cancelBooking(bookingId);
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<BookedRoomResponse>> getBookingsByUserEmail(@PathVariable String email) {
        List<BookedRoom> bookedRooms = this.bookedService.getBookingsByUserEmail(email);
        List<BookedRoomResponse> bookedRoomResponses = new ArrayList<>();
        for(BookedRoom bookedRoom : bookedRooms){
            BookedRoomResponse bookedRoomResponse = getBookedResponse(bookedRoom);
            bookedRoomResponses.add(bookedRoomResponse);
        }
        return ResponseEntity.ok(bookedRoomResponses);
    }

    private BookedRoomResponse getBookedResponse(BookedRoom booked) {
        Room room = this.roomService.getRoomById(booked.getRoom().getId()).get();
        RoomResponse roomResponse = new RoomResponse(
                room.getId(),
                room.getRoomType(),
                room.getRoomPrice());

        return new BookedRoomResponse(
                booked.getBookingId(),
                booked.getCheckInDate(),
                booked.getCheckOutDate(),
                booked.getGuestFullName(),
                booked.getGuestEmail(),
                booked.getNumberOfAdults(),
                booked.getNumberOfChildren(),
                booked.getTotalNumOfGuest(),
                booked.getBookingConfirmationCode(),
                roomResponse);
    }


}
