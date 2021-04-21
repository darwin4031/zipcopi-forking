import AuthChecker from "~components/elements/AuthChecker";
import DashboardLayout from "~components/layouts/Dashboard";
import ProfileCompletion from "~components/pages/Dashboard/ProfileCompletion";

const ProfileCompletionPage = () => {
  return (
    <AuthChecker>
      <DashboardLayout>
        <ProfileCompletion />
      </DashboardLayout>
    </AuthChecker>
  );
};

export default ProfileCompletionPage;
