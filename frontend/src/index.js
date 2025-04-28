import React from "react";                       //You're importing the core of React. JSX (i.e. HTML-like React code) won't work without it.
import ReactDOM from "react-dom/client";         // You get the React DOM library. This is used to render (place) React components into the actual HTML page.
import App from "./App";                         // You load the App.js component, which is the heart of the project. This component usually contains page redirects (Router), common components (Header/Footer), content, etc.
import './index.css';     
                    
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);