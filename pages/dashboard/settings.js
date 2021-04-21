import AuthChecker from "~components/elements/AuthChecker";
import DashboardLayout from "~components/layouts/Dashboard";
import Settings from "~components/pages/Dashboard/Settings";

const SettingsPage = () => {
  return (
    <AuthChecker>
      <DashboardLayout>
        <Settings />
      </DashboardLayout>
    </AuthChecker>
  );
};

export default SettingsPage;
