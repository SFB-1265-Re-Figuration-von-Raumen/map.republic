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
  if (roleType === "user") {
    return (
      mounted && (
        <UserProvider value={{ user, loading, role }}>
          <Nav />
          {children}
        </UserProvider>
      )
    );
  } else if (roleType === "analyst") {
    return (
      mounted && (
        <UserProvider value={{ user, loading, role }}>
          <Nav />
          {children}
        </UserProvider>
      )
    );
  } else {
    return (
      mounted && (
        <>
          <Nav />
          <div
            style={{
              height: `${window?.innerHeight}px`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            not Logged in
          </div>
        </>
      )
    );
  }
};

export default Layout;
