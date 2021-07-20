import styled from "styled-components";

export const UserPresentation = styled.div`
  display: flex;
  border: 1px solid;
  padding: 10px;
  justify-content: space-between;

  .user-data {
    display: flex;
    img {
      width: 100px;
      height: 100px;
      border-radius: 10%;
      margin-right: 20px;
    }

    .username {
      font-family: "Poppins", sans-serif;
      font-size: 26px;
      font-weight: 600;
    }
  }

  .spotify-button {
    height: 30px;
    width: 30px;
    color: #0cb430;
    position: relative;
    top: -5px;
    background-color: #0cb430;
    border-radius: 5px;
    transition: transform 0.2s;

    a {
      color: white;
      display: grid;
      place-items: center;

      svg {
        height: 18px;
        width: 18px;
      }
    }

    &:hover {
      transform: scale(1.04);
    }
  }
`;
