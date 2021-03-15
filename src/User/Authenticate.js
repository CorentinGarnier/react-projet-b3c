import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { authenticateUser } from "./userEffects";
import '../css/authenticate.css';

export const Authenticate = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [canSignIn, setCanSignIn] = useState(false);
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.user.isLoading);
    const isAuthenticated = useSelector(
        (state) => state.user.isAuthenticated
    );
    const history = useHistory();
    const { from } = useLocation().state || { from: { pathname: "/home" } };
    const signInSuccess = () => {
        history.push(from);
    };
    useEffect(() => {
        // Verify email format is correct
        let emailIsValid = false;
        if (
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                email
            )
        ) {
            emailIsValid = true;
        }
        // Verify password format is correct
        let passwordIsValid = false;
        if (password.length >= 6) {
            passwordIsValid = true;
        }
        setCanSignIn(emailIsValid && passwordIsValid);
    }, [email, password]);
    useEffect(() => {
        if (isAuthenticated) history.replace("/home");
    }, [isAuthenticated, history]);
    return (
        <div className="auth-root">
            <img src="/assets/logo.png" alt="Blind test logo" />
            <p className="text-auth mb-5 mt-5">Bienvenue sur le jeu du Blind Test 2.0
            </p>
            {isLoading ? (
                <img
                    src="/assets/spinner.svg"
                    alt="Loading animation"
                    style={{ height: "50px" }}
                />
            ) : (
                <div className="d-flex flex-column my-auto align-items-center">
                    <input
                        type="text"
                        className="input-auth mb-4"
                        placeholder="Email address"
                        value={email}
                        onChange={(evt) => setEmail(evt.target.value)}
                    />
                    <input
                        type="password"
                        className="input-auth mb-4"
                        value={password}
                        onChange={(evt) => setPassword(evt.target.value)}
                    />
                    <button
                        onClick={() =>
                            dispatch(
                                authenticateUser(email, password, signInSuccess)
                            )
                        }
                        className="btn-submit-auth"
                        disabled={!canSignIn}
                    >
                        Connexion
                    </button>
                </div>
            )}
        </div>
    );
};