import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import './less/Login.less'
import loginImg from '../assets/login.png'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
//引入RegisterApi文件进行解析
import { RegisterApi } from '../request/api'

export default function Register() {

  const navigate = useNavigate()
  const onFinish = (values) => {
    //console.log('Success:', values);
    RegisterApi({
      username: values.username,
      password: values.password
    }).then(res => {
      //console.log(res);
      if (res.errCode === 0) {
        message.success(res.message);
        setTimeout(() => {
          navigate('/login')
        }, 2000);
      } else {
        message.error(res.message);
      }
    })
  };
  //失败,一般什么都不用做
  /* const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }; */
  return (
    <div className="login">
      <div className='login_box'>
        <img src={loginImg} alt="" />
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          //失败
          //onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input size='large' prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input.Password size='large' prefix={<LockOutlined />} placeholder="请输入密码" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请再次确认密码',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('请输入相同密码!'));
                },
              }),
            ]}
          >
            <Input.Password size='large' prefix={<LockOutlined />} placeholder="请再次确认密码" />
          </Form.Item>

          <Form.Item>
            <Link to='/login'>已有账号?前往登录</Link>
          </Form.Item>

          <Form.Item>
            <Button size='large' type="primary" htmlType="submit" block>注册</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
