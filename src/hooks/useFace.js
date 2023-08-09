import * as faceapi from "face-api.js";
import { useEffect, useState, useRef } from "react";

const useFace = (videoRef, canvasRef) => {
  const [apiLoaded, setApiLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const faceDistance = useRef(50);

  // load face api
  useEffect(() => {
    (async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      ]);

      setApiLoaded(true);
    })();
  }, []);

  // load video
  useEffect(() => {
    if (!apiLoaded) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // resize video & canvas
    const size = {
      width: canvas.offsetWidth,
      height: canvas.offsetHeight,
    };

    Object.assign(canvas, size);
    Object.assign(video, size);

    // state
    let intervalId = 0;
    let stream;

    (async () => {
      // start video stream
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      video.srcObject = stream;
      video.play();

      intervalId = setInterval(
        async () => {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks();

          ctx.clearRect(0, 0, size.width, size.height);
          if (detections.length) {
            faceapi.draw.drawDetections(canvas, detections);
            faceapi.draw.drawFaceLandmarks(canvas, detections);
          }
          
          const face = detections[0];

          if (face) {
            const leftSide = face.landmarks.positions[1];
            const rightSide = face.landmarks.positions[17];

            faceDistance.current = Math.floor(
              Math.sqrt(
                Math.pow(leftSide._x - rightSide._x, 2) +
                Math.pow(leftSide._y - rightSide._y, 2)
              )
            );
          }
        },
        1000/60
      );

      setVideoLoaded(true);
    })();

    return () => {
      // stop video stream
      video.srcObject = null;
      stream?.getTracks().forEach((track) => track.stop());

      // stop detections
      clearInterval(intervalId);
    };
  }, [apiLoaded]);

  return {
    loaded: apiLoaded && videoLoaded,
    getFaceDistance: () => faceDistance.current,
  };
};

export default useFace;