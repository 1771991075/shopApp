import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { AliveScope } from 'react-activation'
import axios from 'axios';
import plusExtend from './utils/plusExtend';
import back from './utils/back';
React.Component.prototype.$axios = axios
back();
// 将plusExtend方法挂在到react组件实例原型属性上
React.Component.prototype.$plus = plusExtend;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <AliveScope>
      <App />
    </AliveScope>
  </HashRouter>
);
