import API from "./api"

export const signupUser = async (data) => {
    return API.post("/signup", data)
}

export const loginUser = async (data) => {
    return API.post("/login", data)
}