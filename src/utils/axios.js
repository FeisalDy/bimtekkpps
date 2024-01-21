import axios from 'axios'

const Axios = axios.create({
  //   baseURL: 'http://localhost:3000/api',
  //   baseURL: 'http://127.0.0.1:3000/api',
  baseURL: 'https://ppkseyegan.tech/api',
  timeout: 5000
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
