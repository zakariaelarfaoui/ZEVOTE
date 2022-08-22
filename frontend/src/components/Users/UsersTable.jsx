import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmDelete from "../ConfirmDelete";

function UsersTable({ type }) {
  const isModalOpen = false;
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
        const { data } = await axiosPrivate.get(`/user/?role=${type}`, {
          signal: controller.signal,
        });
        if (isMounted) {
          setUsers(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [isModalOpen, type]);

  const handelDelete = async () => {
    try {
      await axiosPrivate.delete(`/user/${deletedId}`);
      const usersList = users.filter((user) => user._id !== deletedId);
      setUsers(usersList);
      setIsOpen(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };

  const openModal = (id) => {
    setDeletedId((prev) => id);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <article className="dashboard__body__list text-center">
      <ConfirmDelete
        isOpen={isOpen}
        handelDelete={handelDelete}
        closeModal={closeModal}
      />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td className="d-flex justify-content-evenly">
                  <Link className="text-primary" to={`update/${user._id}`}>
                    {/* <FontAwesomeIcon icon={faEdit} /> */}
                  </Link>
                  <span
                    className="text-danger"
                    role="button"
                    onClick={() => openModal(user._id)}
                  >
                    {/* <FontAwesomeIcon icon={faTrash} /> */}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </article>
  );
}

export default UsersTable;
