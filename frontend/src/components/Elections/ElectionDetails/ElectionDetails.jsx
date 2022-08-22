import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "../../../Global.styles";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Title } from "../../Add/Add.styles";
import Modal from "../../Modal/Modal";

const ElectionDetails = () => {
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [election, setElection] = useState({});
  const { title, description, startDate, endDate, status } = election;
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getElection = async () => {
      try {
        const { data } = await axiosPrivate.get(`/election/${params.id}`, {
          signal: controller.signal,
        });
        console.log(data.data);
        if (isMounted) {
          setElection(data.data);
        }
      } catch (err) {
        if (err.response) {
          console.log(err.response);
        }
        console.error(err);
      }
    };

    const getElectionCandidates = async () => {
      try {
        const { data } = await axiosPrivate.get(
          `/election/${params.id}/candidates`
        );
        console.log(data.data, "candidates");
        if (isMounted) {
          setCandidates(data.data);
        }
      } catch (err) {
        if (err.response) {
          console.log(err.response);
        }
        console.error(err);
      }
    };

    const getElectionVoters = async () => {
      try {
        const { data } = await axiosPrivate.get(
          `/election/${params.id}/voters`
        );
        console.log(data.data, "voters");
        if (isMounted) {
          setVoters(data.data);
        }
      } catch (err) {
        if (err.response) {
          console.log(err.response);
        }
        console.error(err);
      }
    };

    getElection();
    getElectionCandidates();
    getElectionVoters();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <Container>
      {isOpen && (<Modal >
        <Title>{title}</Title>
        <p>{description}</p>
        <p>{startDate}</p>
        <p>{endDate}</p>
      </Modal>)}
      <Title>{title}</Title>
      <p>{description}</p>
      <span>Start: {startDate}</span>
      <span> End: {endDate}</span>
      {status === "open" ? (
        <span>Status: Open</span>
      ) : (
        <span>Status: Closed</span>
      )}
      <Title>Candidates List</Title>
      <button>Add</button>
      <div>
        {candidates.map((candidate) => (
          <div key={candidate._id}>
            <p>{candidate.name}</p>
          </div>
        ))}
      </div>
      <Title>Voters List</Title>
      <div>
        {voters.map((voter) => (
          <div key={voter._id}>
            <p>{voter.name}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ElectionDetails;
