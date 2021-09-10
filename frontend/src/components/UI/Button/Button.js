// import styled from "styled-components";
import "./Button.css";
// const Button = styled.button`
//   display: inline-block;
//   padding: 7px 30px;
//   border: none;
//   outline: none;
//   font-size: 1.4rem;
//   background-color: rgb(49, 211, 8);
//   border-radius: 10px;
//   color: #ffffff;
//   &:focus {
//     outline: none;
//   }
//   &:hover {
//     background-color: white;
//     color: rgb(49, 211, 8);
//     border: 1px solid rgb(49, 211, 8);
//   }
// `;
const Button = (props) => {
  let classes = "btn " + props.className;
  return <button className={classes}>{props.children}</button>;
};

export default Button;
