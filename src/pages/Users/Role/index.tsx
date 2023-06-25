import { getAllPermissionListUsingGET } from '@/services/ant-design-pro/permissionManagementAdmin'
import {
  assignRoleAuthUsingPOST,
  deleteRoleUsingDELETE,
  getCurrentPermissionListByRoleIdUsingGET,
  getRoleListUsingGET,
  saveRoleUsingPOST
} from '@/services/ant-design-pro/roleManagementAdmin'
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
import { DataNode } from 'antd/es/tree'
import React, { useRef, useState } from 'react'
import AssignAuth from './components/AssignAuth'
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
  const [currentRow, setCurrentRow] = useState<API.RoleListItem>()
  // 选中的行
  const [selectedRowsState, setSelectedRows] = useState<API.RoleListItem[]>([])

  // 分配权限弹窗开关
  const [assignAuthModalOpen, handleAssignAuthModalOpen] = useState<boolean>(false)
  const assignAuthFormRef = useRef<any>()
  // 所有权限列表
  const [allPermissionList, setAllPermissionList] = useState<DataNode[]>([])
  // 当前角色所拥有的权限列表
  const [currentPermissionList, setCurrentPermissionList] = useState<number[]>([])

  /**
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.RoleListItem) => {
    const hide = message.loading('正在添加')
    try {
      await saveRoleUsingPOST({
        ...fields
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
  const handleUpdate = async (fields: API.RoleListItem, id: number) => {
    const hide = message.loading('Configuring')
    try {
      await saveRoleUsingPOST({
        ...fields,
        id
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
  const handleRemove = async (selectedRows: API.RoleListItem[]) => {
    const hide = message.loading('正在删除')
    if (!selectedRows) return true
    try {
      await deleteRoleUsingDELETE({
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
   * 分配权限
   */
  async function handleAssignAuth(fields: any, id: number) {
    let numList: number[] = []
    for (const item in fields) {
      numList = numList.concat(fields[item])
    }

    const hide = message.loading('正在分配权限')
    try {
      await assignRoleAuthUsingPOST({
        roleId: id,
        permissionIds: numList.join(',') as any
      })
      hide()
      message.success('分配权限成功！')
      return true
    } catch (error) {
      hide()
      return false
    }
  }

  /**
   * 获取所有权限列表
   */
  async function getAllPermissionList() {
    try {
      const res = await getAllPermissionListUsingGET()
      setAllPermissionList(res.data as any)
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * 获取当前角色所拥有的权限列表
   */
  async function getCurrentPermissionList(roleId: number) {
    try {
      const res = await getCurrentPermissionListByRoleIdUsingGET({
        roleId
      })
      const permissionList = res.data?.map((item: any) => item.permissionId)
      setCurrentPermissionList(permissionList)
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * @zh-CN 国际化配置
   * */
  const columns: ProColumns<API.RoleListItem>[] = [
    {
      title: '角色名称',
      dataIndex: 'name',
      tip: '点击角色名称可查看详情',
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
      title: '排序',
      dataIndex: 'sort',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '描述',
      dataIndex: 'description',
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
        access.canRoleSave ? (
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
        access.canRoleDelete ? (
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
        access.canRoleAssignAuth ? (
          <a
            key="assignAuth"
            onClick={async () => {
              getAllPermissionList()
              if (record.id) {
                getCurrentPermissionList(record.id)
              }
              handleAssignAuthModalOpen(true)
              setCurrentRow(record)
            }}
          >
            分配权限
          </a>
        ) : (
          ''
        )
      ]
    }
  ]
  return (
    <PageContainer>
      <ProTable<API.RoleListItem, API.getUserListUsingGETParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120
        }}
        toolBarRender={() => [
          access.canRoleSave ? (
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
          const msg = await getRoleListUsingGET({
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
          {access.canRoleDelete ? (
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
        onSubmit={async (values: API.RoleListItem) => {
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
        onSubmit={async (values: API.RoleListItem) => {
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
        {currentRow?.name && (
          <ProDescriptions<API.RoleListItem>
            column={1}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {}
            })}
            params={{
              id: currentRow?.name
            }}
            columns={columns as ProDescriptionsItemProps<API.RoleListItem>[]}
          />
        )}
      </Drawer>

      {/* 分配权限 */}
      {allPermissionList.length > 0 && (
        <AssignAuth
          modalOpen={assignAuthModalOpen}
          onRef={assignAuthFormRef}
          onOpenChange={(val) => {
            handleAssignAuthModalOpen(val)
            if (!val) {
              if (assignAuthFormRef.current) {
                assignAuthFormRef.current?.resetFields()
                setCurrentRow(undefined)
              }
            }
          }}
          onSubmit={async () => {
            console.log(assignAuthFormRef.current?.checkedKeys)

            const success = await handleAssignAuth(
              assignAuthFormRef.current?.checkedKeys,
              currentRow?.id as number
            )
            if (success) {
              handleAssignAuthModalOpen(false)
              if (actionRef.current) {
                actionRef.current.reload()
              }
            }
          }}
          permissionList={allPermissionList}
          currentPermissionList={currentPermissionList}
        ></AssignAuth>
      )}
    </PageContainer>
  )
}
export default TableList
