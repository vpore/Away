import {create} from "zustand";

const useStore = create((set) => ({
  alarmMethod: 0,
  setAlarmMethod: (alarmMethod) => set(() => ({ alarmMethod })),

  faceDistance: 60,
  setFaceDistance: (faceDistance) => set(() => ({ faceDistance })),

  errorThreshold: 10,
  setErrorThreshold: (errorThreshold) => set(() => ({ errorThreshold })),

  setMultipleKeys: (keys) => set(() => ({ ...keys })), //del maybe
  setMultipleIntKeys: (keys) =>
    set(() =>
      Object.keys(keys).reduce(
        (acc, key) => ({ ...acc, [key]: parseInt(keys[key]) }),
        {}
      )
    ),
}));

export default useStore;