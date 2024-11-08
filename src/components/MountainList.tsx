import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ISearchResults } from '../atoms';
import { setMarkers } from '../utils/map';

const List = styled.li`
  border-bottom: 1px solid #f3f3f8;
  padding-bottom: 20px;
`;

function MountainList({ id, place_name, address_name, x, y }: ISearchResults) {
  function clickPlaceHandler() {
    const arr = [{ x, y }];
    setMarkers(arr);
  }

  return (
    <List onClick={clickPlaceHandler}>
      <Link
        to={{
          pathname: `place/${id}`,
          state: { coor: [x, y] },
        }}
      >
        {place_name} {address_name}
      </Link>
    </List>
  );
}

export default MountainList;
