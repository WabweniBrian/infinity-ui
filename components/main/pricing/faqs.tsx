import FAQItem from "./faq-item";

const FAQs = () => {
  const faqItems = [
    {
      question: "What is Infinity UI?",
      answer:
        "Infinity UI is a comprehensive collection of beautifully designed UI components and blocks for React and Next.js applications, powered by Tailwind CSS. It provides developers with a wide range of customizable, accessible, and responsive components to build modern web applications quickly and efficiently. Best of all, it's completely free to use!",
    },
    {
      question: "Is Infinity UI free?",
      answer:
        "Yes! Infinity UI is 100% free to use. All components, updates, and improvements are available without any cost. You can freely use them in personal, commercial, and open-source projects. If you find it helpful, consider supporting the project through donations. Link for donations: https://ko-fi.com/brianwabweni.",
    },
    {
      question: "Can I use Infinity UI for commercial projects?",
      answer:
        "Absolutely! Infinity UI components are free for both personal and commercial use. Feel free to use them in your commercial applications without any restrictions.",
    },
    {
      question: "Can I share Infinity UI with others?",
      answer:
        "Yes, you can share Infinity UI with anyone. Since it's open and free, you can freely pass it along to other developers or use it in team projects. No licensing restrictions apply!",
    },
    {
      question: "Can I use Infinity UI in open-source projects?",
      answer:
        "Yes! Infinity UI is open-source, and you are welcome to use it in your open-source projects as long as you don't claim it as your own or redistribute it without proper attribution.",
    },
    {
      question: "How can I support the Infinity UI project?",
      answer:
        "If you find Infinity UI helpful, you can support the project through donations via Ko-fi. Your support helps keep the project alive and encourages further development. Every contribution counts! https://ko-fi.com/brianwabweni.",
    },
    {
      question: "Can I redistribute Infinity UI as my own library?",
      answer:
        "No. While Infinity UI is free to use and modify, please do not redistribute it as your own product or library. Give proper credit and link back to the official project. Sharing is encouraged — but claiming it as your own work is not.",
    },
    {
      question: "Can I modify or customize Infinity UI components?",
      answer:
        "Yes! Since Infinity UI is open-source, you're free to modify and customize the components to suit your needs. ",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl py-20">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQs;
