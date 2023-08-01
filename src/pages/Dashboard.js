import { useState, useRef, useEffect } from "react";

import Settings from "../components/Dashboard/Settings";
import useStore from "../hooks/useStore";
import useFace from "../hooks/useFace";

import SettingsIcon from "@mui/icons-material/Settings";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [renderingEnabled, setRenderingEnabled] = useState(true);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  
  const { loaded, getFaceDistance } = useFace(
    videoRef,
    canvasRef,
    renderingEnabled
  );
  
  const { alarmMethod, faceDistance, errorThreshold } = useStore();
  useEffect(() => {
    let sentNotification = false;
    let intervalId = setInterval(() => {
    if (
      loaded &&
      !sentNotification &&
      getFaceDistance() > faceDistance &&
      getFaceDistance() - faceDistance > errorThreshold
    ){
        sentNotification = true;
        
        if (alarmMethod === 0) {
            new Notification("Away!", {
                body: "Keep your face away from the screen!",
            });
        } else if (alarmMethod === 1) {
            if (audioRef.current.duration > 0 && audioRef.current.paused) {
              audioRef.current.play();
          }
        }

        setTimeout(() => {
          sentNotification = false;
        }, 5000);
      }
    }, 1000 / 60);

    return () => {
      clearInterval(intervalId);
    };
  }, [loaded]);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to the Dashboard.</h1>
      <p className={styles.description}>
        Just keep this app running in the background somewhere and we'll notify
        you if your face gets too close to the screen. If this is taking too
        many computer resources, try turning off result rendering in the
        settings down below.
      </p>

      <audio src="/horn.mp3" ref={audioRef}></audio>

      <div className={styles.canvasWrapper}>
        <video ref={videoRef} className={styles.video}></video>
        <canvas ref={canvasRef} className={styles.canvas}></canvas>
      </div>

      <SettingsIcon className={styles.settingsIcon} onClick={() => setModalOpen(!modalOpen)} />
      <div>
        {modalOpen && (
          <Settings
            closeModal={() => setModalOpen(false)}
            renderingEnabled={renderingEnabled}
            setRenderingEnabled={setRenderingEnabled}
          />
        )}
      </div>
    </main>
  );
};

export default Dashboard;