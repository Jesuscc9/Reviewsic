import styled from "styled-components";

export const dropdown = styled.div`
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
  }

  .sort {
    width: 61px;
    height: 30px;
    text-align: center;
    border-radius: 10px;
    color: rgb(224, 55, 224);
    text-decoration: underline;
  }

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
  }

  .actual:hover {
    background-color: rgb(177, 51, 177);
  }

  .dropdown {
    width: 120px;
    height: 27px;
    z-index: 3;
  }

  .dropdown-item {
    margin: auto;
    width: 90%;
    height: 28px;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding-left: 6px;
    cursor: pointer;
  }

  .dropdown-item:hover {
    color: rgb(61, 61, 61);
  }

  .select-type {
    display: flex;
    justify-content: space-around;
  }

  .dropdown-divisor {
    margin: auto;
  }

  .dropdown-content {
    margin-top: 5px;
    border-radius: 5px;
    width: 100px;
    background: #fff;
    color: rgb(112, 112, 112);
    transition: all 0.2s;
  }

  .dropdown-show {
    opacity: 1;
  }

  .dropdown-hide {
    opacity: 0;
    z-index: -1;
    pointer-events: none;
  }

  .option-select-type {
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
  }

  .option-select-type:hover {
    cursor: pointer;
    transform: scale(1.06);
  }

  .cat-dot {
    width: 8px;
    height: 8px;
    border-radius: 2px;
    background: rgba(63, 63, 63, 0.425);
  }

  .cat-dot-list {
    width: 18px;
    max-height: 4.5px;
    min-height: 4.5px;
    border-radius: 2px;
    background: rgba(63, 63, 63, 0.425);
  }

  .list-icon {
    transform: scale(1.5);
    color: rgba(63, 63, 63, 0.425);
  }

  .selected-type {
    background-color: rgba(0, 132, 255, 0.459);
  }

  @media (max-width: 1270px) {
    .dropdown-menu-container {
      width: 78%;
    }
  }

  @media (max-width: 1000px) {
    .dropdown-menu-container {
      width: 86%;
    }
  }

  @media (max-width: 1000px) {
    .dropdown-menu-container {
      width: 90%;
    }
  }
`;
