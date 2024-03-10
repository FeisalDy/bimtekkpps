import useSWR from 'swr'
import * as MateriApi from '@/src/lib/materi'
import { AxiosError } from 'axios'

export function useMateri () {
  const { data, isLoading } = useSWR(
    'materi',
    async () => {
      try {
        return await MateriApi.getMateri()
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 404) {
          return null
        } else {
          throw error
        }
      }
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  return {
    materi: data,
    materiLoading: isLoading
  }
}

export function useCreateMateri (data) {
  const { mutate } = useSWR(
    data,
    async () => {
      try {
        return await MateriApi.createMateri(data)
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 404) {
          return null
        } else {
          throw error
        }
      }
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  return {
    createMateri: mutate
  }
}
