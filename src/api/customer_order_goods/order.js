import request from '@/utils/request'

// 查询订单列表
export function listOrder(query) {
  return request({
    url: '/system/order/list',
    method: 'get',
    params: query
  })
}

// 查询订单详细
export function getOrder(orderId) {
  return request({
    url: '/system/order/' + orderId,
    method: 'get'
  })
}

// 新增订单
export function addOrder(data) {
  return request({
    url: '/system/order',
    method: 'post',
    data: data
  })
}

export function addOrderAndCustomer(data) {
  return request({
    url: '/system/order/AddOrderAndCustomer',
    method: 'post',
    data: data
  })
}
export function testM(data) {
  request({
    url: 'system/order/export_shipment',
    method: 'post',
    data: data
  }).then(res => {
    const blob = new Blob([res])
    saveAs(blob, 'filename')
  })
}

// 修改订单
export function updateOrder(data) {
  return request({
    url: '/system/order',
    method: 'put',
    data: data
  })
}

// 删除订单
export function delOrder(orderId) {
  return request({
    url: '/system/order/' + orderId,
    method: 'delete'
  })
}

// 批量审核订单
export function approvalOrderIds(idsArr) {
  return request({
    url: '/system/order/approval',
    method: 'post',
    data: idsArr
  })
}
// 批量拒绝订单
export function rejectOrderIds(idsArr) {
  return request({
    url: '/system/order/reject',
    method: 'post',
    data: idsArr
  })
}
// 审核拒绝订单
export function approvalRejectByOrderId(data) {
  return request({
    url: '/system/order/approvalReject',
    method: 'post',
    data
  })
}
// 订单发货
export function shipmentOrder(data) {
  return request({
    url: '/system/order/shipment',
    method: 'post',
    data
  })
}

// 二次收款
export function secondaryRevenueOrder(data) {
  return request({
    url: '/system/order/secondaryRevenue',
    method: 'post',
    data
  })
}
