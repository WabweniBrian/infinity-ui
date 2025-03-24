import Hero from "@/components/main/home/hero";
import LifetimeDealCTA from "@/components/main/common/lifetime-deal";

const Home = ({ searchParams }: { searchParams: { search: string } }) => {
  return (
    <>
      <Hero />
      <LifetimeDealCTA />
    </>
  );
};

export default Home;
