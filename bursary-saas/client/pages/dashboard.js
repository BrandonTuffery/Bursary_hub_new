import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../utils/api";

export default function Dashboard() {
  const [bursaries, setBursaries] = useState([]);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    (async () => {
      const res = await api.get("/bursaries", { headers: { Authorization: `Bearer ${token}` }});
      setBursaries(res.data);
      const res2 = await api.get("/applications", { headers: { Authorization: `Bearer ${token}` }});
      setApps(res2.data);
    })();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Available Bursaries</h2>
      {bursaries.map((b) => (
        <div key={b.id} style={{border:"1px solid #ddd", padding:12, marginBottom:12}}>
          <h3>{b.title}</h3>
          <p>{b.description}</p>
          <Link href={`/apply/${b.id}`}>Apply</Link>
        </div>
      ))}

      <h2>Your Applications</h2>
      {apps.map(a => (
        <div key={a.id} style={{border:"1px dashed #aaa", padding:12, marginBottom:12}}>
          <strong>{a.bursary_title}</strong> — <em>{a.status}</em>
        </div>
      ))}
    </div>
  );
}
