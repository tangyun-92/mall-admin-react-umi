// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'

/** hello GET /hello */
export async function helloUsingGET(options?: { [key: string]: any }) {
  return request<string>('/hello', {
    method: 'GET',
    ...(options || {})
  })
}
