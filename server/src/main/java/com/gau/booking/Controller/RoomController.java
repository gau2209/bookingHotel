package com.gau.booking.Controller;

import com.gau.booking.Entity.Room;
import com.gau.booking.Response.RoomResponse;
import com.gau.booking.Service.IRoom;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

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
    @CrossOrigin
    public ResponseEntity<List<String>> getRoomTypes() {
        List<String> types = this.roomService.getAllRoomTypes();
        return ResponseEntity.ok(types);
    }

    @GetMapping("/all-rooms")
    @CrossOrigin
    public ResponseEntity<List<RoomResponse>> getAllRooms() {
        List<Room> rooms = this.roomService.getAllRooms();
        List<RoomResponse> roomResponses = new ArrayList<>();
        rooms.forEach(room -> {
            byte[] photobytes = roomService.getRoomPhotoByRoomId(room.getId());
            if (photobytes != null && photobytes.length > 0) {
                String base64 = Base64.encodeBase64String(photobytes);
                RoomResponse roomResponse = getRoomRespone(room);
                roomResponse.setPhoto(base64);
                roomResponses.add(roomResponse);
            }
        });
        return ResponseEntity.ok(roomResponses);
    }

    private RoomResponse getRoomRespone(Room room) {
        return null;
    }
}

}
