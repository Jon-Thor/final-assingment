import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import App from "../App";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { drinkOrderList } from "./Drinks";
import { DishOrderList } from "./Dish";
import { dishTotalCost, people, tempEmail } from "./OrderScreen";

function Receipt() {
  console.log(tempEmail);

  let totalCost =
    drinkOrderList.reduce((a, b) => {
      return a + b.ordercost;
    }, 0) + dishTotalCost;

  return (
    <Wrapper>
      <Header />
      <OrderLink to="/">
        <OrderButton>Back to Home</OrderButton>
      </OrderLink>
      <Box>
        <h2>Receipt</h2>
        <OrderContainer>
          <Orders>
            {DishOrderList.strMeal}*{people}
          </Orders>
          <Orders>{dishTotalCost}kr</Orders>
        </OrderContainer>
        {drinkOrderList.map((item) => (
          <OrderContainer key={item.id}>
            <Orders>{item.drinkorder}</Orders>
            <Orders>{item.ordercost}kr</Orders>
          </OrderContainer>
        ))}
        <p>{tempEmail}</p>
        <p>
          Total Cost:
          {totalCost}
        </p>
      </Box>
    </Wrapper>
  );
}

export default Receipt;

const Orders = styled.p`
  padding: 10px 5px;
  margin: 10px 5px;
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
  display: flex;
  flex-direction: column;
  margin: 10px;
  border: 3px solid black;
  min-height: 600px;
  width: 600px;
  padding: 0px 10px;
`;

const OrderContainer = styled.div`
  display: flex;
`;

const OrderLink = styled(Link)`
  align-self: flex-end;
  justify-self: end;
`;

const OrderButton = styled.button`
  color: white;
  background-color: #c16757;
  cursor: pointer;
  font-size: large;
  border-radius: 20px;
  height: 75px;
  width: 225px;
`;
