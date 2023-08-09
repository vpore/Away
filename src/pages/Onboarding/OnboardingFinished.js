import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import electronFetch from "../../utils/electronFetch";
import useStore from "../../hooks/useStore";

const OnboardingFinished = () => {
  const { alarmMethod, faceDistance } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await electronFetch("set", {
        alarmMethod,
        faceDistance,
        errorThreshold: 10,
      });

      navigate("/dashboard");
    })();
  }, []);

  return (
    <div>
      <h1> We're finishing up some things.... </h1>
    </div>
  );
};

export default OnboardingFinished;