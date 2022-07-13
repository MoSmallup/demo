/* 
    App> List + Edit + Means
    Login
    Register
    History模式  --BrowserRouter
    Hash模式     --HashRouter
*/

import App from '../App'
import ListList from '../pages/ListList'
import ListTable from '../pages/ListTable'
import Edit from '../pages/Edit'
import Means from '../pages/Means'
import Login from '../pages/Login'
import Register from '../pages/Register'


import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'


//定义一个路由组件
const BaseRouter = () =>(
    <Router>
        <Routes>
            <Route path='/' element={<App></App>}>
                {/* 嵌套路由 */}
            <Route path='/listTable' element={<ListTable></ListTable>}></Route>
            <Route path='/listList' element={<ListList></ListList>}></Route>
            <Route path='/edit' element={<Edit></Edit>}></Route>
            <Route path='/edit/:id' element={<Edit></Edit>}></Route>
            <Route path='/means' element={<Means></Means>}></Route>
            </Route>


            <Route path='/login' element={<Login></Login>}></Route>


            <Route path='/register' element={<Register></Register>}></Route>
        </Routes>
    </Router>
)

//导出路由
export default BaseRouter
