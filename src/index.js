//入口文件
//引入react-dom
//import  ReactDOM  from "react-dom"

import { createRoot } from 'react-dom/client'
//引入App组件
import Router from './router'
import store from './store'
import {Provider} from 'react-redux'


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <Router />
    </Provider>
    
)

//渲染组件
/* ReactDOM.render(
    <Router></Router>,
    document.getElementById('root')
) */