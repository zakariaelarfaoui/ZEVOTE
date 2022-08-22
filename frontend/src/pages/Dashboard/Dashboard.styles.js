import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledDashboard = styled.section`
  min-height: 100vh;
  .dashboard__body {
    position: absolute;
    top: ${({ isSidebarOpen }) => (isSidebarOpen ? "0" : "60px")};
    left: ${({ isSidebarOpen }) => (isSidebarOpen ? "0" : "250px")};
    background-color: ${({ theme }) => theme.color.bgSecondary};
    color: ${({ theme }) => theme.color.primaryText};
    width: -moz-available;
    padding: 2rem 0;
  }
  .dashboard__body__list {
    background-color: ${({ theme }) => theme.color.bgPrimary};
  }
`;

export const DashboardBody = styled.section`
  position: absolute;
  top: ${({ isSidebarOpen }) => (isSidebarOpen ? "0" : "60px")};
  left: ${({ isSidebarOpen }) => (isSidebarOpen ? "0" : "250px")};
  width: -moz-available;
  padding: 2em;
  background-color: ${({ theme }) => theme.color.bgSecondary};
  color: ${({ theme }) => theme.color.primaryText};
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Title = styled.h3`
  color: #fff;
  margin: 0;
  padding: 0;
`;

export const AddButton = styled.button`
  /* background-color: ${({ theme }) => theme.color.secondaryText}; */
  background-color: #6576ff;
  color: #fff;
  border: none;
  border-radius: 2px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* width: 100px; */
  padding: 7px;
`;

export const Titl = styled.h1`
  margin: 0;
  font-size: 2rem;
`;

export const Container = styled.div`
  width: clamp(600px, 80%, 80%);
  margin: 0 auto;
`;

export const Add = styled(Link)`
  all: unset;
  padding: 5px 10px;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
`;

export const Heade = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
export const List = styled.article``;

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #087fd6;
`;

export const ListTitle = styled.h2`
  color: #087fd6;
`;

export const SeeMore = styled(Link)``;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 1rem;
  tr {
    border-bottom: 1px solid #ccc;
  }
  th {
    background-color: #f5f5f5;
    border-bottom: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
    font-weight: normal;
    font-size: 0.8rem;
  }
  td {
    padding: 0.5rem;
    text-align: left;
    font-size: 0.8rem;
  }
  tr:first-child {
    width: 60%;
  }
`;
