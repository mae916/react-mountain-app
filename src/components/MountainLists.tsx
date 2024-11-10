import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import MountainList from './MountainList';
import { mountainsState, IMountains, searchResultsState } from '../atoms';
import { useEffect } from 'react';
import { setMarkers } from '../utils/map';

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
  const results = useRecoilValue(searchResultsState);
  const regex = /산$/;

  // '산'으로 끝나는 장소명만 필터링하여 mntns 배열 생성
  const mntns = results.filter((result) => regex.test(result.place_name));

  useEffect(() => {
    if (mntns.length > 0) {
      setMarkers(mntns);
    }
  }, [mntns]);

  return (
    <Lists>
      {mntns ? (
        mntns.map((mntn) => <MountainList key={mntn.id} {...mntn} />)
      ) : (
        <Empty>검색 결과가 없습니다.</Empty>
      )}
    </Lists>
  );
}

export default MountainLists;
