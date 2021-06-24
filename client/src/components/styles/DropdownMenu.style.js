import styled from "styled-components";

export const DropdownMainContainer = styled.div`
  width: 100%;
  padding: 0px 20px;

  .dropdown-menu-container {
    width: 100%;
    margin: auto;
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: end;
    font-size: 14px;
    margin-bottom: 20px;
    z-index: 100 !important;
    border-bottom: 1.5px solid rgba(150, 150, 150, 0.349);

    .dropdown {
      width: 120px;
      height: 27px;
      z-index: 3;

      .actual {
        height: 28px;
        border-radius: 5px;
        background-color: rgb(206, 75, 206);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        transition: all 0.2s;
        cursor: pointer;
        border: 0px;
        outline: none !important;
        padding: 0px 15px;
        text-transform: capitalize;
      }

      .actual:hover {
        background-color: rgb(177, 51, 177);
      }

      .dropdown-content {
        margin-top: 5px;
        border-radius: 5px;
        width: 100px;
        background: #fff;
        color: rgb(112, 112, 112);
        transition: all 0.2s;

        .dropdown-item {
          margin: auto;
          width: 90%;
          height: 28px;
          display: flex;
          align-items: center;
          background-color: #fff;
          padding-left: 6px;
          cursor: pointer;

          .dropdown-divisor {
            margin: auto;
          }
        }

        .dropdown-item h1 {
          text-transform: capitalize;
        }

        .dropdown-item:hover {
          color: rgb(61, 61, 61);
        }
      }

      .dropdown-show {
        opacity: 1;
      }

      .dropdown-hide {
        opacity: 0;
        z-index: -1;
        pointer-events: none;
      }
    }

    .search-container {
      width: 100%;
      margin-right: 10px;
      position: relative;
      top: 3px;
      border: 0px solid;
      display: flex;
      /* border-bottom: 1px solid; */

      input {
        width: 93%;
        height: 30px;
        background-color: transparent;
        outline: none;
        color: #868686;
        padding: 0 10px;
        font-family: "Hind", sans-serif;

        /* font-weight: 500; */
        font-size: 15px;

        ::placeholder {
          font-weight: 500;
          font-size: 14.5px;
          font-style: italic;
          opacity: 0.7;
        }
      }

      .icon {
        width: 5%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px !important;
        color: #afafaf;
        position: relative;
        top: 3px;
        transform: rotateY(180deg);

        @media (max-width: 649px) {
          transform: scale(1.6) rotateY(180deg);
        }
      }
    }

    .filter-button-container {
      display: flex;
      justify-content: space-around;

      .filter-button {
        width: 30px;
        height: 30px;
        border-radius: 0.25rem;
        background-color: rgba(0, 132, 255, 0.212);
        transition: all 0.1s;
        outline: none !important;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        padding: 3.5px !important;

        &:hover {
          background-color: rgba(0, 132, 255, 0.459);
          cursor: pointer;
        }
      }

      .showingFilter {
        background-color: rgba(0, 132, 255, 0.459);
        transform: scale(1.06);
      }

      .filter-icon {
        color: rgba(63, 63, 63, 0.425);
      }

      .list-icon {
        transform: scale(1.5);
        color: rgba(63, 63, 63, 0.425);
      }

      .selected-type {
        background-color: rgba(0, 132, 255, 0.459);
      }
    }

    .filter-container {
      position: relative;
      z-index: 2;

      .filters {
        box-shadow: rgba(0, 0, 0, 0.1) -10px 5px 12px;
        position: absolute;
        top: 40px;
        right: -20px;
        width: 230px;
        max-height: 500px;
        overflow-x: auto;
        border-radius: 5px;
        background-color: #fff;
        padding: 10px 15px;

        ::-webkit-scrollbar {
          width: 7px;
          padding: 5px;
          cursor: pointer;
        }

        ::-webkit-scrollbar-track {
          background-color: rgba(0, 132, 255, 0.459);
        }

        /* Track */
        ::-webkit-scrollbar-track {
          background: rgb(255, 255, 255);
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #b6b6b6;
          border-radius: 10px;
          transition: all 0.4s;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #9c9c9c;
          border-radius: 10px;
          transition: all 0.4s;
        }

        h1 {
          font-family: "Hind", sans-serif;
          font-size: 20px;
          color: #202a37;
          font-weight: 600;
        }

        .filter {
          width: 100%;
          height: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 13px 0px;
          cursor: pointer;

          p {
            font-family: "Montserrat", sans-serif;
            font-size: 13px;
            font-weight: 600;
            color: #6d6d6d;
            text-transform: capitalize;
          }

          input {
            cursor: pointer;
            width: 16px;
            height: 16px;
          }
        }

        > * {
          &:nth-child(1) {
            margin-top: 0px;
          }
        }
      }
    }
  }
`;
