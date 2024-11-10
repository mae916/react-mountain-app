import xml2js from 'xml2js';
import jsonp from 'jsonp';
import { IMountains, IMountainInfo } from './atoms';
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

export async function getMountainList(
  coor: string[],
  page: number
): Promise<any> {
  const url = `https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_L_FRSTCLIMB&key=${process.env.REACT_APP_VWORLD_KEY}&domain=${process.env.REACT_APP_DOMAIN}&geomFilter=POINT(${coor[0]} ${coor[1]})&size=20&page=${page}&buffer=1000`;
  try {
    // JSONP 호출을 통해 데이터를 가져옴
    const data = await new Promise<any>((resolve, reject) => {
      jsonp(url, { param: 'callback' }, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
    return data;
  } catch (error) {
    console.error('Error fetching mountain data:', error);
    throw error;
  }
}

export async function getMountainInfo(mountainName: string) {
  const rs = await fetch(
    `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(
      `http://api.forest.go.kr/openapi/service/trailInfoService/getforeststoryservice?ServiceKey=${process.env.REACT_APP_DATA_GO_KEY}&mntnNm=${mountainName}`
    )}`
  );

  const xmlText = await rs.text();
  const parser = new xml2js.Parser();
  let newArr: IMountainInfo[] = [];
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
  return newArr[0];
}

export async function totalMountainList(coor: string[], mntnName: string) {
  const {
    response: {
      page: { total },
      result: {
        featureCollection: { features },
      },
    },
  } = await getMountainList(coor, 1);

  let datas: any = [...features];

  for (let i = 2; i <= total; i++) {
    const {
      response: {
        result: {
          featureCollection: { features },
        },
      },
    } = await getMountainList(coor, i);
    datas.push(...features);
  }

  const ids = datas.map((data: any) => data.id); // 모든 id 값을 가져옴
  const uniqueIds = new Set(ids); // Set을 사용해 중복된 값을 제거
  const hasDuplicates = ids.length !== uniqueIds.size; // 중복 여부 확인

  if (hasDuplicates) {
    console.log('중복된 값이 존재합니다.');
  } else {
    console.log('중복된 값이 없습니다.');
  }

  // datas.sort((a: any, b: any) => {
  //   // 먼저 up_min 기준으로 내림차순 정렬
  //   if (b.properties.up_min !== a.properties.up_min) {
  //     return b.properties.up_min - a.properties.up_min;
  //   }
  //   // up_min 값이 같다면 down_min 기준으로 내림차순 정렬
  //   return b.properties.down_min - a.properties.down_min;
  // });
  // console.log('datas', datas);

  //거리와 시간을 합산하는 필터링 로직 적용
  // const regex = new RegExp(`${mntnName}$`);
  // let totalUpTime = 0;
  // let totalDownTime = 0;
  // let totalDistance = 0;

  // datas.forEach((data: any) => {
  //   if (regex.test(data.properties.mntn_nm)) {
  //     totalUpTime += parseInt(data.properties.up_min) || 0;
  //     totalDownTime += parseInt(data.properties.down_min) || 0;
  //     totalDistance += parseFloat(data.properties.sec_len) || 0;
  //   }
  // });

  // const obj = {
  //   mntnName: mntnName,
  //   totalUpTime: convertMinutesToHours(totalUpTime),
  //   totalDownTime: convertMinutesToHours(totalDownTime),
  //   totalDistance: totalDistance,
  // };
}

const convertMinutesToHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60); // 시간 부분
  const remainingMinutes = minutes % 60; // 나머지 분 부분
  return { hours, minutes: remainingMinutes };
};
// export async function mergeMntnInfo(keyword: string) {
//   const { value } = await getStanReginCdList(keyword);

//   const mountains = await getMountainList(value);

//   const newMountains: IMountains = {};

//   const mountainInfoPromises = Object.keys(mountains).map(async (name) => {
//     const mntnInfo = await getMountainInfo(name);
//     return { name, info: mntnInfo[0] };
//   });
//   const mountainInfos = await Promise.all(mountainInfoPromises);
//   for (const { name, info } of mountainInfos) {
//     newMountains[name] = {
//       geo: mountains[name],
//       info: info,
//     };
//   }
//   return newMountains;
// }
