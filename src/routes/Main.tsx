import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MainContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 2rem;
`;

function Main() {
  return (
    <MainContainer>
      <Title>등산로 찾기😎</Title>
      <Link to={{ pathname: '/search' }}>GO! &rarr;</Link>
    </MainContainer>
  );
}

export default Main;
