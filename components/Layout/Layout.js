import Nav from "@/components/Nav/Nav";
import { UserProvider } from "@/lib/authContext";
import { useEffect, useState } from "react";
import { getRoleFromLocalCookie } from "@/lib/auth";

const Layout = ({ user, role, loading = false, children }) => {
  const [mounted, setMounted] = useState(false);
  const [roleLoaded, setRoleLoaded] = useState(false);
  const [roleType, setRoleType] = useState(null);
  useEffect(() => {
    if (user) {
      const getRole = async () => {
        const type = await role.type;
        setRoleType(type);
        setRoleLoaded(true);
      };
      getRole();
    }
  }, [role]);
  console.log(roleType);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <UserProvider value={{ user, loading, role }}>
        <Nav />
        {children}
      </UserProvider>
    )
  );
};

export default Layout;
