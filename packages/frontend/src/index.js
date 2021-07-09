import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './app';
import PlanInformation from "./plan-information";
import reportWebVitals from './reportWebVitals';

const params = new URLSearchParams(new URL(window.location.href).search);

ReactDOM.render(
  <React.StrictMode>
    <PlanInformation apiUrl="../api" isTestMode={params.get("testing") === "true"} />
  </React.StrictMode>,
  document.getElementById('root')
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
