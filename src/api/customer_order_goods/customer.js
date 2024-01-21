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
