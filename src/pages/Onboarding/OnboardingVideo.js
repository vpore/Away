import { useRef } from "react";
import { Link } from "react-router-dom";

import useFace from "../../hooks/useFace";
import useStore from "../../hooks/useStore";

import { Button } from "@mui/material";
import styles from "./Onboarding.module.css"

const OnboardingVideo = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { loaded, getFaceDistance } = useFace(videoRef, canvasRef);
  const { setFaceDistance } = useStore();

  return (
    <div className={styles.main}>
      <h1>Capturing your position... smile :)</h1>
      <div className={styles.canvasWrapper}>
        <video ref={videoRef} className={styles.video}></video>
        <canvas ref={canvasRef} className={styles.canvas}></canvas>
      </div>
      <div>
        {loaded && (
          <Link to="/onboarding/alarm">
            <Button
            sx={{marginTop:"20px"}}
            variant="outlined"
              onClick={() => {
                setFaceDistance(getFaceDistance());
              }}
            >
              I look cool
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default OnboardingVideo;