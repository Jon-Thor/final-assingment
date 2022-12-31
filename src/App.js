import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Dish from "./pages/Dish";
import Order from "./pages/OrderScreen";
import Drinks from "./pages/Drinks";
import Receipt from "./pages/Receipt";

function App() {
  return (
    <Router>
      <Wrapper className="App-header">
        <Switch>
          <Route path="/Dish">
            {" "}
            <Dish />
          </Route>
          <Route path="/Order">
            {" "}
            <Order />
          </Route>
          <Route path="/Drinks">
            {" "}
            <Drinks />
          </Route>
          <Route path="/Receipt">
            <Receipt />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Wrapper>
    </Router>
  );
}

export default App;

const Wrapper = styled.div`
  background-color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

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

const TopMenuItem = styled.header`
  padding-top: 15px;
  margin: 30px;
  margin-bottom: 40px;
  margin-top: 80px;
  color: red;
  font-weight: bold;
  font-size: 30px;
`;
const Logo = styled(TopMenuItem)`
  padding: 15px 30px;
  color: white;
  background-color: black;
`;

const OrderButton = styled.button`
  color: white;
  background-color: red;
  font-size: large;
  border-radius: 20px;
  height: 75px;
  width: 225px;
`;
