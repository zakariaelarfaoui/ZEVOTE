import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LoadingScreen from "../../components/LoadingScreen";
import { UpdateRestaurantForm } from "./UpdateRestaurantForm";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import "./style.css";

const UpdateRestaurant = ({ title }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const response = await axiosPrivate.get(`/restaurants/${params.id}`);
        setData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getRestaurant();
  }, []);

  const handelChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handelAddressChange = (e) => {
    setData((prev) => ({
      ...prev,
      address: { ...prev.address },
    }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <section className="dashboard__body">
      <header className="dashboard__body__header">
        <h3 className="dashboard__body__header__title m-0">{title}</h3>
      </header>
      <UpdateRestaurantForm
        data={data}
        handelSubmit={handelSubmit}
        handelChange={handelChange}
      />
    </section>
  );
};
export default UpdateRestaurant;
