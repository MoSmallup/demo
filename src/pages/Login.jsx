import React from 'react'
import { Button, Form, Input, message} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import './less/Login.less'
import loginImg from '../assets/login.png'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginApi } from '../request/api'

export default function Login() {
  const navigate =useNavigate()
  const onFinish = (values) => {
    //console.log('Success:', values);
    LoginApi({
      username:values.username,
      password:values.password
    }
    ).then(res=>{
        //console.log(res);
      if(res.errCode===0){
        //成功的提示框
        message.success(res.message)
        //存储数据
        localStorage.setItem('avatar',res.data.avatar)
        //特别注意存储token需要加中括号
        localStorage.setItem('cms-token',res.data['cms-token'])
        localStorage.setItem('editable',res.data.editable)
        localStorage.setItem('player',res.data.player)
        localStorage.setItem('username',res.data.username)
        //跳转根路径
        setTimeout(()=>{
          navigate('/')
        },2000)
        
      }else{
        message.error(res.message)
      }
    })
  };
  //失败
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
            <Input size='large' prefix={<UserOutlined/>} placeholder="请输入用户名"/>
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
            <Input.Password size='large' prefix={<LockOutlined/>} placeholder="请输入密码"/>
          </Form.Item>

          <Form.Item>
          <Link to='/register'>还没账号?立即注册</Link>
          </Form.Item>

          <Form.Item>
            <Button size='large' type="primary" htmlType="submit" block>登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
