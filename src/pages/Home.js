import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import App from "../App";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { enteredEmail } from "./OrderScreen";
import Carousel from "react-carousel-minimal/dist/components/Carousel";

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

  const data = [
    {
      image:
        "https://www.themealdb.com/images/media/meals/ssrrrs1503664277.jpg",
      caption: "Beef Sunday Roast",
    },
    {
      image: "https://www.themealdb.com/images/media/meals/1550441275.jpg",
      caption: "Smoked Haddock Kedgeree",
    },
    {
      image:
        "https://www.themealdb.com/images/media/meals/xqrwyr1511133646.jpg",
      caption: "Salted Caramel Cheescake",
    },
  ];

  const captionStyle = {
    fontSize: "1em",
    fontWeight: "bold",
  };

  return (
    <Wrapper>
      <Header />
      <div style={{ display: "flex" }}>
        <Box>
          <Carousel
            data={data}
            captionStyle={captionStyle}
            time={2000}
            automatic={true}
            dots={true}
            width="694px"
            height="344px"
            slideImageFit="cover"
          />
        </Box>
        <Smallerbox>
          <h3>Click the Button here to Order</h3>
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
        <EndOfHistoryCotainer
          style={{
            backgroundImage: `url(https://images.punkapi.com/v2/24.png)`,
          }}
        >
          <EndOfHistory>
            The End of History: The name derives from the famous work of
            philosopher Francis Fukuyama, this is to beer what democracy is to
            history. Complexity defined. Floral, grapefruit, caramel and cloves
            are intensified by boozy heat.
          </EndOfHistory>
        </EndOfHistoryCotainer>
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

const EndOfHistory = styled.p`
  background-color: rgba(0, 0, 0, 0.5);
  justify-self: end;
  align-self: end;
  font-size: 20px;
  color: #fff;
  padding: 10px;
  margin: 0px;
`;

const Box = styled.div`
  box-sizing: border-box;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  margin: 10px;
  border: 3px solid black;
  height: 350px;
  width: 700px;
`;

const Smallerbox = styled(Box)`
  padding: 25px;
  align-items: center;
  justify-content: space-between;
  width: 290px;
`;
const Bottomboxes = styled(Box)`
  padding: 25px;
  padding-top: 0px;
  background-size: contain;
  background-position: center;
  justify-content: space-between;
  width: 495px;
`;

const EndOfHistoryCotainer = styled(Bottomboxes)`
  justify-content: end;
  padding: 0px;
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
