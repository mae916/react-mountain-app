import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IMountainList {
  mntnId: string;
  mntnName: string;
}

const List = styled.li`
  border-bottom: 1px solid #f3f3f8;
  padding-bottom: 20px;
`;

function MountainList({ mntnId, mntnName }: IMountainList) {
  return (
    <List>
      <Link
        to={{
          pathname: `place/${mntnId}`,
          state: { name: mntnName },
        }}
      >
        {mntnName}
      </Link>
    </List>
  );
}

export default MountainList;
