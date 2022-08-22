import { BiRestaurant, BiUser } from "react-icons/bi";
import { BsCreditCard2Front } from "react-icons/bs";
import { GiMeal } from "react-icons/gi";
import { GoDashboard } from "react-icons/go";
import SidebarLink from "../../SidebarLink";
import { Label } from "../../SidebarLink/SidebarLink.styles";
import { Header, LinkGroup, StyledSidebar } from "./Sidebar.styles";

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Header>
        <Label size={20}>ZEVOTE</Label>
      </Header>
      <LinkGroup>
        <SidebarLink label="Dashboard" path="">
          <GoDashboard size={20} />
        </SidebarLink>
        <SidebarLink label="Elections" path="elections">
          <BiRestaurant size={20} />
        </SidebarLink>
        <SidebarLink label="Candidates" path="candidates">
          <GiMeal size={20} />
        </SidebarLink>
        <SidebarLink label="Voters" path="voters">
          <BsCreditCard2Front size={20} />
        </SidebarLink>
        <SidebarLink label="Result" path="results">
          <BiUser size={20} />
        </SidebarLink>
        <SidebarLink label="Profile  " path="profile ">
          <BiUser size={20} />
        </SidebarLink>
      </LinkGroup>
    </StyledSidebar>
  );
};

export default Sidebar;
