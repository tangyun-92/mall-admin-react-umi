/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(
  initialState: { currentUser?: API.CurrentUser; permissionList: API.PermissionItem[] } | undefined,
) {
  const { currentUser, permissionList } = initialState ?? {};
  console.log(permissionList);
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
  };
}
