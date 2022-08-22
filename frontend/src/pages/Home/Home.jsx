import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Container } from "../Dashboard/Dashboard.styles";
import {
  CloseDate,
  Heading,
  Line,
  List,
  ListItem,
  Title,
  VotePage,
} from "./Home.styles";

const Home = () => {
  const axiosPrivate = useAxiosPrivate();

  const [openElections, setOpenElection] = useState([]);
  const [closedElections, setClosedElection] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
        const { data } = await axiosPrivate.get(`/election`, {
          signal: controller.signal,
        });
        console.log(data);
        if (isMounted) {
          setOpenElection(data.data.openElections);
          setClosedElection(data.data.closedElections);
        }
      } catch (err) {
        if (err.response) {
          console.log(err.response);
        }
        console.error(err);
      }
    };

    getData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <Container>
      <Heading>ACTIVE</Heading>
      <Line />
      <List>
        {openElections.map((election) => (
          <ListItem key={election._id}>
            <Title>{election.title}</Title>
            <CloseDate>Closes in {election.endDate}</CloseDate>
            <Link to={`/vote/${election._id}`}>
              <VotePage>Vote</VotePage>
            </Link>
          </ListItem>
        ))}
      </List>
      <Heading>COMPLETED</Heading>
      <Line />
      <List>
        {closedElections.map((election) => (
          <ListItem key={election._id}>
            <Title>{election.title}</Title>
            <CloseDate>{election.endDate}</CloseDate>
            <Link to={`/vote/${election._id}`}>
              <VotePage>Details</VotePage>
            </Link>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Home;
