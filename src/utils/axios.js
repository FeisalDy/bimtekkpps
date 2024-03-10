import axios from 'axios'

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AXIOS_BASE_URL,
  timeout: 20000
})

// Retry on timeout with a maximum of 3 retries
Axios.interceptors.response.use(undefined, error => {
  const originalRequest = error.config

  // Retry only on timeout
  if (error.code === 'ECONNABORTED' && !originalRequest._retry) {
    originalRequest._retry = true
    return Axios(originalRequest)
  }

  return Promise.reject(error)
})

export default Axios
