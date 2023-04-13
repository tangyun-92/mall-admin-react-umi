import { uploadUsingPOST } from '@/services/ant-design-pro/commonApi'
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  useDeepCompareEffect
} from '@ant-design/pro-components'
import { message, UploadFile } from 'antd'
import { useImperativeHandle, useState } from 'react'
import { showStatusEnum } from '..'

export type FormProps = {
  onSubmit: (values: API.UserListItem) => Promise<void>
  onOpenChange: (value: boolean) => void
  modalOpen: boolean
  initialValues?: Partial<API.UserListItem>
  modalTitle: string
  onRef: React.MutableRefObject<any>
}

const MyForm: React.FC<FormProps> = (props) => {
  const [form] = ProForm.useForm()
  // icon
  const [iconFileList, setIconFileList] = useState<UploadFile[]>([])
  const [icon, setIcon] = useState<string>('')

  /**
   * 重置表单
   */
  const resetFields = () => {
    setIconFileList([])
    form.resetFields()
  }

  // 暴露一些方法供外部访问
  useImperativeHandle(props.onRef, () => {
    return {
      resetFields,
      icon
    }
  })

  // 深度监听，如果初始值变化了，就重新设置表单值
  useDeepCompareEffect(() => {
    if (props.initialValues) {
      form.setFieldsValue(props.initialValues)
      if (props.initialValues?.icon) {
        setIconFileList([
          {
            uid: '',
            name: '',
            status: 'done',
            url: props.initialValues?.icon
          }
        ])
        setIcon(props.initialValues?.icon)
      }
    }
  }, [props.initialValues])

  /**
   * 上传icon
   * @param option
   */
  const uploadLogoFile = async (option: any) => {
    const { file } = option
    const res = await uploadUsingPOST({}, file)
    if (res.data) {
      setIconFileList([
        {
          uid: '',
          name: '',
          status: 'done',
          url: res.data as any
        }
      ])
      setIcon(res.data as any)
    }
  }

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
          name="username"
          label="用户名"
          placeholder={'请输入'}
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '必填项'
            }
          ]}
          width="md"
          name="nickName"
          label="昵称"
          placeholder={'请输入'}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="email" label="邮箱" placeholder={'请输入'} />
        <ProFormSelect
          width="md"
          name="status"
          label="状态"
          placeholder={'请选择'}
          valueEnum={showStatusEnum}
        />
      </ProForm.Group>
      <ProFormTextArea name="note" label="备注" placeholder={'请输入'} />
      <ProForm.Group>
        <ProFormUploadButton
          extra="支持扩展名：.png .jpg .jpeg"
          label="用户头像"
          title="上传图片"
          listType="picture-card"
          fieldProps={{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            customRequest: uploadLogoFile,
            fileList: iconFileList,
            maxCount: 1,
            onRemove: () => {
              setIconFileList([])
              setIcon('')
            },
            accept: 'image/png,image/jpeg,image/jpg',
            beforeUpload: (file: any) => {
              const isJpgOrPng =
                file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
              if (!isJpgOrPng) {
                message.error('只能上传JPG/PNG/JPEG格式的图片!')
              }
              return isJpgOrPng
            }
          }}
        />
      </ProForm.Group>
    </ModalForm>
  )
}

export default MyForm
