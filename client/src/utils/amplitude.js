
import { init, track, setUserId, reset } from "@amplitude/analytics-browser";

const API_KEY = `${process.env.REACT_APP_AMPLITUDE_API_KEY}`

export const initAmplitude = () => {
  init(API_KEY);
};

export const logEvent = (eventName, eventProperties) => {
  track(eventName, eventProperties);
};

export const setAmplitudeUserId = (userId) => {
  setUserId(userId);
};

export const resetAmplitude = () => {
  reset();
};