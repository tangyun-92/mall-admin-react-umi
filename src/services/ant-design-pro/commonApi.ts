// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 文件上传 POST /admin/upload */
export async function uploadUsingPOST(body: {}, file?: File, options?: { [key: string]: any }) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return request<API.result>('/admin/upload', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
