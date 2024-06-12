import { useEffect, useState } from "react"
import { getAllRoom } from "../utils/APIConfig"

const AllRoom = ()=>{
    const [rooms,setRooms] = useState([])
  useEffect(() =>{
   getAllRoom().then((data) =>{
    setRooms(data)
   })
  },[])

  console.log(rooms)
    return(
        <>
        <h1>AllRom</h1>
        </>
    )
}
export default AllRoom