import axios from "axios";

const JwtManager = () => {
  let inMemoryToken: string | null = null;

  const getToken = () => inMemoryToken;

  const setToken = (accessToken: string) => {
    inMemoryToken = accessToken;
  };

  // const getRefreshToken = async () => {
  //   const res = await axios
  //     .get("http://localhost:4000/", {
  //       withCredentials: true,
  //     })
  //     .catch((err) => err);
  //   return res;
  // };
  return { getToken, setToken };
};

export default JwtManager();
