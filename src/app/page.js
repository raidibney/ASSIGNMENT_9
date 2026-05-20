import Banner from "@/components/Banner";
import FeaturedPets from "@/components/FeaturedPets";
import HowItWorks from "@/components/HowItWorks";
import SuccessStories from "@/components/SuccessStories";
import WhyAdopt from "@/components/WhyAdopt";
import Image from "next/image";

export default function Home() {
  return (
    <div >
      <Banner />
      <FeaturedPets />
      <WhyAdopt />
      <SuccessStories />
      <HowItWorks />
    </div>
  );
}
