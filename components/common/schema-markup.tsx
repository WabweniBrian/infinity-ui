interface SchemaMarkupProps {
  data: Record<string, any>;
}

export const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);
