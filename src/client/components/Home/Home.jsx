import React from "react";
import styled from "styled-components";
import background2 from "../../../assets/images/background2.jpg";

const Title = styled.h1`
  font-size: 2rem;
  color: white;
  text-align: center;
`;

const Button = styled.button`
  font-size: 1rem;
  padding: 1rem;
  background: transparent;
  color: white;
  border: 3px solid white;
  border-radius: 15px;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const Image = styled.img.attrs({
  src: background2
})`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1;
`;

const Home = props => {
  const { dispatch } = props;

  return (
    <Container>
      <Image />
      <Button onClick={() => dispatch({ type: "LOGOUT" })}>LOGOUT</Button>
      <Title>See You Soon!!</Title>
    </Container>
  );
};

export default Home;
