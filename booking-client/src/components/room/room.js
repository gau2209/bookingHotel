import { useEffect, useState } from "react"
import { getAllRoom } from "../utils/APIConfig"
import RoomCard from "./RoomCard"
import { Col, Container, Row } from "react-bootstrap"
import RoomFilter from "../common/RoomFilter"
import RoomPaginator from "../common/RoomPaginator"
import Spinner from "../../layout/Spinner"


const Room = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPages] = useState(6)
    const [filteredData, setFilteredData] = useState([{ id: "" }])

    useEffect(() => {
        setIsLoading(true)
        getAllRoom().then((data) => {
            setData(data)
            setFilteredData(data)
            setIsLoading(false)
        }).catch((error) => {
            setError(error.message)
            setIsLoading(false)
        })
    }, [])

    if (isLoading === true) {
        return <Spinner/>
    }

    if (error) {
        return <div className="text-danger"> Error: {error} </div>
    }

    const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

    const totalPages = Math.ceil(filteredData.length / roomsPerPages)

    const renderRooms = () => {
		const startIndex = (currentPage - 1) * roomsPerPages
		const endIndex = startIndex + roomsPerPages
		return filteredData
			.slice(startIndex, endIndex)
			.map((room) => <RoomCard key={room.id} room={room} />)
	}

	return (
		<Container>
			<Row>
				<Col md={6} className="mb-3 mb-md-0">
					<RoomFilter data={data} setFilteredData={setFilteredData} />
				</Col>

				<Col md={6} className="d-flex align-items-center justify-content-end">
					<RoomPaginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>

			<Row>{renderRooms()}</Row>

			<Row>
				<Col md={6} className="d-flex align-items-center justify-content-end">
					<RoomPaginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>
		</Container>
	)
}
export default Room