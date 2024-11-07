import Map from '../components/Map';
import { mergeMntnInfo } from '../api';
import { useState } from 'react';
import styled from 'styled-components';
import MountainLists from '../components/MountainLists';
import { useSetRecoilState } from 'recoil';
import { mountainsState, IMountains } from '../atoms';
import { Switch, Route, useHistory } from 'react-router-dom';
import MntnView from './MntnView';
import profileImg from '../assets/images/profileImg.png';

const SearchBox = styled.div`
  padding: 15px 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
`;

const BackBtnBox = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  margin-right: 5px;
  i {
    color: #999999;
  }
`;

const ImgBox = styled.div`
  margin-left: 10px;
  img {
    width: 45px;
    height: 45px;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid #999999;
  }
`;

const SearchWrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  input {
    height: 100%;
    width: 100%;
    border-radius: 20px;
    border: 0;
    background-color: #f0eff4;
    padding: 10px 20px;
    font-size: 1rem;
  }
  i {
    position: absolute;
    right: 20px;
    top: 10px;
    color: #969496;
    font-weight: 900;
    font-size: 1rem;
  }
`;

function Search() {
  const setMountains = useSetRecoilState<IMountains>(mountainsState);
  const [keyword, setKeyword] = useState<string>('');
  const history = useHistory();

  const searchHandler = async () => {
    const mountainList = await mergeMntnInfo(keyword);
    setMountains(mountainList);
    history.push(`/search/${keyword}/address`);
  };

  const getSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setKeyword(value);
  };

  return (
    <>
      <SearchBox>
        <BackBtnBox>
          <i className="xi-angle-left-min xi-x"></i>
        </BackBtnBox>
        <SearchWrapper>
          <input
            value={keyword}
            onChange={getSearchKeyword}
            type="text"
            placeholder="동 이름을 검색해주세요"
          />
          <i onClick={searchHandler} className="xi-search"></i>
        </SearchWrapper>
        <ImgBox>
          <img src={profileImg} alt="" />
        </ImgBox>
      </SearchBox>
      <Map />
      <Switch>
        <Route path={'/search/:keyword/place/:mntnId'}>
          <MntnView></MntnView>
        </Route>
        <Route path={'/search/:keyword/address'}>
          <MountainLists></MountainLists>
        </Route>
      </Switch>
    </>
  );
}
export default Search;
