import { Metadata } from "next";
import Image from "next/image";
import { data } from "@/app/data";
import Header from "@/src/components/Header";
import { section } from "framer-motion/client";
import Footer from "@/src/components/Footer";

export const metadata: Metadata = {
  title: 'Our Medium Library | Code With Masood',
  description: 'Read the latest tech stories, insights, and development guides from Code With Masood on our Medium Library.',
  alternates: {
    canonical: 'https://cwmservices.dev/blog',
  },
  openGraph: {
    title: 'Our Medium Library | Code With Masood',
    description: 'Read the latest tech stories, insights, and development guides from Code With Masood on our Medium Library.',
    url: 'https://cwmservices.dev/blog',
    siteName: 'Code With Masood',
    images: [
      {
        url: 'https://cwmservices.dev/banner.png', 
        width: 1200,
        height: 630,
        alt: 'Code With Masood Blog Banner',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Medium Library | Code With Masood',
    description: 'Read the latest tech stories, insights, and development guides from Code With Masood on our Medium Library.',
  },
};

export default function BlogPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#0A0B10]">
            <Header />
            {/* Hero Banner */}
            <div className="relative mb-14 w-full py-20 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-dark/70"></div>
                </div>

                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-dark to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark to-transparent" />
                <div

                    className="relative z-10 px-4"
                >
                    <h1 className="font-primary font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-light mb-4 leading-tight">
                        Our Medium Library
                    </h1>
                    <p className="font-jakarta font-normal text-base md:text-lg lg:text-xl text-gray-300 mb-6 max-w-2xl mx-auto px-4">
                        Visit <a href="https://www.medium.com/@codewithmasood"><span className="opacity-95 hover:opacity-100 transition-opacity duration-300 text-primary">medium.com/@CodeWithMasood</span></a> for more tech stories.
                    </p>
                </div>
            </div>

            <div className="w-[92%] lg:w-[96%] xl:w-[92%] max-w-[1600px] mx-auto">

                {/* Posts grid */}
                <div className="grid mb-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                    {data.posts.map((post) => (
                        <article
                            key={post.link}
                            className="bg-[#10121A] border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full transition-colors duration-300 hover:border-primary/50"
                        >
                            <div className="relative w-full aspect-[16/9] overflow-hidden">
                                <Image
                                    src={`/${post.img}.png`}
                                    alt={post.title}
                                    fill
                                    className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="font-display font-semibold text-xl xl:text-2xl text-gray-100 mb-4">
                                    {post.title}
                                </h3>

                                <p
                                    className="font-body text-gray-400 text-[15px] flex-grow"
                                    style={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 4,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        lineHeight: "1.6rem",
                                        maxHeight: "6.4rem",
                                    }}
                                >
                                    {post.excerpt}
                                </p>

                                <a
                                    href={post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-block font-body text-primary text-base font-medium opacity-80 hover:opacity-100 transition-opacity duration-300"
                                >
                                    Continue reading...
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div >
            <Footer />
        </div >
    );
}