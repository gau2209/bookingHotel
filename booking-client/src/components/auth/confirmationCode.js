import { useState } from "react"
import { Link } from "react-router-dom"

function CheckConfirmationCode() {
    const [confirmationCode, setConfirmationCode] = useState()

    console.log(confirmationCode)

    return (
        <>
            <input inputMode="numeric" value={confirmationCode} pattern="[0-9]*" onChange={(e)=>setConfirmationCode(e.target.value)}></input>
            <button className="btn btn-danger" type="submit" >
                <Link to={`/checking-confirmationcode/${confirmationCode}`}>
                    submit
                </Link>
            </button>

        </>
    )
}
export default CheckConfirmationCode