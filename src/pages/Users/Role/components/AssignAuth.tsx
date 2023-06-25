import { ModalForm, ProForm } from '@ant-design/pro-components'
import { Tree } from 'antd'
import type { DataNode } from 'antd/es/tree'
import React, { useEffect, useImperativeHandle, useState } from 'react'
import styles from './assignAuth.less'

export type AssignAuthProps = {
  onSubmit: (values: API.RoleListItem) => Promise<void>
  onOpenChange: (value: boolean) => void
  modalOpen: boolean
  onRef: React.MutableRefObject<any>
  permissionList: DataNode[]
  currentPermissionList: number[]
}

const AssignAuth: React.FC<AssignAuthProps> = (props) => {
  const [form] = ProForm.useForm()

  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])

  /**
   * 重置表单
   */
  const resetFields = () => {
    form.resetFields()
  }

  // 暴露一些方法供外部访问
  useImperativeHandle(props.onRef, () => {
    return {
      resetFields,
      checkedKeys
    }
  })

  function onSelect(selectedKeysValue: React.Key[]) {
    setSelectedKeys(selectedKeysValue)
  }

  function onCheck(checkedKeysValue: React.Key[]) {
    setCheckedKeys(checkedKeysValue)
  }

  useEffect(() => {
    if (props.permissionList && props.permissionList.length > 0) {
      // 已分配角色回显
      setCheckedKeys(props.currentPermissionList)
    }
  }, [props.permissionList])

  return (
    <ModalForm
      title="分配权限"
      width="800px"
      open={props.modalOpen}
      form={form}
      onOpenChange={props.onOpenChange}
      onFinish={props.onSubmit}
      modalProps={{
        forceRender: true
      }}
      className={styles.assignRole}
    >
      {props.permissionList.length > 0 && (
        <Tree
          checkable
          treeData={props.permissionList}
          fieldNames={{
            title: 'name',
            key: 'id',
            children: 'children'
          }}
          onCheck={onCheck as any}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          defaultExpandAll={true}
        />
      )}
    </ModalForm>
  )
}

export default AssignAuth
