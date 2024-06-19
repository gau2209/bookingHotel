package com.gau.booking.Controller;

import com.gau.booking.Entity.Room;
import com.gau.booking.Exception.PhotoRetrievalException;
import com.gau.booking.Exception.ResourceNotFoundException;
import com.gau.booking.Response.RoomResponse;
import com.gau.booking.Service.IRoom;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3006")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rooms")
public class RoomController {
    private final IRoom roomService;

    @PostMapping("/add/new-room")
    public ResponseEntity<RoomResponse> addNewRoom(
             @RequestParam("photo") MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice) throws SQLException, IOException {
        Room savedRoom = this.roomService.addNewRoom(photo, roomType, roomPrice);
        RoomResponse response = new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(), savedRoom.getRoomPrice());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/types")
    public ResponseEntity<List<String>> getRoomTypes() {
        List<String> types = this.roomService.getAllRoomTypes();
        return ResponseEntity.ok(types);
    }

    @DeleteMapping("/delete/room/{roomId}")
    @CrossOrigin
    public ResponseEntity<Void> deleteRoom(@PathVariable Long roomId) {
    this.roomService.deleRoom(roomId);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/all-rooms")
    public ResponseEntity<List<RoomResponse>> getAllRooms() throws SQLException {
        List<Room> rooms = this.roomService.getAllRooms();
        List<RoomResponse> roomResponses = new ArrayList<>();
        for (Room room : rooms) {
            byte[] photobytes = roomService.getRoomPhotoByRoomId(room.getId());
            if (photobytes != null && photobytes.length > 0) {
                String base64 = Base64.encodeBase64String(photobytes);
                RoomResponse roomResponse = getRoomResponse(room);
                roomResponse.setPhoto(base64);
                roomResponses.add(roomResponse);
            }
        }
        return ResponseEntity.ok(roomResponses);
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<Optional<RoomResponse>> getRoomById(@PathVariable(value = "roomId") Long id) {
        Optional<Room> theRoom = roomService.getRoomById(id);
        return theRoom.map(room -> {
            RoomResponse roomResponse = getRoomResponse(room);
            return  ResponseEntity.ok(Optional.of(roomResponse));
        }).orElseThrow(() -> new ResourceNotFoundException("Room not found"));
    }



    private RoomResponse getRoomResponse(Room room) {
//        List<BookedRoom> booking = getAllBookingByRoomId(room.getId());
//        List<BookedRoomResponse> bookingres = booking.stream().map(
//                booked -> new BookedRoomResponse(booked.getBookingId(),
//                        booked.getCheckInDate(), booked.getCheckOutDate(), booked.getBookingConfirmationCode())
//        ).toList();
        byte[] photoBytes = null;
        Blob photoblob = room.getPhoto();
        if (photoblob != null) {
            try {
                photoBytes = photoblob.getBytes(1, (int) photoblob.length());
            } catch (SQLException e) {
                throw new PhotoRetrievalException("Error retrieving photo");
            }
        }
        return new RoomResponse(room.getId(), room.getRoomType(), room.getRoomPrice(),room.isBooked(),photoBytes);
    }

//    private List<BookedRoom> getAllBookingByRoomId(Long roomId) {
//        return bookedRoomService.getAllBookingByRoomId(roomId);
//    }



}


