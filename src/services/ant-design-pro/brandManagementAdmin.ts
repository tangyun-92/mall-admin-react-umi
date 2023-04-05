// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 后台-添加品牌 POST /admin/brand/add */
export async function addBrandUsingPOST(
  body: API.PmsBrandAddParam,
  options?: { [key: string]: any },
) {
  return request<API.result>('/admin/brand/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 后台-删除品牌 POST /admin/brand/delete */
export async function deleteBrandUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteBrandUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.result>('/admin/brand/delete', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 后台-品牌列表 GET /admin/brand/list */
export async function getBrandListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBrandListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.result>('/admin/brand/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 后台-更新品牌 POST /admin/brand/update */
export async function updateBrandUsingPOST(
  body: API.PmsBrandUpdateParam,
  options?: { [key: string]: any },
) {
  return request<API.result>('/admin/brand/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
