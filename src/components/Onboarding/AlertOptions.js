import { Paper } from "@mui/material";
import styles from "../../pages/Onboarding/Onboarding.module.css";

const AlertOptions = ({ icon, text, active, ...props }) => {
  return (
    <Paper {...props} className={styles.option} sx={{"backgroundColor":active?"lightBlue":""}} variant="outlined">
      {icon}
      <span style={{"marginLeft":"8px"}}>{text}</span>
    </Paper>
  );
};

export default AlertOptions;