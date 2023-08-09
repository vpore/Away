import { Link, useNavigate } from "react-router-dom";
import { Button, Paper } from "@mui/material";

import Alert from "../Onboarding/Alert";

import electronFetch from "../../utils/electronFetch";
import useStore from "../../hooks/useStore";

import styles from "../../pages/Dashboard.module.css";
import CloseIcon from "@mui/icons-material/Close";

const Settings = ({ closeModal }) => {
  const { alarmMethod } = useStore();
  const navigate = useNavigate();
  return (
    <>
      <Paper className={styles.settings} elevation={4}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Settings</h1>
          <CloseIcon
            size="1.5rem"
            className={styles.closeIcon}
            onClick={closeModal}
          />
        </div>

        <p> Need to change notification type? </p>

        <Alert compact />

        <div className={styles.buttonGroup}>
          <Link to="/onboarding">
            <Button variant="outlined">Redo Onboarding</Button>
          </Link>
          <Button
            onClick={() => {
              electronFetch("set", {
                alarmMethod
              });
              navigate("/onboarding/finished");
              closeModal();
            }}
            variant="contained"
            color="success"
          >
            Save
          </Button>
        </div>
      </Paper>
    </>
  );
};

export default Settings;