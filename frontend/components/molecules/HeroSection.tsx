"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-100 to-purple-100 m-6 py-16 rounded-lg shadow-lg  ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 ">
          <div className="text-left md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Explore the World of Ideas and Knowledge
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Dive into insightful articles, thought-provoking discussions, and
              discover new perspectives on a wide range of topics.
            </p>
            <Button onClick={() => router.push("/register")} >
              Get Started
            </Button>
          </div>

          <div className="relative">
            <Image
              src="/knowledge.jpg"
              alt="Hero Image"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;