export const getHour = () => {
  const today = new Date();
  const hour = today.getHours();
  return hour;

  /*
    getHours() – Provides current hour between 0-23.
    getMinutes() – Provides current minutes between 0-59.
    getSeconds() – Provides current seconds between 0-59.
  */
};
