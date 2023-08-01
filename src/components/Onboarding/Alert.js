import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AlarmIcon from "@mui/icons-material/Alarm";

import AlertOptions from "./AlertOptions";
import useStore from "../../hooks/useStore";

import styles from "../../pages/Onboarding/Onboarding.module.css"

const alarmMethods = [
  {
    icon: <NotificationsNoneIcon size="2rem" />,
    text: "Notification",
  },
  {
    icon: <AlarmIcon size="2rem" />,
    text: "Alarm",
  },
];

const Alert = ({ compact = false }) => {
  const { alarmMethod, setAlarmMethod } = useStore();

  return (
    <div className={compact?styles.optionGroup:""}>
      {alarmMethods.map((props, id) => (
        <AlertOptions
          {...props}
          active={alarmMethod === id}
          key={id}
          onClick={() => {
            setAlarmMethod(id);
          }}
        />
      ))}
    </div>
  );
};

export default Alert;