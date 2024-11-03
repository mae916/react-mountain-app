import Map from '../components/Map';
import Select, { SingleValue } from 'react-select';
import {
  fetchAddrList,
  mergeMntnInfo,
  getStanReginCdList,
  IOption,
} from '../api';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Title = styled.h1`
  text-align: center;
  line-height: 70px;
  width: 100%;
  font-size: 1.2rem;
  font-weight: 700;
`;
const Notice = styled.div`
  margin-bottom: 10px;
  font-size: 0.7rem;
`;

const ToggleBtn = styled.button`
  margin-bottom: 10px;
  font-size: 15px;
`;

const SearchBox = styled.div`
  height: 40px;
  margin-bottom: 20px;
  form {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  * {
    font-size: 1rem;
  }
  input {
    height: 100%;
    width: 70%;
  }
  button {
    height: 100%;
    width: 29%;
  }
`;

const SelectBox = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 5px;
  margin-bottom: 5px;
  font-size: 0.7rem;
`;

interface MountainInfo {
  mntnid: string[];
  mntn_nm: string;
}

interface Mountains {
  [key: string]: {
    geo: any;
    info: MountainInfo;
  };
}

function Search() {
  const [sidoList, setSido] = useState<IOption[]>([]);
  const [sggList, setSgg] = useState<IOption[]>([]);
  const [dongList, setDong] = useState<IOption[]>([]);
  const [selectedSido, setSelectedSido] = useState<SingleValue<IOption>>(null);
  const [selectedSgg, setSelectedSgg] = useState<SingleValue<IOption>>(null);
  const [selectedDong, setSelectedDong] = useState<SingleValue<IOption>>(null);
  const [mountains, setMountains] = useState<Mountains>();
  const [isSearchBtn, setIsSearchBtn] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>('');

  // Sido 목록 가져오기
  useEffect(() => {
    const fetchSidoList = async () => {
      const data = await fetchAddrList(); // 모든 시도 목록을 가져옴
      setSido(data); // Sido 상태 업데이트
    };
    fetchSidoList();
  }, []);

  // 시도를 선택하면 시군구 목록을 가져오고, 기존 시군구와 동을 초기화
  const handleSidoChange = async (newValue: SingleValue<IOption>) => {
    setSelectedSido(newValue);
    setSelectedSgg(null); // 시군구 선택 초기화
    setSelectedDong(null);

    if (newValue) {
      const data = await fetchAddrList(newValue.value); // 선택된 시도에 따라 시군구 목록 가져옴
      // const mountainList = getMountainList(newValue.value.xy);
      setSgg(data);
    } else {
      setSgg([]); // 시군구 목록 초기화
    }
  };

  // 시군구를 선택하면 동 목록을 가져오고, 기존 동을 초기화
  const handleSggChange = async (newValue: SingleValue<IOption>) => {
    setSelectedSgg(newValue);
    setSelectedDong(null);

    if (newValue) {
      const rs = await getStanReginCdList(
        `${selectedSido?.label} ${newValue.label}`
      );
      setDong(rs);
    } else {
      setDong([]); // 동 목록 초기화
    }
  };

  const handleDongChange = async (newValue: SingleValue<IOption>) => {
    setSelectedDong(newValue);
    if (newValue) {
      const mountainList = await mergeMntnInfo('addr', newValue.value);
      console.log('mountainList', mountainList);
      setMountains(mountainList);
    }
  };

  const toggleClick = () => {
    setIsSearchBtn(!isSearchBtn);
  };

  const searchHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const mountainList = await mergeMntnInfo('search', keyword);
    console.log('mountainList', mountainList);
  };

  const getSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setKeyword(value);
  };

  return (
    <div>
      <Title>등산로 찾기😎</Title>
      <ToggleBtn onClick={toggleClick}>
        {isSearchBtn ? '지역으로 찾기' : '산이름으로 찾기'}
      </ToggleBtn>
      {!isSearchBtn ? (
        <>
          <SelectBox>
            <Select
              id="sido"
              options={sidoList}
              value={selectedSido}
              onChange={handleSidoChange}
              placeholder="시도"
            />
            <Select
              id="sgg"
              options={sggList}
              value={selectedSgg}
              onChange={handleSggChange}
              placeholder="시군구"
            />
            <Select
              id="dong"
              options={dongList}
              value={selectedDong}
              onChange={handleDongChange}
              placeholder="읍면동"
            />
          </SelectBox>
          <Notice>😀동까지 선택해주세요.</Notice>
        </>
      ) : (
        <SearchBox>
          <form onSubmit={searchHandler}>
            <input
              value={keyword}
              onChange={getSearchKeyword}
              type="text"
              placeholder="산 이름을 검색해주세요"
            />
            <button>검색</button>
          </form>
        </SearchBox>
      )}

      <Map />
      <ul>
        {mountains ? (
          Object.keys(mountains).map((mntnName) => (
            <li key={mountains[mntnName]?.info.mntnid[0]}>
              <Link
                to={{
                  pathname: `/${mountains[mntnName]?.info.mntnid[0]}`,
                  state: { name: mountains[mntnName]?.info.mntn_nm },
                }}
              >
                {mntnName}
              </Link>
            </li>
          ))
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    </div>
  );
}
export default Search;
