import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Css/components/loading.css'
import './Css/components/button.css'
import './Css/components/alerts.css'
import './Css/components/google.css'
import './Pages/Auth/Auth.css'
import './Components/Dashboard/Bars.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Menucontext from './Context/Menucontext';
import Windowcontext from './Context/Windowcontext';
import 'react-loading-skeleton/dist/skeleton.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Windowcontext>
    <Menucontext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
   </Menucontext>
   </Windowcontext>
  </React.StrictMode>
);


reportWebVitals();
