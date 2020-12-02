import request from '@/utils/request'

export const getAdList = (data: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdList',
    data
  })
}

export const getAllSpaces = () => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getAllSpaces'
  })
}

export const updateStatus = (params: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/updateStatus',
    params
  })
}

export const getAdById = (params: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdById',
    params
  })
}

export const saveOrUpdate = (params: any) => {
  return request({
    method: 'POST',
    url: '/front/ad/saveOrUpdate',
    data: params
  })
}
