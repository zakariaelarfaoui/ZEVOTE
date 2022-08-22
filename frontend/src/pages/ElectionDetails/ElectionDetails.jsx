import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import ConfirmDelete from "../../components/ConfirmDelete/ConfirmDelete";
import ElectionCandidates from "../../components/Elections/ElectionCandidates/ElectionCandidates";
import ElectionSetting from "../../components/Elections/ElectionSetting/ElectionSetting";
import ElectionVoters from "../../components/Elections/ElectionVoters/ElectionVoters";
import Tabs from "../../components/Tabs/Tabs";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Container } from "../Dashboard/Dashboard.styles";
import { Header, Title } from "./ElectionDetails.styles";

const ElectionDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();

  const [deletedId, setDeletedId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [election, setElection] = useState({});
  const [voter, setVoter] = useState([]);
  const [candidate, setCandidate] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState();
  const { title, description, startDate, endDate } = election;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const confirmDelete = (id) => {
    setDeletedId(id);
    openModal();
  };

  const handelDelete = async () => {
    try {
      await axiosPrivate.delete(`/election/${deletedId}`);
      closeModal();
      navigate(-1);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };

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
          setElection((prev) => data.data);
          setCandidates((prev) => data.data.candidates);
          setVoters((prev) => data.data.voters);
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

  const handelElectionChange = (e) => {
    e.preventDefault();
    setElection({ ...election, [e.target.name]: e.target.value });
  };


  const handelSubmit = async (e) => {
    e.preventDefault();

    delete election.voters;
    delete election.candidates

    try {
      const { data } = await axiosPrivate.put(
        `election/${params.id}`,
        election
      );
      console.log(data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <Container>
      <ConfirmDelete
        handelDelete={handelDelete}
        isOpen={isOpen}
        closeModal={closeModal}
      />
      <Header>
        <BackButton></BackButton>
        <Title> {election.title}</Title>
      </Header>
      <Tabs setStep={setStep} />
      {step === 1 ? (
        <ElectionSetting
          election={election}
          handelElectionChange={handelElectionChange}
          handelSubmit={handelSubmit}
          confirmDelete={confirmDelete}
        />
      ) : step === 2 ? (
        <ElectionCandidates
          candidates={candidates}
          electionId={election._id}
          setCandidates={setCandidates}
          setElection={setElection}
          confirmDelete={confirmDelete}
        />
      ) : (
        <ElectionVoters
          voters={voters}
          setVoters={setVoters}
          setElection={setElection}
          confirmDelete={confirmDelete}
        />
      )}
    </Container>
  );
};

export default ElectionDetails;
