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
  justify-content: space-between;
  padding-bottom: 80px;

  .sidebar {
    width: 300px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    height: 800px;
    position: -webkit-sticky;
    position: sticky;
    top: 82px;
    z-index: 2;

    .player-container {
      transition: all 0.2s;
    }
  }

  @media (max-width: 650px) {
    width: 95%;
    max-width: 95%;
    flex-direction: column-reverse;
    display: flex;
    justify-content: center;

    .sidebar {
      position: initial;
      height: auto;
      min-width: 100%;

      .player-container {
        position: fixed;
        bottom: -1px;
        left: 0px;
        width: 100%;
      }
    }
  }
`;

export const ContentContainer = styled(motion.div)`
  width: 65%;
  margin-right: 40px;

  @media (max-width: 649px) {
    margin: auto;
    width: 95%;
  }
`;
