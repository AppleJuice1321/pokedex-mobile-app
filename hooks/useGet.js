import axios from "axios";
import { useEffect, useState } from "react";

function useGet(url) {

    // set states
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    // fetch data
    const getData = async (url) => {
        try {
            const RESPONSE = await axios.get(url)
            setData(RESPONSE.data)
        } catch(error) {
            console.error(error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    // Side-effect handler
    useEffect(() => {
        getData(url)
    },[url])

    // return fetched data
    return {data, error, loading}
}

export default useGet