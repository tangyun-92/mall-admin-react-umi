import { uploadUsingPOST } from '@/services/ant-design-pro/commonApi';
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  useDeepCompareEffect,
} from '@ant-design/pro-components';
import { UploadFile } from 'antd';
import { useImperativeHandle, useState } from 'react';
import { factoryStatusEnum, showStatusEnum } from '..';

export type FormProps = {
  onSubmit: (values: API.BrandListItem) => Promise<void>;
  onOpenChange: (value: boolean) => void;
  modalOpen: boolean;
  initialValues?: Partial<API.BrandListItem>;
  modalTitle: string;
  onRef: React.MutableRefObject<any>;
};

const MyForm: React.FC<FormProps> = (props) => {
  const [form] = ProForm.useForm();
  const [logoFileList, setLogoFileList] = useState<UploadFile[]>([]);
  const [logo, setLogo] = useState<string>('');

  /**
   * 重置表单
   */
  const resetFields = () => {
    form.resetFields();
  };

  // 暴露一些方法供外部访问
  useImperativeHandle(props.onRef, () => {
    return {
      resetFields,
      logo,
    };
  });

  // 深度监听，如果初始值变化了，就重新设置表单值
  useDeepCompareEffect(() => {
    if (props.initialValues) {
      form.setFieldsValue(props.initialValues);
      if (props.initialValues?.logo) {
        setLogoFileList([
          {
            uid: '',
            name: '',
            status: 'done',
            url: props.initialValues?.logo,
          },
        ]);
      }
    }
  }, [props.initialValues]);

  /**
   * 上传logo
   * @param option
   */
  const uploadLogoFile = async (option: any) => {
    const { file } = option;
    const res = await uploadUsingPOST({}, file);
    if (res.data) {
      setLogoFileList([
        {
          uid: '',
          name: '',
          status: 'done',
          url: res.data as any,
        },
      ]);
      setLogo(res.data as any);
    }
  };

  return (
    <ModalForm
      title={props.modalTitle}
      width="740px"
      open={props.modalOpen}
      form={form}
      onOpenChange={props.onOpenChange}
      onFinish={props.onSubmit}
      modalProps={{
        forceRender: true,
      }}
    >
      <ProForm.Group>
        <ProFormText
          rules={[
            {
              required: true,
              message: '必填项',
            },
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
              message: '必填项',
            },
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
              message: '必填项',
            },
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
              message: '必填项',
            },
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
          extra="支持扩展名：.png"
          label="品牌logo"
          name="file"
          title="上传图片"
          listType="picture-card"
          fieldProps={{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            customRequest: uploadLogoFile,
            fileList: logoFileList,
            maxCount: 1,
            onRemove: () => {
              setLogoFileList([]);
              setLogo('');
            },
          }}
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default MyForm;
