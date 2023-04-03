declare namespace API {
  type deleteUsingPOSTParams = {
    /** id */
    id: number;
  };

  type getPermissionListUsingGETParams = {
    /** adminId */
    adminId: number;
  };

  type listUsingGETParams = {
    /** 是否为品牌制造商：0-不是 1-是 */
    factoryStatus?: number;
    /** 品牌名称 */
    name?: string;
    /** 当前第几页 */
    pageNum?: number;
    /** 每页显示条数 */
    pageSize?: number;
  };

  type PmsBrandAddParam = {
    /** 专区大图 */
    bigPic?: string;
    /** 品牌故事 */
    brandStory?: string;
    /** 是否为品牌制造商：0-不是 1-是 */
    factoryStatus: number;
    /** 首字母 */
    firstLetter: string;
    /** 品牌logo */
    logo?: string;
    /** 品牌名称 */
    name: string;
    /** 产品评论数量 */
    productCommentCount?: number;
    /** 产品数量 */
    productCount?: number;
    /** 显示状态：0-不显示 1-显示 */
    showStatus?: number;
    /** 排序 */
    sort: number;
  };

  type PmsBrandUpdateParam = {
    /** 专区大图 */
    bigPic?: string;
    /** 品牌故事 */
    brandStory?: string;
    /** 是否为品牌制造商：0->不是；1->是 */
    factoryStatus?: number;
    /** 首字母 */
    firstLetter?: string;
    /** id */
    id: number;
    /** 品牌logo */
    logo?: string;
    /** 品牌名称 */
    name?: string;
    /** 产品评论数量 */
    productCommentCount?: number;
    /** 产品数量 */
    productCount?: number;
    /** 显示状态：0-不显示 1-显示 */
    showStatus?: number;
    sort?: number;
  };

  type result = {
    /** 返回数据 */
    data?: Record<string, any>;
    /** 信息提示 */
    msg?: string;
    /** 状态：200-成功 */
    status?: number;
  };

  type UmsAdminLoginParam = {
    /** 密码 */
    password: string;
    /** 用户名 */
    username: string;
  };

  type UmsAdminRegisterParam = {
    /** 邮箱 */
    email?: string;
    /** 头像 */
    icon?: string;
    /** 昵称 */
    nickName?: string;
    /** 备注信息 */
    note?: string;
    /** 密码 */
    password: string;
    /** 用户名 */
    username: string;
  };
}
