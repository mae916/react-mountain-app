"use strict";
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
exports.mergeMntnInfo = exports.getStanReginCdList = exports.getMountainInfo = exports.getMountainList = exports.fetchAddrList = exports.getSgisAuthInfo = void 0;
var xml2js_1 = require("xml2js");
var jsonp_1 = require("jsonp");
function getSgisAuthInfo() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=" + process.env.REACT_APP_SGIS_ID + "&consumer_secret=" + process.env.REACT_APP_SGIS_SECRET)];
                case 1: return [4 /*yield*/, (_a.sent()).json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getSgisAuthInfo = getSgisAuthInfo;
function fetchAddrList(cd) {
    if (cd === void 0) { cd = ''; }
    return __awaiter(this, void 0, void 0, function () {
        var accessToken, result, newArr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.dir(cd);
                    return [4 /*yield*/, getSgisAuthInfo()];
                case 1:
                    accessToken = (_a.sent()).result.accessToken;
                    return [4 /*yield*/, fetch("https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken=" + accessToken + (cd ? "&cd=" + cd : ''))];
                case 2: return [4 /*yield*/, (_a.sent()).json()];
                case 3:
                    result = (_a.sent()).result;
                    newArr = result.map(function (data) { return ({
                        value: data.cd,
                        label: data.addr_name
                    }); });
                    return [2 /*return*/, newArr];
            }
        });
    });
}
exports.fetchAddrList = fetchAddrList;
function getMountainList(mode, val) {
    return __awaiter(this, void 0, Promise, function () {
        var text, url;
        return __generator(this, function (_a) {
            switch (mode) {
                case 'addr':
                    text = "attrFilter=emdCd:=:" + val;
                    break;
                case 'search':
                    text = "attrFilter=mntn_nm:=:" + val;
                    break;
            }
            url = "https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_L_FRSTCLIMB&key=" + process.env.REACT_APP_VWORLD_KEY + "&domain=" + process.env.REACT_APP_DOMAIN + "&" + text;
            console.log('url', url);
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    jsonp_1["default"](url, { param: 'callback' }, function (error, data) {
                        if (error) {
                            reject(error);
                        }
                        else {
                            var features = data.response.result.featureCollection.features;
                            var groupedFeatures = features.reduce(function (acc, feature) {
                                var mountainName = feature.properties.mntn_nm;
                                if (!acc[mountainName]) {
                                    acc[mountainName] = [];
                                }
                                acc[mountainName].push(feature);
                                return acc;
                            }, {});
                            resolve(groupedFeatures);
                        }
                    });
                })];
        });
    });
}
exports.getMountainList = getMountainList;
function getMountainInfo(mountainName) {
    return __awaiter(this, void 0, void 0, function () {
        var rs, xmlText, parser, newArr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://thingproxy.freeboard.io/fetch/" + encodeURIComponent("http://api.forest.go.kr/openapi/service/trailInfoService/getforeststoryservice?ServiceKey=" + process.env.REACT_APP_DATA_GO_KEY + "&mntnNm=" + mountainName))];
                case 1:
                    rs = _a.sent();
                    return [4 /*yield*/, rs.text()];
                case 2:
                    xmlText = _a.sent();
                    parser = new xml2js_1["default"].Parser();
                    newArr = [];
                    parser.parseString(xmlText, function (err, result) {
                        if (err) {
                            console.error('Error parsing XML:', err);
                            return;
                        }
                        newArr = result.response.body[0].items[0].item;
                    });
                    return [2 /*return*/, newArr];
            }
        });
    });
}
exports.getMountainInfo = getMountainInfo;
function getStanReginCdList(keword) {
    return __awaiter(this, void 0, void 0, function () {
        var StanReginCd, newArr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList?ServiceKey=" + process.env.REACT_APP_DATA_GO_KEY + "&type=json&locatadd_nm=" + keword)];
                case 1: return [4 /*yield*/, (_a.sent()).json()];
                case 2:
                    StanReginCd = (_a.sent()).StanReginCd;
                    newArr = StanReginCd[1].row
                        .filter(function (data) { return data.ri_cd == '00'; }) //'리' 제외, 8자리만
                        .map(function (data) { return ({
                        label: data.locallow_nm,
                        value: data.region_cd.slice(0, 8)
                    }); });
                    return [2 /*return*/, newArr];
            }
        });
    });
}
exports.getStanReginCdList = getStanReginCdList;
function mergeMntnInfo(mode, val) {
    return __awaiter(this, void 0, void 0, function () {
        var mountains, newMountains, mountainInfoPromises, mountainInfos, _i, mountainInfos_1, _a, name, info;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getMountainList(mode, val)];
                case 1:
                    mountains = _b.sent();
                    newMountains = {};
                    mountainInfoPromises = Object.keys(mountains).map(function (name) { return __awaiter(_this, void 0, void 0, function () {
                        var mntnInfo;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, getMountainInfo(name)];
                                case 1:
                                    mntnInfo = _a.sent();
                                    return [2 /*return*/, { name: name, info: mntnInfo[0] }];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(mountainInfoPromises)];
                case 2:
                    mountainInfos = _b.sent();
                    for (_i = 0, mountainInfos_1 = mountainInfos; _i < mountainInfos_1.length; _i++) {
                        _a = mountainInfos_1[_i], name = _a.name, info = _a.info;
                        newMountains[name] = {
                            geo: mountains[name],
                            info: info
                        };
                    }
                    return [2 /*return*/, newMountains];
            }
        });
    });
}
exports.mergeMntnInfo = mergeMntnInfo;
