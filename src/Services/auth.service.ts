import axios from "./axios"

type TokenResponse = {
  token: string
  expiresAt: string
  role: string
}
export const login = async (Email: string, password: string) => {
    const url = '/UserLogin'

    const formData = new FormData()
    formData.append("Email", Email)
    formData.append("Password", password)

    const response = await axios.post<TokenResponse>(url + '/login', formData)
    return response.data
}


export const signUp = async (Name: string, Email: string, password: string) => 
{
    const url = '/UserSignUp'
    const formData = new FormData()
    formData.append("Name", Name)
    formData.append("Email", Email)
    formData.append("Password", password)

    const response = await axios.post<string>(url + '/signup', formData)
    return response.data
}
