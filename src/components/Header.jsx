import React,{useEffect, useState} from 'react'
//引入login图片
import loginImg from '../assets/login.png'
//引入默认头像
import defaultAvatar from '../assets/moren.jpeg'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

//引入组件
import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, message} from 'antd';
function Header(props) {
    const navigate = useNavigate()
    const [avatar,setAvatar] = useState(defaultAvatar)
    const [username,setUsername] = useState("游客")

    //模拟componentDidMount
    //在加载完成生命周期里面动态改变头像
    useEffect(()=>{
        let username1 = localStorage.getItem('username')
        let avatar1 = localStorage.getItem('avatar')
        //动态改变用户名
        if(username1){
            setUsername(username1)
        }
        //动态改变用户头像
        if(avatar1){
            setAvatar('http://47.93.114.103:6688/'+avatar1)
        }
    },[props.myKey])

    //退出登录
    const logout=()=>{
        localStorage.clear();  //清楚localStorage里面的数据
        message.success('退出成功,即将返回登录页')
        setTimeout(()=>{
            navigate('/login')
        },2000)
    }

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                            修改资料
                        </a>
                    ),
                },
                {
                    type: 'divider',
                },
                {
                    key: '2',
                    label: (
                        <a onClick={logout}>
                            退出登录
                        </a>
                    ),
                },
            ]}
        />
    );

    return (
        <header>
            <img src={loginImg} alt="" className='logo' />
            <div className='right'>
                <Dropdown overlay={menu}>
                    <a onClick={(e) => e.preventDefault()} className='a'>
                        <Space>
                            <img src={avatar} alt="" className='avatar'/>
                            <span>{username}</span>
                            <CaretDownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}

const mapStateToProps = (state) =>{
    return{
      myKey:state.myKey
    }
  }

export default connect(mapStateToProps)(Header)