import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import { Link, useHistory } from "react-router-dom";

const Drinks = () => {
  let history = useHistory();

  const [drinks, setDrinks] = useState();

  const [sold, setSold] = useState({});

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
    drinkOrderList = [];
    drinkID = 0;
  }, []);

  const AddDrink = (drink, cost, itemid) => {
    drinkOrderList.push({ drinkorder: drink, ordercost: cost, id: drinkID });
    console.log(drinkOrderList);
    console.log(cost);
    drinkID++;
    if (sold[itemid] === undefined) {
      setSold({
        ...sold,
        [itemid]: !sold[itemid],
      });
    }
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
                  onClick={() => {
                    AddDrink(item.name, costList[item.id - 1], item.id);
                  }}
                >
                  <p>{costList[item.id - 1]}kr</p>
                  {sold[item.id] && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <CheckMark
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <DrinkName>{item.name}</DrinkName>
                </Img>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </Box>
        </div>
        <Smallerbox>
          <p>
            Click next to
            <br /> proceed to Order
          </p>

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

export let drinkID = 0;

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

const CheckMark = styled.path`
  color: green;
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
  text-align: center;
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
