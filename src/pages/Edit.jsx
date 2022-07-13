import React, { useEffect, useState } from 'react'
import { ArticleAddApi, ArticleSearchApi } from '../request/api'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ArticleUpdateApi } from '../request/api'

import { Button, PageHeader, Modal, Form, Input, message } from 'antd';
import moment from 'moment';
import E from "wangeditor"

let editor = null
export default function Edit() {

  const [content, setContent] = useState('')
  const location = useLocation()
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [form] = Form.useForm();
  const params = useParams()
  const navigate = useNavigate()
  //点击弹出对话框
  const [isModalVisible, setIsModalVisible] = useState(false);
  //
  const dealData = (errCode,msg) => {
    if (errCode === 0) {
      //成功的提示框
      message.success(msg)
      //跳回list页面
      setTimeout(() => {
        navigate('/listlist')
      }, 2000)
    } else {
      //失败的提示框
      message.error(msg)
    }
    setIsModalVisible(false);   //关闭对话框
  }
  //弹出对话框
  const showModal = () => {
    setIsModalVisible(true);
  };

  //对话框点击了提交
  const handleOk = () => {

    form
      .validateFields()   //validate效验   field字段
      .then((values) => {
        //form.resetFields(); //reset重置
        //console.log('Received values of form: ', values);
        let { title, subTitle } = values;
        //console.log(content);

        //地址栏有id代表现在想要更新一篇文章
        if (params.id) {
          //更新文章的请求
          ArticleUpdateApi({ title, subTitle, content, id: params.id }).then(res => {
            dealData(res.errCode,res.message)
          })
        } else {
          //添加文章的请求
          ArticleAddApi({
            title, subTitle, content
          }).then(res => {
            dealData(res.errCode,res.message)
          })
        }



      })
      .catch(() => {
        return
      });

    //对话框的事件(用来接收表单的值)
    /* const onCreate = (values) => {
      setVisible(false);
    }; */
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //模拟componentDidMount
  useEffect(() => {
    //实例化
    editor = new E("#div1")

    editor.config.onchange = (newHtml) => {
      setContent(newHtml)
    }
    editor.create()

    //根据地址栏id做请求
    if (params.id) {
      ArticleSearchApi({ id: params.id }).then(res => {
        //console.log(res);
        if (res.errCode === 0) {
          editor.txt.html(res.data.content) //重新设置编辑器内容
          setTitle(res.data.title)
          setSubTitle(res.data.subTitle)
        }
      })
    }
    //销毁
    return () => {
      //组件销毁时销毁编辑器 注:class 写法需要在componentWillUnmount中调用
      editor.destroy()
    }
  }, [location.pathname])




  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={params.id ? () => window.history.back() : null}
        title="文章编辑"
        subTitle={'当前日期:' + moment(new Date()).format('YYYY-MM-DD')}
        extra={<Button key="1" type="primary" onClick={showModal}>提交文章</Button>}
      >
      </PageHeader>
      <Modal zIndex={99999}
        title="填写文章标题"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='提交'
        cancelText='取消'>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          autoComplete="off"
          initialValues={{ title: title, subTitle: subTitle }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请填写标题' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="副标题"
            name="subTitle"
          >
            <Input />
          </Form.Item>


        </Form>
      </Modal>
      <div id='div1' style={{ padding: '0 20px 20px', background: '#fff' }}></div>
    </div>
  )
}
