
import { init, track, setUserId, reset } from "@amplitude/analytics-browser";

const API_KEY = "7899cd0c738c0ec125e0b91c0a0d32e7";

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