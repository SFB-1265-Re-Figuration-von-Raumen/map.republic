import Link from "next/link";
import { useEffect, useState } from "react";
import { fetcher } from "@/lib/fetcher";
import { setToken, unsetToken } from "/lib/auth";
import { useUser } from "@/lib/authContext";
import styles from "./Nav.module.scss";

const Nav = () => {
  const [data, setData] = useState({
    identifier: "",
    password: "",
  });

  const { user, loading } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const responseData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: data.identifier,
          password: data.password,
        }),
      }
    );
    setToken(responseData);
  };

  const logout = () => {
    unsetToken();
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const [loggedin, setLoggedin] = useState(false);
  useEffect(() => {
    if (user) {
      setLoggedin(true);
    }
  }, [user]);

  return (
    <div className={styles.Profile}>
      {!loading &&
        (user ? (
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        ) : (
          ""
        ))}
      {!loading && user && (
        <li>
          <a
            onClick={logout}
            style={{ cursor: "pointer" }}
          >
            Logout
          </a>
        </li>
      )}
    </div>
  );
};

export default Nav;
