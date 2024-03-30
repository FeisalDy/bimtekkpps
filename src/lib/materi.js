import Axios from '@/src/utils/axios'

export async function getMateri () {
  const res = await Axios.get('/pptx')
  return res.data
}

export async function createMateri (data) {
  const res = await Axios.post('/pptx/upload', data)
  return res.data
}

export async function updateMateri (state, data) {
  const res = await Axios.put(
    `/pptx/${state.oldtitle}`,
    data
    //   {
    //     title: state.title,
    //     oldtitle: state.oldtitle,
    //     file: state.file
    //   }
  )
  return res.data
}
