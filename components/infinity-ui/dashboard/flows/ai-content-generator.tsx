"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark,
  Check,
  Copy,
  Download,
  FileText,
  HelpCircle,
  Lightbulb,
  Loader,
  Mail,
  MessageSquare,
  Mic,
  Paperclip,
  RefreshCw,
  Save,
  Send,
  Settings,
  ShoppingBag,
  Sliders,
  Sparkles,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Types
interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

interface Suggestion {
  id: string;
  text: string;
  category: "topic" | "style" | "length";
}

interface Template {
  id: string;
  name: string;
  description: string;
  prompt: string;
  icon: React.ReactNode;
}

const AIContentGenerator = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "system",
      content:
        "👋 Hi there! I'm your AI writing assistant. How can I help you create content today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [showTemplates, setShowTemplates] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [contentType, setContentType] = useState<
    "blog" | "social" | "email" | "other"
  >("blog");
  const [tone, setTone] = useState<
    "professional" | "casual" | "friendly" | "formal"
  >("professional");
  const [length, setLength] = useState<"short" | "medium" | "long">("medium");
  const [isCopied, setIsCopied] = useState(false);
  const [savedContents, setSavedContents] = useState<string[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Check if system prefers dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(isDark);

      if (isDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  // Sample templates
  const templates: Template[] = [
    {
      id: "blog-post",
      name: "Blog Post",
      description:
        "Create a well-structured blog post with introduction, body, and conclusion.",
      prompt:
        "Write a blog post about [topic] that includes an engaging introduction, 3-5 main points with supporting details, and a conclusion with a call to action.",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      id: "social-media",
      name: "Social Media Post",
      description: "Create engaging content for social media platforms.",
      prompt:
        "Write a social media post about [topic] that is engaging, includes relevant hashtags, and has a clear call to action.",
      icon: <MessageSquare className="h-6 w-6" />,
    },
    {
      id: "email-newsletter",
      name: "Email Newsletter",
      description:
        "Create a professional email newsletter to engage your audience.",
      prompt:
        "Write an email newsletter about [topic] with a compelling subject line, personalized greeting, valuable content, and a strong call to action.",
      icon: <Mail className="h-6 w-6" />,
    },
    {
      id: "product-description",
      name: "Product Description",
      description: "Create a compelling product description that sells.",
      prompt:
        "Write a product description for [product] that highlights its features, benefits, and unique selling points in a persuasive way.",
      icon: <ShoppingBag className="h-6 w-6" />,
    },
  ];

  // Sample suggestions
  const generateSuggestions = () => {
    const topicSuggestions = [
      "Write about the future of remote work",
      "Create content about sustainable living tips",
      "Generate ideas for improving team productivity",
      "Write about emerging technology trends",
    ];

    const styleSuggestions = [
      "Make it more conversational",
      "Add more data and statistics",
      "Include storytelling elements",
      "Make it more concise",
    ];

    const lengthSuggestions = [
      "Expand on the main points",
      "Summarize in 3 bullet points",
      "Create a detailed step-by-step guide",
      "Write a brief executive summary",
    ];

    const newSuggestions: Suggestion[] = [
      {
        id: `topic-${Date.now()}-1`,
        text: topicSuggestions[
          Math.floor(Math.random() * topicSuggestions.length)
        ],
        category: "topic",
      },
      {
        id: `style-${Date.now()}-1`,
        text: styleSuggestions[
          Math.floor(Math.random() * styleSuggestions.length)
        ],
        category: "style",
      },
      {
        id: `length-${Date.now()}-1`,
        text: lengthSuggestions[
          Math.floor(Math.random() * lengthSuggestions.length)
        ],
        category: "length",
      },
    ];

    setSuggestions(newSuggestions);
  };

  // Initialize suggestions
  useEffect(() => {
    generateSuggestions();
  }, []);

  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim() && !selectedTemplate) return;

    let messageContent = inputValue;

    if (selectedTemplate) {
      messageContent = selectedTemplate.prompt.replace(
        "[topic]",
        inputValue || "the specified topic",
      );
    }

    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setSelectedTemplate(null);
    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      generateAIResponse(messageContent);
    }, 1000);
  };

  // Generate AI response
  const generateAIResponse = (prompt: string) => {
    // This would be replaced with an actual API call to an AI service
    const responseOptions = [
      "Here's a draft based on your request:\n\n# The Future of Remote Work\n\nThe COVID-19 pandemic has fundamentally changed how we think about work. What was once considered a temporary solution has evolved into a permanent shift in workplace dynamics. Remote work, once a rare perk, is now a standard offering for many companies.\n\n## Key Trends to Watch\n\n1. **Hybrid Work Models**: Companies are adopting flexible arrangements that combine in-office and remote work.\n\n2. **Digital Nomad Visas**: Countries are creating special visa programs to attract remote workers.\n\n3. **Virtual Collaboration Tools**: New technologies are emerging to facilitate better remote teamwork.\n\n## Challenges and Solutions\n\nWhile remote work offers many benefits, it also presents challenges such as isolation and communication barriers. Companies are addressing these issues through regular virtual team-building activities and improved communication protocols.\n\n## Conclusion\n\nThe future of work is neither fully remote nor fully in-office, but rather a thoughtful blend that maximizes productivity, well-being, and flexibility. Organizations that adapt quickly to this new reality will have a competitive advantage in attracting and retaining top talent.",
      "Based on your request, here's a social media post about sustainable living:\n\n\"🌱 Small changes, BIG impact! Today I switched to reusable shopping bags and saved 5+ plastic bags from ending up in our oceans. What's one eco-friendly swap you've made recently?\n\nShare your journey to #SustainableLiving in the comments below! Together, we can make every day #EarthDay. 🌎\n\n#EcoFriendly #ZeroWaste #GreenLiving\"",
      "Here's an email newsletter about improving team productivity:\n\nSubject: 5 Proven Strategies to Boost Your Team's Productivity This Quarter\n\nHello [Name],\n\nIn today's fast-paced work environment, maximizing team productivity isn't just about working harder—it's about working smarter.\n\nThis month, we're sharing 5 evidence-based strategies that have helped our clients achieve up to 30% productivity improvements:\n\n1. Implement the 2-minute rule: If a task takes less than 2 minutes, do it immediately\n2. Adopt time-blocking techniques for deep work sessions\n3. Use the 1-3-5 rule: accomplish 1 big thing, 3 medium things, and 5 small things daily\n4. Schedule regular breaks using the Pomodoro Technique\n5. Conduct weekly retrospectives to continuously improve processes\n\nWant to learn more? Click below to access our free productivity toolkit with templates and guides for implementing these strategies.\n\n[Access Free Toolkit]\n\nHere's to your team's most productive quarter yet!\n\nBest regards,\n[Your Name]",
    ];

    const aiResponse =
      responseOptions[Math.floor(Math.random() * responseOptions.length)];

    const newAIMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: "Here's what I've created based on your request:",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newAIMessage]);
    setGeneratedContent(aiResponse);
    setIsGenerating(false);

    // Generate new suggestions based on the content
    generateSuggestions();
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInputValue(suggestion.text);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Handle template selection
  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setShowTemplates(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Copy generated content
  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Save generated content
  const handleSaveContent = () => {
    if (generatedContent) {
      setSavedContents((prev) => [...prev, generatedContent]);
    }
  };

  // Clear chat
  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "system",
        content:
          "👋 Hi there! I'm your AI writing assistant. How can I help you create content today?",
        timestamp: new Date(),
      },
    ]);
    setGeneratedContent("");
  };

  // Regenerate content
  const handleRegenerateContent = () => {
    if (messages.length < 2) return;

    const lastUserMessage = [...messages]
      .reverse()
      .find((msg) => msg.role === "user");
    if (lastUserMessage) {
      setIsGenerating(true);
      setTimeout(() => {
        generateAIResponse(lastUserMessage.content);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 px-4 py-10 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-xl backdrop-blur-sm transition-all duration-300 dark:border-gray-800/50 dark:bg-gray-800/90 dark:backdrop-blur-sm">
        {/* Header */}
        <div className="flex flex-col items-center justify-between border-b border-gray-100 p-6 dark:border-gray-700/50 sm:flex-row">
          <div>
            <h2 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-2xl font-bold text-transparent dark:from-indigo-400 dark:to-violet-400">
              AI Content Generator
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Create high-quality content with AI assistance
            </p>
          </div>

          <div className="mt-4 flex items-center space-x-3 sm:mt-0">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </button>

            <button
              onClick={() => setShowSaved(!showSaved)}
              className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <Bookmark className="mr-2 h-4 w-4" />
              Saved ({savedContents.length})
            </button>

            <button
              onClick={toggleDarkMode}
              className="rounded-full bg-gray-100 p-2.5 text-gray-600 shadow-sm transition-all duration-200 hover:bg-gray-200 hover:shadow-md dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Chat and Input Section */}
          <div className="md:col-span-2">
            {/* Chat Messages */}
            <div className="h-[400px] overflow-y-auto border-b border-gray-100 p-4 dark:border-gray-700/50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === "user"
                        ? "bg-indigo-600 text-white dark:bg-indigo-500"
                        : message.role === "system"
                          ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                          : "bg-white text-gray-800 shadow-sm dark:bg-gray-800 dark:text-gray-200"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div
                      className={`mt-1 text-right text-xs ${
                        message.role === "user"
                          ? "text-indigo-200 dark:text-indigo-300"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Generated Content */}
            {generatedContent && (
              <div className="border-b border-gray-100 p-4 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Generated Content
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCopyContent}
                      className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      {isCopied ? (
                        <>
                          <Check className="mr-1 h-4 w-4 text-green-500" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="mr-1 h-4 w-4" />
                          Copy
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleSaveContent}
                      className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      <Save className="mr-1 h-4 w-4" />
                      Save
                    </button>
                    <button
                      onClick={handleRegenerateContent}
                      className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      <RefreshCw className="mr-1 h-4 w-4" />
                      Regenerate
                    </button>
                  </div>
                </div>
                <div className="mt-3 max-h-[300px] overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                    {generatedContent}
                  </div>
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4">
              {selectedTemplate && (
                <div className="mb-3 flex items-center rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/30">
                  <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                    {selectedTemplate.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                      {selectedTemplate.name}
                    </div>
                    <div className="text-xs text-indigo-600 dark:text-indigo-400">
                      {selectedTemplate.description}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="ml-2 rounded-full p-1 text-indigo-600 hover:bg-indigo-100 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              <div className="flex items-start space-x-2">
                <div className="relative flex-1">
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={
                      selectedTemplate
                        ? `Enter your topic for the ${selectedTemplate.name.toLowerCase()}`
                        : "Type your content request here..."
                    }
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 pr-10 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <div className="absolute bottom-2 right-2 flex space-x-1">
                    <button
                      onClick={() => setShowTemplates(!showTemplates)}
                      className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-300"
                    >
                      <Sparkles className="h-4 w-4" />
                    </button>
                    <button className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-300">
                      <Paperclip className="h-4 w-4" />
                    </button>
                    <button className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-300">
                      <Mic className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={isGenerating}
                  className={`flex h-[46px] w-[46px] items-center justify-center rounded-full ${
                    isGenerating
                      ? "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                      : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:from-indigo-700 hover:to-violet-700 hover:shadow-lg dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600"
                  }`}
                >
                  {isGenerating ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Templates Dropdown */}
              <AnimatePresence>
                {showTemplates && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 mt-2 w-full max-w-md rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="p-3">
                      <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Content Templates
                      </h3>
                      <div className="space-y-2">
                        {templates.map((template) => (
                          <div
                            key={template.id}
                            onClick={() => handleTemplateSelect(template)}
                            className="flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                              {template.icon}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {template.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {template.description}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Suggestions */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Suggestions
                  </h3>
                  <button
                    onClick={generateSuggestions}
                    className="text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Refresh
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      {suggestion.category === "topic" && (
                        <Lightbulb className="mr-1.5 h-3 w-3 text-amber-500" />
                      )}
                      {suggestion.category === "style" && (
                        <Sliders className="mr-1.5 h-3 w-3 text-indigo-500" />
                      )}
                      {suggestion.category === "length" && (
                        <FileText className="mr-1.5 h-3 w-3 text-emerald-500" />
                      )}
                      {suggestion.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Settings and Saved Content Panel */}
          <div className="border-l border-gray-100 dark:border-gray-700/50">
            <AnimatePresence mode="wait">
              {showSettings ? (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Settings
                    </h3>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Content Type
                      </label>
                      <select
                        value={contentType}
                        onChange={(e) => setContentType(e.target.value as any)}
                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                      >
                        <option value="blog">Blog Post</option>
                        <option value="social">Social Media</option>
                        <option value="email">Email</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tone
                      </label>
                      <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value as any)}
                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                      >
                        <option value="professional">Professional</option>
                        <option value="casual">Casual</option>
                        <option value="friendly">Friendly</option>
                        <option value="formal">Formal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Content Length
                      </label>
                      <div className="mt-1 flex items-center space-x-2">
                        <input
                          type="range"
                          min="0"
                          max="2"
                          step="1"
                          value={
                            length === "short" ? 0 : length === "medium" ? 1 : 2
                          }
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setLength(
                              val === 0
                                ? "short"
                                : val === 1
                                  ? "medium"
                                  : "long",
                            );
                          }}
                          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                        />
                        <span className="w-16 text-sm text-gray-700 dark:text-gray-300">
                          {length === "short"
                            ? "Short"
                            : length === "medium"
                              ? "Medium"
                              : "Long"}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-700/50">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Actions
                      </h4>
                      <div className="mt-2 space-y-2">
                        <button
                          onClick={handleClearChat}
                          className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4 text-gray-500" />
                          Clear conversation
                        </button>
                        <button className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                          <Download className="mr-2 h-4 w-4 text-gray-500" />
                          Export conversation
                        </button>
                        <button className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                          <HelpCircle className="mr-2 h-4 w-4 text-gray-500" />
                          Help & documentation
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : showSaved ? (
                <motion.div
                  key="saved"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Saved Content
                    </h3>
                    <button
                      onClick={() => setShowSaved(false)}
                      className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {savedContents.length === 0 ? (
                    <div className="mt-4 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-6 text-center dark:border-gray-700">
                      <Bookmark className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        No saved content yet. Click the &quot;Save&quot; button
                        on generated content to save it here.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-3">
                      {savedContents.map((content, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800"
                        >
                          <div className="max-h-[100px] overflow-hidden text-sm text-gray-800 dark:text-gray-200">
                            {content.substring(0, 150)}
                            {content.length > 150 && "..."}
                          </div>
                          <div className="mt-2 flex justify-end space-x-2">
                            <button className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                              <Copy className="mr-1 h-3 w-3" />
                              Copy
                            </button>
                            <button className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                              <Download className="mr-1 h-3 w-3" />
                              Export
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    How It Works
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-gray-900 dark:text-white">
                            Describe Your Needs
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Tell the AI what kind of content you need
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-gray-900 dark:text-white">
                            AI Generates Content
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Our AI creates high-quality content based on your
                            request
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                          <RefreshCw className="h-4 w-4" />
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-gray-900 dark:text-white">
                            Refine & Iterate
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Provide feedback to refine the content until
                            it&apos;s perfect
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                          <Download className="h-4 w-4" />
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-gray-900 dark:text-white">
                            Use & Export
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Copy, save, or export your content for use anywhere
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:from-indigo-700 hover:to-violet-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600">
                      <Star className="mr-2 h-4 w-4" />
                      Upgrade to Pro
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIContentGenerator;
