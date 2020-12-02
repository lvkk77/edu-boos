import request from '@/utils/request'

export const getAllSpaces = (params: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getAllSpaces',
    params
  })
}

export const getSpaceById = (params: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getSpaceById',
    params
  })
}

export const saveOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/front/ad/space/saveOrUpdate',
    data
  })
}
