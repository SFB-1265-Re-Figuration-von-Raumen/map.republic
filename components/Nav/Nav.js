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
      {!loading &&
        (user ? (
          <li>
            <a
              className="md:p-2 py-2 block hover:text-purple-400"
              onClick={logout}
              style={{ cursor: "pointer" }}
            >
              Logout
            </a>
          </li>
        ) : (
          ""
        ))}
      {!loading && !user ? (
        <>
          <li>
            <form onSubmit={handleSubmit} className="form-inline">
              <input
                type="text"
                name="identifier"
                onChange={handleChange}
                placeholder="Username"
                className="md:p-2 form-input py-2 rounded mx-2"
                required
              />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className="md:p-2 form-input py-2 rounded mx-2"
                required
              />

              <button
                className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
                type="submit"
              >
                Login
              </button>
            </form>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Nav;
