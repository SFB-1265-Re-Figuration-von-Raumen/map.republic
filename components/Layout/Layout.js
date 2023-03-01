import Nav from "@/components/Nav/Nav";
import { UserProvider } from "@/lib/authContext";
import { useEffect, useState } from "react";
import { getRoleFromLocalCookie } from "@/lib/auth";

const Layout = ({ user, role, loading = false, children }) => {
  const [roleLoaded, setRoleLoaded] = useState(false);
  const [roleType, setRoleType] = useState(null);
  useEffect(() => {
    const getRole = async () => {
      const role = await getRoleFromLocalCookie();
      setRoleType(role.type);
      setRoleLoaded(true);
      return role;
    };
    getRole();
  }, [role]);

  return (
    roleLoaded && (
      <UserProvider value={{ user, loading }}>
        <Nav />
        {children}
      </UserProvider>
    )
  );
};

export default Layout;
