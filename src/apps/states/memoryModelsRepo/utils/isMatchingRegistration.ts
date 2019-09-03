export default (storedRegistration?: string, registration?: string) => {
  if (registration === undefined) {
    return true;
  }
  return storedRegistration === registration;
};
