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
    // 新增/更新品牌的权限
    canBrandSave: permissionList?.find((item) => item.value === 'pms:brand:save'),
    // 删除品牌的权限
    canBrandDelete: permissionList?.find((item) => item.value === 'pms:brand:delete'),
    // 用户列表的权限
    canUser: permissionList?.find((item) => item.value === 'ums:admin:read'),
    canUserSave: permissionList?.find((item) => item.value === 'ums:admin:save'),
    canUserDelete: permissionList?.find((item) => item.value === 'ums:admin:delete'),
    // 分配角色的权限
    canUserAssignRole: permissionList?.find((item) => item.value === 'ums:admin:assignRole')
  }
}
