import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "../../Global.styles";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useGlobalContext from "../../hooks/useGlobalContext";
import { Title } from "./MealsDetails.styles";
//import { Test } from './MealsDetails.styles';

const MealsDetails = () => {
  console.log("deta");

  const axiosPrivate = useAxiosPrivate();
  const { isSidebarOpen } = useGlobalContext();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
        const { data } = await axiosPrivate.get(`meal/${id}`, {
          signal: controller.signal,
        });
        console.log(data.data);
        if (isMounted) {
          setData(data.data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getData();

    return () => {
      isMounted = false;
      setIsLoading(false);
      controller.abort();
    };
  }, []);

  return (
    <Container isSidebarOpen={isSidebarOpen}>
      <Title>{data.name}</Title>
      <hr />
      {data.images.length > 0 &&
        data.images.map((image) => {
          return <img src={`http://localhost:5000/uploads/${image}`} alt="" />;
        })}
      <span>Description</span>
      <p>{data.description}</p>
    </Container>
  );
};

export default MealsDetails;
