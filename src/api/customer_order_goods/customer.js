import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listCustomer(query) {
  return request({
    url: '/system/customer/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getCustomer(id) {
  return request({
    url: '/system/customer/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addCustomer(data) {
  return request({
    url: '/system/customer',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateCustomer(data) {
  return request({
    url: '/system/customer',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delCustomer(id) {
  return request({
    url: '/system/customer/' + id,
    method: 'delete'
  })
}

export function postGuoxue(data) {
  return request({
    url: '/system/customer/guoxue',
    method: 'post',
    data: data
  })
}

// 查询批解收藏列表
export function listCollections(query) {
  return request({
    url: '/system/collections/list',
    method: 'get',
    params: query
  })
}

// 查询批解收藏详细
export function getCollections(id) {
  return request({
    url: '/system/collections/' + id,
    method: 'get'
  })
}

// 新增批解收藏
export function addCollections(data) {
  return request({
    url: '/system/collections',
    method: 'post',
    data: data
  })
}

// 修改批解收藏
export function updateCollections(data) {
  return request({
    url: '/system/collections',
    method: 'put',
    data: data
  })
}

// 删除批解收藏
export function delCollections(id) {
  return request({
    url: '/system/collections/' + id,
    method: 'delete'
  })
}

// 查询批解收藏详细
export function getTags(id) {
  return request({
    url: '/system/collections/tagByUserId' ,
    method: 'get'
  })
}
