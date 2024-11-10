import { atom, selector, selectorFamily } from 'recoil';

export interface IMountainInfo {
  crcmrsghtngetcimageseq: [string];
  crcmrsghtnginfodscrt: string[];
  crcmrsghtnginfoetcdscrt: string[];
  hkngpntdscrt: string[];
  hndfmsmtnmapimageseq: string[];
  hndfmsmtnslctnrson: string[];
  mntnattchimageseq: string[];
  mntnid: string[];
  mntninfodscrt: string[];
  mntninfodtlinfocont: string[];
  mntninfohght: string[];
  mntninfomangrtlno: string[];
  mntninfomapdnldfilenm: string[];
  mntninfomngmemnbdnm: string[];
  mntninfopoflc: string[];
  mntninfotrnspinfoimageseq: string[];
  mntnnm: string[];
  mntnsbttlinfo: string[];
  pbtrninfodscrt: string[];
  ptmntrcmmncoursdscrt: string[];
  rcmmncoursimageseq: string[];
}

export interface ISearchResults {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

interface IGeometry {
  type: string;
  coordinates: number[][];
}

interface IProperties {
  up_min: string;
  down_min: string;
  cat_nam: string;
  sec_len: string;
  mntn_nm: string;
}
export interface IMountains {
  geometry: IGeometry;
  id: string;
  properties: IProperties;
  type: string;
  isChecked?: boolean;
}

//산 정보리스트
export const mountainsState = atom<IMountains[] | []>({
  key: 'mountains',
  default: [],
});

export const mountainCoorSelector = selector<any>({
  key: 'mountainCoor',
  get: ({ get }) => {
    const mountains = get(mountainsState);
    const paths: any = [];

    mountains.forEach((mountain) => {
      const path = mountain.geometry.coordinates[0].map(
        (coor: any) => new window.kakao.maps.LatLng(coor[1], coor[0])
      );
      paths.push(path); // path 배열을 paths에 추가
    });
    console.log('paths', paths);
    return paths;
  },
});

//리스트에서 선택된 산의 정보
// export const selectedMntnState = atom<IMountain | null>({
//   key: 'selectedMntn',
//   default: null,
// });

// 받아온 산 정보를 변형
// export const mountainSelector = selectorFamily<IMountain | null, string>({
//   key: 'mountainSelector',
//   get:
//     (param: string) =>
//     ({ get }) => {
//       const mountains = get(mountainsState);
//       return mountains?.[param] ?? null;
//     },
//   set:
//     (param: string) =>
//     ({ set }, newVal) => {
//       if (newVal) {
//         set(selectedMntnState, newVal as IMountain);
//       } else {
//         console.warn(`No mountain data found for key: ${param}`);
//       }
//     },
// });

// 검색된 주소에 대한 리스트
export const searchResultsState = atom<ISearchResults[]>({
  key: 'searchResults',
  default: [],
});
