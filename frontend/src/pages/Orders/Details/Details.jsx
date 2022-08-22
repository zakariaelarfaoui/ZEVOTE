import useGlobalContext from "../../../hooks/useGlobalContext";
import { Info, StyledDetails, Title, Wrapper } from "./Details.styles";

const Details = () => {
  const { isSidebarOpen } = useGlobalContext();
  return (
    <StyledDetails isSidebarOpen={isSidebarOpen}>
      <Title>Order Information</Title>
      <Wrapper>
        <Info>
          <h4>Detail</h4>
        </Info>
        <Info>
          <h4>Client</h4>
        </Info>
        <Info>
          <h4>Billing Address</h4>
        </Info>
        <Info>
          <h4>Payment Details</h4>
        </Info>
      </Wrapper>
    </StyledDetails>
  );
};

export default Details;
