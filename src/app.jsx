import { BrowserRouter as Router } from "react-router-dom";
import RouterApp from "./router/RouterApp";

export const App = () => {
    return (
        <Router basename="/">
            <RouterApp />
            {/* <Dots time={3000}/> */}
        </Router>
    );
};
