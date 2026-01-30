import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux";
import store from "./redux/store.js";
import NavigationProvider from "./context/navigation-context.jsx";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <NavigationProvider>
                <App/>
            </NavigationProvider>
        </BrowserRouter>
    </Provider>
    ,
)
