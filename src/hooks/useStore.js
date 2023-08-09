import {create} from "zustand";

const useStore = create((set) => ({
  alarmMethod: 0,
  setAlarmMethod: (alarmMethod) => set(() => ({ alarmMethod })),

  faceDistance: 60,
  setFaceDistance: (faceDistance) => set(() => ({ faceDistance })),

  errorThreshold: 10,
  setErrorThreshold: (errorThreshold) => set(() => ({ errorThreshold })),

  setMultipleIntKeys: (keys) =>
    set(() =>
      Object.keys(keys).reduce(
        (prev, key) => ({ ...prev, [key]: parseInt(keys[key]) }),
        {}
      )
    ),
}));

export default useStore;