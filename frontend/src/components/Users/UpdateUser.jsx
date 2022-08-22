import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function UpdateUser({ title,type }) {

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  const [user, setUser] = useState({});
  const { firstName, lastName, email, role,phone } = user;

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axiosPrivate.get(`user/${params.id}`);
      console.log(data);
      setUser(data.data);
    };
    getUser();
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.patch(
        `user/${params.id}`,
        user
      );
      navigate(-1);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
  const handelChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <section className="dashboard__body">
      <header className="dashboard__body__header">
        <h3 className="dashboard__body__header__title m-0">{title}</h3>
      </header>
      <form className="p-3" onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="form-control"
            placeholder="First Name"
            value={firstName}
            onChange={handelChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="form-control"
            placeholder="Last Name"
            value={lastName}
            onChange={handelChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={handelChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="number"
            name="phone"
            id="phone"
            className="form-control"
            placeholder="Phone Number"
            value={phone}
            onChange={handelChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            className="form-select"
            name="role"
            id="role"
            value={role}
            onChange={handelChange}
          >
            <option value="owner">Owner</option>
            <option value="client">Client</option>
          </select>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-success">
            Update {type}
          </button>
        </div>
      </form>
    </section>
  );
}
export default UpdateUser;
