import { getKeywordsBySpecificCategory } from "@/lib/actions/home/keywords";
import KeywordList from "./keyword-list";

interface KeywordsSearchProps {
  category: string;
}

const KeywordsSearch = async ({ category }: KeywordsSearchProps) => {
  const keywords = await getKeywordsBySpecificCategory(category);

  return (
    <div>
      <KeywordList initialKeywords={keywords} />
    </div>
  );
};

export default KeywordsSearch;
