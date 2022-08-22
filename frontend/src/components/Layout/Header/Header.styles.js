import { FaUserCircle } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";
import styled from "styled-components";

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.color.bgPrimary};
  color: ${({ theme }) => theme.color.primaryText};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  position: fixed;
  top: 0;
  left: 250px;
  width: calc(100% - 250px);
  height: 60px;
  z-index: 1;
  display: flex ;
`;

export const User = styled.article`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 1rem;
  cursor: pointer;
`;

export const Avatar = styled.img`
  width: 35px;
  height: 35px;
  background: red;
  border-radius: 50%;
`;

// export const Avatar = styled(faUserCircle)`
//   font-sie
// `;

export const AvatarPlaceHolder = styled(FaUserCircle)`
  color: #6576ff;
`;

export const ToggleSidebar = styled.button`
  display: block;
  @media (max-width: 970px) {
    display: inline;
  }
`;

export const Info = styled.div`
  margin-left: 1rem;
`;

export const Role = styled.div`
  display: block;
  font-size: 12px;
  color: ${({ theme }) => theme.color.secondaryText};
`;

export const FullName = styled.div`
  display: block;
  font-size: 14px;
  color: #fff;
`;

export const DropdownToggle = styled(RiArrowDownSLine)`
  margin-top: auto;
  margin-bottom: 13px;
  color: #fff;
  margin: auto 0 13px 3px;
`;

export const Dropdown = styled.article`
  display: ${({ isDropdownOpen }) => (isDropdownOpen ? "block" : "none")};
  position: absolute;
  background: #18212d;
  color: #b6c6e3;
  top: 60px;
  width: 250px;
  right: 1rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 5px;
  box-shadow: 0px 3px 9px -2px rgba(0, 0, 0, 0.42);
`;

export const DropdownHeader = styled.header`
  background: ${({ theme }) => theme.color.bgSecondary};
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem 1.5rem;
  border-top: 3px solid #6576ff;
`;

export const DropdownInfo = styled.div`
  margin-left: 1rem;
`;

export const DropdownFullName = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 5px;
`;

export const DropdownEmail = styled.p`
  font-size: 12px;
  font-weight: lighter;
`;

export const List = styled.ul`
  padding: 0 1.5rem;
  color: ${({ theme }) => theme.color.primaryText};
`;

export const Link = styled.li`
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.secondaryText};
  }
`;

export const LinkLabel = styled.span`
  margin-left: 0.5rem;
`;
