import Banner from "@/components/Banner";
import HowItWorks from "@/components/HowItWorks";
import SuccessStories from "@/components/SuccessStories";
import WhyAdopt from "@/components/WhyAdopt";
import Image from "next/image";

export default function Home() {
  return (
    <div >
      <Banner />
      <WhyAdopt />
      <SuccessStories />
      <HowItWorks />
    </div>
  );
}
