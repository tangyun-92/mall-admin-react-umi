// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'

/** 登录 POST /admin/login */
export async function loginUsingPOST(body: API.UmsAdminLoginReq, options?: { [key: string]: any }) {
  return request<API.result>('/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 获取用户所有权限（包括+-权限） GET /admin/permissionList */
export async function getPermissionListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPermissionListUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.result>('/admin/permissionList', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** 用户注册 POST /admin/register */
export async function registerUsingPOST(
  body: API.UmsAdminRegisterReq,
  options?: { [key: string]: any }
) {
  return request<API.result>('/admin/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 后台-分配角色 POST /admin/user/assignRole */
export async function assignRoleUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.assignRoleUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<API.result>('/admin/user/assignRole', {
    method: 'POST',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** 后台-删除用户 DELETE /admin/user/delete */
export async function deleteUserUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserUsingDELETEParams,
  options?: { [key: string]: any }
) {
  return request<API.result>('/admin/user/delete', {
    method: 'DELETE',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** 后台-用户列表 GET /admin/user/list */
export async function getUserListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserListUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.result>('/admin/user/list', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** 后台-新增/更新用户 POST /admin/user/save */
export async function saveUserUsingPOST(
  body: API.UmsAdminSaveReq,
  options?: { [key: string]: any }
) {
  return request<API.result>('/admin/user/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 获取用户详细信息与权限列表 GET /admin/userInfo */
export async function getUserInfoUsingGET(options?: { [key: string]: any }) {
  return request<API.result>('/admin/userInfo', {
    method: 'GET',
    ...(options || {})
  })
}
