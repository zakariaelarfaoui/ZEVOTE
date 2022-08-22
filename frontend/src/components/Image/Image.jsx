import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Image = ({ fileName }) => {


  const axiosPrivate = useAxiosPrivate();
  const [src, setSrc] = useState("")

    useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();

      const getData = async () => {
        try {
          const response = await axiosPrivate.get(`/uploads/${fileName}`, {
            signal: controller.signal,
          });
          console.log(response);
          // setSrc(data);
          // if (isMounted) {
          //   setData(data.data);
          //   const tableHeaders = Object.keys(data.data[0]);
          //   tableHeaders.shift();
          //   setHeaders((prev) => tableHeaders);
          //   setNumberOfPages(data.numberOfPages);
          //   setIsLoading(false);
          // }
        } catch (err) {
          console.error(err);
        }
      };
      getData();

      // return () => {
      //   isMounted = false;
      //   setIsLoading(false);
      //   controller.abort();
      // };
    });
  
  return (
    <>
      <img
        src={"http://localhost:5000/uploads/images-1650247308695.jpeg"}
        alt=""
      />
      <p>test</p>
    </>
  );
};

export default Image;
