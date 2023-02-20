import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { AliveScope } from 'react-activation'
import axios from 'axios';
React.Component.prototype.$axios = axios

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <AliveScope>
      <App />
    </AliveScope>
  </HashRouter>
);
