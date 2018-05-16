import React from "react";
import styled from "styled-components";
import background1 from "../../../assets/images/background1.jpg";

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
  src: background1
})`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1;
`;

const LandingPage = props => {
  const { dispatch } = props;

  return (
    <Container>
      <Image />
      <Button onClick={() => dispatch({ type: "LOGIN" })}>LOGIN</Button>
      <Title>Hello, Welcome!!</Title>
    </Container>
  );
};

export default LandingPage;
