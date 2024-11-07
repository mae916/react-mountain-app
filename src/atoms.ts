import { atom, selectorFamily } from 'recoil';

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

export interface IGeo {
  geometry: IGeometry;
  id: string;
  properties: IProperties;
  type: string;
}

interface IMountain {
  geo: IGeo[];
  info: IMountainInfo;
}

export interface IMountains {
  [key: string]: IMountain;
}

//산 정보리스트
export const mountainsState = atom<IMountains>({
  key: 'mountains',
  default: {},
});

//리스트에서 선택된 산의 정보
export const selectedMntnState = atom<IMountain | null>({
  key: 'selectedMntn',
  default: null,
});

// 받아온 산 정보를 변형
export const mountainSelector = selectorFamily<IMountain, string>({
  key: 'mountainSelector',
  get:
    (param: string) =>
    ({ get }) => {
      const mountains = get(mountainsState);
      return mountains[param] ?? undefined;
    },
  set:
    (param: string) =>
    ({ set }, newVal) => {
      if (newVal) {
        set(selectedMntnState, newVal as IMountain);
      } else {
        console.warn(`No mountain data found for key: ${param}`);
      }
    },
});
