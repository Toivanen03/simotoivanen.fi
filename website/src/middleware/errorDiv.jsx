import { useState } from "react"
import Spinner from "./spinner"

const ErrorDiv = ({ error, refetch }) => {
    const [count, setCount] = useState(0)
    const [text, setText] = useState(error?.message ? `Virhe: ${error.message}` : error ? error : "Tuntematon virhe.")
    const [loading, setLoading] = useState(false)

    const tryRefresh = async () => {
        setCount(prev => {
            if (prev >= 2) setText("Sivustolla on ongelma. Yritä myöhemmin uudelleen.")
            return prev + 1
        })

        setLoading(true)

        try {
            await refetch()
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className="loader-container flex-column">
                    <span className="text-white mb-5">{text}</span>
                    {count < 3 &&
                        <button className="btn btn-secondary" onClick={() => tryRefresh()}>
                            Yritä uudelleen
                        </button>
                    }
                </div>
            )}
        </>
    )
}

export default ErrorDiv