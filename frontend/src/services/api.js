import axios from "axios"

const getApiBaseUrl = () => {
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL
    }

    const apiPort = import.meta.env.VITE_API_PORT || "8000"
    const host = window.location.hostname || "localhost"
    const protocol = window.location.protocol === "https:" ? "https:" : "http:"

    return `${protocol}//${host}:${apiPort}`
}

const API = axios.create({
    baseURL: getApiBaseUrl(),
})

export const generateQuestions = async (skills) => {
    const response = await API.post("/generate-questions", { skills })
    return response.data 
}
  
export default API