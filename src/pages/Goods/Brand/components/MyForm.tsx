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
import { factoryStatusEnum, showStatusEnum } from '..'

export type FormProps = {
  onSubmit: (values: API.BrandListItem) => Promise<void>
  onOpenChange: (value: boolean) => void
  modalOpen: boolean
  initialValues?: Partial<API.BrandListItem>
  modalTitle: string
  onRef: React.MutableRefObject<any>
}

const MyForm: React.FC<FormProps> = (props) => {
  const [form] = ProForm.useForm()
  // logo
  const [logoFileList, setLogoFileList] = useState<UploadFile[]>([])
  const [logo, setLogo] = useState<string>('')
  // 专区大图
  const [bigPicFileList, setBigPicFileList] = useState<UploadFile[]>([])
  const [bigPic, setBigPic] = useState<string>('')

  /**
   * 重置表单
   */
  const resetFields = () => {
    setLogoFileList([])
    setBigPicFileList([])
    form.resetFields()
  }

  // 暴露一些方法供外部访问
  useImperativeHandle(props.onRef, () => {
    return {
      resetFields,
      logo,
      bigPic
    }
  })

  // 深度监听，如果初始值变化了，就重新设置表单值
  useDeepCompareEffect(() => {
    if (props.initialValues) {
      form.setFieldsValue(props.initialValues)
      if (props.initialValues?.logo) {
        setLogoFileList([
          {
            uid: '',
            name: '',
            status: 'done',
            url: props.initialValues?.logo
          }
        ])
        setLogo(props.initialValues?.logo)
      }
      if (props.initialValues?.bigPic) {
        setBigPicFileList([
          {
            uid: '',
            name: '',
            status: 'done',
            url: props.initialValues?.bigPic
          }
        ])
        setBigPic(props.initialValues?.bigPic)
      }
    }
  }, [props.initialValues])

  /**
   * 上传logo
   * @param option
   */
  const uploadLogoFile = async (option: any) => {
    const { file } = option
    const res = await uploadUsingPOST({}, file)
    if (res.data) {
      setLogoFileList([
        {
          uid: '',
          name: '',
          status: 'done',
          url: res.data as any
        }
      ])
      setLogo(res.data as any)
    }
  }

  /**
   * 上传专区大图
   * @param option
   */
  async function uploadBigPicFile(option: any) {
    const { file } = option
    const res = await uploadUsingPOST({}, file)
    if (res.data) {
      setBigPicFileList([
        {
          uid: '',
          name: '',
          status: 'done',
          url: res.data as any
        }
      ])
      setBigPic(res.data as any)
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
          name="name"
          label="品牌名称"
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
          name="firstLetter"
          label="品牌首字母"
          placeholder={'请输入'}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          rules={[
            {
              required: true,
              message: '必填项'
            }
          ]}
          width="md"
          name="factoryStatus"
          label="是否品牌制造商"
          placeholder={'请选择'}
          valueEnum={factoryStatusEnum}
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '必填项'
            }
          ]}
          width="md"
          name="sort"
          label="排序"
          placeholder={'请输入'}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="productCount" label="产品数量" placeholder={'请输入'} />
        <ProFormSelect
          width="md"
          name="showStatus"
          label="显示状态"
          placeholder={'请选择'}
          valueEnum={showStatusEnum}
        />
      </ProForm.Group>
      <ProFormTextArea name="brandStory" label="品牌故事" placeholder={'请输入'} />
      <ProForm.Group>
        <ProFormUploadButton
          extra="支持扩展名：.png .jpg .jpeg"
          label="品牌logo"
          title="上传图片"
          listType="picture-card"
          fieldProps={{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            customRequest: uploadLogoFile,
            fileList: logoFileList,
            maxCount: 1,
            onRemove: () => {
              setLogoFileList([])
              setLogo('')
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
        <ProFormUploadButton
          extra="支持扩展名：.png .jpg .jpeg"
          label="专区大图"
          title="上传图片"
          listType="picture-card"
          fieldProps={{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            customRequest: uploadBigPicFile,
            fileList: bigPicFileList,
            maxCount: 1,
            onRemove: () => {
              setBigPicFileList([])
              setBigPic('')
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
