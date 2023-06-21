import { getRoleListUsingGET } from '@/services/ant-design-pro/roleManagementAdmin'
import {
  assignRoleUsingPOST,
  deleteUserUsingDELETE,
  getUserListUsingGET,
  getUserRoleListByAdminIdUsingGET,
  saveUserUsingPOST
} from '@/services/ant-design-pro/userManagementAdmin'
import { PlusOutlined } from '@ant-design/icons'
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProTable
} from '@ant-design/pro-components'
import '@umijs/max'
import { useAccess } from '@umijs/max'
import { Button, Drawer, message } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
import React, { useRef, useState } from 'react'
import AssignRole from './components/AssignRole'
import MyForm from './components/MyForm'

// 是否品牌制造商枚举
export const factoryStatusEnum = {
  1: {
    text: '是',
    status: 'Success'
  },
  0: {
    text: '不是',
    status: 'Default'
  }
}
export const showStatusEnum = {
  1: {
    text: '启用',
    status: 'Success'
  },
  0: {
    text: '禁用',
    status: 'Default'
  }
}

const TableList: React.FC = () => {
  // 权限
  const access = useAccess()
  // 弹窗标题
  const [modalTitle, setModalTitle] = useState<string>('')
  // 新增与编辑的弹窗开关
  const [createModalOpen, handleModalOpen] = useState<boolean>(false)
  const createFormRef = useRef<any>()
  const updateFormRef = useRef<any>()
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false)

  // 详情抽屉开关
  const [showDetail, setShowDetail] = useState<boolean>(false)

  const actionRef = useRef<ActionType>()
  // 当前行
  const [currentRow, setCurrentRow] = useState<API.UserListItem>()
  // 选中的行
  const [selectedRowsState, setSelectedRows] = useState<API.UserListItem[]>([])

  // 分配角色弹窗开关
  const [assignRoleModalOpen, handleAssignRoleModalOpen] = useState<boolean>(false)
  const assignRoleFormRef = useRef<any>()
  // 当前行角色列表
  const [currentRoleList, setCurrentRoleList] = useState<number[]>([])
  // 所有角色列表
  const [allRoleList, setAllRoleList] = useState<DefaultOptionType[]>([])

  /**
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.UserListItem) => {
    const hide = message.loading('正在添加')
    try {
      await saveUserUsingPOST({
        ...fields,
        icon: createFormRef.current?.icon
      })
      hide()
      message.success('新增成功！')
      return true
    } catch (error) {
      hide()
      return false
    }
  }

  /**
   * @zh-CN 更新节点
   * @param fields
   */
  const handleUpdate = async (fields: API.UserListItem, id: number) => {
    const hide = message.loading('Configuring')
    try {
      await saveUserUsingPOST({
        ...fields,
        id,
        icon: updateFormRef.current?.icon
      })
      hide()
      message.success('更新成功！')
      return true
    } catch (error) {
      hide()
      return false
    }
  }

  /**
   * @zh-CN 删除节点
   * @param selectedRows
   */
  const handleRemove = async (selectedRows: API.UserListItem[]) => {
    const hide = message.loading('正在删除')
    if (!selectedRows) return true
    try {
      await deleteUserUsingDELETE({
        ids: selectedRows.map((row) => row.id).join(',') as any
      })
      hide()
      message.success('删除成功！')
      return true
    } catch (error) {
      hide()
      return false
    }
  }

  /**
   * 分配角色
   */
  async function handleAssignRole(fields: any, id: number) {
    const hide = message.loading('正在分配角色')
    try {
      await assignRoleUsingPOST({
        adminId: id,
        roleIds: fields.roleId.join(',') as any
      })
      hide()
      message.success('分配角色成功！')
      return true
    } catch (error) {
      hide()
      return false
    }
  }

  /**
   * 根据用户id获取角色id列表
   */
  async function getUserRoleListByAdminId(adminId: number | undefined) {
    try {
      const res = await getUserRoleListByAdminIdUsingGET({
        adminId
      })
      const roleList = res.data?.map((item: any) => item.roleId)
      setCurrentRoleList(roleList)

      return true
    } catch (error) {
      return false
    }
  }

  /**
   * 获取所有的角色列表
   */
  async function getAllRoleList() {
    const res = await getRoleListUsingGET({
      pageSize: 1000,
      current: 1
    })
    const list: DefaultOptionType[] = []
    res.data?.list.forEach((item: API.RoleListItem) => {
      list.push({
        value: item.id,
        label: item.name
      })
    })
    setAllRoleList(list)
  }

  /**
   * @zh-CN 国际化配置
   * */
  const columns: ProColumns<API.UserListItem>[] = [
    {
      title: '用户名',
      dataIndex: 'username',
      tip: '点击用户名可查看详情',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity)
              setShowDetail(true)
            }}
          >
            {dom}
          </a>
        )
      }
    },
    {
      title: '昵称',
      dataIndex: 'nickName'
    },
    {
      title: '头像',
      dataIndex: 'icon',
      valueType: 'image',
      hideInSearch: true
    },
    {
      title: '最后一次登录时间',
      dataIndex: 'loginTime',
      hideInSearch: true
    },
    {
      title: '备注',
      dataIndex: 'note',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: showStatusEnum
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 180,
      hideInDescriptions: true,
      render: (_, record) => [
        access.canUserSave ? (
          <a
            key="config"
            onClick={() => {
              handleUpdateModalOpen(true)
              setCurrentRow(record)
              setModalTitle('编辑用户')
            }}
          >
            编辑
          </a>
        ) : (
          ''
        ),
        access.canUserDelete ? (
          <a
            key="delete"
            onClick={async () => {
              await handleRemove([record])
              actionRef.current?.reloadAndRest?.()
            }}
          >
            删除
          </a>
        ) : (
          ''
        ),
        access.canUserAssignRole ? (
          <a
            key="assignRole"
            onClick={async () => {
              getUserRoleListByAdminId(record?.id)
              handleAssignRoleModalOpen(true)
              setCurrentRow(record)
              getAllRoleList()
            }}
          >
            分配角色
          </a>
        ) : (
          ''
        )
      ]
    }
  ]
  return (
    <PageContainer>
      <ProTable<API.UserListItem, API.getUserListUsingGETParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120
        }}
        toolBarRender={() => [
          access.canUserSave ? (
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalOpen(true)
                setModalTitle('新增用户')
              }}
            >
              <PlusOutlined /> 新建
            </Button>
          ) : (
            ''
          )
        ]}
        request={async (params: { pageSize?: number; current?: number }) => {
          const msg = await getUserListUsingGET({
            ...params
          })
          return {
            data: msg.data?.list,
            success: true,
            total: msg.data?.total
          }
        }}
        columns={columns}
        pagination={{
          pageSize: 10
        }}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows)
          }
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项
            </div>
          }
        >
          {access.canUserDelete ? (
            <Button
              type="primary"
              danger
              onClick={async () => {
                await handleRemove(selectedRowsState)
                setSelectedRows([])
                actionRef.current?.reloadAndRest?.()
              }}
            >
              批量删除
            </Button>
          ) : (
            ''
          )}
        </FooterToolbar>
      )}

      {/* 新增 */}
      <MyForm
        modalTitle={modalTitle}
        onOpenChange={(val) => {
          handleModalOpen(val)
          // 关闭时重置表单
          if (!val) {
            if (createFormRef.current) {
              createFormRef.current?.resetFields()
            }
          }
        }}
        modalOpen={createModalOpen}
        onRef={createFormRef}
        onSubmit={async (values: API.UserListItem) => {
          const success = await handleAdd(values)
          if (success) {
            handleModalOpen(false)
            if (actionRef.current) {
              actionRef.current.reload()
            }
          }
        }}
      ></MyForm>

      {/* 编辑 */}
      <MyForm
        modalTitle={modalTitle}
        onOpenChange={(val) => {
          handleUpdateModalOpen(val)
          // 关闭时重置表单
          if (!val) {
            if (updateFormRef.current) {
              updateFormRef.current?.resetFields()
              setCurrentRow(undefined)
            }
          }
        }}
        modalOpen={updateModalOpen}
        onRef={updateFormRef}
        onSubmit={async (values: API.UserListItem) => {
          const success = await handleUpdate(values, currentRow?.id as number)
          if (success) {
            handleUpdateModalOpen(false)
            if (actionRef.current) {
              actionRef.current.reload()
            }
          }
        }}
        initialValues={currentRow}
      ></MyForm>

      {/* 详情 */}
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined)
          setShowDetail(false)
        }}
        closable={false}
      >
        {currentRow?.username && (
          <ProDescriptions<API.UserListItem>
            column={1}
            title={currentRow?.username}
            request={async () => ({
              data: currentRow || {}
            })}
            params={{
              id: currentRow?.username
            }}
            columns={columns as ProDescriptionsItemProps<API.UserListItem>[]}
          />
        )}
      </Drawer>

      {/* 分配角色 */}
      <AssignRole
        modalOpen={assignRoleModalOpen}
        onRef={assignRoleFormRef}
        onOpenChange={(val) => {
          handleAssignRoleModalOpen(val)
          if (!val) {
            if (assignRoleFormRef.current) {
              assignRoleFormRef.current?.resetFields()
              setCurrentRow(undefined)
            }
          }
        }}
        onSubmit={async (values: API.UserListItem) => {
          const success = await handleAssignRole(values, currentRow?.id as number)
          if (success) {
            handleAssignRoleModalOpen(false)
            if (actionRef.current) {
              actionRef.current.reload()
            }
          }
        }}
        initialValues={currentRoleList}
        allRoleList={allRoleList}
      ></AssignRole>
    </PageContainer>
  )
}
export default TableList
