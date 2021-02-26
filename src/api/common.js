import { get, post, del, fetchbuffer, fetchbolb } from '@/utils/request'
import { API_BASE_URL, SMPL_BASE_URL } from './config'

export const getVideoBase64 = param =>
  get(`${API_BASE_URL}/annotation/video_body/${param.id}`)
