import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Provider } from 'react-redux';
import store from "./store/index"
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-multi-carousel/lib/styles.css";



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<BrowserRouter>
<App />
</BrowserRouter>
</Provider>
   
)
