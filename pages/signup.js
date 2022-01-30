import * as React from "react";
import { signIn } from "next-auth/react";
import styles from "../styles/auth.module.css";

export default function Signup() {
  const formRef = React.useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    if (
      !formData.get("email") ||
      !formData.get("password") ||
      !formData.get("name")
    )
      return;

    const response = await signIn("signup", {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (response.error) return;

    router.push("/");
  };

  return (
    <div className={styles.container}>
      <h1>Signup</h1>
      <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
        <label className={styles.label}>Name</label>
        <input className={styles.input} name="name" type="text" />

        <label className={styles.label}>Email</label>
        <input className={styles.input} name="email" type="email" />

        <label className={styles.label}>Password</label>
        <input className={styles.input} name="password" type="password" />

        <button className={styles.button} type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}
