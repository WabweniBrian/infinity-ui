import { getAllUniqueKeywords } from "@/lib/actions/home/keywords";
import KeywordList from "./keyword-list";

interface KeywordsSearchProps {
  category: string;
}

const KeywordsSearch = async () => {
  const keywords = await getAllUniqueKeywords();

  return (
    <div>
      <KeywordList initialKeywords={keywords} />
    </div>
  );
};

export default KeywordsSearch;
