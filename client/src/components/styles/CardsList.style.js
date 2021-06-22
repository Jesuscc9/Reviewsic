import styled from "styled-components";

export const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  z-index: 2;
  @media (max-width: 866px) {
    justify-content: center;
    margin: auto;
  }
  /* @media (max-width: 649px) {
    padding-bottom: 90px;
  } */
`;
