/* eslint-disable @typescript-eslint/no-empty-function */
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { User } from "../types/User";
import { useLazyQuery, useQuery } from "@apollo/client";
import { LOAD_USER } from "../graphql/query/User";

interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logoutClient: () => void;
  setUser: (value: User) => void;
  getUser: () => User | undefined;
}
export const UserAuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  logoutClient: () => {},
  setUser: () => {},
  getUser: () => undefined,
});
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(UserAuthContext);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [me] = useLazyQuery(LOAD_USER);

  // set authenticate to localstorage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("token") ? true : false
  );
  useLayoutEffect(() => {
    const loadUser = async () => {
      const res = await me();
      if (!res.data) {
        return setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };
    loadUser();
  }, []);

  const setUser = (value: User): void => {
    localStorage.setItem("user", JSON.stringify(value));
  };

  const getUser = (): User | undefined => {
    return JSON.parse(localStorage.getItem("user") as string);
  };

  const logoutClient = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  const authContextData = {
    isAuthenticated,
    setIsAuthenticated,
    logoutClient,
    setUser,
    getUser,
  };
  return (
    <UserAuthContext.Provider value={authContextData}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserContextProvider;
