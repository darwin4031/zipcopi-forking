import useSWR from "swr";
import { fetcher } from "~utils/index";

const useProfile = () => {
  const { data, error } = useSWR("/auth/profile/", fetcher);
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useProfile();
