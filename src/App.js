import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./Common/Navigation";
import { Provider } from "react-redux";
import { store } from "./Common/store";
import Home from "./Pages/home";

const App = () => (
    <Provider store={store}>
        <div className="App">
            <Navigation />
        </div>
    </Provider>

);

export default App;
