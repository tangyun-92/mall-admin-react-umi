/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(
  initialState: { currentUser?: API.UserInfo; permissionList: API.PermissionItem[] } | undefined
) {
  const { currentUser, permissionList } = initialState ?? {}
  return {
    canAdmin: currentUser?.username === 'super',
    // 商品管理的权限
    canProduct: permissionList?.find((item) => item.value === 'pms:product:read'),
    // 品牌列表的权限
    canBrand: permissionList?.find((item) => item.value === 'pms:brand:read'),
    // 新增品牌的权限
    canBrandCreate: permissionList?.find((item) => item.value === 'pms:brand:create'),
    // 更新品牌的权限
    canBrandUpdate: permissionList?.find((item) => item.value === 'pms:brand:update'),
    // 删除品牌的权限
    canBrandDelete: permissionList?.find((item) => item.value === 'pms:brand:delete'),
    // 用户列表的权限
    canUser: permissionList?.find((item) => item.value === 'ums:user:read')
  }
}
