import { useState } from "react";

const useFetch = (dataFn) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getResponse = (url, options) => {
    setLoading((old) => true);
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        dataFn(data.data);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err, "err");
      });
    setLoading(false);
  };

  return [error, loading, getResponse];
};

export default useFetch;
