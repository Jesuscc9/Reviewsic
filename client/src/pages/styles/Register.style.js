import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";

export const GlobalStyles = createGlobalStyle`
  body {
    height: 100%;
    margin: 0;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background: rgb(223, 241, 255);
    background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(rgba(223, 241, 255, 1)),
        to(rgba(222, 197, 255, 0.383))
      )
      fixed;
    overflow-y: auto;
  }

  html {
    scroll-behavior: smooth;
  }

  ::-webkit-scrollbar {
    width: 15px;
    padding: 5px;
    cursor: pointer;
  }

  body::-webkit-scrollbar-track {
    background-color: #1f2937;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: rgb(223, 241, 255);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #3d4e6b;
    border-radius: 10px;
    transition: all 0.4s;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #3d4e6b;
    border-radius: 10px;
    transition: all 0.4s;
}

`;

export const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  min-width: 100%;
`;

export const MainContainer = styled.div`
  width: 90%;
  max-width: 90%;
  margin: auto;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  padding-bottom: 80px;

  @media (max-width: 500px) {
    width: 90%;
    max-width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column-reverse;
  }

  .sidebar {
    width: 300px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    height: 800px;
    border: 1px solid;
  }
`;

export const ContentContainer = styled(motion.div)`
  width: 70%;
`;

// @media (max-width: 500px) {

//   .card-container {
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
//     width: 90%;
//     max-width: 90%;
//     margin: auto;
//   }
// }
