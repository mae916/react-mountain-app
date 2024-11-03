"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Map_1 = require("../components/Map");
var react_select_1 = require("react-select");
var api_1 = require("../api");
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var react_router_dom_1 = require("react-router-dom");
var Title = styled_components_1["default"].h1(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  text-align: center;\n  line-height: 70px;\n  width: 100%;\n  font-size: 1.2rem;\n  font-weight: 700;\n"], ["\n  text-align: center;\n  line-height: 70px;\n  width: 100%;\n  font-size: 1.2rem;\n  font-weight: 700;\n"])));
var Notice = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin-bottom: 10px;\n  font-size: 0.7rem;\n"], ["\n  margin-bottom: 10px;\n  font-size: 0.7rem;\n"])));
var ToggleBtn = styled_components_1["default"].button(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin-bottom: 10px;\n  font-size: 15px;\n"], ["\n  margin-bottom: 10px;\n  font-size: 15px;\n"])));
var SearchBox = styled_components_1["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  height: 40px;\n  margin-bottom: 20px;\n  form {\n    height: 100%;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n  * {\n    font-size: 1rem;\n  }\n  input {\n    height: 100%;\n    width: 70%;\n  }\n  button {\n    height: 100%;\n    width: 29%;\n  }\n"], ["\n  height: 40px;\n  margin-bottom: 20px;\n  form {\n    height: 100%;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n  * {\n    font-size: 1rem;\n  }\n  input {\n    height: 100%;\n    width: 70%;\n  }\n  button {\n    height: 100%;\n    width: 29%;\n  }\n"])));
var SelectBox = styled_components_1["default"].div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: grid;\n  grid-template-rows: 1fr;\n  grid-template-columns: repeat(3, 1fr);\n  column-gap: 5px;\n  margin-bottom: 5px;\n  font-size: 0.7rem;\n"], ["\n  display: grid;\n  grid-template-rows: 1fr;\n  grid-template-columns: repeat(3, 1fr);\n  column-gap: 5px;\n  margin-bottom: 5px;\n  font-size: 0.7rem;\n"])));
function Search() {
    var _this = this;
    var _a = react_1.useState([]), sidoList = _a[0], setSido = _a[1];
    var _b = react_1.useState([]), sggList = _b[0], setSgg = _b[1];
    var _c = react_1.useState([]), dongList = _c[0], setDong = _c[1];
    var _d = react_1.useState(null), selectedSido = _d[0], setSelectedSido = _d[1];
    var _e = react_1.useState(null), selectedSgg = _e[0], setSelectedSgg = _e[1];
    var _f = react_1.useState(null), selectedDong = _f[0], setSelectedDong = _f[1];
    var _g = react_1.useState(), mountains = _g[0], setMountains = _g[1];
    var _h = react_1.useState(true), isSearchBtn = _h[0], setIsSearchBtn = _h[1];
    var _j = react_1.useState(''), keyword = _j[0], setKeyword = _j[1];
    // Sido 목록 가져오기
    react_1.useEffect(function () {
        var fetchSidoList = function () { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api_1.fetchAddrList()];
                    case 1:
                        data = _a.sent();
                        setSido(data); // Sido 상태 업데이트
                        return [2 /*return*/];
                }
            });
        }); };
        fetchSidoList();
    }, []);
    // 시도를 선택하면 시군구 목록을 가져오고, 기존 시군구와 동을 초기화
    var handleSidoChange = function (newValue) { return __awaiter(_this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setSelectedSido(newValue);
                    setSelectedSgg(null); // 시군구 선택 초기화
                    setSelectedDong(null);
                    if (!newValue) return [3 /*break*/, 2];
                    return [4 /*yield*/, api_1.fetchAddrList(newValue.value)];
                case 1:
                    data = _a.sent();
                    // const mountainList = getMountainList(newValue.value.xy);
                    setSgg(data);
                    return [3 /*break*/, 3];
                case 2:
                    setSgg([]); // 시군구 목록 초기화
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // 시군구를 선택하면 동 목록을 가져오고, 기존 동을 초기화
    var handleSggChange = function (newValue) { return __awaiter(_this, void 0, void 0, function () {
        var rs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setSelectedSgg(newValue);
                    setSelectedDong(null);
                    if (!newValue) return [3 /*break*/, 2];
                    return [4 /*yield*/, api_1.getStanReginCdList((selectedSido === null || selectedSido === void 0 ? void 0 : selectedSido.label) + " " + newValue.label)];
                case 1:
                    rs = _a.sent();
                    setDong(rs);
                    return [3 /*break*/, 3];
                case 2:
                    setDong([]); // 동 목록 초기화
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleDongChange = function (newValue) { return __awaiter(_this, void 0, void 0, function () {
        var mountainList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setSelectedDong(newValue);
                    if (!newValue) return [3 /*break*/, 2];
                    return [4 /*yield*/, api_1.mergeMntnInfo('addr', newValue.value)];
                case 1:
                    mountainList = _a.sent();
                    console.log('mountainList', mountainList);
                    setMountains(mountainList);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var toggleClick = function () {
        setIsSearchBtn(!isSearchBtn);
    };
    var searchHandler = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var mountainList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    return [4 /*yield*/, api_1.mergeMntnInfo('search', keyword)];
                case 1:
                    mountainList = _a.sent();
                    console.log('mountainList', mountainList);
                    return [2 /*return*/];
            }
        });
    }); };
    var getSearchKeyword = function (event) {
        var value = event.currentTarget.value;
        setKeyword(value);
    };
    return (React.createElement("div", null,
        React.createElement(Title, null, "\uB4F1\uC0B0\uB85C \uCC3E\uAE30\uD83D\uDE0E"),
        React.createElement(ToggleBtn, { onClick: toggleClick }, isSearchBtn ? '지역으로 찾기' : '산이름으로 찾기'),
        !isSearchBtn ? (React.createElement(React.Fragment, null,
            React.createElement(SelectBox, null,
                React.createElement(react_select_1["default"], { id: "sido", options: sidoList, value: selectedSido, onChange: handleSidoChange, placeholder: "\uC2DC\uB3C4" }),
                React.createElement(react_select_1["default"], { id: "sgg", options: sggList, value: selectedSgg, onChange: handleSggChange, placeholder: "\uC2DC\uAD70\uAD6C" }),
                React.createElement(react_select_1["default"], { id: "dong", options: dongList, value: selectedDong, onChange: handleDongChange, placeholder: "\uC74D\uBA74\uB3D9" })),
            React.createElement(Notice, null, "\uD83D\uDE00\uB3D9\uAE4C\uC9C0 \uC120\uD0DD\uD574\uC8FC\uC138\uC694."))) : (React.createElement(SearchBox, null,
            React.createElement("form", { onSubmit: searchHandler },
                React.createElement("input", { value: keyword, onChange: getSearchKeyword, type: "text", placeholder: "\uC0B0 \uC774\uB984\uC744 \uAC80\uC0C9\uD574\uC8FC\uC138\uC694" }),
                React.createElement("button", null, "\uAC80\uC0C9")))),
        React.createElement(Map_1["default"], null),
        React.createElement("ul", null, mountains ? (Object.keys(mountains).map(function (mntnName) {
            var _a, _b, _c;
            return (React.createElement("li", { key: (_a = mountains[mntnName]) === null || _a === void 0 ? void 0 : _a.info.mntnid[0] },
                React.createElement(react_router_dom_1.Link, { to: {
                        pathname: "/" + ((_b = mountains[mntnName]) === null || _b === void 0 ? void 0 : _b.info.mntnid[0]),
                        state: { name: (_c = mountains[mntnName]) === null || _c === void 0 ? void 0 : _c.info.mntn_nm }
                    } }, mntnName)));
        })) : (React.createElement("li", null, "Loading...")))));
}
exports["default"] = Search;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
