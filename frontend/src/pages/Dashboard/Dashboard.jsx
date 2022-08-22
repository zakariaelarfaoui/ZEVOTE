import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  Add,
  Container,
  Heade,
  List,
  ListHeader,
  ListTitle,
  Table,
  Titl,
} from "./Dashboard.styles";

const Dashboard = () => {
  const axiosPrivate = useAxiosPrivate();

  const [openElections, setOpenElection] = useState([]);
  const [closedElections, setClosedElection] = useState([]);
  const [pendingElections, setPendingElection] = useState([]);

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
          setPendingElection(data.data.pendingElections);
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
      <Heade>
        <Titl>Dashboard</Titl>
        <Add to="/add-election">CREATE ELECTION</Add>
      </Heade>
      <List>
        <ListHeader>
          <ListTitle>Active</ListTitle>
        </ListHeader>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {openElections.map((election) => (
              <tr key={election._id}>
                <td>
                  <Link to={`/election/${election._id}`}>{election.title}</Link>
                </td>
                <td>{election.startDate}</td>
                <td>{election.endDate}</td>
                <td>{election.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </List>
      <List>
        <ListHeader>
          <ListTitle>Pending</ListTitle>
        </ListHeader>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pendingElections.map((election) => (
              <tr key={election._id}>
                <td>
                  <Link to={`/election/${election._id}`}>{election.title}</Link>
                </td>
                <td>{election.startDate}</td>
                <td>{election.endDate}</td>
                <td>{election.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </List>
      <List>
        <ListHeader>
          <ListTitle>Completed</ListTitle>
        </ListHeader>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {closedElections.map((election) => (
              <tr key={election._id}>
                <td>
                  <Link to={`/election/${election._id}`}>{election.title}</Link>
                </td>
                <td>{election.startDate}</td>
                <td>{election.endDate}</td>
                <td>{election.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </List>
    </Container>
  );
};

export default Dashboard;
