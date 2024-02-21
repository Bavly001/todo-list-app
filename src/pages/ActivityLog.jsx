import PageSection from "../components/PageSection";
import SectionTitle from "../components/SectionTitle";
import CompletedTasksSection from "../components/completed-tasks/CompletedTasksSection";

const ActivityLog = () => {
     return (
          <PageSection>
               <section>
                    <SectionTitle title="Activity Log" />
                    <CompletedTasksSection />
               </section>
          </PageSection>
     );
};

export default ActivityLog;
