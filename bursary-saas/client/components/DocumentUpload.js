import { useState } from "react";
import api from "../utils/api";

export default function DocumentUpload() {
  const [msg, setMsg] = useState("");

  const onChange = async (e) => {
    const token = localStorage.getItem("token");
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);
    form.append("application_id", "1"); // For MVP demo; replace with real app id if needed

    setMsg("Uploading & verifying...");
    const res = await api.post("/documents/upload", form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setMsg(`Uploaded. Verification: ${res.data.verification.status}`);
  };

  return (
    <div>
      <input type="file" onChange={onChange} />
      <div>{msg}</div>
    </div>
  );
}
