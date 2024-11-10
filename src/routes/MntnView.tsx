import { useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { mountainsState, mountainCoorSelector } from '../atoms';
import styled from 'styled-components';
import { getMountainList, totalMountainList } from '../api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { setCenters, setRectangle } from '../utils/map';

interface ILocationState {
  coor: string[];
  name: string;
}

interface IListItemProps {
  isChecked: boolean;
}

const MntnViewContainer = styled.div``;
const Notice = styled.div`
  text-align: center;
  font-size: 0.8rem;
  margin-top: 10px;
`;

const Menu = styled.ul`
  display: grid;
  grid-template-columns: 1fr 60px 1fr 1fr 50px;
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
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 60px 1fr 1fr 50px;
  text-align: center;
  line-height: 35px;
`;

const MoreBtn = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 20px;
`;

function MntnView() {
  const location = useLocation<ILocationState>();
  const coor = location.state?.coor ?? '';
  const mntnName = location.state?.name ?? '';
  const [mountain, setMountain] = useRecoilState(mountainsState);
  // const paths = useRecoilValue(mountainCoorSelector);
  const [bbox, setBbox] = useState<number[]>([]);
  const polylineRef = useRef<any>(null);

  const { isLoading, data } = useQuery<any>({
    queryKey: ['allMountains', coor],
    queryFn: () => totalMountainList(coor, mntnName),
  });

  useEffect(() => {
    setMountain(data);
  }, [data, setMountain]);

  // mountain.forEach((m, index) => {
  //   // const path = paths[index]; // 각 산의 경로 선택
  //   // polylineRef.current = new window.kakao.maps.Polyline({
  //   //   map: window.kakaoMap,
  //   //   path: path,
  //   //   strokeWeight: 2,
  //   //   strokeColor: '#00a8ff',
  //   //   strokeOpacity: 0.8,
  //   //   strokeStyle: 'solid',
  //   // });
  //   // setCenters(path);
  //   // polylineRef.current.setMap(window.kakaoMap);
  // });

  if (isLoading) return <div>Loading...</div>;
  // if (mountain.length === 0) return <div>검색 결과가 없습니다.</div>;

  return null;
  // <MntnViewContainer>
  //   <Menu>
  //     <li>{'산이름'}</li>
  //     <li>{'등산시간'}</li>
  //     <li>{'하산시간'}</li>
  //     <li>{'거리'}</li>
  //   </Menu>
  //   <Lists>
  //     {mountain.map((items: any) => (
  //       <ListItem key={items.id}>
  //         <div>{`${items.properties.mntn_nm}`}</div>
  //         <div>{`${items.properties.up_min}분`}</div>
  //         <div>{`${items.properties.down_min}분`}</div>
  //         <div>{`${items.properties.sec_len}m`}</div>
  //       </ListItem>
  //     ))}
  //   </Lists>
  // </MntnViewContainer>
}

export default MntnView;
