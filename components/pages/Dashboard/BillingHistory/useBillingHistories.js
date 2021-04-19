import axios from "axios";
import React, { useEffect, useState } from "react";

function useBillingHistories() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  function fetchBillingsData() {
    if (!isLoading) {
      setLoading(true);
    }

    axios
      .get("/billing-histories/")
      .then((res) => {
        let data = Array.isArray(res.data) ? res.data : res.data.results;

        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error({ err });
        if (err?.response?.status == 404) {
          setData([]);
          setLoading(false);
        } else {
          console.error("fetchBillingsData", { err });
        }
      });
  }

  useEffect(() => {
    if (isLoading) {
      fetchBillingsData();
    }
  }, []);

  return { data, isLoading, fetchBillingsData };
}

export default useBillingHistories;
