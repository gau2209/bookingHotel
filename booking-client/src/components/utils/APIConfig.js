import axios from "axios";

const SERVER = "http://localhost:9192/"

export const api = axios.create({
    baseURL: SERVER
})

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}


// This function add new room 
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const res = await api.post("/api/rooms/add/new-room", formData)
    if (res.status === 201) {
        return true
    }
    else {
        return false
    }

}


// This function gets all room types from db
export async function getRoomTypes() {
    try {
        const res = await api.get("/api/rooms/types")
        return res.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}

export async function getAllRoom() {
    try {
        const res = await api.get("/api/rooms/all-rooms")
        return res.data
    } catch (error) {
        throw new Error("Error fetching room")
    }
}

export async function deleteRoom(roomId) {
    try {
        const res = await api.delete(`/api/rooms/delete/room/${roomId}`)
        return res.data
    } catch (error) {
        throw new Error(`Error delete room ${error.message}`)
    }
}

export async function updateRoom(roomId, roomData) {
    try {
        const formData = new FormData()
        formData.append("roomType", roomData.roomType)
        formData.append("roomPrice", roomData.roomPrice)
        formData.append("photo", roomData.photo)
        const res = await api.put(`update/room/${roomId}`)
        return res
    } catch (error) {
        throw new Error(`Error delete room ${error.message}`)
    }
}

export async function getRoomById(roomId) {
    try {
        const res = await api.get(`/api/rooms/room/${roomId}`)
        return res.data
    } catch (error) {
        throw new Error(`Error get room  by Id${error.message}`)
    }
}

export async function bookRoom(roomId, booking) {
    try {
        const res = await api.post(`/api/booked/room/${roomId}/booking`, booking)
        return res.data
    } catch (error) {
        throw new Error(`Error booking room ${error.message}`)
    }
}

export async function getAllBooking() {
    try {
        const res = await api.get(`/api/booked/all-booked`)
        return res.data
    } catch (error) {
        throw new Error(`Error booking room ${error.message}`)
    }
}

export async function cancelBooking(bookingId) {
    try {
        const res = await api.delete(`/api/booked/${bookingId}/delete`)
        return res.data
    } catch (error) {
        throw new Error(`Error delete room ${error.message}`)
    }
}

export async function validConfirmationCode(confirmationCode) {
    try {
        const res = await api.get(`/api/booked/confirmationCode/${confirmationCode}`)
        return res.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`code confirm error : ${error.message}`)
        }
    }
}

export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    const res = await api.get(
        `/api/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
    )
    return res
}

export async function RegisterUser(registration) {
    try {
        const res = await api.post(`/api/auth/register-user`, registration)
        return res.data
    } catch (error) {
        if (error.response && error.response.data)
            throw new Error(error.response.data)
        else {
            throw new Error(`User resgistration error : ${error.message}`)
        }
    }
}

export async function loginUser(login) {
    try {
        const res = await api.post(`/api/auth/login`, login)
        if (res.status >= 200 && res.status < 300) {
            return res.data
        } else {
            return null
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function getUserProfile(email, token) {
    try {
        const res = await api.get(`/api/user/profile/${email}`, {
            headers: getHeader()
        })
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export async function deleteUser(userId) {
    try {
        const res = await api.delete(`/api/user/delete/${userId}`, {
            headers: getHeader()
        })
        return res.data
    } catch (error) {
        return error.message
    }
}

export async function getBookingsByUserId(email, token) {
    try {
        const response = await api.get(`/api/booked/user/${email}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        console.error("Error fetching bookings:", error.message)
        throw new Error("Failed to fetch bookings")
    }
}