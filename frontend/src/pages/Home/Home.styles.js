import styled from "styled-components";

export const List = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

export const ListItem = styled.article`
  position: relative;
  background-color: #f5f5f5;
  padding: 0.5rem 1rem;
  width: 250px;
  border-radius: 5px;
  box-shadow: 1px 1px 3px 1px #c6c4c4;
  margin-right: 20px;
`;

export const Title = styled.span`
  color: #087fd6;
  display: block;
`;

export const VoterStatus = styled.span`
  display: block;
`;

export const CloseDate = styled.span`
  display: block;
`;

export const VotePage = styled.button`
  all: unset;
  position: absolute;
  right: 10px;
  bottom: 10px;
  background-color: #087fd6;
  color: #fff;
  padding: 0 10px;
  border-radius: 5px;
`;

export const Heading = styled.h2`
  color: #087fd6;
`;

export const Line = styled.hr`
  color: #087fd6;
`;
