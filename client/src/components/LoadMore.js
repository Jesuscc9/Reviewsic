import React from "react";
import { LoadMoreButton } from "./styles/LoadMore.style";

const LoadMore = ({ onLoadMore }) => {
  return (
    <LoadMoreButton
      onClick={() => {
        onLoadMore();
      }}
    >
      See More
    </LoadMoreButton>
  );
};

export default LoadMore;
