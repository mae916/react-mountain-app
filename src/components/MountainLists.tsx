import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import MountainList from './MountainList';
import { mountainsState, IMountains } from '../atoms';
import { useEffect } from 'react';

const Lists = styled.ul`
  padding: 20px;
`;

const Empty = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

function MountainLists() {
  const mountains = useRecoilValue<IMountains>(mountainsState);
  console.log('mountains', mountains);

  useEffect(() => {
    const marker = new window.kakao.maps.Marker({
      map: window.kakaoMap,
      position: new window.kakao.maps.LatLng(33.450701, 126.570667),
    });

    marker.setMap(window.kakaoMap);
  }, []);

  return (
    <Lists>
      {mountains ? (
        Object.keys(mountains).map((mntnName: string) => (
          <MountainList
            key={mountains[mntnName]?.info.mntnid[0]}
            mntnId={mountains[mntnName]?.info.mntnid[0]}
            mntnName={mntnName}
          />
        ))
      ) : (
        <Empty>검색 결과가 없습니다.</Empty>
      )}
    </Lists>
  );
}

export default MountainLists;
