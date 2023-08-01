import { Link } from "react-router-dom";

import Alert from "../../components/Onboarding/Alert";

import { Button } from "@mui/material";
import styles from "./Onboarding.module.css"

const OnboardingAlarm = () => {
  return (
    <div className={styles.main}>
      <h1> How would you like to be notified? </h1>

      <Alert />

      <div style={{"marginTop":"5px"}}>
        <Link to="/onboarding/finished">
          <Button variant="outlined">Sounds great!</Button>
        </Link>
      </div>
    </div>
  );
};

export default OnboardingAlarm;