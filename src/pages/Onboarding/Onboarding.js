import { Link } from "react-router-dom";

import { Button } from "@mui/material";
import styles from "./Onboarding.module.css";

const Onboarding = () => {
  return (
    <div className={styles.main}>
      <h1>Let's get started...</h1>
      <p className={styles.description}>
        How do you think you should sit? Ideally, your face should be 20 -
        40 inches away from the monitor.<br /><br />
        Now, let's capture this ideal position :)
      </p>

      <div>
        <Link to="/onboarding/video">
          <Button variant="outlined">Proceed</Button>
        </Link>
      </div>
    </div>
  );
};

export default Onboarding;