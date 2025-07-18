function useUserDecode() {
  const token = localStorage.getItem("token");
  let user = "";

  if (token) {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    user = decoded.username;
  }

  return user;
}

export default useUserDecode;