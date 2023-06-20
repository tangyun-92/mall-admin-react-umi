// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'

/** 后台-获取所有权限列表 GET /admin/permission/allList */
export async function getAllPermissionListUsingGET(options?: { [key: string]: any }) {
  return request<API.result>('/admin/permission/allList', {
    method: 'GET',
    ...(options || {})
  })
}
