import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import {
  Details,
  Email,
  Logo,
  Name,
  Navbar,
  StyledHeader,
} from "./Header.styles";

const Header = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <StyledHeader>
      <Navbar>
        <Logo>ZEVOTE</Logo>
        <Details>
          <Name>{auth.name}</Name>
          <Email>{auth.email}</Email>
        </Details>
        <FiLogOut style={{ cursor: "pointer" }} size={18} onClick={signOut} />
      </Navbar>
    </StyledHeader>
  );
};

export default Header;
