import styles from "./DashboardWriterContent.module.scss";
import ProfileCompletionChecklist from "@/components/ProfileCompletionChecklist/ProfileCompletionChecklist";
import Tips from "~components/elements/Tips";
import MyProjects from "@/components/MyProjects/MyProjects";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import useProjectsListData from "hooks/useProjectsListData";
import { LoadingWrapper } from "../Dashboard/Dashboard";
import WholeLoading from "../WholeLoading";
import clsx from "clsx";

const DashboardWriterContent = () => {
  const { data, isLoading } = useProjectsListData();

  return isLoading ? (
    <LoadingWrapper>
      <WholeLoading />
    </LoadingWrapper>
  ) : (
    <div className={styles.flex}>
      <div className={clsx(styles.item, styles.recomendations)}>
        <h3 className={styles.title}>Recommended for you</h3>
        <div className={styles.body}>
          <div className={styles.recomendationsBody}>
            {data && data.length ? (
              data.map((item, i) => (
                <div key={i}>
                  <ProjectCard className={styles.recomendationsProjectCard} data={item} />
                </div>
              ))
            ) : (
              <div className={styles.empty}>No recomendations available</div>
            )}
          </div>
        </div>
      </div>
      <div className={clsx(styles.item, styles.completions)}>
        <h3 className={styles.title}>Complete Profile</h3>
        <div className={styles.body}>
          <ProfileCompletionChecklist />
        </div>
      </div>
      <div className={clsx(styles.item, styles.projects)}>
        <h3 className={styles.title}>My ongoing works</h3>
        <div className={styles.body}>
          <MyProjects
            wrapperClassName={styles.projectsWrapper}
            itemsWrapperClassName={styles.projectsItemsList}
            itemContainerClassName={styles.projectsItemWrapper}
          />
        </div>
      </div>
      <div className={clsx(styles.item, styles.tips)}>
        <h3 className={styles.title}>Useful Tips</h3>
        <div className={styles.body}>
          <Tips
            data={[
              {
                title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
              },
              {
                title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
              },
              {
                title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
              },
              {
                title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardWriterContent;
