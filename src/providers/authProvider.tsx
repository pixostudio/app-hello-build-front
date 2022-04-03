import { createContext, useEffect, useState } from "react";
import AuthService from "../services/auth";
import { decodeToken } from "../services/utils";

const initialValues: any = {
  isLoggedin: false,
  user: null,
  isLoading: true,
}
export const AuthContext = createContext(initialValues);

export default function AuthProvider(props: any) {

  const { children } = props;
  const [user, setUser] = useState<any>({
    isLoggedin: false,
    user: null,
    isLoading: true
  });

  useEffect(() => {
    const checkUser = () => {
      const accessToken = AuthService.getAccessToken();

      if (!accessToken) {
        const refreshToken = AuthService.getRefreshToken();

        if (!refreshToken) {
          AuthService.logout();
          setUser({
            isLoggedin: false,
            user: null,
            isLoading: false
          });
        } else {
          AuthService.refreshAccessToken(refreshToken);
        }
      } else {
        setUser({
          isLoggedin: true,
          isLoading: false,
          user: decodeToken(accessToken),
        });
      }

    }

    setTimeout(() => {
      checkUser();
    }, 500);
  }, []);
  

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}
