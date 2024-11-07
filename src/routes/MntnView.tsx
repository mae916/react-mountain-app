import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { IMountains, mountainSelector } from '../atoms';
import styled from 'styled-components';
import { useEffect } from 'react';

interface ILocationState {
  name: string;
}

const MntnViewContainer = styled.div``;

const Lists = styled.ul`
  padding: 20px;
  li {
    display: grid;
    grid-template-columns: 40px 1fr 1fr 1fr 1fr;
    text-align: center;
    line-height: 30px;
  }
`;

function MntnView() {
  const location = useLocation<ILocationState>();
  const name = location.state?.name ?? ''; // 기본값 설정
  const [mountain, setMountain] = useRecoilState<IMountains[keyof IMountains]>(
    mountainSelector(name)
  );

  useEffect(() => {
    if (mountain) {
      setMountain(mountain);
    }
  }, [mountain]);

  const drawingRoad = (id: string) => {
    const path: any[] = []; // 경로 좌표를 저장할 배열

    mountain.geo.forEach((geos: any) => {
      if (geos.id === id) {
        geos.geometry.coordinates[0].forEach((geo: any) => {
          const latLng = new window.kakao.maps.LatLng(geo[0], geo[1]); // 경도, 위도 순서로 생성
          path.push(latLng); // path 배열에 추가
        });
      }
    });

    // Polyline을 생성하여 경로 그리기
    const polyline = new window.kakao.maps.Polyline({
      map: window.kakaoMap,
      path: path, // 경로 좌표 배열
      strokeWeight: 2,
      strokeColor: '#FF00FF',
      strokeOpacity: 0.8,
      strokeStyle: 'dashed',
    });

    polyline.setMap(window.kakaoMap);
  };

  return (
    <MntnViewContainer>
      <Lists>
        <li>
          <div>{'번호'}</div>
          <div>{'난이도'}</div>
          <div>{'등산시간'}</div>
          <div>{'하산시간'}</div>
          <div>{'구간거리'}</div>
        </li>
        {mountain?.geo.map((items: any, i: number) => (
          <li key={items.id} onClick={() => drawingRoad(items.id)}>
            <div>{`${i + 1}`}</div>
            <div>{`${items.properties.cat_nam}`}</div>
            <div>{`${items.properties.up_min}분`}</div>
            <div>{`${items.properties.down_min}분`}</div>
            <div>{`${items.properties.sec_len}m`}</div>
          </li>
        ))}
      </Lists>
    </MntnViewContainer>
  );
}

export default MntnView;
