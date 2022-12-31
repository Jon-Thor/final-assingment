import styled, { css } from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  let pathName = location.pathname;

  const styles = {
    [pathName]: {
      color: "red",
    },
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Link to="/">
        <Logo src="http://ih1.redbubble.net/image.181146356.8650/sticker,375x360.u1.png" />
      </Link>

      <Link to="/Dish">
        <TopMenuItem style={styles["/Dish"]}>Dish</TopMenuItem>
      </Link>

      <Link to="/Drinks">
        <TopMenuItem style={styles["/Drinks"]}>Drinks</TopMenuItem>
      </Link>

      <Link to="/Order">
        <TopMenuItem style={styles["/Order"]}>Order</TopMenuItem>
      </Link>

      <Link to="/Receipt">
        <TopMenuItem style={styles["/Receipt"]}>Receipt</TopMenuItem>
      </Link>
    </div>
  );
};

export default Header;

const TopMenuItem = styled.header`
  padding-bottom: 30px;
  margin: 30px;
  margin-bottom: 40px;
  margin-top: 80px;
  color: black;
  font-weight: bold;
  font-size: 40px;
`;
const Logo = styled.img`
  width: 200px;
  margin-left: 15px;
  margin-right: 30px;
`;
