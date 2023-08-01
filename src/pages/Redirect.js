import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import electronFetch from "../utils/electronFetch";
import useStore from "../hooks/useStore";

const Redirect = () => {
  const navigate = useNavigate();
  const { setMultipleIntKeys } = useStore();

  useEffect(() => {
    (async () => {
      // to get data from database.json
      const { alarmMethod, faceDistance, errorThreshold } = await electronFetch("get");

      if (alarmMethod && faceDistance && errorThreshold) {
        setMultipleIntKeys({
          alarmMethod,
          faceDistance,
          errorThreshold,
        });

        navigate("/dashboard");
      } else {
        navigate("/onboarding");
      }
    })();
  }, []);

  return <></>;
};

export default Redirect;