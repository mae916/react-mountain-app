"use strict";
exports.__esModule = true;
var react_router_dom_1 = require("react-router-dom");
var Search_1 = require("./routes/Search");
function Router() {
    return (React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(react_router_dom_1.Switch, null,
            React.createElement(react_router_dom_1.Route, { path: "/" },
                React.createElement(Search_1["default"], null)))));
}
exports["default"] = Router;
