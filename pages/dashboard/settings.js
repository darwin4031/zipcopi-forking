import AuthChecker from "~components/elements/AuthChecker";
import DashboardLayout from "~components/layouts/Dashboard";
import Home from "~components/pages/Dashboard/Home";

const Settings = () => {
  return (
    <AuthChecker>
      <DashboardLayout>
        <Home />
      </DashboardLayout>
    </AuthChecker>
  );
};

export default Settings;
