import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import App from "../App";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { enteredEmail } from "./OrderScreen";

const Home = () => {
  const [email, setEmail] = useState("");

  savedEmail = "";

  console.log(enteredEmail);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleClick = () => {
    for (let i = 0; i < enteredEmail.length; i++) {
      if (email in enteredEmail[i]) {
        let value = enteredEmail[i];
        savedEmail = value[email];
        console.log(savedEmail);
      } else {
      }
    }
  };

  return (
    <Wrapper>
      <Header />
      <div style={{ display: "flex" }}>
        <Box>{email}</Box>
        <Smallerbox>
          Order Flow Box
          <Link to="/Dish">
            <OrderButton>Order</OrderButton>
          </Link>
        </Smallerbox>
      </div>
      <div style={{ display: "flex" }}>
        <Bottomboxes>
          <p style={{ alignSelf: "start" }}>Find your order</p>

          <label style={{ alignSelf: "start" }}>Enter email</label>
          <input
            onChange={handleChange}
            type={"email"}
            style={{ fontSize: "35px", alignSelf: "start" }}
          ></input>

          <EmailButton
            onClick={() => {
              handleClick();
            }}
          >
            Check Email
          </EmailButton>
        </Bottomboxes>
        <Bottomboxes></Bottomboxes>
      </div>
    </Wrapper>
  );
};

export default Home;

export let savedEmail = "";

const Wrapper = styled.div`
  align-items: center;
  background-color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  color: black;
`;

const Box = styled.div`
  box-sizing: border-box;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 10px;
  border: 3px solid black;
  height: 350px;
  width: 700px;
`;

const Smallerbox = styled(Box)`
  justify-content: space-between;
  width: 290px;
`;
const Bottomboxes = styled(Box)`
  padding-top: 0px;
  justify-content: space-between;
  width: 495px;
`;

const OrderButton = styled.button`
  cursor: pointer;
  color: white;
  background-color: #c16757;
  font-size: large;
  border-radius: 20px;
  height: 75px;
  width: 225px;
`;
const EmailButton = styled(OrderButton)`
  align-self: end;
`;
