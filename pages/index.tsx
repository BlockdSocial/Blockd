import Link from 'next/link';

export default function Home() {
  return (
    <h1 className="text-5xl font-bold">
      <Link href="/auth/signup">Sign Up</Link>
    </h1>
  )
}
