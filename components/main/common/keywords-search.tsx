import { getKeywords } from "@/lib/actions/getKeyWords";
import KeywordList from "./keyword-list";

interface KeywordsSearchProps {
  category?: string;
}

const KeywordsSearch = async ({ category }: KeywordsSearchProps) => {
  const keywords = await getKeywords(category);

  return (
    <div>
      <KeywordList initialKeywords={keywords} />
    </div>
  );
};

export default KeywordsSearch;
