import Link from "next/link";
import styles from "@/styles/Index.module.scss";
import { unsetToken } from "@/lib/auth";

const Index = () => {
  return (
    <div className={styles.Container}>
      <h1>Welcome to Map Republic!</h1>
      <Link href="/login">
        <button>login</button>
      </Link>
      <button
        onClick={() => {
          unsetToken();
        }}
      >
        logout
      </button>
    </div>
  );
};

export default Index;
