"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var react_router_1 = require("react-router");
var Home_1 = __importDefault(require("./Home/Home"));
var App = function () {
    return (react_1["default"].createElement(react_router_1.MemoryRouter, null,
        react_1["default"].createElement(react_router_1.Switch, null,
            react_1["default"].createElement(react_router_1.Route, { exact: true, path: "/" },
                react_1["default"].createElement(Home_1["default"], null)))));
};
var domContainer = document.querySelector('#root');
react_dom_1["default"].render(react_1["default"].createElement(App, null), domContainer);
//# sourceMappingURL=App.js.map