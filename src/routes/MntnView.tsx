import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { mountainsState } from '../atoms';
import styled from 'styled-components';
import { getMountainList } from '../api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { setCenters, setPolyline } from '../utils/map';

interface ILocationState {
  coor: string[];
}

const MntnViewContainer = styled.div``;

const Menu = styled.ul`
  display: grid;
  grid-template-columns: 35px 1fr 60px 1fr 1fr 50px;
  text-align: center;
  padding: 20px;
  font-size: 0.95rem;
`;

const Lists = styled.ul`
  padding: 20px;
  padding-top: 0;
  overflow-y: scroll;
  max-height: 45vh;
  font-size: 0.9rem;
  li {
    display: grid;
    grid-template-columns: 35px 1fr 60px 1fr 1fr 50px;
    text-align: center;
    line-height: 35px;
  }
`;

const MoreBtn = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 20px;
`;

function MntnView() {
  const location = useLocation<ILocationState>();
  const coor = location.state?.coor ?? ''; // 기본값 설정
  const [mountain, setMountain] = useRecoilState(mountainsState);

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['allMountains', coor],
    queryFn: ({ pageParam = 1 }) => getMountainList(coor, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      console.log('lastPage', lastPage);
      return Number(lastPage.response.page.total) ==
        Number(lastPage.response.page.current)
        ? undefined
        : pages.length + 1;
    },
  });

  useEffect(() => {
    if (data) {
      const newFeatures =
        data.pages?.flatMap(
          (page) => page.response.result.featureCollection.features
        ) || [];

      setMountain(newFeatures); // 기존 데이터에 추가
    }
  }, [data, setMountain]);

  if (isLoading) return <div>Loading...</div>;
  if (mountain.length === 0) return <div>검색 결과가 없습니다.</div>;

  let paths: string[] = [];

  function drawingRoad(id: string) {
    const path: string[] = []; // 경로 좌표를 저장할 배열

    mountain.forEach((geos: any) => {
      if (geos.id === id) {
        geos.geometry.coordinates[0].forEach((geo: any) => {
          const latLng = new window.kakao.maps.LatLng(geo[1], geo[0]); // 경도, 위도 순서로 생성
          path.push(latLng); // path 배열에 추가
        });
      }
    });

    paths = [...paths, ...path];

    setPolyline(path);
    setCenters(paths);
  }
  return (
    <MntnViewContainer>
      <Menu>
        <li>{'번호'}</li>
        <li>{'산이름'}</li>
        <li>{'난이도'}</li>
        <li>{'등산시간'}</li>
        <li>{'하산시간'}</li>
        <li>{'거리'}</li>
      </Menu>
      <Lists>
        {mountain.map((items: any, i: number) => (
          <li key={items.id} onClick={() => drawingRoad(items.id)}>
            <div>{`${i + 1}`}</div>
            <div>{`${items.properties.mntn_nm}`}</div>
            <div>{`${items.properties.cat_nam}`}</div>
            <div>{`${items.properties.up_min}분`}</div>
            <div>{`${items.properties.down_min}분`}</div>
            <div>{`${items.properties.sec_len}m`}</div>
          </li>
        ))}
      </Lists>
      {hasNextPage && (
        <MoreBtn onClick={() => fetchNextPage()}>
          더보기<i className="xi-angle-down-min"></i>
        </MoreBtn>
      )}
    </MntnViewContainer>
  );
}

export default MntnView;
