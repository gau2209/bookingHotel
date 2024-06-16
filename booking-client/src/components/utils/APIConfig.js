import axios from "axios";

const SERVER = "http://localhost:9192/"

export const endpoints = {

}

export const api = axios.create({
    baseURL: SERVER
})



// export default axios.create({
//     baseURL:SERVER
// })


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
export async function getRoomTypes(){
    try {
        const res = await api.get("/api/rooms/types")
        return res.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}

    export async function getAllRoom(){
        try {
            const res = await api.get("/api/rooms/all-rooms")
            return res.data
        } catch (error) {
            throw new Error("Error fetching room")
        }
} 

export async function deleteRoom(roomId){
    try {
        const res = await api.delete(`/api/rooms/delete/room/${roomId}`)
        return res.data
    } catch (error) {
        throw new Error(`Error delete room ${error.message}`)
    }
}

export async function updateRoom(roomId,roomData){
    try {
        const formData = new FormData()
        formData.append("roomType",roomData.roomType)
        formData.append("roomPrice",roomData.roomPrice)
        formData.append("photo",roomData.photo)
        const res = await api.put(`update/room/${roomId}`)
        return res
    } catch (error) {
        throw new Error(`Error delete room ${error.message}`)
    }
}

export async function getRoomById(roomId){
    try {
        const res = await api.get(`/api/rooms/room/${roomId}`)
        return res.data
    } catch (error) {
        throw new Error(`Error get room  by Id${error.message}`)
    }
}