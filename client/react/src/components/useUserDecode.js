function useUserDecode() {
  const token = localStorage.getItem("token");
  let userToken = "";

  if (token) {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    userToken = decoded.username;
  }

  return userToken;
}

export default useUserDecode;