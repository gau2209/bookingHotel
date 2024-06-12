package com.gau.booking.Response;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import org.apache.tomcat.util.codec.binary.Base64;
import java.util.List;

@Data
@NoArgsConstructor
public class RoomResponse {
    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private String photo;
    private boolean isBooked = false;

    private List<BookedRoomResponse> bookedRooms;

    public RoomResponse(Long id, String roomType, BigDecimal roomPrice) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
    }

    public RoomResponse(Long id, String roomType, BigDecimal roomPrice,
                        boolean isBooked, List<BookedRoomResponse> bookedRooms, byte[] photoBytes) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.bookedRooms = bookedRooms;
        this.photo = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
    }
}
