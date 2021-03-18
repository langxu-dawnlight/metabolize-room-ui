import { get, post, del, fetchbuffer, fetchbolb } from '@/utils/request'
import { API_BASE_URL, SMPL_BASE_URL } from './config'

export const getVideoBase64 = param =>
  get(`${API_BASE_URL}/annotation/video_body/${param.id}`)

// rome
export const getAllRooms = param =>
get(`${API_BASE_URL}/room/`, param)

export const getRoomById = param =>
get(`${API_BASE_URL}/room/id`, param)

export const addRooms = param =>
post(`${API_BASE_URL}/room/add`, param)

export const deleteRoom = param =>
post(`${API_BASE_URL}/room/delete`, param)

export const updateRoom = param =>
post(`${API_BASE_URL}/room/update`, param)

//gateway
export const getGatewayById = param =>
get(`${API_BASE_URL}/gateway/`, param)

export const addGateways = param =>
post(`${API_BASE_URL}/gateway/add`, param)

export const deleteGateway = param =>
post(`${API_BASE_URL}/gateway/delete`, param)

export const getGatewayByRoom = param =>
get(`${API_BASE_URL}/gateway/room`, param)

export const updateGateway = param =>
post(`${API_BASE_URL}/gateway/update`, param)

export const forbidGateway = param =>
post(`${API_BASE_URL}/gateway/forbid`, param)

export const permitGateway = param =>
post(`${API_BASE_URL}/gateway/permit`, param)

//reader
export const getAllReaders = param =>
get(`${API_BASE_URL}/reader/`, param)

export const addReaders = param =>
post(`${API_BASE_URL}/reader/add`, param)

export const deleteReader = param =>
post(`${API_BASE_URL}/reader/delete`, param)

export const getReaderByRoom = param =>
get(`${API_BASE_URL}/reader/room`, param)

export const updateReader = param =>
post(`${API_BASE_URL}/reader/update`, param)

export const forbidReader = param =>
post(`${API_BASE_URL}/reader/forbid`, param)

export const permitReader = param =>
post(`${API_BASE_URL}/reader/permit`, param)

//tag
export const getTagById = param =>
get(`${API_BASE_URL}/tag/`, param)

export const addTags = param =>
post(`${API_BASE_URL}/tag/add`, param)

export const deleteTag = param =>
post(`${API_BASE_URL}/tag/delete`, param)

export const getTagByReader = param =>
get(`${API_BASE_URL}/tag/reader`, param)

export const updateTag = param =>
post(`${API_BASE_URL}/tag/update`, param)

// beacon
export const getBeaconsByGateway = param =>
get(`${API_BASE_URL}/beacon/antenna`, param)

export const addBeacon = param =>
post(`${API_BASE_URL}/beacon/add`, param)

export const deleteBeacon = param =>
post(`${API_BASE_URL}/beacon/delete`, param)

export const updateBeacon = param =>
post(`${API_BASE_URL}/beacon/update`, param)