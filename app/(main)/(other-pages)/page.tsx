import Hero from "@/components/main/home/hero";
import LifetimeDealCTA from "@/components/main/common/lifetime-deal";
import PaymentSection from "@/components/main/common/payment-methods";

const Home = ({ searchParams }: { searchParams: { search: string } }) => {
  return (
    <>
      <Hero />
      <LifetimeDealCTA />
      <PaymentSection />
    </>
  );
};

export default Home;
