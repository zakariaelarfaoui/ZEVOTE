import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Option,
  Select,
  TextArea,
} from "../../../Global.styles";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Submit } from "../../../pages/Login/Login.styles";
import { Title } from "../../Add/Add.styles";

const UpdateElection = ({ heading }) => {
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();

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

    getElection();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const [election, setElection] = useState({});
  const { title, description, startDate, endDate, status } = election;
  const ElectionStatus = ["ongoing", "finished", "pending"];
  console.log(startDate, "startDate");

  const handelChange = (e) => {
    e.preventDefault();
    setElection({ ...election, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(election, "form");

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
      <Title>Update {heading}</Title>
      <Form onSubmit={handelSubmit}>
        <FormGroup>
          <Label>Title:</Label>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handelChange}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label>Start Date:</Label>
          <Input
            type="date"
            name="startDate"
            placeholder="Start Date"
            value={startDate}
            onChange={handelChange}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label>End Date:</Label>
          <Input
            type="date"
            name="endDate"
            placeholder="End Date"
            value={endDate}
            onChange={handelChange}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Select>
            <Option>{status}</Option>
            {ElectionStatus.filter((s) => s !== status).map((statue, index) => (
              <Option key={index}>{statue}</Option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Description:</Label>
          <TextArea
            name="description"
            id="description"
            cols={30}
            value={description}
            onChange={handelChange}
          ></TextArea>
        </FormGroup>
        <Submit type="submit" value="Update" />
      </Form>
    </Container>
  );
};

export default UpdateElection;
