import xml2js from 'xml2js';
import jsonp from 'jsonp';

export interface IAddrList {
  y_coor: string;
  full_addr: string;
  x_coor: string;
  addr_name: string;
  cd: string;
}

export interface IOption {
  value: string;
  label: string;
}

interface IAddrCode {
  adpt_de: string;
  locallow_nm: string;
  locat_order: number;
  locat_rm: string;
  locatadd_nm: string;
  locathigh_cd: string;
  locatjijuk_cd: string;
  locatjumin_cd: string;
  region_cd: string;
  ri_cd: string;
  sgg_cd: string;
  sido_cd: string;
  umd_cd: string;
}

export async function getSgisAuthInfo() {
  return await (
    await fetch(
      `https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=${process.env.REACT_APP_SGIS_ID}&consumer_secret=${process.env.REACT_APP_SGIS_SECRET}`
    )
  ).json();
}

export async function fetchAddrList(cd: string = '') {
  console.dir(cd);
  const {
    result: { accessToken },
  } = await getSgisAuthInfo();

  const { result } = await (
    await fetch(
      `https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken=${accessToken}${
        cd ? `&cd=${cd}` : ''
      }`
    )
  ).json();

  const newArr = result.map((data: IAddrList) => ({
    value: data.cd, // 배열로 설정
    label: data.addr_name, // addr_name으로 설정
  }));
  return newArr;
}

export async function getMountainList(mode: string, val: string): Promise<any> {
  let text;

  switch (mode) {
    case 'addr':
      text = `attrFilter=emdCd:=:${val}`;
      break;
    case 'search':
      text = `attrFilter=mntn_nm:=:${val}`;
      break;
  }

  const url = `https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_L_FRSTCLIMB&key=${process.env.REACT_APP_VWORLD_KEY}&domain=${process.env.REACT_APP_DOMAIN}&${text}`;
  console.log('url', url);
  return new Promise((resolve, reject) => {
    jsonp(url, { param: 'callback' }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        const {
          response: {
            result: {
              featureCollection: { features },
            },
          },
        } = data;

        const groupedFeatures = features.reduce((acc: any, feature: any) => {
          const mountainName = feature.properties.mntn_nm;

          if (!acc[mountainName]) {
            acc[mountainName] = [];
          }

          acc[mountainName].push(feature);

          return acc;
        }, {});

        resolve(groupedFeatures);
      }
    });
  });
}

export async function getMountainInfo(mountainName: string) {
  const rs = await fetch(
    `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(
      `http://api.forest.go.kr/openapi/service/trailInfoService/getforeststoryservice?ServiceKey=${process.env.REACT_APP_DATA_GO_KEY}&mntnNm=${mountainName}`
    )}`
  );

  const xmlText = await rs.text();
  const parser = new xml2js.Parser();
  let newArr: string[] = [];
  parser.parseString(xmlText, (err, result) => {
    if (err) {
      console.error('Error parsing XML:', err);
      return;
    }
    newArr = result.response.body[0].items[0].item;
  });
  return newArr;
}

export async function getStanReginCdList(keword: string) {
  const { StanReginCd } = await (
    await fetch(
      `http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList?ServiceKey=${process.env.REACT_APP_DATA_GO_KEY}&type=json&locatadd_nm=${keword}`
    )
  ).json();

  const newArr = StanReginCd[1].row
    .filter((data: IAddrCode) => data.ri_cd == '00') //'리' 제외, 8자리만
    .map((data: IAddrCode) => ({
      label: data.locallow_nm,
      value: data.region_cd.slice(0, 8),
    }));

  return newArr;
}

export async function mergeMntnInfo(mode: string, val: string) {
  const mountains = await getMountainList(mode, val);
  const newMountains: any = {};

  const mountainInfoPromises = Object.keys(mountains).map(async (name) => {
    const mntnInfo = await getMountainInfo(name);
    return { name, info: mntnInfo[0] };
  });
  const mountainInfos = await Promise.all(mountainInfoPromises);
  for (const { name, info } of mountainInfos) {
    newMountains[name] = {
      geo: mountains[name],
      info: info,
    };
  }
  return newMountains;
}
