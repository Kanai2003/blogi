"use client"
import BlogSection from "../molecules/BlogSection";
import HeroSection from "../molecules/HeroSection";

function LandingPage() {

 

  return (
    <div className="min-h-screen flex flex-col p-6 ">
      <HeroSection />
      <BlogSection />
    </div>
  );
}

export default LandingPage;
