import styled from "styled-components";

export const Player = styled.div`
  @media (min-width: 650px) {
    .PlayerRSWP {
      background-color: #ffffff !important;
      border-radius: 10px;
      max-width: 280px;
      min-width: 280px;
      padding: 10px;
      height: 350px;
      box-shadow: rgba(132, 36, 153, 0.2) 0px 0px 7px;
    }

    button {
      outline: none !important;
    }

    ._SliderRSWP {
      position: relative;
      top: 200px;
      opacity: 1;
      z-index: 4;
    }

    ._ContentRSWP {
      display: block;
      margin-top: 10px;

      ._InfoRSWP {
        display: block !important;
        border-bottom: 0px !important;
      }

      .rswp__active {
        width: 260px;
        height: auto;

        img {
          width: 100px;
          height: 100px;
          margin: auto;
          border-radius: 0.25rem;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        }

        .__nnvdcq {
          text-align: center;
          width: 260px;
          padding: 0px;

          margin-top: 15px !important;

          p {
            font-family: "Montserrat", sans-serif;
            font-size: 12px;

            span {
              font-family: "Hind", sans-serif;
              font-size: 18px !important;
              font-weight: 600;
              color: #252525 !important;
              margin: auto;
            }
          }
        }
      }

      ._ControlsRSWP {
        margin-top: 60px;
        width: 100%;
      }

      ._ActionsRSWP {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0px 15px;

        div {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        ._VolumeRSWP {
          z-index: 4;
        }

        ._DevicesRSWP {
          z-index: 4;
        }
      }
    }

    .slider {
      height: 4px;
    }

    .content {
      width: 280px;
      height: 150px;
      border: 2px solid;
    }

    .controls {
      width: 45px;
      height: 48px;

      margin: auto;
      margin-top: 20px;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .play {
        min-width: 45px;
        height: 45px;
        background-color: #d29fff;
        color: white;
        border-radius: 15px;
        font-size: 14px;
        outline: none;
        pointer-events: all;
      }
    }
  }

  @media (max-width: 649px) {
    .PlayerRSWP {
      box-shadow: rgba(132, 36, 153, 0.2) 0px 0px 7px;
      background-color: rgba(255, 255, 255, 1) !important;
      height: 60px;
      /* backdrop-filter: blur(10px); */
    }

    button {
      outline: none !important;
    }

    ._SliderRSWP {
      opacity: 1;
      z-index: 4;
    }

    ._ContentRSWP {
      display: flex;

      flex-direction: row;
      justify-content: space-between;
      padding: 0px;
      height: 100%;

      > * {
        &:nth-child(1) {
          height: 60px;
        }
      }

      ._InfoRSWP {
        display: flex !important;
        /* border-bottom: 10px !important; */
      }

      .rswp__active {
        border-bottom: 0px;
        height: 100%;

        img {
          width: 60px;
          height: 60px;
          margin: auto;
          border-radius: 0.1rem;
        }

        .__nnvdcq {
          position: relative;
          bottom: 3px;

          p {
            font-family: "Montserrat", sans-serif;
            font-size: 13px;

            span {
              font-family: "Hind", sans-serif;
              font-size: 17px !important;
              font-weight: 600;
              color: #252525 !important;
            }
          }
        }
      }

      ._ControlsRSWP {
        padding: 0px;
        width: auto;

        svg {
          font-size: 20px;
        }

        > * {
          &:nth-child(1) {
            display: none;
          }
          &:nth-child(3) {
            display: none;
          }
        }
      }

      ._ActionsRSWP {
        width: auto;
        display: flex;
        position: initial;

        div {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0px;
        }

        ._VolumeRSWP {
          z-index: 4;
          display: none;
        }

        ._DevicesRSWP {
          z-index: 4;

          svg {
            font-size: 22px;
          }
        }
      }
    }
    ._SliderRSWP {
      position: relative;
      top: 0px;
    }
  }
`;
