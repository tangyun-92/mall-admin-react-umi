import Footer from '@/components/Footer'
import { loginUsingPOST } from '@/services/ant-design-pro/userManagementAdmin'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { Helmet, history, useModel } from '@umijs/max'
import { message, Tabs } from 'antd'
import React from 'react'
import { flushSync } from 'react-dom'
import Settings from '../../../../config/defaultSettings'
const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState')
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%'
    }
  })
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.()
    const currentUser = userInfo?.info
    const permissionList = userInfo?.permissionList
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser,
          permissionList
        }))
      })
    }
  }
  const handleSubmit = async (values: API.loginUserParams) => {
    try {
      // 登录
      const msg = await loginUsingPOST({
        ...values
      })
      if (msg.success) {
        const defaultLoginSuccessMessage = '登录成功！'
        message.success(defaultLoginSuccessMessage)
        localStorage.setItem('token', msg.data?.token)
        await fetchUserInfo()
        const urlParams = new URL(window.location.href).searchParams
        history.push(urlParams.get('redirect') || '/')
        return
      }
      console.log(msg)
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！'
      console.log(error)
      message.error(defaultLoginFailureMessage)
    }
  }
  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0'
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw'
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Ant Design"
          subTitle={'Ant Design 是西湖区最具影响力的 Web 设计规范'}
          initialValues={{
            autoLogin: true
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.loginUserParams)
          }}
        >
          <Tabs
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录'
              }
            ]}
          />
          {
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />
                }}
                placeholder={'用户名: admin or user'}
                initialValue="super"
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！'
                  }
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />
                }}
                placeholder={'密码: ant.design'}
                initialValue="111111"
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！'
                  }
                ]}
              />
            </>
          }
          <div
            style={{
              marginBottom: 24
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right'
              }}
            >
              忘记密码 ?
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  )
}
export default Login
