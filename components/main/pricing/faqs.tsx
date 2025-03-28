import FAQItem from "./faq-item";

const FAQs = () => {
  const faqItems = [
    {
      question: "What is Infinity UI?",
      answer:
        "Infinity UI is a comprehensive collection of beautifully designed UI components and blocks for React and Next.js applications, powered by Tailwind CSS and shadcn/ui. It provides developers with a wide range of customizable, accessible, and responsive components to build modern web applications quickly and efficiently.",
    },
    {
      question: "What does 'lifetime access' mean?",
      answer:
        "Lifetime access means that once you purchase Infinity UI, you have perpetual access to the components included in your plan or pack. This includes the ability to use these components in your projects indefinitely, as well as receive updates and improvements to those components.",
    },
    {
      question: "Can I use Infinity UI for commercial projects?",
      answer:
        "Yes, you can use Infinity UI components in commercial projects. Our license allows for both personal and commercial use.",
    },
    {
      question: "What is a 'user license'?",
      answer:
        "A user license determines how many individual developers can use Infinity UI within your organization. For example, the Solo Plan includes a single user license, while the Team Plan includes licenses for up to 30 users.",
    },
    {
      question: "Can I share my account with another user?",
      answer:
        "No, sharing your account with other users is strictly prohibited. Each developer should have their own license to use Infinity UI.",
    },
    {
      question: "Can I upgrade from Solo to Team plan?",
      answer:
        "Yes, you can upgrade from the Solo Plan to the Team Plan at any time. Contact our support team for assistance with the upgrade process.",
    },
    {
      question: "Can I use Infinity UI components in multiple projects?",
      answer:
        "Yes, you can use Infinity UI components in multiple projects. There's no limit to the number of projects you can create with your license.",
    },
    {
      question: "Can I use Infinity UI in open source projects?",
      answer:
        "Yes, you can use Infinity UI in open source projects. However, please ensure that you comply with our license terms and do not redistribute Infinity UI itself as open source.",
    },
    {
      question: "Can I use Infinity UI for client projects?",
      answer:
        "Yes, you can use Infinity UI for client projects. Your license allows you to use the components in projects you build for clients.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 7-day refund policy. If you&apos;re not satisfied with Infinity UI, please email us at support@infinityui.dev within 7 days of your purchase to request a refund.",
    },
    {
      question: "Do I need to purchase a license for each project I work on?",
      answer:
        "No, you don&apos;t have to buy a new Infinity UI plan every time you want to use it on a new project. As long as what you&apos;re building is allowed as per the license, you can build as many sites as you want without ever having to buy an additional license. To find detailed information and examples illustrating permissible and impermissible uses, read through our license.",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl">
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
