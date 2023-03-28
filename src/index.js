import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { AliveScope } from 'react-activation'
import axios from 'axios';
import plusExtends from './utils/plusExtend';
import back from './utils/back';
React.Component.prototype.$axios = axios
back();
// 将plusExtends方法挂在到react组件实例原型属性上
React.Component.prototype.$plus = plusExtends;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <AliveScope>
      <App />
    </AliveScope>
  </HashRouter>
);
