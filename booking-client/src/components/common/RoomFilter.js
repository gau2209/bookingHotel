import { useState } from "react"

const RoomFilter = ({ data, setFilteredData }) => {
    const [filter, setFilter] = useState("")

    const handleFiltration = (e) => {
        const selectedRoomType = e.target.value;
        setFilter(selectedRoomType)
        const filteredRoom = data.filter((room) =>
            room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase()))
        setFilteredData(filteredRoom)
    }


    const clearFilter = () => {
        setFilter("")
        setFilteredData(data)
    }

    const roomTypes = ["", ...new Set(data.map((room) => room.roomType))]

    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="room-type-filter">
                FIlter rooms by type
            </span>
            <select
                className="form-select"
                aria-label="room type filter"
                value={filter}
                onChange={handleFiltration}>
                <option value="">select a room type to filter....</option>
                {roomTypes.map((type, index) => (
                    <option key={index} value={String(type)}>
                        {String(type)}
                    </option>
                ))}
            </select>
            <button className="btn btn-danger" type="button" onClick={clearFilter}>
                Clear Filter
            </button>
        </div>
    )
}

export default RoomFilter
