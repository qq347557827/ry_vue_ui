import request from '@/utils/request'

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
export function addCollections(data, isTagList) {
  let params
  if (isTagList) {
    params = { isTagList }
  }
  return request({
    url: '/system/collections',
    method: 'post',
    data: data,
    params
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
// 修改收藏使用次数
export function updateCollectionsUsageCount(data) {
  return request({
    url: '/system/collections/usageCount',
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
    url: '/system/collections/tagByUserId',
    method: 'get'
  })
}
