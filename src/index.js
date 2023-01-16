import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDtD0I0oNbJ9fvo6g14d_yEWcdJokAYBdU",
  authDomain: "dawgo-63d5f.firebaseapp.com",
  projectId: "dawgo-63d5f",
  storageBucket: "dawgo-63d5f.appspot.com",
  messagingSenderId: "186814383467",
  appId: "1:186814383467:web:a509cc14013cb52c82782e",
};

const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
