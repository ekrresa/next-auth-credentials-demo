import * as React from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import styles from "../styles/auth.module.css";

export default function Login() {
  const router = useRouter();
  const formRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    if (!formData.get("email") || !formData.get("password")) return;

    const response = await signIn("login", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (response.error) return;

    router.push("/");
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          name="email"
          placeholder="Email"
          type="email"
        />

        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          name="password"
          placeholder="Password"
          type="password"
        />
        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
