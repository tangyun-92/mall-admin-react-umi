declare namespace API {
  type CurrentUser = {
    permissionList: PermissionItem[];
    info: UserInfo;
  };
  type PermissionItem = {
    id: number;
    pid: number;
    name: string;
    value: string;
    icon: string;
    type: number;
    uri: string;
    status: number;
    sort: number;
    createTime: string;
  };
  type UserInfo = {
    id: number;
    username: string;
    password: string | null;
    icon: string | null;
    email: string | null;
    nickName: string | null;
    note: string | null;
    createTime: string;
    loginTime: string;
    status: number;
  };

  type BrandListItem = {
    id: number;
    name: string;
    firstLetter: string;
    sort: number;
    factoryStatus: number;
    showStatus: number;
    productCount: number;
    productCommentCount: number;
    logo: string;
    bigPic: string;
    brandStory: string | null;
  };
}
