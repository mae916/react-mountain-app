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
  console.log('result', results);

  useEffect(() => {
    setMarkers(results);
  }, [results]);

  return (
    <Lists>
      {results ? (
        results.map((result) => <MountainList key={result.id} {...result} />)
      ) : (
        <Empty>검색 결과가 없습니다.</Empty>
      )}
    </Lists>
  );
}

export default MountainLists;
