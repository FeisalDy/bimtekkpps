import useSWR from 'swr'
import * as MateriApi from '@/src/lib/materi'
import { AxiosError } from 'axios'
import Axios from '@/src/utils/axios'

const fetcher = url => Axios.get(url).then(res => res.data)

export function useMateri (type) {
  const { data, error, isLoading } = useSWR(`pptx?type=${type}`, fetcher)

  return {
    materi: data,
    materiLoading: isLoading,
    isError: error
  }
}

export function useCreateMateri (data) {
  const { mutate } = useSWR(data, async () => {
    try {
      return await MateriApi.createMateri(data)
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return null
      } else {
        throw error
      }
    }
  })

  return {
    createMateri: mutate
  }
}
