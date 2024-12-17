interface PageHeaderProps {
  heading: string;
  text?: string;
}

const PageHeader = ({ heading, text }: PageHeaderProps) => {
  return (
    <div className="mb-8 space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
      {text && <p className="text-muted-foreground">{text}</p>}
    </div>
  );
};

export default PageHeader;
