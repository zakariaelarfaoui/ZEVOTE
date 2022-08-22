import { StyledTabs, TabsItem } from "./Tabs.styles";

const Tabs = ({setStep}) => {
  return (
    <StyledTabs>
      <TabsItem onClick={() => setStep(1)}>Setting</TabsItem>
      <TabsItem onClick={() => setStep(2)}>Candidates</TabsItem>
      <TabsItem onClick={() => setStep(3)}>Voters</TabsItem>
    </StyledTabs>
  );
};

export default Tabs;
