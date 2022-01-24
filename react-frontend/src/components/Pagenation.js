import React from 'react';
import styled from 'styled-components';
const PageUl = styled.ul`
  float: left;
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: white;
  padding: 1px;
  border-top: 3px solid #186ead;
  border-bottom: 3px solid #186ead;
  background-color: rgba(0, 0, 0, 0.4);
`;
const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  width: 25px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
  }
  &:focus::after {
    color: white;
    background-color: #263a6c;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }
`;

const Pagenation = ({ totalpage, page, pageHandler }) => {
  const pageNumbers = [];
  //loop 5

  if (page === 1) {
    //When the received page value is 1, the image of pagination as it is
    for (let i = 0; i < 5; i++) {
      pageNumbers.push(page + i);
    }
  } else if (page === 2) {
    //When the received page value is 2, display the same page as when it is 1.
    for (let i = 0; i < 5; i++) {
      pageNumbers.push(page + i - 1);
    }
  } else if (page < 1) {
    //when negative
    alert('That page does not exist');
    return;
  } else {
    //In other cases, +-2 pages are displayed rather than the corresponding page.
    for (let i = 0; i < 5; i++) {
      pageNumbers.push(page + i - 2);
    }
  }

  return (
    <>
      <PageUl className="pagination">
        {pageNumbers.map((number) => {
          return (
            <PageLi
              className="page-item"
              onClick={() => pageHandler({ number })}
            >
              <PageSpan>{number}</PageSpan>
            </PageLi>
          );
        })}
      </PageUl>
    </>
  );
};

export default Pagenation;
