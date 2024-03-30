import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import { axiosMainUtil } from 'src/util/axiosUtil';
import { RoleConstant } from 'src/constant/RoleConstant';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  email: string;
  role: "ADMIN" | "TEACHER" | "STUDENT";
}

interface AuthContextType {
  user: UserData | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(() => {
    const userData = Cookies.get('user');
    return userData ? JSON.parse(userData) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return Cookies.get('token') || null;
  });

  useEffect(() => {
    if (user) {
      Cookies.set('user', JSON.stringify(user), { expires: 7 });
      redirectToRolePage(user.role);
    } else {
      Cookies.remove('user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      Cookies.set('token', token, { expires: 7 });
    } else {
      Cookies.remove('token');
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosMainUtil.post('/users/login', { email, password });
      const userData: UserData = {
        id: response.data.user.id,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        birthdate: response.data.user.birthdate,
        email: response.data.user.email,
        role: response.data.user.role,
      };
      setUser(userData);
      setToken(response.data.token);
      redirectToRolePage(userData.role);
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove('user');
    Cookies.remove('token');
  };

  const redirectToRolePage = (role: UserData['role']) => {
    switch (role) {
      case RoleConstant.STUDENT:
        if (!location.pathname.includes("/student")) {
          window.location.href = "/student";
        }
        break;
      case RoleConstant.TEACHER:
        if (!location.pathname.includes("/teacher")) {
          window.location.href = "/teacher";
        }
        break;
      case RoleConstant.ADMIN:
        if (!location.pathname.includes("/admin")) {
          window.location.href = "/admin";
        }
        break;
    }
  };

  useEffect(() => {
    if (!user?.id && location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }, [user, location.pathname]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
