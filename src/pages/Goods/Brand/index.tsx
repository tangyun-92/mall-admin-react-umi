// import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import {
  addBrandUsingPOST,
  deleteBrandUsingPOST,
  getBrandListUsingGET,
  updateBrandUsingPOST
} from '@/services/ant-design-pro/brandManagementAdmin'
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
import React, { useRef, useState } from 'react'
import MyForm from './components/MyForm'

// 是否品牌制造商枚举
export const factoryStatusEnum = {
  '1': {
    text: '是',
    status: 'Success'
  },
  '0': {
    text: '不是',
    status: 'Default'
  }
}
export const showStatusEnum = {
  '1': {
    text: '显示',
    status: 'Success'
  },
  '0': {
    text: '不显示',
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
  const [currentRow, setCurrentRow] = useState<API.BrandListItem>()
  // 选中的行
  const [selectedRowsState, setSelectedRows] = useState<API.BrandListItem[]>([])

  /**
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.BrandListItem) => {
    const hide = message.loading('正在添加')
    try {
      await addBrandUsingPOST({ ...fields, logo: createFormRef.current.logo })
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
  const handleUpdate = async (fields: API.BrandListItem, id: number) => {
    const hide = message.loading('Configuring')
    try {
      await updateBrandUsingPOST({ ...fields, id, logo: updateFormRef.current.logo })
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
  const handleRemove = async (selectedRows: API.BrandListItem[]) => {
    const hide = message.loading('正在删除')
    if (!selectedRows) return true
    try {
      await deleteBrandUsingPOST({
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
   * @zh-CN 国际化配置
   * */
  const columns: ProColumns<API.BrandListItem>[] = [
    {
      title: '品牌名称',
      dataIndex: 'name',
      tip: '点击品牌名称可查看详情',
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
      title: '首字母',
      dataIndex: 'firstLetter',
      hideInSearch: true
    },
    {
      title: '品牌制造商',
      dataIndex: 'factoryStatus',
      valueType: 'select',
      valueEnum: factoryStatusEnum
    },
    {
      title: '排序',
      dataIndex: 'sort',
      hideInSearch: true
    },
    {
      title: '产品数量',
      dataIndex: 'productCount',
      hideInSearch: true,
      valueType: 'digit'
    },
    {
      title: '产品评论数量',
      dataIndex: 'productCommentCount',
      hideInSearch: true,
      valueType: 'digit'
    },
    {
      title: '品牌logo',
      dataIndex: 'logo',
      hideInSearch: true,
      valueType: 'image'
    },
    {
      title: '专区大图',
      dataIndex: 'bigPic',
      hideInSearch: true,
      valueType: 'image'
    },
    {
      title: '品牌故事',
      dataIndex: 'brandStory',
      hideInSearch: true,
      hideInTable: true,
      valueType: 'textarea'
    },
    {
      title: '显示状态',
      dataIndex: 'showStatus',
      hideInSearch: true,
      valueType: 'select',
      valueEnum: showStatusEnum
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInDescriptions: true,
      render: (_, record) => [
        access.canBrandUpdate ? (
          <a
            key="config"
            onClick={() => {
              handleUpdateModalOpen(true)
              setCurrentRow(record)
              setModalTitle('编辑品牌')
            }}
          >
            编辑
          </a>
        ) : (
          ''
        ),
        access.canBrandDelete ? (
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
        )
      ]
    }
  ]
  return (
    <PageContainer>
      <ProTable<API.BrandListItem, API.getBrandListUsingGETParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120
        }}
        toolBarRender={() => [
          access.canBrandCreate ? (
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalOpen(true)
                setModalTitle('新增品牌')
              }}
            >
              <PlusOutlined /> 新建
            </Button>
          ) : (
            ''
          )
        ]}
        request={async (params: { pageSize?: number; current?: number }) => {
          const msg = await getBrandListUsingGET({
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
          {access.canBrandDelete ? (
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
        onSubmit={async (values: API.BrandListItem) => {
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
        onSubmit={async (values: API.BrandListItem) => {
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
          <ProDescriptions<API.BrandListItem>
            column={1}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {}
            })}
            params={{
              id: currentRow?.name
            }}
            columns={columns as ProDescriptionsItemProps<API.BrandListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  )
}
export default TableList
