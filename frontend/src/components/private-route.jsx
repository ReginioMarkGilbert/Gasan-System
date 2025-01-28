import { loginSuccess, logout } from "@/redux/user/userSlice.js";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                dispatch(logout());
                window.alert("Session expired. Please sign in again.");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                navigate("/sign-in");
            } else {
                dispatch(loginSuccess(decodedToken));
            }
        } catch (error) {
            console.error(error);
            localStorage.removeItem("token");
            navigate("/sign-in");
        }
    }, [navigate, dispatch]);

    return currentUser ? <Outlet /> : <Navigate to="sign-in" />;
};

export default PrivateRoute;
