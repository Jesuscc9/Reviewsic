import styled, { createGlobalStyle, keyframes } from "styled-components";

const RotateAnim = keyframes`
  0% {
    transform: rotate(3deg);
  }

  50% {
    transform: rotate(6deg);
  }

  100% {
    transform: rotate(3deg);
  }
`;

const Gradient = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;

const shine = keyframes`
	0% {
    transform:translateX(-100%);
  }
  70%{
    transform:translateX(-100%);
  }
	100% {
    transform:translateX(100%);
    }
`;

export const GlobalStyles = createGlobalStyle`

  html{
    scroll-behavior: smooth;
  }

  body{
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  footer{
    position: relative;
  }
`;

export const Navbar = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;
  min-width: 100%;
  position: fixed;
  top: 0px;
  background-color: #fff;
  transition: all 0.4s;
  box-shadow: ${(props) =>
    props.shadowed && "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"};
  z-index: 100;

  .title {
    display: flex;
    justify-content: space-around;
    align-items: center;

    img {
      width: 35px;
      height: 35px;
      margin-right: 20px;
    }

    h1 {
      font-size: 28px;
      font-family: "Source Sans Pro", sans-serif;
      font-weight: 600;
      color: #9d60ff;
    }
  }

  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .link {
      margin: 0px 20px;

      @media (max-width: 600px) {
        margin: 0px 10px;
      }

      &:hover {
        .line {
          width: 100%;
        }
      }

      a {
        margin: 0px;
        color: #9e9e9e;
        font-family: "Poppins", sans-serif;
        font-size: 16px;
        font-weight: 500;
      }

      .line {
        width: 0;
        height: 2px;
        background-color: #b181ff;
        border: 2px;
        transition: all 0.1s;
        margin: auto;
      }

      .selected-line {
        width: 100%;
      }
    }

    .signin-button {
      background-color: rgb(63, 94, 251);
      padding: 3px 13px;
      border-radius: 4px;

      a {
        color: white;
        font-size: 15px;
      }

      .line {
        opacity: 0;
      }
    }
  }

  @media (max-width: 600px) {
    padding: 5px 10px;
  }
