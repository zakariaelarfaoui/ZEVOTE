import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useGlobalContext from "../../hooks/useGlobalContext";

function AddRestaurant() {
  const { auth } = useAuth()
  const { closeModal } = useGlobalContext();
  const axiosPrivate = useAxiosPrivate();

  const [restaurant, setRestaurant] = useState({ managerId: auth._id });
  const [address, setAddress] = useState({});
  const { name, description, phone, rating, cuisine } = restaurant;
  const { street, city } = address;

  const handelChange = (e) => {
    setRestaurant((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handelAddressChange = (e) => {
    setAddress((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

    setRestaurant((prev) => {
      return { ...prev, address: address };
    });
  };

  useEffect(() => {
    setRestaurant((prev) => {
      return { ...prev, address: address };
    });
  }, [address]);

  const handelSubmit = async (e) => {
    e.preventDefault();

    const controller = new AbortController();
    try {
      await axiosPrivate.post("restaurant", restaurant, {
        signal: controller.signal,
        withCredentials: true,
      });
      closeModal();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handelSubmit} className="p-3">
      <div className="mb-3">
        <label htmlFor="name">Name</label>
        <input
          className="form-control"
          type="text"
          name="name"
          id="name"
          required
          placeholder="Name"
          value={name}
          onChange={handelChange}
        />
      </div>
      <div className="">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control w-100 "
          name="description"
          id="description"
          placeholder="Description"
          value={description}
          onChange={handelChange}
        ></textarea>
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
        <label htmlFor="cuisine">Cuisine</label>
        <input
          className="form-control"
          type="text"
          multiple
          name="cuisine"
          id="cuisine"
          required
          placeholder="Cuisine"
          value={cuisine}
          onChange={handelChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="rating">Rating</label>
        <select
          className="form-select"
          name="rating"
          id="rating"
          value={rating}
          onChange={handelChange}
        >
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="street">Street</label>
          <input
            className="form-control"
            type="text"
            name="street"
            id="street"
            required
            placeholder="Street"
            value={street}
            onChange={handelAddressChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="city">City</label>
          <input
            className="form-control"
            type="text"
            name="city"
            id="city"
            required
            placeholder="City"
            value={city}
            onChange={handelAddressChange}
          />
        </div>
      </div>
      <input type="submit" value="Add" />
    </form>
  );
}
export default AddRestaurant;
