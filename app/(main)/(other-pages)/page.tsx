import Categories from "@/components/main/home/categories";
import Features from "@/components/main/home/features";
import Hero from "@/components/main/home/hero";
import Techstack from "@/components/main/home/techstack";

const Home = () => {
  return (
    <div className="pt-20">
      <Hero />
      <Categories />
      <Techstack />
      <Features />
    </div>
  );
};

export default Home;
