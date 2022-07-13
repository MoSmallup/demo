import React, { useEffect,useState } from 'react'

//引入路由
import { useNavigate,useLocation } from 'react-router-dom';


import {  ReadOutlined,EditOutlined,DatabaseOutlined } from '@ant-design/icons';
import { Menu } from 'antd';



  
  
  
  
export default function Aside() {
    const navigate = useNavigate()
    const location = useLocation()
    const [defaultKey,setDefaultKey] = useState('')

    //一般加个空数组就是为了模仿componentDidMounted
    useEffect(()=>{
        let path = location.pathname;
        let key = path.split('/')[1];
        setDefaultKey(key)
    },[location.pathname])
    function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
      }

    const items = [
        getItem('查看文章列表List', 'listList', <ReadOutlined />),
        getItem('查看文章列表Table', 'listTable', <ReadOutlined />),
        getItem('文章编辑', 'edit', <EditOutlined />),
        getItem('修改资料', 'means', <DatabaseOutlined />),
      ];


        const onClick = (e) => {
            //实现路由跳转
          navigate('/'+e.key)
          setDefaultKey(e.key)
        };
    return(
        <Menu
      onClick={onClick}
      style={{
        width: 190,
      }} 
      selectedKeys={[defaultKey]}
      //defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
      theme="dark"
      className='aside'
    />
    )
}
