import React, { useEffect } from 'react'
import './less/ListTable.less'
import { Space, Table, Button,message } from 'antd';
//引入过滤时间的依赖,改变时间的格式
import moment from 'moment';
import { useState } from 'react';

//引入封装好的API请求
import { ArticleListApi,ArticleDelApi } from '../request/api'
import { useNavigate } from 'react-router-dom';


//标题组件
function MyTitle(props) {
  return (
    <div>                           {/* target='_blank'  a标签的一个属性,可以新窗口打开 */}
      <a href={'http://codesohigh.com:8765/article/' + props.id} target='_blank' className='table_title'>{props.title}</a>
      <p style={{ color: "#999" }}>{props.subTitle}</p>
    </div>)

}

export default function ListTable() {
  const navigate = useNavigate();
  //分页
  const [pagination,setPagination] = useState({current:1,pageSize:10,total:10})
//提取请求的代码
  const getArticleList =(current,pageSize) =>{
    ArticleListApi({
      //页数
      num:current,
      //每页的数量
      count:pageSize
    }).then(res => {
      //console.log(res.data);
      if (res.errCode === 0) {
        console.log(res.data);
        //更改setPagination
        let {num,count,total} =res.data;
        setPagination({
          current:num,
          pageSize:count,
          total
        })
        //使用深拷贝原数组,对新数组操作
        let newArr = JSON.parse(JSON.stringify(res.data.arr))
        //声明一个空数组
        let myArr = []
        /* 
              1.要给每个数组项加key,让key=id
              2.需要有一套标签结构,赋予一个属性
        */
        //给深拷贝的新数组添加key值,以及添加模板字符串
        newArr.map(item => {
          let obj = {
            key: item.id,
            date: moment(item.date).format('YYYY-MM-DD hh:mm:ss'),
            //给标题写一个组件,通过父传子的方式传title和subTitle
            myTitle: <MyTitle id={item.id} title={item.title} subTitle={item.subTitle} />
          }

          myArr.push(obj)
          //console.log(myArr);
        })
        //console.log(newArr);
        setArr(myArr)
      }
    })
  }
//列表数组
  const [arr, setArr] = useState([
    //真正从后端拿到的数据要替换这个data数据
    /* {
      key: '1',
      name: 'John Brown',
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    } */
  ])

  //删除
  const delFn =(id) =>{
    //console.log(id);
    ArticleDelApi({id}).then(res=>{
      //console.log(res);
      if(res.errCode===0){
        message.success(res.message)
        //重新刷页面,要么重新请求这个列表的数据
        getArticleList(1,pagination.pageSize)
      }
    })
  }

  //请求文章列表使用生命周期(mounted)
  useEffect(() => {
    getArticleList(pagination.current,pagination.pageSize)
  }, [])

  //分页的函数
  const pageChange =(arg) =>{
    //console.log(arg);
    getArticleList(arg.current,arg.pageSize)
  }

  //列表数据
  const columns = [
    {
      dataIndex: 'myTitle',
      key: 'myTitle',
      width: "60%",
      render: text => <div>{text}</div>
      //<button onClick={()=>{console.log(text);}}>111</button>
    },
    {
      dataIndex: 'date',
      key: 'date',
      render: text => <p>{text}</p>
      //<button onClick={()=>{console.log(text);}}>111</button>
    },
    {
      key: 'action',
      render: text => {
        return (        
          <Space size="middle">         {/* text.key 就是id */}
            <Button type='primary' onClick={()=>navigate('/edit/'+text.key)}>编辑</Button>
            <Button type='danger' onClick={()=>delFn(text.key)}>删除</Button>
          </Space>
        )
      }
    },
  ];


  return (
    <div className='list_table'>
      {/* columns列   dataSource数据 */}
      <Table 
      showHeader={false} 
      columns={columns} 
      dataSource={arr} 
      onChange={pageChange}
      pagination={pagination}/>
    </div>
  )
}








