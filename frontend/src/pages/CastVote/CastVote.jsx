import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Container } from "../Dashboard/Dashboard.styles";
import { CloseDate, Details, Title } from "./CastVote.styles";

const CastVote = () => {
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();

  const [election, setElection] = useState({});
  const [candidates, setCandidates] = useState([]);
  const { title, endDate } = election;
  const [candidateId, setCandidateId] = useState("");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getElection = async () => {
      try {
        const { data } = await axiosPrivate.get(
          `/election/${params.electionId}`,
          {
            signal: controller.signal,
          }
        );
        console.log(data.data);
        if (isMounted) {
          setElection((prev) => data.data);
          setCandidates((prev) => data.data.candidates);
        }
      } catch (err) {
        if (err.response) {
          console.log(err.response);
        }
        console.error(err);
      }
    };

    getElection();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handelClick = (e, id) => {
    setCandidateId((prev) => id);
    handelSubmit();
  };

  const handelSubmit = async (id) => {
    try {
      const { data } = await axiosPrivate.post(
        `vote/${params.electionId}/${id}`
      );
      navigate(-1)
      console.log(data);
    } catch (error) {
      if (error?.response) {
        console.log(error?.response?.data?.message);
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <Container>
      <Details>
        <Title> {title}</Title>
        <span>
          closes <CloseDate>{endDate} </CloseDate>
        </span>
      </Details>
      <Row xs={1} md={5} className="g-4">
        {candidates.map((candidate) => (
          <Col key={candidate._id}>
            <Card>
              <Card.Img
                variant="top"
                src={`http://localhost:5000/uploads/${candidate.image}`}
              />
              <Card.Body>
                <Card.Title>{candidate.name}</Card.Title>
                <Card.Text>{candidate.info}</Card.Text>
                <button onClick={(e) => handelSubmit(candidate._id)}>
                  Vote
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CastVote;
