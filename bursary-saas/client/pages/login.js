import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import api from "../utils/api";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const res = await api.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    router.push("/dashboard");
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} placeholder="Email" type="email" required />
        <br />
        <input {...register("password")} placeholder="Password" type="password" required />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
