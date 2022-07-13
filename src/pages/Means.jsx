import React, { useEffect, useState } from 'react'
import './less/Means.less'
import { Button, Form, Input, message,Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { GetUserDataApi, ChangeUserApi } from '../request/api'
import { connect } from 'react-redux';


//将图片路径转base64
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

//限制图片大小只能是200KB
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = file.size / 1024 / 1024 / 1024 < 200;

  if (!isLt2M) {
    message.error('请上传小于200KB的图!');
  }

  return isJpgOrPng && isLt2M;
};




function Means(props) {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  //const [username1, setUsername1] = useState('')
  //const [password1, setPassword1] = useState('')


  //请求数据
  useEffect(() => {
    GetUserDataApi().then(res => {
      console.log(res);
      if (res.errCode === 0) {
        message.success(res.message)
        /*  //出不来的根本原因在于setXXX()是异步的
         setUsername1(res.data.username)
         setPassword1(res.data.password) */
        //存到sessionStorage
        sessionStorage.setItem('username', res.data.username)
      }
    })
  }, [])

  //表单提交的事件
  const onFinish = (values) => {
    console.log(values);
    //如果表单的username有值,并且不等于初始化时拿到的username,同时密码非空
    if (values.username && values.username !== sessionStorage.getItem('username')
      && values.password.trim() !== '') {
      //做表单的提交
      ChangeUserApi({
        username: values.username,
        Password: values.password
      }).then(res => {
        console.log(res);
        //当你修改成功的时候,不要忘了重新登录
      })
    }
  }


  //点击了上传图片
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        //存储图片名称
        localStorage.setItem('avatar',info.file.response.data.filePath)
        //触发Header组件更新
        //props.setMyKey(props.myKey+1)
        //window.location.reload()  //强制页面刷新
        //使用react-redux
        props.addKey()
      });
    }
  };
//上传按钮
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <div className='means'>
      <Form
        name="basic"
        style={{ width: '400px' }}

        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="修改用户名:"
          name="username"
        >
          <Input placeholder='请输入新用户名' />
        </Form.Item>

        <Form.Item
          label="修 改 密 码:"
          name="password"
        >
          <Input.Password placeholder='请输入新密码' />
        </Form.Item>


        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
            提交
          </Button>
        </Form.Item>
      </Form>
      <p>点击下方修改头像</p>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        headers={{"cms-token":localStorage.getItem('cms-token')}}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  )
}

const mapDispatchToProps = (dispatch) =>{
  return {
    addKey(){
      const action = {type:'addKeyFn'}
      dispatch(action)
    }
  }
}

export default connect(null,mapDispatchToProps)(Means)