`;

export const MainContainer = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 7vh;

  .first-container {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-top: 50px;

    .content {
      width: 600px;
      /* height: 80vh; */
      padding-left: 40px;
      padding-top: 70px;

      h1 {
        font-size: 90px;
        font-family: "PT Sans", sans-serif;
        font-weight: 900;
        color: rgba(63, 94, 251, 1);
        line-height: 120%;
      }

      .line {
        margin-top: 30px;
        width: 120px;
        height: 3px;
        border-radius: 10px;
        background-color: rgb(63, 94, 251);
        margin-left: 5px;
      }

      p {
        margin-top: 30px;
        font-size: 16px;
        font-family: "Poppins", sans-serif;
        margin-left: 5px;
        color: #949494;
        font-weight: 450;
      }

      button {
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        font-size: 15px;
        margin-top: 40px;
        width: 140px;
        height: 45px;
        background: rgb(132, 63, 251);
        background: linear-gradient(
          120deg,
          rgba(183, 70, 252, 1) 0%,
          rgba(63, 94, 251, 1) 100%
        );
        border-radius: 10px;
        background-size: 150% 100%;
        color: white;
        outline: none;
        transition: all 0.3s;
        transform: skew(-20deg);
        display: grid;
        place-items: center;

        &:after {
          content: "";
          top: 0;
          width: 100%;
          height: 45px;
          position: absolute;
          z-index: 1;
          animation: ${shine} 5s infinite;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(128, 186, 232, 0) 99%,
            rgba(125, 185, 232, 0) 100%
          );
        }

        span {
          color: white;
          transform: skew(20deg);
          transition: all 0.1s;
          margin: 0px;
        }

        &:hover {
          span {
            transform: skew(0deg);
          }
          &:after {
            background: transparent;
            animation: none;
          }
          transform: skew(0deg) scale(1.01);
        }
      }

      @media (max-width: 1293px) {
        padding-top: 0px;
        margin-top: -30px;
      }
    }

    .image-container {
      width: 550px;
      padding-top: 20px;
      display: flex;
      justify-content: center;

      @media (max-width: 1293px) {
        padding-top: 40px;
        transform: scale(0.9);
      }

      .background-image {
        position: relative;
      }

      .phone {
        height: 600px;
        margin: auto;
        animation: ${RotateAnim} 10s linear infinite;
        pointer-events: none;
      }
    }
  }

  .second-container {
    margin: auto;
    margin-bottom: 20px;

    h1 {
      margin-bottom: 150px;
      font-size: 60px;
      text-align: center;
      font-weight: 600;
      color: #5a5a5a;
      font-family: "PT Sans", sans-serif;
      margin-top: 100px;
    }

    .features {
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;

      .feature {
        min-width: 230px;
        width: 230px;
        height: 300px;
        background: #7f7fd5; /* fallback for old browsers */
        background: -webkit-linear-gradient(
          to right,
          rgba(145, 234, 228, 0.9),
          rgba(134, 168, 231, 0.9),
          rgba(127, 127, 213, 0.9)
        );

        background: linear-gradient(
          120deg,
          rgba(145, 234, 228, 0.9),
          rgba(134, 168, 231, 0.9),
          rgba(127, 127, 213, 0.9)
        );
        border-radius: 1em;
        backdrop-filter: blur(10px);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        margin: 20px 0px;
        padding: 15px;
        transition: all 0.2s;

        .header {
          height: 100px;

          img {
            position: relative;
            top: -50px;
            margin: auto;
          }
        }

        .body {
          font-family: "Poppins", sans-serif;
          text-align: center;
          color: white;
        }

        &:hover {
          cursor: pointer;
          transform: scale(1.03) rotate(2deg);
        }
      }

      .first {
        .header {
          height: 160px;

          img {
            top: -100px;
            width: 180px;
            transform: scale(1.3);
          }
        }
      }

      .second {
        margin: 20px 40px;
        @media (max-width: 972px) {
          margin: 150px 40px;
        }

        .header {
          height: 160px;

          img {
            top: -100px;
            transform: scale(1.3);
          }
        }

        background: #f12711;
        background: -webkit-linear-gradient(
          120deg,
          rgba(245, 175, 25, 0.7),
          rgba(241, 39, 17, 0.7)
        );
        background: linear-gradient(
          120deg,
          rgba(245, 175, 25, 0.7),
          rgba(241, 39, 17, 0.7)
        );
        backdrop-filter: opacity(20%);

        &:hover {
          cursor: pointer;
          transform: scale(1.03) rotate(-2deg);
        }
      }

      .third {
        .coming-soon-container {
          position: relative;

          .coming-soon {
            position: absolute;
            top: 250px;
            left: 160px;
            width: 100px;
            padding: 2px 0px;
            transform: rotate(-45deg);
            background-color: rgb(63, 94, 251);
            border-radius: 10px;
            color: white;
            font-size: 12px;
            text-align: center;

            p {
              margin-top: 0px;
            }
          }
        }

        @media (max-width: 1024px) {
          margin-top: 130px;
        }

        @media (max-width: 972px) {
          margin-top: 0px;
        }

        .header {
          height: 130px;
          img {
            transform: scale(1.6);
          }
        }

        background: #fc5c7d;
        background: -webkit-linear-gradient(
          to right,
          rgba(106, 130, 251, 0.7),
          rgba(252, 92, 125m 0.8)
        );
        background: linear-gradient(
          120deg,
          rgba(106, 130, 251, 0.7) 15%,
          rgba(252, 92, 125, 0.8) 100%
        );
      }
    }
  }

  .third-container {
    width: 85%;
    margin: auto;
    margin-bottom: 20px;

    h1 {
      margin: 130px 20px;
      margin-top: 200px;
      font-size: 60px;
      text-align: center;
      font-weight: 600;
      color: #5a5a5a;
      font-family: "PT Sans", sans-serif;

      @media (max-width: 1293px) {
        margin-top: 100px;
      }
    }

    .releases {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      @media (max-width: 972px) {
        justify-content: center;
      }

      margin-top: 50px;
      margin-bottom: 70px;

      .release-container {
        padding: 10px 0px;
        .ball-decoration {
          position: relative;

          .ball {
            position: absolute;
            top: -70px;
            left: 230px;
            width: 180px;
            height: 180px;
          }

          .ballsecond {
            top: 0px;
            left: 200px;
            width: 260px;
            height: 260px;
          }

          .ballthird {
            top: -70px;
            left: 200px;
            width: 230px;
            height: 230px;
          }
        }
      }

      .second-release {
        @media (max-width: 972px) {
          margin: 60px 0px;
        }
      }

      .third-release {
        @media (max-width: 1293px) {
          margin-top: 50px;
        }
        @media (max-width: 972px) {
          margin-top: 00px;
        }
      }

      .release {
        min-width: 325px;
        min-height: 140px;
        margin: 0 20px;
        border-radius: 1.25rem;
        padding: 15px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: linear-gradient(
          120deg,
          rgba(112, 96, 228, 0.7) 0%,
          rgba(242, 113, 114, 0.7) 100%
        );
        backdrop-filter: blur(4px);
        transition: all 0.3s;

        .image-container {
          width: 110px;
          height: 110px;
          padding: 0px;
          margin-right: 20px;

          img {
            border-radius: 1rem;
            margin: 0px;
          }
        }

        .song-data {
          font-family: "Montserrat", sans-serif;

          .song {
            font-size: 18px;
            font-weight: 600;
            color: #fff;
          }

          .artist {
            font-size: 14px;
            font-weight: 600;
            color: #3a3a3a;
            margin-bottom: 10px;
          }

          .genre {
            font-size: 14px;
            font-weight: 600;
            color: #3a3a3a;
          }
        }

        &:hover {
          cursor: pointer;
          cursor: pointer;
          transform: translateX(3px) translateY(-3px);
          box-shadow: rgba(192, 15, 216, 0.3) 0px 48px 100px 0px;
        }
      }

      .second {
        background: linear-gradient(
          to right,
          rgba(150, 201, 61, 0.6),
          rgba(0, 176, 155, 0.6)
        );

        &:hover {
          cursor: pointer;
          cursor: pointer;
          transform: translateX(5px) translateY(-5px);
          box-shadow: rgba(19, 182, 82, 0.3) 0px 48px 100px 0px;
        }
      }

      .third {
        background: linear-gradient(
          to right,
          rgba(208, 168, 147, 0.8) 10%,
          rgba(219, 166, 69, 0.7)
        );

        &:hover {
          cursor: pointer;
          cursor: pointer;
          transform: translateX(5px) translateY(-5px);
          box-shadow: rgba(208, 168, 147, 0.4) 0px 48px 100px 0px;
        }
      }
    }
  }
`;

export const DecorationSquare = styled.div`
  position: absolute;
  width: 450px;
  height: 450px;
  left: -20px;
  background: rgb(63, 94, 251);
  background: linear-gradient(
    90deg,
    rgba(63, 94, 251, 1) 0%,
    rgba(252, 70, 107, 1) 100%
  );
  background-size: 200% 200%;
  animation: ${Gradient} 5s ease infinite;
  z-index: -1;
  border-radius: 40px;
  transform: translateY(15%) rotate(30deg);
`;
