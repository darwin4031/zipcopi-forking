import AuthChecker from "~components/elements/AuthChecker";
import DashboardLayout from "~components/layouts/Dashboard";
import UserDetail from "~components/pages/Dashboard/User/detail";

const User = () => {
  return (
    <AuthChecker>
      <DashboardLayout>
        <UserDetail />
      </DashboardLayout>
    </AuthChecker>
  );
};

export default User;
