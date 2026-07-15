import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Masood Ur Rehman, the founder of Cwmservices, and our journey in building modern digital solutions.",
  alternates: {
    canonical: "https://cwmservices.dev/about",
  }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
