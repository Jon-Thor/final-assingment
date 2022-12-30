import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import App from "../App";
import Header from "../components/Header";
import { Link, useHistory } from "react-router-dom";
import Receipt from "./Receipt";
import { savedEmail } from "./Home";

const Drinks = () => {
  let history = useHistory();

  let drinkID = 0;

  drinkOrderList = savedEmail["drinkOrderList"] || [];

  if (Object.values(savedEmail).length != 0) {
    drinkID =
      savedEmail["drinkOrderList"][savedEmail["drinkOrderList"].length - 1][
        "id"
      ] + 1;
  }

  const [drinks, setDrinks] = useState();

  let drinkCost = 450;

  const costList = Array.from({ length: 26 }, () => (drinkCost += 50));

  const getDrinks = async () => {
    const res = await fetch("https://api.punkapi.com/v2/beers");
    const body = await res.json();
    console.log(body);
    setDrinks(body);
  };

  useEffect(() => {
    getDrinks();
  }, []);

  const AddDrink = (drink, cost) => {
    drinkOrderList.push({ drinkorder: drink, ordercost: cost, id: drinkID });
    console.log(drinkOrderList);
    console.log(cost);
    drinkID++;
  };

  const handleLinkClick = () => {
    if (drinkOrderList.length === 0) {
      return;
    }
    history.push("/Order");
  };

  return (
    <Wrapper>
      <Header />
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <Box>
            {drinks ? (
              drinks.map((item) => (
                <Img
                  key={item.id}
                  style={{ backgroundImage: `url(${item.image_url})` }}
                  onClick={() =>
                    AddDrink(item.name, costList[item.id - 1], item.id)
                  }
                >
                  <p>{costList[item.id - 1]}kr</p>
                  <DrinkName>{item.name}</DrinkName>
                </Img>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </Box>
        </div>
        <Smallerbox>
          <p>A</p>

          <OrderButton
            onClick={() => {
              handleLinkClick();
            }}
          >
            Next
          </OrderButton>
        </Smallerbox>
      </div>
    </Wrapper>
  );
};

export default Drinks;

export let drinkOrderList = [];

const Wrapper = styled.div`
  align-items: center;
  background-color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  color: black;
`;

const DrinkName = styled.p`
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 10px;
  margin: 0px;
`;

const Img = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
  border: 4px solid black;
  margin: 10px;
  width: 300px;
  height: 300px;
`;

const Box = styled.div`
  padding: 0px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 10px;
  border: 3px solid black;
`;

const Smallerbox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 10px;
  border: 3px solid black;
  width: 290px;
  height: 300px;
`;

const OrderButton = styled.button`
  cursor: pointer;
  color: white;
  background-color: #c16757;
  font-size: large;
  border-radius: 20px;
  height: 75px;
  padding: 20px;
  min-width: 225px;
  max-width: fit-content;
`;
