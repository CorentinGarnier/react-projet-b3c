import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Route,
    Redirect,
    BrowserRouter as Router,
    Switch,
    Link,
} from "react-router-dom";
import { Authenticate } from "../User/Authenticate";
import { disconnectUser } from "../User/userEffects";
import { launchSequence } from "./appEffects";
import {NavLink, Navbar, Nav, Form, FormControl, Button} from "react-bootstrap";
import '../css/navigation.css';
import Home from "../Pages/home";
import Game from "../Pages/game";
import logo from "../img/logo_blind_test.png"

const PrivateRoute = ({ children, ...rest }) => {
    const isAuthenticated = useSelector(
        (state) => state.user.isAuthenticated
    );
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/auth",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

const Navigation = () => {
    const isAuthenticated = useSelector(
        (state) => state.user.isAuthenticated
    );
    const player = useSelector((state) => state.user.player);
    const isLoading = useSelector((state) => state.app.isLoading);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(launchSequence());
    }, [dispatch]);
    return isLoading ? (
        <div className="loading-root">
            <img
                src="/assets/spinner.svg"
                alt="Loading animation"
                style={{ height: "50px" }}
            />
        </div>
    ) : (
        <Router>
            {isAuthenticated ? (
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand  href="#home"><img className="logo" src={logo} alt="Blind test logo" /></Navbar.Brand>
                        <Nav className="justify-content-end w-100">
                            <Nav.Link href="/auth" to="/auth" onClick={() => disconnectUser()}>Se déconnecter</Nav.Link>
                        </Nav>
                    </Navbar>

            ) : undefined}
            <Switch>
                <Route path="/auth">
                    <Authenticate />
                </Route>
                <Route path="/home">
                    <Home/>
                </Route>
                <Route path="/game">
                    <Game/>
                </Route>
            </Switch>
        </Router>
    );
};

export default Navigation;