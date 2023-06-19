import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  useDeepCompareEffect
} from '@ant-design/pro-components'
import { useImperativeHandle } from 'react'

export type FormProps = {
  onSubmit: (values: API.RoleListItem) => Promise<void>
  onOpenChange: (value: boolean) => void
  modalOpen: boolean
  initialValues?: Partial<API.RoleListItem>
  modalTitle: string
  onRef: React.MutableRefObject<any>
}

const MyForm: React.FC<FormProps> = (props) => {
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

  // 深度监听，如果初始值变化了，就重新设置表单值
  useDeepCompareEffect(() => {
    if (props.initialValues) {
      form.setFieldsValue(props.initialValues)
    }
  }, [props.initialValues])

  return (
    <ModalForm
      title={props.modalTitle}
      width="740px"
      open={props.modalOpen}
      form={form}
      onOpenChange={props.onOpenChange}
      onFinish={props.onSubmit}
      modalProps={{
        forceRender: true
      }}
    >
      <ProForm.Group>
        <ProFormText
          rules={[
            {
              required: true,
              message: '必填项'
            }
          ]}
          width="md"
          name="name"
          label="角色名称"
          placeholder={'请输入'}
        />
        <ProFormSelect
          width="md"
          name="status"
          label="状态"
          placeholder={'请选择'}
          initialValue={props.initialValues?.status}
          fieldProps={{
            options: [
              { label: '禁用', value: 0 },
              { label: '启用', value: 1 }
            ]
          }}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="sort" label="排序" placeholder={'请输入'} />
      </ProForm.Group>
      <ProFormTextArea name="description" label="描述" placeholder={'请输入'} />
    </ModalForm>
  )
}

export default MyForm
