import AuthChecker from "~components/elements/AuthChecker";
import DashboardLayout from "~components/layouts/Dashboard";
import Messages from "~components/pages/Dashboard/Messages";

const MessagesPage = () => {
  return (
    <AuthChecker>
      <DashboardLayout>
        <Messages />
      </DashboardLayout>
    </AuthChecker>
  );
};

export default MessagesPage;
