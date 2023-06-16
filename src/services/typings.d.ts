declare namespace API {
  type CurrentUser = {
    permissionList: PermissionItem[]
    info: UserInfo
  }
  type PermissionItem = {
    id: number
    pid: number
    name: string
    value: string
    icon: string
    type: string
    uri: string
    status: string
    sort: number
    createTime: string
  }
  type UserInfo = {
    id: number
    username: string
    password: string | null
    icon: string | null
    email: string | null
    nickName: string | null
    note: string | null
    createTime: string
    loginTime: string
    status: string
  }

  type BrandListItem = {
    id: number
    name: string
    firstLetter: string
    sort: number
    factoryStatus: number
    showStatus: number
    productCount: number
    productCommentCount: number
    logo: string
    bigPic: string
    brandStory: string | undefined
  }

  type UserListItem = {
    id: number
    username: string
    nickName: string
    loginTime: string
    status: number
    icon: string
    email: string
    note: string
    createTime: string
    password: string
  }
}
