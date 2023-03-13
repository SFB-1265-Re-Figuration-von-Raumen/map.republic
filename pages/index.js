import Link from "next/link";
import styles from "@/styles/Index.module.scss";

const Index = () => {
  return (
    <div className={styles.Container}>
      <h1>Welcome to Map Republic!</h1>
      <Link href="/login">
        <button>login</button>
      </Link>
    </div>
  );
};

export default Index;
