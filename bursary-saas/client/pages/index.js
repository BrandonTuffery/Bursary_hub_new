import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Bursary SaaS</h1>
      <p>Welcome. Please <Link href="/register">register</Link> or <Link href="/login">login</Link>.</p>
    </main>
  );
}
