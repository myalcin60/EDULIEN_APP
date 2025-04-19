import React from "react";                                //React'in temelini içeri aktarıyorsun. JSX (yani HTML benzeri React kodları) bu olmadan çalışmaz.
import ReactDOM from "react-dom/client";                // React DOM kütüphanesini alıyorsun. Bu, React bileşenlerini gerçek HTML sayfasına render etmek (yerleştirmek) için kullanılır.
import App from "./App";                                 // Projenin kalbi olan App.js bileşenini yüklüyorsun. Bu bileşen genelde sayfa yönlendirmeleri (Router), ortak bileşenler (Header/Footer), içerikler vs. içerir.
import './index.css';     
                    
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);