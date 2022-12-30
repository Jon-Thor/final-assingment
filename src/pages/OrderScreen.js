import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import App from "../App";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { drinkOrderList } from "./Drinks";
import { dishName, dishCost, DishOrderList } from "./Dish";

function Order() {
  const [count, setCount] = useState(1);

  const [email, setEmail] = useState("");

  const [submitMessage, setsubmitMessage] = useState("Submit Email");

  console.log(submitMessage);

  const handleClick = (i) => {
    if (count + i >= 11 || count + i <= 0) {
      return;
    }
    setCount(count + i);
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {
    if (/\S+@\S+\.\S+/.test(email)) {
      enteredEmail.push({ [email]: { drinkOrderList, DishOrderList } });
      tempEmail = email;
      console.log(enteredEmail);
      setsubmitMessage("Email Submitted");
      localStorage.setItem("Emails", JSON.stringify(enteredEmail));
      console.log(JSON.parse(localStorage.getItem("Emails")));
    } else {
      setsubmitMessage("Invalid Email");
    }
  };

  const addDish = () => {
    dishTotalCost = DishOrderList.dishCost * count;
    people = count;
    console.log(dishTotalCost);
  };

  return (
    <Wrapper>
      <Header />
      <Box>
        <div style={{ border: "1px solid black", height: "100%" }}>
          <p>{email}</p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            height: "100%",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              width: "275px",
              display: "flex",
              flexDirection: "column",
              paddingTop: "20px",
            }}
          >
            <p style={{ alignSelf: "center", marginBottom: "-20px" }}>
              How many people
            </p>
            <div
              style={{ display: "flex", alignSelf: "center", marginTop: "0px" }}
            >
              <ClickButton onClick={() => handleClick(-1)}>
                <ArrowButton
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15 19l-7-7 7-7"></path>
                </ArrowButton>
              </ClickButton>

              <p
                style={{
                  alignSelf: "center",
                  fontSize: "50px",
                  width: "54px",
                  textAlign: "center",
                }}
              >
                {count}
              </p>

              <ClickButton onClick={() => handleClick(1)}>
                <ArrowButton
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 5l7 7-7 7"></path>
                </ArrowButton>
              </ClickButton>
            </div>
          </div>

          <label>{submitMessage}</label>
          <div style={{ display: "flex" }}>
            <input
              onChange={handleChange}
              type={"email"}
              style={{ fontSize: "35px", width: "450px" }}
            ></input>

            <OrderButton onClick={() => handleSubmit()}>
              Submit Email
            </OrderButton>
          </div>
          <OrderLink to="/Receipt" onClick={() => addDish()}>
            <OrderButton>Order</OrderButton>
          </OrderLink>
        </div>
      </Box>
    </Wrapper>
  );
}

export default Order;

export let enteredEmail = JSON.parse(localStorage.getItem("Emails") || "[]");

export let dishTotalCost;

export let tempEmail;

export let people;

const ClickButton = styled.button`
  background-color: transparent;
  align-self: center;
  cursor: pointer;
  border: none;
  height: 100px;
`;

const ArrowButton = styled.svg`
  height: 100px;
  margin: 0xp;
  padding: 0px;
`;

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
  display: grid;
  grid-template-columns: 2fr 4fr;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  border: 3px solid black;
  height: 600px;
  width: 1000px;
`;

const OrderLink = styled(Link)`
  align-self: flex-end;
  justify-self: end;
`;

const OrderButton = styled.button`
  color: white;
  background-color: #c16757;
  align-self: flex-end;
  cursor: pointer;
  font-size: large;
  border-radius: 20px;
  height: 75px;
  width: 225px;
  justify-self: end;
`;
