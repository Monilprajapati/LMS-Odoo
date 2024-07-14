import { createContext, useContext, useState, useEffect } from "react";
import { getUserDetails } from "../services/authServices.jsx";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        console.log(response);
        const { user } = response.data;

        if (response) {
          setIsAuth(true);
          setUserId(user.id);
          setUserRole(user.role);
          setUser(user);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [isAuth, userId, userRole]);

  console.log(user);

  return (
    <UserContext.Provider
      value={{
        isAuth,
        setIsAuth,
        userId,
        setUserId,
        userRole,
        setUserRole,
        isLoading,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error(
      "useUserContext must be within a UserContextProvider. Make sure the component is wrapped in UserContextProvider"
    );

  return context;
};

export { UserContextProvider, useUserContext };
