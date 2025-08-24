import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import api from "../../utils/api";
import DocumentUpload from "../../components/DocumentUpload";

export default function Apply() {
  const router = useRouter();
  const { id } = router.query;
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    await api.post("/applications", { bursary_id: id, statement: data.statement }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Application submitted");
    router.push("/dashboard");
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Apply for bursary</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea {...register("statement")} placeholder="Why do you need the bursary?" required />
        <br />
        <DocumentUpload />
        <br />
        <button type="submit">Submit application</button>
      </form>
    </div>
  );
}
