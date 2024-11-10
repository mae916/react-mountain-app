import Map from '../components/Map';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MountainLists from '../components/MountainLists';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { mountainsState, IMountains, searchResultsState } from '../atoms';
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

const SearchWrapper = styled.form`
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
`;

const Button = styled.button`
  position: absolute;
  border: 0;
  right: 12px;
  top: 9px;
  background-color: transparent;
  i {
    color: #969496;
    font-weight: 900;
    font-size: 1rem;
  }
`;

function Search() {
  const [keyword, setKeyword] = useState<string>('');
  const setResult = useSetRecoilState(searchResultsState);
  const history = useHistory();

  const searchHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const regex = /산$/;
    if (keyword == '') {
      return alert('검색어를 입력해주세요.');
    } else if (!regex.test(keyword)) {
      return alert('산 이름으로 검색해주세요.');
    }

    var places = new window.kakao.maps.services.Places();

    var callback = function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const regex = /산$/;
        setResult(result);
      }
    };
    places.keywordSearch(keyword, callback);

    history.push(`/search/${keyword}/address`);
  };

  const getSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setKeyword(value);
  };

  useEffect(() => {
    const regex = /[!@#\$%\^\&*\)\(+=._-]+/g;
    if (regex.test(keyword)) {
      setKeyword((prev) => prev.replace(regex, ''));
    }
  }, [keyword]);

  return (
    <>
      <SearchBox>
        <BackBtnBox>
          <i
            className="xi-angle-left-min xi-x"
            onClick={() => {
              history.goBack();
            }}
          ></i>
        </BackBtnBox>
        <SearchWrapper onSubmit={searchHandler}>
          <input
            value={keyword}
            onChange={getSearchKeyword}
            type="text"
            placeholder="산 이름을 입력해주세요."
          />
          <Button>
            <i className="xi-search"></i>
          </Button>
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
