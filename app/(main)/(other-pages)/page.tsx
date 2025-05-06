import CreatorProfile from "@/components/main/common/creator-profile";
import Hero from "@/components/main/home/hero";
import FAQs from "@/components/main/pricing/faqs";

const Home = ({ searchParams }: { searchParams: { search: string } }) => {
  return (
    <>
      <Hero />
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 px-3 py-20 dark:from-gray-950 dark:to-cyan-950">
        <CreatorProfile />
      </div>
      <div className="px-3">
        <FAQs />
      </div>
    </>
  );
};

export default Home;
