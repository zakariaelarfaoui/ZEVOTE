import {
  Actions,
  Delete,
  Form,
  FormGroup,
  Input,
  Label,
  Select,
  Submit,
} from "../../../pages/ElectionDetails/ElectionDetails.styles";

const ElectionSetting = ({
  election,
  handelSubmit,
  handelElectionChange,
  confirmDelete,
}) => {
  const { _id, title, description, startDate, endDate, status } = election;

  return (
    <>
      <Form onSubmit={handelSubmit}>
        <FormGroup width={"100%"}>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handelElectionChange}
          />
        </FormGroup>
        <FormGroup width={"100%"}>
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={description}
            onChange={handelElectionChange}
          />
        </FormGroup>
        <FormGroup width={"100%"}>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            type="date"
            id="startDate"
            name="startDate"
            placeholder="Start date"
            value={startDate}
            onChange={handelElectionChange}
          />
        </FormGroup>
        <FormGroup width={"100%"}>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            type="date"
            id="endDate"
            name="endDate"
            placeholder="End date"
            value={endDate}
            onChange={handelElectionChange}
          />
        </FormGroup>
        <FormGroup width={"100%"}>
          <Label htmlFor="status">Status</Label>
          <Select name="status" id="status">
            <option value={status}>{status}</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="pending">Pending</option>
          </Select>
        </FormGroup>
        <Actions>
          <Submit type="submit" value="Save" />
          <Delete onClick={(e) => confirmDelete(_id)}>Delete</Delete>
        </Actions>
      </Form>
    </>
  );
};

export default ElectionSetting;
