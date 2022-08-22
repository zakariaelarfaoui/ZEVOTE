import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { BiRestaurant, BiUser } from "react-icons/bi";
import { BsCreditCard2Front } from "react-icons/bs";
import { GiMeal } from "react-icons/gi";
import { Card } from "../../components";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useGlobalContext from "../../hooks/useGlobalContext";
import {
  Analytics,
  HomeContainer,
  Order,
  Statistics,
  StyledHome,
} from "./Home.styles";

const Home = () => {
  const axiosPrivate = useAxiosPrivate();
  const { isSidebarOpen } = useGlobalContext();

  const [analytics, setAnalytics] = useState([]);
  const [orderStatics, setOrderStatics] = useState({
    options: {
      labels: ["Delivered Orders", "Canceled Orders", "in Progress"],
    },
    series: [],
  });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
        const { data } = await axiosPrivate.get(`/home`, {
          signal: controller.signal,
        });
        if (isMounted) {
          setAnalytics((prev) => data.analytics);
          setOrderStatics((prev) => {
            return { ...prev, series: data.orderStatics };
          });
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
  }, []);

  return (
    <StyledHome isSidebarOpen={isSidebarOpen}>
      <HomeContainer>
        <h2>Dashboard</h2>
        <Analytics>
          <Card title={"Total Orders"} value={analytics.totalOrders}>
            <BsCreditCard2Front size={32} />
          </Card>
          <Card title={"Total Restaurant"} value={analytics.totalRestaurants}>
            <BiRestaurant size={32} />
          </Card>
          <Card title={"Total Client"} value={analytics.totalClient}>
            <BiUser size={32} />
          </Card>
          <Card title={"Menu Items"} value={analytics.menuItems}>
            <GiMeal size={32} />
          </Card>
        </Analytics>
        <Statistics>
          <Order>
            <Chart
              options={orderStatics.options}
              series={orderStatics.series}
              type="donut"
              width="400"
            />
          </Order>
        </Statistics>
      </HomeContainer>
    </StyledHome>
  );
};
export default Home;
