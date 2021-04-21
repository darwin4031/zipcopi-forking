// Types definitions
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

function useJobPropertiesData() {
  const [isLoading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);

  const fetchProperties = async () => {
    /**
     * @type {[
     *  AxiosResponse<API_Subjects>,
     *  AxiosResponse<API_Types>,
     * ]}
     */
    const [subjectsResponse, typesResponse] = await Promise.all([
      axios.get("/jobs/subjects/"),
      axios.get("/jobs/types/"),
    ]);

    const subjects = subjectsResponse.data.results.map((s) => ({
      value: s.id,
      label: s.name,
    }));

    const types = typesResponse.data.results.map((s) => ({
      value: s.id,
      label: s.name,
    }));

    //--prod console.log("dalem", { types });

    setSubjects(subjects);
    setJobTypes(types);
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return { isLoading, subjects, jobTypes };
}

export default useJobPropertiesData;
