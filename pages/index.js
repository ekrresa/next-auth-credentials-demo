import * as React from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    /**
     * Session is being fetched
     */
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>Hello, {data?.user?.name}</p>
      <button className={styles.button} onClick={signOut}>
        Log out
      </button>
    </div>
  );
}
