import { fetcher } from "@/lib/fetcher";
import { setToken, getTokenFromLocalCookie } from "/lib/auth";
import styles from "@/styles/Login.module.scss";
import { Formik } from "formik";
import { useRouter } from "next/router";
import Link from "next/link";

const Login = () => {
  const handleSubmit = async (values) => {
    const responseData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: values.email,
          password: values.password,
        }),
      }
    );
    setToken(responseData);
  };

  return (
    <div className={styles.Container}>
      <h1>logo goes here</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </form>
        )}
      </Formik>
      <div>
        <h2>
          Don't have an account? <Link href="/register">Register</Link>
        </h2>
      </div>
    </div>
  );
};

export default Login;
