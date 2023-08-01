import { Link, useNavigate } from "react-router-dom";
import { Button, Paper, Slider } from "@mui/material";

import Alert from "../Onboarding/Alert";

import electronFetch from "../../utils/electronFetch";
import useStore from "../../hooks/useStore";

import styles from "../../pages/Dashboard.module.css";
import CloseIcon from "@mui/icons-material/Close";

const Settings = ({ closeModal, renderingEnabled, setRenderingEnabled }) => {
  const { alarmMethod, setAlarmMethod, faceDistance, setFaceDistance, errorThreshold, setErrorThreshold } = useStore();
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

        <p>
          Need to improve performance or reconfigure any settings?
          <br />
          Do that here.
        </p>

        <Alert compact />

        <div className="mt-6">
          {/* <Slider
            min={0}
            max={20}
            value={errorThreshold}
            defaultValue={10}
            valueLabelDisplay="on"
            onChange={(e) => {
              setErrorThreshold(parseInt(e.target.value));
            }}
          /> */}
        </div>

        <div className={styles.buttonGroup}>
          <Link to="/onboarding">
            <Button variant="outlined">Redo Onboarding</Button>
          </Link>
          <Button
            variant="outlined"
            onClick={() => setRenderingEnabled((enabled) => !enabled)}
          >
            {renderingEnabled ? "Disable Rendering" : "Enable Rendering"}
          </Button>
          <Button
            onClick={() => {
              electronFetch("set", {
                // faceDistance,
                // errorThreshold,
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