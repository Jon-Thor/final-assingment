import styled from "styled-components";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useHistory, useLocation } from "react-router-dom";

const Dish = () => {
  const history = useHistory();
  const location = useLocation();

  const [dish, setDish] = useState();

  let cost = 2200;

  if (location.savedEmail == undefined) {
    console.log("not found");
  }
  const addDish = (orderDish, dishImg, dishInstruct) => {
    history.push({
      pathname: "/Drinks",
      emailValue: location.emailValue,
      savedEmail: location.savedEmail,
      dishOrderList: {
        strMeal: orderDish,
        dishCost: cost,
        strMealThumb: dishImg,
        strInstructions: dishInstruct,
      },
    });
  };

  const getRandomDish = async () => {
    const res = await fetch("https://themealdb.com/api/json/v1/1/random.php");
    const body = await res.json();
    console.log(body);
    setDish(body.meals[0]);
  };

  useEffect(() => {
    if (location.savedEmail == undefined) {
      history.push("/");
    } else {
      if (location.savedEmail.length !== 0) {
        console.log(location.savedEmail["dishOrderList"]);
        setDish(location.savedEmail["dishOrderList"]);
      } else {
        getRandomDish();
      }
    }
  }, []);

  return (
    <Wrapper>
      <Header />
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <InnerBox>{dish && <Img src={dish.strMealThumb} />}</InnerBox>
            <MyLine />
            <BottomInnerbox>
              <OrderAndCost>
                {dish && <h2>{dish.strMeal}</h2>}
                <h2>{cost}kr</h2>
              </OrderAndCost>
              {dish && (
                <p style={{ fontSize: "small" }}>{dish.strInstructions}</p>
              )}
            </BottomInnerbox>
          </Box>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Smallerbox>
            <p>
              Click next to
              <br /> proceed to Drinks
            </p>

            <OrderButton
              onClick={() =>
                addDish(dish.strMeal, dish.strMealThumb, dish.strInstructions)
              }
            >
              Next
            </OrderButton>
          </Smallerbox>
          <GenerateNew onClick={() => getRandomDish()}>
            Get new dish
          </GenerateNew>
        </div>
      </div>
    </Wrapper>
  );
};

export default Dish;

const OrderAndCost = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0px 10px;
`;

const Img = styled.img`
  max-height: 100%;
  width: 100%;
`;

const MyLine = styled.hr`
  border: 2px solid black;
  background-color: black;
  width: 100%;
  margin: 0px;
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

const InnerBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  justify-content: start;
  height: 350px;
`;
const BottomInnerbox = styled(InnerBox)`
  padding: 10px;
  height: fit-content;
`;

const Box = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  border: 3px solid black;

  min-height: fit-content;
  width: 700px;
`;

const Smallerbox = styled(Box)`
  text-align: center;
  justify-content: space-around;
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
  &:hover {
    background-color: #a74e3e;
  }
  &:active {
    background-color: #c16757;
  }
`;

const GenerateNew = styled(OrderButton)`
  margin: 10px;
  align-self: center;
  justify-self: start;
`;
