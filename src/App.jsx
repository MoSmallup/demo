import React, {useState}from 'react'
//import { Button } from 'antd'
import './assets/base.less'

//引入子路由
import { Outlet } from 'react-router-dom'
//引入组件
import Header from './components/Header';
import Aside from './components/Aside'
import Bread from './components/Bread';

//引入ui插件
import { Layout } from 'antd';

function APP() {
  return (
    <Layout id='app'>
      <Header ></Header>

      <div className='container'>
        {/* 左侧导航栏 */}
        <Aside></Aside>

        <div className='container_box'>
          <Bread></Bread>
          {/* 使用子路由 */}
          <div className="container_content">
          <Outlet ></Outlet>
          </div>
          

        </div>
      </div>


      <footer>
        Respect | Copyright &copy;
        2022  Author 你单排吧
      </footer>
    </Layout>


  )
}



export default APP
