import { ModalForm, ProForm, ProFormSelect, useDeepCompareEffect } from '@ant-design/pro-components'
import { useImperativeHandle } from 'react'

export type AssignRoleProps = {
  onSubmit: (values: API.UserListItem) => Promise<void>
  onOpenChange: (value: boolean) => void
  modalOpen: boolean
  initialValues?: Partial<API.UserListItem>
  onRef: React.MutableRefObject<any>
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

  useDeepCompareEffect(() => {
    if (props.initialValues) {
      form.setFieldsValue(props.initialValues)
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
        initialValue={props.initialValues}
        fieldProps={{
          options: [
            { label: '商品管理员', value: 1 },
            { label: '订单管理员', value: 2 },
            { label: '超级管理员', value: 5 }
          ],
          mode: 'multiple'
        }}
      />
    </ModalForm>
  )
}

export default AssignRole
