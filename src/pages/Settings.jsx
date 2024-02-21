import PageSection from "../components/PageSection";
import SectionTitle from "../components/SectionTitle";
import ColorThemeSection from "../components/theme/ColorThemeSection";
import ModeThemeSection from "../components/theme/ModeThemeSection";
import { motion } from "framer-motion";

const container = {
     show: {
          transition: {
               staggerChildren: 0.1,
          },
     },
};
const Settings = () => {
     return (
          <PageSection title="Settings">
               <motion.div variants={container} initial="hidden" animate="show">
                    <SectionTitle title="Settings" />
                    <ModeThemeSection />
                    <ColorThemeSection />
               </motion.div>
          </PageSection>
     );
};

export default Settings;
