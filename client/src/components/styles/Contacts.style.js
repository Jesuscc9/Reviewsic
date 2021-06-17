import styled from "styled-components";
import { motion } from "framer-motion";

export const Contacts = styled.div`
  width: 100%;
  background-color: #ffffff;
  max-height: 330px;
  min-height: 330px;
  min-width: 250px;
  max-width: 300px;
  border-radius: 30px;
  z-index: 1000;
  box-shadow: 0 5px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);

  .contact-header {
    width: 90%;
    margin: auto;
    padding-top: 10px;

    .contact-title {
      font-family: "Hind", sans-serif;
      font-size: 24px;
      color: #202a37;
      font-weight: 600;
    }
  }

  .contact-body {
    .divisor {
      max-width: 93%;
      margin: auto;
      height: 1px;
      background-color: rgba(160, 159, 159, 0.315);
      border-radius: 100px;
    }
  }

  a {
    &:hover {
      .activity-card {
        opacity: 1;
      }
    }
  }

  @media (max-width: 500px) {
    .contacts {
      width: 95%;
      background-color: #ffffff;
      min-height: 130px;
      border-radius: 30px;
      box-shadow: 0 5px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .contacts ::-webkit-scrollbar {
      width: 3px !important;
      height: 5px;
      padding: 3px !important;
      cursor: pointer;
      opacity: 0;
    }
    .contacts ::-webkit-scrollbar-track {
      background: rgb(255, 255, 255) !important;
    }

    .item-image-container {
      width: 40px;
    }

    .item {
      width: auto;
      border-left: 1px solid rgba(160, 159, 159, 0.315);
      border-right: 1px solid rgba(160, 159, 159, 0.315);
      padding: 0px 10px;
    }

    .item-info {
      display: none;
    }

    .item-info-status {
      display: none;
    }

    .item-name {
      font-size: 12px;
      word-break: break-all;
    }

    .item-status {
      width: 20px;
    }

    .divisor {
      visibility: hidden;
    }

    .contact-body {
      display: flex;
      width: 98%;
      margin: auto;
      border-top: 1px solid rgba(160, 159, 159, 0.315);
      border-bottom: 1px solid rgba(160, 159, 159, 0.315);
      overflow-x: scroll;
      overflow-y: hidden;
      padding-top: 5px;
    }
  }
`;

export const Item = styled(motion.div)`
  width: 100%;
  margin: auto;
  display: flex;
  padding: 7px 5%;

  .item-image-container {
    min-width: 50px;
    display: flex;
    align-items: center;
  }

  .item-info {
    min-width: 170px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    margin-bottom: 3px;
  }

  .item-name {
    font-family: "Montserrat", sans-serif;
    font-size: 15px;
    color: rgb(48, 48, 48);
    font-weight: 100;
    height: 18px;
    margin-bottom: 2px;
    text-transform: capitalize !important;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 170px;

    &:hover {
      text-decoration: underline;
    }
  }

  .item-info-status {
    font-family: "Hind", sans-serif;
    font-size: 14px;
    height: 14px;
    font-weight: 500;
    color: rgb(134, 134, 134);
    letter-spacing: 0.2px;
  }

  .item-status {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-status img {
    min-width: 33px;
    max-width: 33px;
    max-height: 37px;
    border-radius: 1px;
  }

  .status {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: green;
  }

  &:hover {
    .activity-container {
      display: flex;
      opacity: 1;
      transform: translateX(0px);
      pointer-events: all;
    }
  }

  z-index: 2;
`;

export const ActivityCard = styled.div`
  position: relative;
  right: calc(100% + 265px);
  top: -7px;

  .activity-container {
    display: flex;
    position: absolute;
    width: 250px;
    height: 100px;
    background-color: white;
    /* opacity: 1; */
    opacity: 0;
    transition: all 0.2s;
    transform: translateX(20px);
    /* transform: translateX(0px); */
    z-index: 1;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 3px 15px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: rgba(99, 99, 99, 0.2) -5px 2px 8px 0px;
    flex-wrap: wrap;
    align-content: space-around;
    pointer-events: none;

    &:hover {
      pointer-events: all;
    }

    p {
      font-family: "Hind", sans-serif;
      font-size: 14px;
      color: #4b4b4b;
      font-weight: 600;
    }

    .activity-content {
      width: 100%;
      display: flex;
      margin-bottom: 10px;

      img {
        border-radius: 3px;
        width: 50px;
        height: 50px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      }

      .song-data {
        margin-left: 15px;

        p {
          font-size: 16px;
          font-weight: 600;
          color: #000;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        a {
          &:hover {
            text-decoration: underline;
          }
        }

        .artist-name {
          font-size: 14px;
          color: #7c7c7c;
          font-weight: 400;
        }
      }
    }
  }
`;
