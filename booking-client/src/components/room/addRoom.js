import { useState } from "react"
import RoomTypeSelector from "../common/RoomTypeSelector"
import { addRoom } from "../utils/APIConfig"

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    })

    const [imagePreview, setImagePreview] = useState("")
    const [message, setMessage] = useState("")
    const [errMessage, setErrMessage] = useState("")

    const handleRoomInput = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === "roomPrice") {
            if (!isNaN(value)) {
                value = parseInt(value)
            } else {
                value = ""
            }
        }
        setNewRoom({ ...newRoom, [name]: value })
    }

    const handleImage = (e) => {
        const selectedImage = e.target.files[0]
        setNewRoom({ ...newRoom, photo: selectedImage })
        setImagePreview(URL.createObjectURL(selectedImage))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
            if (res !== undefined) {
                setMessage("Adding successfully")
                setNewRoom({ photo: null, roomType: "", roomPrice: "" })
                setImagePreview("")
				setErrMessage("")
            } else
                setErrMessage("error adding room")
        } catch (error) {
            console.log(error)
        }
    }

console.log(newRoom)

    return (
        <>
            <section className="container, mt-t mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Add a new room</h2>
                        {message && (
							<div className="alert alert-success fade show"> {message}</div>
						)}

						{errMessage && <div className="alert alert-danger fade show"> {errMessage}</div>}
                        <form onSubmit={handleSubmit} >

                            <div className="mb-3">
                                <label htmlFor="roomType" className="form-label"  >
                                    Room Type
                                </label>
                                <div>
                                    <RoomTypeSelector handleRoomInputChange={handleRoomInput} 
                                    newRoom={newRoom}/>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label">
                                    Room Price
                                </label>
                                <input className="form-control"
                                    type="number"
                                    required id="roomPrice"
                                    name="roomPrice"
                                    value={newRoom.roomPrice}
                                    onChange={handleRoomInput} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label"  >
                                    Photo
                                </label>
                                <input className="form-control"
                                    type="file"
                                    required id="photo"
                                    name="photo"
                                    onChange={handleImage} />
                                {imagePreview && (
                                    <img src={imagePreview}
                                        className="mb-3"
                                        alt="Preview Room photo"
                                        style={{ maxWidth: "400px", maxHeight: "400px" }} />
                                )}
                            </div>


                            <div className="d-grid d-md-flex mt-2">
                                <button type="submit" className="btn btn-outline-primary ml-5" >Save Room</button>
                            </div>


                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddRoom