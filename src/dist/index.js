"use strict";
exports.__esModule = true;
var react_1 = require("react");
var client_1 = require("react-dom/client");
var App_1 = require("./App");
var react_query_1 = require("@tanstack/react-query");
var react_query_devtools_1 = require("@tanstack/react-query-devtools");
var recoil_1 = require("recoil");
var queryClient = new react_query_1.QueryClient();
var root = client_1["default"].createRoot(document.getElementById('root'));
root.render(react_1["default"].createElement(react_1["default"].StrictMode, null,
    react_1["default"].createElement(recoil_1.RecoilRoot, null,
        react_1["default"].createElement(react_query_1.QueryClientProvider, { client: queryClient },
            react_1["default"].createElement(App_1["default"], null),
            react_1["default"].createElement(react_query_devtools_1.ReactQueryDevtools, { initialIsOpen: false })))));
