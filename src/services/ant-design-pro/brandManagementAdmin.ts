// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'

/** 后台-删除品牌 DELETE /admin/brand/delete */
export async function deleteBrandUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteBrandUsingDELETEParams,
  options?: { [key: string]: any }
) {
  return request<API.result>('/admin/brand/delete', {
    method: 'DELETE',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** 后台-品牌列表 GET /admin/brand/list */
export async function getBrandListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBrandListUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.result>('/admin/brand/list', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** 后台-新增/更新品牌 POST /admin/brand/save */
export async function saveBrandUsingPOST(
  body: API.PmsBrandSaveReq,
  options?: { [key: string]: any }
) {
  return request<API.result>('/admin/brand/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}
