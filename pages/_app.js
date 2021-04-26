import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Head from "next/head";
import { useRouter } from "next/router";
import WholeLoading from "~components/elements/WholeLoading";
import { API_BASE_URI } from "~config/constants";
import { AuthProvider } from "~context/auth";
import { GlobalProvider } from "~context/global";
import useCheckProfile from "~hooks/useCheckProfile";
import "~styles/globals.scss";

// set plugin for dayjs
dayjs.extend(relativeTime);

//set default BASE URI AND TOKEN
axios.defaults.baseURL = API_BASE_URI;
axios.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token && token.access) {
    config.headers.Authorization = `Bearer ${token.access}`;
  }
  return config;
});

function CheckProfile({ children }) {
  const { isLoading } = useCheckProfile();
  return isLoading ? <WholeLoading /> : children;
}

function DashboardChecking({ children }) {
  const { pathname } = useRouter();
  const isDashboard = pathname.split("/")[1] === "dashboard";
  return isDashboard ? <CheckProfile children={children} /> : children;
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401 && localStorage.getItem("token")) {
        localStorage.removeItem("token");
        router.push("/sign-in");
      } else {
        throw error;
      }
    }
  );
  return (
    <>
      <Head>
        <title>Zipcopi</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AuthProvider>
        <GlobalProvider>
          <DashboardChecking>
            <Component {...pageProps} />
          </DashboardChecking>
        </GlobalProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
