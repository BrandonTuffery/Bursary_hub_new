import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import api from "../utils/api";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    await api.post("/auth/register", data);
    router.push("/login");
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Full name" required />
        <br />
        <input {...register("email")} placeholder="Email" type="email" required />
        <br />
        <input {...register("password")} placeholder="Password" type="password" required />
        <br />
        <button type="submit">Create account</button>
      </form>
    </div>
  );
}
