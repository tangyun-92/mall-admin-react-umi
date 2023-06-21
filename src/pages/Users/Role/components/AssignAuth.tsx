import { ModalForm, ProForm, ProFormCheckbox } from '@ant-design/pro-components'
import { CheckboxOptionType } from 'antd'
import { useEffect, useImperativeHandle, useState } from 'react'
import styles from './assignAuth.less'

export type AssignAuthProps = {
  onSubmit: (values: API.RoleListItem) => Promise<void>
  onOpenChange: (value: boolean) => void
  modalOpen: boolean
  initialValues?: number[]
  onRef: React.MutableRefObject<any>
  permissionList: API.RoleListItem[]
  currentPermissionList: number[]
}
interface IFilterPermissionList {
  name: string
  label: string
  value: CheckboxOptionType[]
}

const AssignAuth: React.FC<AssignAuthProps> = (props) => {
  const [form] = ProForm.useForm()
  // 过滤后的所有权限列表
  const [filterPermissionList, setFilterPermissionList] = useState<IFilterPermissionList[]>([])

  /**
   * 重置表单
   */
  const resetFields = () => {
    form.resetFields()
  }

  // 暴露一些方法供外部访问
  useImperativeHandle(props.onRef, () => {
    return {
      resetFields
    }
  })

  useEffect(() => {
    if (props.initialValues && props.initialValues.length > 0) {
      const arr: IFilterPermissionList[] = []
      let haveAssignObj: any = {}
      props.permissionList.forEach((item, index) => {
        haveAssignObj['currentPermissionList' + index] = []
        const itemList: any = []
        item.children?.forEach((cItem) => {
          itemList.push({
            label: cItem.name,
            value: cItem.id
          })
          props.currentPermissionList.forEach((per) => {
            if (per === cItem.id) {
              haveAssignObj['currentPermissionList' + index].push(per)
            }
          })
        })
        arr.push({
          name: 'currentPermissionList' + index,
          label: item.name,
          value: itemList
        })
      })
      setFilterPermissionList(arr)

      // 已分配权限回显
      form.setFieldsValue(haveAssignObj)
    }
  }, [props.initialValues])

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
      {filterPermissionList.map((item, index) =>
        item.value.length > 0 ? (
          <ProFormCheckbox.Group
            key={item.name}
            name={item.name}
            label={item.label}
            options={item.value}
          />
        ) : null
      )}
    </ModalForm>
  )
}

export default AssignAuth
