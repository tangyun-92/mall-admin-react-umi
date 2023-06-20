declare namespace API {
  type assignRoleAuthUsingPOSTParams = {
    /** permissionIds */
    permissionIds: number[]
    /** roleId */
    roleId: number
  }

  type assignRoleUsingPOSTParams = {
    /** adminId */
    adminId: number
    /** roleIds */
    roleIds: number[]
  }

  type deleteBrandUsingDELETEParams = {
    /** ids */
    ids: number[]
  }

  type deleteRoleUsingDELETEParams = {
    /** ids */
    ids: number[]
  }

  type deleteUserUsingDELETEParams = {
    /** ids */
    ids: number[]
  }

  type getBrandListUsingGETParams = {
    /** 当前第几页 */
    current?: number
    /** 是否为品牌制造商：0->不是；1->是 */
    factoryStatus?: number
    /** 首字母 */
    firstLetter?: string
    /** 品牌名称 */
    name?: string
    /** 每页显示条数 */
    pageSize?: number
    /** 是否显示：0->不显示；1->显示 */
    showStatus?: number
  }

  type getCurrentPermissionListByRoleIdUsingGETParams = {
    /** roleId */
    roleId: number
  }

  type getPermissionListUsingGETParams = {
    /** adminId */
    adminId: number
  }

  type getRoleListUsingGETParams = {
    /** 当前第几页 */
    current?: number
    /** 角色名称 */
    name?: string
    /** 每页显示条数 */
    pageSize?: number
    /** 状态：0-禁用；1-启用 */
    status?: number
  }

  type getUserListUsingGETParams = {
    /** 当前第几页 */
    current?: number
    /** 昵称 */
    nickName?: string
    /** 每页显示条数 */
    pageSize?: number
    /** 帐号启用状态：0->禁用；1->启用 */
    status?: number
    /** 用户名 */
    username?: string
  }

  type getUserRoleListByAdminIdUsingGETParams = {
    /** adminId */
    adminId?: number
  }

  type ModelAndView = {
    empty?: boolean
    model?: Record<string, any>
    modelMap?: Record<string, any>
    reference?: boolean
    status?:
      | '100 CONTINUE'
      | '101 SWITCHING_PROTOCOLS'
      | '102 PROCESSING'
      | '103 CHECKPOINT'
      | '200 OK'
      | '201 CREATED'
      | '202 ACCEPTED'
      | '203 NON_AUTHORITATIVE_INFORMATION'
      | '204 NO_CONTENT'
      | '205 RESET_CONTENT'
      | '206 PARTIAL_CONTENT'
      | '207 MULTI_STATUS'
      | '208 ALREADY_REPORTED'
      | '226 IM_USED'
      | '300 MULTIPLE_CHOICES'
      | '301 MOVED_PERMANENTLY'
      | '302 FOUND'
      | '302 MOVED_TEMPORARILY'
      | '303 SEE_OTHER'
      | '304 NOT_MODIFIED'
      | '305 USE_PROXY'
      | '307 TEMPORARY_REDIRECT'
      | '308 PERMANENT_REDIRECT'
      | '400 BAD_REQUEST'
      | '401 UNAUTHORIZED'
      | '402 PAYMENT_REQUIRED'
      | '403 FORBIDDEN'
      | '404 NOT_FOUND'
      | '405 METHOD_NOT_ALLOWED'
      | '406 NOT_ACCEPTABLE'
      | '407 PROXY_AUTHENTICATION_REQUIRED'
      | '408 REQUEST_TIMEOUT'
      | '409 CONFLICT'
      | '410 GONE'
      | '411 LENGTH_REQUIRED'
      | '412 PRECONDITION_FAILED'
      | '413 PAYLOAD_TOO_LARGE'
      | '413 REQUEST_ENTITY_TOO_LARGE'
      | '414 URI_TOO_LONG'
      | '414 REQUEST_URI_TOO_LONG'
      | '415 UNSUPPORTED_MEDIA_TYPE'
      | '416 REQUESTED_RANGE_NOT_SATISFIABLE'
      | '417 EXPECTATION_FAILED'
      | '418 I_AM_A_TEAPOT'
      | '419 INSUFFICIENT_SPACE_ON_RESOURCE'
      | '420 METHOD_FAILURE'
      | '421 DESTINATION_LOCKED'
      | '422 UNPROCESSABLE_ENTITY'
      | '423 LOCKED'
      | '424 FAILED_DEPENDENCY'
      | '425 TOO_EARLY'
      | '426 UPGRADE_REQUIRED'
      | '428 PRECONDITION_REQUIRED'
      | '429 TOO_MANY_REQUESTS'
      | '431 REQUEST_HEADER_FIELDS_TOO_LARGE'
      | '451 UNAVAILABLE_FOR_LEGAL_REASONS'
      | '500 INTERNAL_SERVER_ERROR'
      | '501 NOT_IMPLEMENTED'
      | '502 BAD_GATEWAY'
      | '503 SERVICE_UNAVAILABLE'
      | '504 GATEWAY_TIMEOUT'
      | '505 HTTP_VERSION_NOT_SUPPORTED'
      | '506 VARIANT_ALSO_NEGOTIATES'
      | '507 INSUFFICIENT_STORAGE'
      | '508 LOOP_DETECTED'
      | '509 BANDWIDTH_LIMIT_EXCEEDED'
      | '510 NOT_EXTENDED'
      | '511 NETWORK_AUTHENTICATION_REQUIRED'
    view?: View
    viewName?: string
  }

  type PmsBrandSaveReq = {
    /** 专区大图 */
    bigPic?: string
    /** 品牌故事 */
    brandStory?: string
    /** 是否为厂家制造商：0-不是 1-是 */
    factoryStatus?: number
    /** 首字母 */
    firstLetter?: string
    /** id */
    id?: number
    /** 品牌logo */
    logo?: string
    /** 品牌名称 */
    name: string
    /** 显示状态：0-不显示 1-显示 */
    showStatus?: number
    /** 排序 */
    sort?: number
  }

  type result = {
    /** 返回数据 */
    data?: Record<string, any>
    /** 信息提示 */
    message?: string
    success?: boolean
  }

  type UmsAdminLoginReq = {
    /** 密码 */
    password: string
    /** 用户名 */
    username: string
  }

  type UmsAdminRegisterReq = {
    /** 邮箱 */
    email?: string
    /** 头像 */
    icon?: string
    /** 昵称 */
    nickName?: string
    /** 备注信息 */
    note?: string
    /** 密码 */
    password: string
    /** 用户名 */
    username: string
  }

  type UmsAdminSaveReq = {
    /** 邮箱 */
    email?: string
    /** 头像 */
    icon?: string
    /** id */
    id?: number
    /** 昵称 */
    nickName: string
    /** 备注信息 */
    note?: string
    /** 帐号启用状态：0->禁用；1->启用 */
    status?: number
    /** 用户名 */
    username: string
  }

  type UmsRoleSaveReq = {
    /** 描述 */
    description?: string
    id?: number
    /** 角色名称 */
    name?: string
    /** 排序 */
    sort?: number
    /** 状态：0-禁用；1-启用 */
    status?: number
  }

  type View = {
    contentType?: string
  }
}
