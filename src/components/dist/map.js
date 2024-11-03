"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var MapContainer = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 300px;\n  z-index: -1;\n"], ["\n  width: 100%;\n  height: 300px;\n  z-index: -1;\n"])));
function Map() {
    react_1.useEffect(function () {
        var container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
        var options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };
        var map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    }, []);
    return React.createElement(MapContainer, { id: "map" });
}
exports["default"] = Map;
var templateObject_1;
