import { Form, Select } from 'antd'

export type AssignRoleProps = {
  onSubmit: (values: API.UserListItem) => Promise<void>
  onOpenChange: (value: boolean) => void
  modalOpen: boolean
  initialValues?: number[]
  onRef: React.MutableRefObject<any>
}

const AssignRoles: React.FC<AssignRoleProps> = (props) => {
  const [form] = Form.useForm()

  console.log(props.initialValues)

  return (
    <Form form={form}>
      <Select
        mode="multiple"
        defaultValue={props.initialValues}
        options={[
          { label: '商品管理员', value: 1 },
          { label: '订单管理员', value: 2 },
          { label: '超级管理员', value: 5 }
        ]}
      ></Select>
    </Form>
  )
}

export default AssignRoles
