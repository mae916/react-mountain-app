/// <reference types="react-scripts" />
// declare namespace NodeJS {
//   interface ProcessEnv {
//       NODE_ENV: 'development' | 'production' | 'test'
//       PUBLIC_URL: string
//       REACT_APP_HASH: string
//       REACT_APP_API_URI: string
//       REACT_APP_WS_URI: string
//       }
//   }

interface Window {
  kakao: {
    maps: {
      onloadcallbacks: object;
      readyState: number;
      URI_FUNC: object;
      VERSION: object;
      RESOURCE_PATH: object;
      apikey: string;
      version: string;
      load: function;
      Point: function;
      Viewpoint: function;
      Coords: function;
      LatLng: function;
      CoordsBounds: function;
      LatLngBounds: function;
      Size: function;
      Map: function;
      MapTypeId: object;
      ControlPosition: object;
      CopyrightPosition: object;
      MapTypeControl: function;
      ZoomControl: function;
      AbstractOverlay: function;
      Marker: function;
      MarkerImage: function;
      InfoWindow: function;
      Billboard: function;
      CustomOverlay: function;
      Polyline: function;
      Polygon: function;
      Rectangle: function;
      Circle: function;
      Ellipse: function;
      event: object;
      Roadview: function;
      FlashRoadview: function;
      AjaxRoadview: function;
      CSSRoadview: function;
      RoadviewClient: function;
      RoadviewBridge: function;
      RoadviewOverlay: function;
      StaticMap: function;
      Tileset: function;
      disableBusSymbol: function;
      disableHD: function;
      TilesetCopyright: function;
      TimingFunc: object;
      services: object;
    };
  };
  kakaoMap: {
    o: object;
    a: object;
    Uh: object;
    b: object;
    G: object;
    ua: object;
    t: object;
    j: object;
    u: object;
    na: object;
    ia: object;
    ma: object;
    Oa: object;
    I: object;
    ea: object;
    xc: object;
    oe: function;
    Qc: object;
    Wg: boolean;
    xj: boolean;
    Fb: object;
    bb: object;
    Tk: number;
    Ui: number;
    Vi: number;
    sa: object;
    Mb: object;
    Ra: object;
    Vk: undefined;
    h: object;
    Id: number;
    Hd: number;
    ya: number;
    Uc: boolean;
    K: boolean;
    ej: number;
    dj: number;
    sk: number;
    ae: boolean;
    Hi: number;
    Ae: boolean;
    Rb: object;
    yj: boolean;
    pi: boolean;
  };
}
