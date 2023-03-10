import styled from "styled-components";
import { useState, useEffect } from "react";
import "../App.css";
import Header from "../components/Header";
import { Link, useHistory, useLocation } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";

let dishTotalCost;

let tempEmail = "";

let enteredEmail = JSON.parse(localStorage.getItem("Emails") || "[]");

function Order() {
  const history = useHistory();
  const location = useLocation();

  var dishOrderList = location.dishOrderList;
  const [count, setCount] = useState(1);

  const [email, setEmail] = useState("");

  const [submitMessage, setsubmitMessage] = useState("Submit Email");

  const [value, onChange] = useState(new Date());

  const [orderText, setOrderText] = useState("Order");

  useEffect(() => {
    if (location.savedEmail == undefined) {
      history.push("/");
    } else {
      if (location.emailValue.length != 0) {
        for (let i = 0; i < enteredEmail.length; i++) {
          if (location.emailValue.email === enteredEmail[i].email) {
            location.savedEmail["dishOrderList"] = location.dishOrderList;
            enteredEmail[i] = location.emailValue;
            console.log(location.savedEmail);
            tempEmail = location.emailValue.email;
            setsubmitMessage("Email Updated");
            localStorage.setItem("Emails", JSON.stringify(enteredEmail));
            setOrderText("Update Order");

            return;
          }
        }
      }
      tempEmail = "";
    }
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const handleClick = (i) => {
    if (count + i >= 11 || count + i <= 0) {
      return;
    }
    setCount(count + i);
  };

  const checkTime = () => {
    return (
      value.getHours() >= 16 &&
      value.getHours() < 23 &&
      value.getDay() != 6 &&
      value.getDay() != 0
    );
  };

  const handleSubmit = () => {
    if (/\S+@\S+\.\S+/.test(email)) {
      for (let i = 0; i < enteredEmail.length; i++) {
        if (email in enteredEmail[i]) {
          enteredEmail[i] = { [email]: { dishOrderList }, email: email };
          tempEmail = email;
          setsubmitMessage("Email Updated");
          localStorage.setItem("Emails", JSON.stringify(enteredEmail));
          console.log(enteredEmail);
          return;
        }
      }
      tempEmail = email;
      enteredEmail.push({ [email]: { dishOrderList }, email: email });
      setsubmitMessage("Email Submitted");
      localStorage.setItem("Emails", JSON.stringify(enteredEmail));
      console.log(JSON.parse(localStorage.getItem("/Emails")));
    } else {
      setsubmitMessage("Invalid Email");
    }
  };

  const addDish = () => {
    if (tempEmail.length === 0) {
      setsubmitMessage("Please Submit a Email");
    }
    if (!checkTime()) {
      alert("please choose betweeen Mon-fri 16:00 - 23:00");
    }
    if (checkTime() && tempEmail.length !== 0) {
      dishTotalCost = location.dishOrderList.dishCost * count;
      console.log(value.toLocaleDateString("en-gb", options));
      let sendDate = value.toLocaleDateString("en-gb", options).toString();
      console.log(dishTotalCost);
      history.push({
        pathname: "/Receipt",
        emailValue: location.emailValue,
        savedEmail: location.savedEmail,
        dishOrderList: location.dishOrderList,
        drinks: location.drinks,
        dishTotalCost: dishTotalCost,
        count: count,
        timeAndDate: sendDate,
        email: tempEmail,
      });
    }
  };

  return (
    <Wrapper>
      <Header />
      <Box>
        <CalendarContainer>
          <p>
            Select a date between <br /> Mon-fri 16:00-23:00 here
          </p>
          <DateTimePicker
            onChange={onChange}
            value={value}
            minDate={new Date()}
            locale="en-gb"
            clearIcon={null}
            calendarIcon={null}
          />
        </CalendarContainer>

        <EmailOrderDiv>
          <PeopleCountDiv>
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
          </PeopleCountDiv>

          <label>{submitMessage}</label>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <input
              onChange={(e) => setEmail(e.target.value)}
              type={"email"}
              style={{ fontSize: "35px", width: "450px" }}
            ></input>

            <OrderButton onClick={() => handleSubmit()}>
              Submit Email
            </OrderButton>
          </div>
          <OrderButton onClick={() => addDish()}>{orderText}</OrderButton>
        </EmailOrderDiv>
      </Box>
    </Wrapper>
  );
}

export default Order;

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

const CalendarContainer = styled.div`
  border: 1px solid black;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmailOrderDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100%;
  justify-content: space-around;
}}
`;

const PeopleCountDiv = styled.div`
  width: 275px;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
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
  width: 1200px;
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
  margin 10px;
  &:hover {
    background-color: #a74e3e;
  }
  &:active {
    background-color: #c16757;
  }
`;
