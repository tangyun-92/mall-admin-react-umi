// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'

/** 后台-分配角色权限 POST /admin/role/assignAuth */
export async function assignRoleAuthUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.assignRoleAuthUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<API.result>('/admin/role/assignAuth', {
    method: 'POST',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** 后台-根据角色id，获取该角色拥有的所有权限列表 GET /admin/role/currentPermissionList */
export async function getCurrentPermissionListByRoleIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCurrentPermissionListByRoleIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.result>('/admin/role/currentPermissionList', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** 后台-删除角色 DELETE /admin/role/delete */
export async function deleteRoleUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteRoleUsingDELETEParams,
  options?: { [key: string]: any }
) {
  return request<API.result>('/admin/role/delete', {
    method: 'DELETE',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** 后台-角色列表 GET /admin/role/list */
export async function getRoleListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoleListUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.result>('/admin/role/list', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** 后台-新增/更新角色 POST /admin/role/save */
export async function saveRoleUsingPOST(
  body: API.UmsRoleSaveReq,
  options?: { [key: string]: any }
) {
  return request<API.result>('/admin/role/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}
