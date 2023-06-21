import { ModalForm, ProForm, ProFormSelect } from '@ant-design/pro-components'
import { DefaultOptionType } from 'antd/es/select'
import { useEffect, useImperativeHandle } from 'react'

export type AssignRoleProps = {
  onSubmit: (values: API.UserListItem) => Promise<void>
  onOpenChange: (value: boolean) => void
  modalOpen: boolean
  initialValues?: number[]
  onRef: React.MutableRefObject<any>
  allRoleList: DefaultOptionType[]
}

const AssignRole: React.FC<AssignRoleProps> = (props) => {
  const [form] = ProForm.useForm()

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
      form.setFieldsValue({
        roleId: props.initialValues
      })
    }
  }, [props.initialValues])

  return (
    <ModalForm
      title="分配角色"
      width="500px"
      open={props.modalOpen}
      form={form}
      onOpenChange={props.onOpenChange}
      onFinish={props.onSubmit}
      modalProps={{
        forceRender: true
      }}
    >
      <ProFormSelect
        width="lg"
        name="roleId"
        label="角色"
        placeholder={'请选择'}
        rules={[{ required: true, message: '请选择角色' }]}
        fieldProps={{
          options: props.allRoleList,
          mode: 'multiple'
        }}
      />
    </ModalForm>
  )
}

export default AssignRole
