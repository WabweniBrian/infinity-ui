"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  Maximize2,
  Minimize2,
  FileText,
  Sparkles,
  Loader2,
  Check,
  Copy,
  Share,
  ChevronDown,
  Sliders,
  Trash2,
  Edit,
  Plus,
  Wand2,
  Save,
  MessageSquare,
  Send,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  PenTool,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Image,
  Smile,
  Paperclip,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Star,
  ImageIcon,
  CheckCheck,
} from "lucide-react";

interface WritingProject {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  isFavorite: boolean;
}

interface WritingPrompt {
  id: string;
  text: string;
  category: string;
}

interface AIResponse {
  id: string;
  content: string;
  timestamp: string;
  prompt: string;
  isSaved: boolean;
  feedback?: "positive" | "negative";
}

interface WritingTone {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
}

interface WritingStyle {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
}

interface WritingLength {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
}

const AIWritingAssistant = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState<string | null>("editor");
  const [currentProject, setCurrentProject] = useState<WritingProject | null>(
    null,
  );
  const [projects, setProjects] = useState<WritingProject[]>([]);
  const [writingPrompts, setWritingPrompts] = useState<WritingPrompt[]>([]);
  const [aiResponses, setAIResponses] = useState<AIResponse[]>([]);
  const [writingTones, setWritingTones] = useState<WritingTone[]>([]);
  const [writingStyles, setWritingStyles] = useState<WritingStyle[]>([]);
  const [writingLengths, setWritingLengths] = useState<WritingLength[]>([]);
  const [userPrompt, setUserPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"write" | "improve" | "chat">(
    "write",
  );
  const [editorContent, setEditorContent] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<WritingProject[]>(
    [],
  );
  const [selectedCategory, setSelectedCategory] = useState<string | "all">(
    "all",
  );
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    category: "general",
  });
  const [selectedText, setSelectedText] = useState("");
  const [improvementType, setImprovementType] = useState<
    "rewrite" | "expand" | "shorten" | "simplify" | "formalize"
  >("rewrite");
  const [isImproving, setIsImproving] = useState(false);
  const [improvedText, setImprovedText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [openPanels, setOpenPanels] = useState<Set<string>>(
    new Set(["projects", "editor", "responses"]),
  );
  const [messageFeedback, setMessageFeedback] = useState<
    Record<number, "like" | "dislike" | null>
  >({});

  const [copied, setCopied] = useState<string>("");

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

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

  // Handle copy
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);

    setTimeout(() => {
      setCopied((prev) => (prev === key ? "" : prev));
    }, 2000);
  };

  // Initialize sample data
  useEffect(() => {
    // Sample projects
    const sampleProjects: WritingProject[] = [
      {
        id: "proj-1",
        title: "Marketing Email Campaign",
        content:
          "Dear valued customer,\n\nWe're excited to announce our new product line that will revolutionize how you work. Our latest innovations combine cutting-edge technology with user-friendly design to create tools that seamlessly integrate into your daily workflow.\n\nFor a limited time, we're offering an exclusive 20% discount for our loyal customers. Simply use the code LOYAL20 at checkout to claim your discount.\n\nThank you for your continued support.\n\nBest regards,\nThe Marketing Team",
        createdAt: "2023-06-15T14:30:00Z",
        updatedAt: "2023-06-15T16:45:00Z",
        category: "email",
        isFavorite: true,
      },
      {
        id: "proj-2",
        title: "Blog Post: AI Trends 2023",
        content:
          "# AI Trends to Watch in 2023\n\nArtificial Intelligence continues to evolve at a rapid pace, transforming industries and creating new opportunities for innovation. As we move through 2023, several key trends are emerging that will shape the future of AI development and implementation.\n\n## Multimodal AI Systems\n\nUnlike traditional AI models that focus on a single type of data (text, images, or audio), multimodal AI systems can process and understand multiple types of information simultaneously. This allows for more comprehensive analysis and more natural human-computer interaction.\n\n## Responsible AI Development\n\nAs AI becomes more integrated into critical systems, the focus on ethical considerations and responsible development practices is intensifying. Organizations are implementing frameworks to ensure AI systems are fair, transparent, and accountable.\n\n## AI in Healthcare\n\nThe healthcare industry is experiencing a significant transformation through AI applications. From diagnostic tools to personalized treatment plans, AI is enhancing patient care and streamlining administrative processes.\n\n## Edge AI\n\nProcessing AI workloads directly on devices rather than in the cloud is becoming increasingly important. Edge AI reduces latency, enhances privacy, and enables AI functionality in environments with limited connectivity.\n\n## Conclusion\n\nThese trends represent just a fraction of the exciting developments in the AI landscape. As technology continues to advance, we can expect AI to become even more sophisticated and integrated into our daily lives.",
        createdAt: "2023-06-10T09:15:00Z",
        updatedAt: "2023-06-14T11:20:00Z",
        category: "blog",
        isFavorite: false,
      },
      {
        id: "proj-3",
        title: "Product Description: Smart Home Hub",
        content:
          "# SmartHub Pro: The Heart of Your Intelligent Home\n\nTransform your living space into a seamlessly connected smart home with the revolutionary SmartHub Pro. This elegant, compact device serves as the central command center for all your smart devices, offering unparalleled convenience and control.\n\n## Key Features\n\n- **Universal Compatibility**: Works with over 10,000 smart devices across all major brands\n- **Intuitive Voice Control**: Enhanced voice recognition technology understands natural language commands\n- **Advanced Automation**: Create sophisticated routines that respond to your lifestyle\n- **Energy Monitoring**: Track and optimize your home's energy consumption\n- **Bank-Level Security**: Military-grade encryption keeps your smart home network secure\n\n## Technical Specifications\n\n- Dimensions: 4.5\" x 4.5\" x 1.2\"\n- Connectivity: Wi-Fi 6, Bluetooth 5.2, Zigbee, Z-Wave, Thread\n- Power: AC adapter (included) with battery backup\n- Processor: Quad-core 2.0 GHz\n- Memory: 4GB RAM, 32GB storage\n\nThe SmartHub Pro doesn't just connect your devices—it creates a truly intelligent home that anticipates your needs and enhances your daily life. Whether you're a smart home enthusiast or just beginning your connected home journey, the SmartHub Pro offers the perfect balance of powerful functionality and user-friendly design.",
        createdAt: "2023-06-05T16:20:00Z",
        updatedAt: "2023-06-12T10:30:00Z",
        category: "product",
        isFavorite: true,
      },
      {
        id: "proj-4",
        title: "Weekly Team Update",
        content:
          "# Weekly Team Update: June 12-16, 2023\n\n## Project Milestones\n\n- Completed the initial design phase for the client dashboard\n- Finalized API documentation for the payment processing system\n- Resolved 15 high-priority bugs in the mobile application\n- Conducted user testing sessions with 8 participants\n\n## Upcoming Deadlines\n\n- June 20: Submit final design mockups for client approval\n- June 22: Complete integration testing for the payment system\n- June 23: Prepare demo for the stakeholder meeting\n\n## Team Achievements\n\n- Sarah completed the advanced React certification\n- Michael's optimization work improved page load times by 40%\n- The customer support team achieved a 95% satisfaction rating\n\n## Challenges & Solutions\n\n- **Challenge**: Unexpected compatibility issues with the legacy system\n  **Solution**: Implementing a middleware layer to handle data transformation\n\n- **Challenge**: Timeline pressure for the reporting feature\n  **Solution**: Adopting a phased approach with core functionality in the first release\n\n## Resources Needed\n\n- Additional QA support for the final testing phase\n- Access to the production environment for performance testing\n\nPlease review and let me know if you have any questions or concerns before our team meeting on Monday.",
        createdAt: "2023-06-08T11:45:00Z",
        updatedAt: "2023-06-11T14:15:00Z",
        category: "business",
        isFavorite: false,
      },
    ];
    setProjects(sampleProjects);
    setFilteredProjects(sampleProjects);
    setCurrentProject(sampleProjects[0]);
    setEditorContent(sampleProjects[0].content);

    // Sample writing prompts
    const sampleWritingPrompts: WritingPrompt[] = [
      {
        id: "prompt-1",
        text: "Write a compelling product description for a new smartphone",
        category: "product",
      },
      {
        id: "prompt-2",
        text: "Create an engaging introduction for a blog post about sustainable living",
        category: "blog",
      },
      {
        id: "prompt-3",
        text: "Draft a professional email requesting a meeting with a potential client",
        category: "email",
      },
      {
        id: "prompt-4",
        text: "Write a clear and concise project proposal for a website redesign",
        category: "business",
      },
      {
        id: "prompt-5",
        text: "Create a persuasive call-to-action for a newsletter signup form",
        category: "marketing",
      },
    ];
    setWritingPrompts(sampleWritingPrompts);

    // Sample AI responses
    const sampleAIResponses: AIResponse[] = [
      {
        id: "resp-1",
        content:
          "The SmartHub Pro represents the next evolution in home automation technology. This sleek, powerful device serves as the central nervous system for your smart home, seamlessly connecting and coordinating all your IoT devices through an intuitive interface. With advanced voice recognition, customizable automation routines, and compatibility with over 10,000 smart products, the SmartHub Pro transforms your living space into a truly intelligent environment that adapts to your lifestyle.",
        timestamp: "2023-06-15T15:30:00Z",
        prompt: "Write a compelling product description for a smart home hub",
        isSaved: true,
        feedback: "positive",
      },
      {
        id: "resp-2",
        content:
          "Dear Mr. Thompson,\n\nI hope this email finds you well. My name is Sarah Johnson, and I'm the Marketing Director at Innovate Solutions. I recently attended your presentation at the Digital Marketing Summit and was impressed by your insights on customer engagement strategies.\n\nI believe there could be valuable opportunities for collaboration between our organizations. Would you be available for a 30-minute virtual meeting next week to discuss potential synergies? I'm flexible on timing and can work around your schedule.\n\nThank you for considering my request. I look forward to your response.\n\nBest regards,\nSarah Johnson\nMarketing Director\nInnovate Solutions",
        timestamp: "2023-06-14T11:20:00Z",
        prompt:
          "Draft a professional email requesting a meeting with a potential client",
        isSaved: false,
      },
    ];
    setAIResponses(sampleAIResponses);

    // Sample writing tones
    const sampleWritingTones: WritingTone[] = [
      {
        id: "tone-1",
        name: "Professional",
        description: "Formal and business-appropriate language",
        isSelected: true,
      },
      {
        id: "tone-2",
        name: "Casual",
        description: "Relaxed and conversational tone",
        isSelected: false,
      },
      {
        id: "tone-3",
        name: "Enthusiastic",
        description: "Energetic and exciting language",
        isSelected: false,
      },
      {
        id: "tone-4",
        name: "Authoritative",
        description: "Confident and commanding voice",
        isSelected: false,
      },
      {
        id: "tone-5",
        name: "Empathetic",
        description: "Understanding and compassionate tone",
        isSelected: false,
      },
    ];
    setWritingTones(sampleWritingTones);

    // Sample writing styles
    const sampleWritingStyles: WritingStyle[] = [
      {
        id: "style-1",
        name: "Descriptive",
        description: "Rich in detail and sensory language",
        isSelected: true,
      },
      {
        id: "style-2",
        name: "Persuasive",
        description: "Convincing arguments and calls to action",
        isSelected: false,
      },
      {
        id: "style-3",
        name: "Informative",
        description: "Clear explanation of facts and concepts",
        isSelected: false,
      },
      {
        id: "style-4",
        name: "Narrative",
        description: "Storytelling approach with flow",
        isSelected: false,
      },
      {
        id: "style-5",
        name: "Technical",
        description: "Precise terminology and structured format",
        isSelected: false,
      },
    ];
    setWritingStyles(sampleWritingStyles);

    // Sample writing lengths
    const sampleWritingLengths: WritingLength[] = [
      {
        id: "length-1",
        name: "Brief",
        description: "Concise and to the point (100-200 words)",
        isSelected: false,
      },
      {
        id: "length-2",
        name: "Standard",
        description: "Balanced length (300-500 words)",
        isSelected: true,
      },
      {
        id: "length-3",
        name: "Detailed",
        description: "Comprehensive coverage (600-1000 words)",
        isSelected: false,
      },
      {
        id: "length-4",
        name: "Extended",
        description: "In-depth exploration (1000+ words)",
        isSelected: false,
      },
    ];
    setWritingLengths(sampleWritingLengths);

    // Sample chat history
    const sampleChatHistory = [
      {
        role: "assistant" as const,
        content:
          "Hello! I'm your AI writing assistant. How can I help you with your writing today?",
      },
    ];
    setChatHistory(sampleChatHistory);
  }, []);

  // Update word count, character count, and reading time when editor content changes
  useEffect(() => {
    if (editorContent) {
      const words = editorContent.trim().split(/\s+/).filter(Boolean);
      setWordCount(words.length);
      setCharacterCount(editorContent.length);
      setReadingTime(Math.ceil(words.length / 200)); // Assuming average reading speed of 200 words per minute
    } else {
      setWordCount(0);
      setCharacterCount(0);
      setReadingTime(0);
    }
  }, [editorContent]);

  // Filter projects when search query or selected category changes
  useEffect(() => {
    if (searchQuery || selectedCategory !== "all") {
      const filtered = projects.filter((project) => {
        const matchesSearch =
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" || project.category === selectedCategory;

        return matchesSearch && matchesCategory;
      });
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [searchQuery, selectedCategory, projects]);

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatEndRef.current && !isGenerating) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isGenerating]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Toggle panel expansion
  const togglePanel = (panel: string) => {
    setOpenPanels((prev) => {
      const next = new Set(prev);
      if (next.has(panel)) {
        next.delete(panel);
      } else {
        next.add(panel);
      }
      return next;
    });
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  // Select writing tone
  const selectTone = (id: string) => {
    setWritingTones(
      writingTones.map((tone) => ({
        ...tone,
        isSelected: tone.id === id,
      })),
    );
  };

  // Select writing style
  const selectStyle = (id: string) => {
    setWritingStyles(
      writingStyles.map((style) => ({
        ...style,
        isSelected: style.id === id,
      })),
    );
  };

  // Select writing length
  const selectLength = (id: string) => {
    setWritingLengths(
      writingLengths.map((length) => ({
        ...length,
        isSelected: length.id === id,
      })),
    );
  };

  // Toggle project favorite
  const toggleFavorite = (id: string) => {
    setProjects(
      projects.map((project) => {
        if (project.id === id) {
          return { ...project, isFavorite: !project.isFavorite };
        }
        return project;
      }),
    );

    if (currentProject && currentProject.id === id) {
      setCurrentProject({
        ...currentProject,
        isFavorite: !currentProject.isFavorite,
      });
    }
  };

  // Create new project
  const createNewProject = () => {
    if (!newProject.title.trim()) return;

    const newProjectObj: WritingProject = {
      id: `proj-${Date.now()}`,
      title: newProject.title,
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: newProject.category,
      isFavorite: false,
    };

    setProjects([newProjectObj, ...projects]);
    setFilteredProjects([newProjectObj, ...filteredProjects]);
    setCurrentProject(newProjectObj);
    setEditorContent("");
    setIsCreatingProject(false);
    setNewProject({
      title: "",
      category: "general",
    });
  };

  // Delete project
  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    setFilteredProjects(
      filteredProjects.filter((project) => project.id !== id),
    );

    if (currentProject && currentProject.id === id) {
      setCurrentProject(updatedProjects.length > 0 ? updatedProjects[0] : null);
      setEditorContent(
        updatedProjects.length > 0 ? updatedProjects[0].content : "",
      );
    }
  };

  // Save current project
  const saveProject = () => {
    if (!currentProject) return;

    const now = new Date().toISOString();

    const updatedProject = {
      ...currentProject,
      content: editorContent,
      updatedAt: now,
    };

    setCurrentProject(updatedProject);

    setProjects(
      projects.map((project) => {
        if (project.id === currentProject.id) {
          return updatedProject;
        }
        return project;
      }),
    );

    setFilteredProjects(
      filteredProjects.map((project) => {
        if (project.id === currentProject.id) {
          return updatedProject;
        }
        return project;
      }),
    );
  };

  // Select project
  const selectProject = (project: WritingProject) => {
    // Save current project before switching
    if (currentProject) {
      saveProject();
    }

    setCurrentProject(project);
    setEditorContent(project.content);
  };

  // Generate AI content
  const generateContent = async () => {
    setIsGenerating(true);

    // Get selected tone, style, and length
    const selectedTone = writingTones.find((tone) => tone.isSelected);
    const selectedStyle = writingStyles.find((style) => style.isSelected);
    const selectedLength = writingLengths.find((length) => length.isSelected);

    // Add user prompt to chat history in chat mode
    if (selectedTab === "chat") {
      // Simulate typing effect for AI response
      setIsTyping(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Sample AI responses based on prompt
      let aiResponse = "I'm analyzing your request...";
      const fullResponse =
        "Based on your request, I've prepared the following content:\n\n" +
        "The integration of artificial intelligence into everyday business operations represents one of the most significant technological shifts of our era. Unlike previous technological revolutions that primarily affected specific industries or functions, AI has the potential to transform virtually every aspect of how organizations operate, from customer service and product development to supply chain management and strategic decision-making.\n\n" +
        "What makes AI particularly powerful is its ability to process vast amounts of data and identify patterns that would be impossible for humans to detect. This capability enables businesses to gain deeper insights into customer behavior, market trends, and operational inefficiencies. Moreover, as AI systems continue to evolve, they become increasingly capable of not just analyzing historical data but also making predictions and recommendations that can drive business strategy.\n\n" +
        "However, successful AI implementation requires more than just technological investment. Organizations must also address challenges related to data quality, talent acquisition, ethical considerations, and change management. Those that navigate these challenges effectively will be well-positioned to realize the full potential of AI as a driver of innovation and competitive advantage.";

      if (userPrompt.toLowerCase().includes("introduction")) {
        aiResponse =
          "Here's an introduction for your content:\n\nIn today's rapidly evolving digital landscape, staying ahead of the curve isn't just an advantage—it's a necessity. As technologies advance and consumer expectations shift, businesses must adapt their strategies to remain competitive and relevant. This article explores the key trends shaping the future of digital marketing and provides actionable insights for leveraging these developments to drive growth and engagement.";
      } else if (userPrompt.toLowerCase().includes("conclusion")) {
        aiResponse =
          "Here's a conclusion for your content:\n\nAs we've explored throughout this discussion, the integration of these strategies into your business approach isn't optional in today's competitive environment—it's essential. By embracing innovation, prioritizing customer experience, and maintaining adaptability, your organization will be well-positioned to navigate the challenges and opportunities that lie ahead. Remember that success in this dynamic landscape isn't about predicting the future perfectly, but rather building the agility to respond effectively as it unfolds.";
      } else if (
        userPrompt.toLowerCase().includes("email") ||
        userPrompt.toLowerCase().includes("message")
      ) {
        aiResponse =
          "Here's a professional email draft:\n\nSubject: Invitation to Collaborate on Upcoming Project\n\nDear [Recipient],\n\nI hope this message finds you well. I'm reaching out because I've been following your work in [their field/industry] and have been particularly impressed by [specific project or achievement].\n\nOur team at [Your Company] is currently developing a new initiative focused on [brief project description], and we believe your expertise would be invaluable to this endeavor. We'd like to explore the possibility of collaboration that would be mutually beneficial to our organizations.\n\nWould you be available for a brief call next week to discuss this opportunity further? I'm flexible on timing and can work around your schedule.\n\nThank you for considering this invitation. I look forward to potentially working together.\n\nBest regards,\n\n[Your Name]\n[Your Position]\n[Your Company]\n[Contact Information]";
      } else {
        aiResponse = fullResponse;
      }

      // Add AI response with typing effect
      let displayedResponse = "";
      const words = aiResponse.split(" ");
      // First add the user message to chat history
      setChatHistory([...chatHistory, { role: "user", content: userPrompt }]);
      // Then add an initial empty AI response
      setChatHistory((prev) => [...prev, { role: "assistant", content: "" }]);

      // Now stream in the words with a typing effect
      for (let i = 0; i < words.length; i++) {
        displayedResponse = words.slice(0, i + 1).join(" ");
        setChatHistory((prev) => {
          const updated = [
            ...prev.slice(0, -1),
            {
              role: "assistant" as "user" | "assistant",
              content: displayedResponse,
            },
          ];
          return updated;
        });
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      setIsTyping(false);
      setUserPrompt("");
    } else {
      // Simulate API call delay for write/improve modes
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create new AI response
      const newResponse: AIResponse = {
        id: `resp-${Date.now()}`,
        content:
          "The integration of artificial intelligence into everyday business operations represents one of the most significant technological shifts of our era. Unlike previous technological revolutions that primarily affected specific industries or functions, AI has the potential to transform virtually every aspect of how organizations operate, from customer service and product development to supply chain management and strategic decision-making.\n\nWhat makes AI particularly powerful is its ability to process vast amounts of data and identify patterns that would be impossible for humans to detect. This capability enables businesses to gain deeper insights into customer behavior, market trends, and operational inefficiencies. Moreover, as AI systems continue to evolve, they become increasingly capable of not just analyzing historical data but also making predictions and recommendations that can drive business strategy.\n\nHowever, successful AI implementation requires more than just technological investment. Organizations must also address challenges related to data quality, talent acquisition, ethical considerations, and change management. Those that navigate these challenges effectively will be well-positioned to realize the full potential of AI as a driver of innovation and competitive advantage.",
        timestamp: new Date().toISOString(),
        prompt: userPrompt,
        isSaved: false,
      };

      setAIResponses([newResponse, ...aiResponses]);

      // In write mode, insert the generated content into the editor
      if (selectedTab === "write") {
        setEditorContent((prevContent) => {
          return (
            prevContent + (prevContent ? "\n\n" : "") + newResponse.content
          );
        });

        // Save the updated project
        if (currentProject) {
          const now = new Date().toISOString();

          const updatedProject = {
            ...currentProject,
            content:
              editorContent +
              (editorContent ? "\n\n" : "") +
              newResponse.content,
            updatedAt: now,
          };

          setCurrentProject(updatedProject);

          setProjects(
            projects.map((project) => {
              if (project.id === currentProject.id) {
                return updatedProject;
              }
              return project;
            }),
          );
        }
      }

      // In improve mode, show the improved text
      if (selectedTab === "improve" && selectedText) {
        let improvedContent = "";

        switch (improvementType) {
          case "rewrite":
            improvedContent =
              "The integration of artificial intelligence into business operations marks a pivotal technological advancement of our time. Unlike past innovations that impacted specific sectors, AI has the capacity to revolutionize virtually every facet of organizational functioning, spanning customer engagement, product innovation, supply chain optimization, and executive decision-making processes.";
            break;
          case "expand":
            improvedContent =
              selectedText +
              "\n\nFurthermore, this transformation extends beyond mere efficiency gains. AI-powered systems enable predictive analytics that can anticipate market shifts, customer needs, and potential disruptions before they occur. This proactive capability allows organizations to shift from reactive problem-solving to strategic opportunity identification. Early adopters across industries are already demonstrating how AI can create entirely new business models, revenue streams, and customer experiences that were previously unimaginable.";
            break;
          case "shorten":
            improvedContent =
              "AI integration represents a major technological shift affecting all business operations. Its data processing capabilities provide insights into customer behavior and market trends while enabling predictive analytics. Successful implementation requires addressing data quality, talent, ethics, and change management challenges.";
            break;
          case "simplify":
            improvedContent =
              "Adding AI to everyday business operations is one of the biggest tech changes we're seeing today. Unlike earlier tech revolutions that mostly affected certain industries or job functions, AI can change almost every part of how businesses work—from customer service and making products to managing supply chains and making big decisions.";
            break;
          case "formalize":
            improvedContent =
              "The incorporation of artificial intelligence technologies into organizational operations constitutes one of the most significant technological paradigm shifts of the contemporary era. In contrast to preceding technological revolutions that predominantly impacted specific industrial sectors or functional domains, artificial intelligence possesses the capability to fundamentally transform virtually all aspects of organizational functionality, encompassing customer relations, product development initiatives, supply chain optimization, and strategic decision-making processes.";
            break;
          default:
            improvedContent = selectedText;
        }

        setImprovedText(improvedContent);
      }

      setUserPrompt("");
    }

    setIsGenerating(false);
  };

  // Give feedback on AI response
  const giveResponseFeedback = (
    id: string,
    feedback: "positive" | "negative",
  ) => {
    setAIResponses(
      aiResponses.map((response) => {
        if (response.id === id) {
          return { ...response, feedback };
        }
        return response;
      }),
    );
  };

  // Toggle save AI response
  const toggleSaveResponse = (id: string) => {
    setAIResponses(
      aiResponses.map((response) => {
        if (response.id === id) {
          return { ...response, isSaved: !response.isSaved };
        }
        return response;
      }),
    );
  };

  // Apply improved text
  const applyImprovedText = () => {
    if (!improvedText || !selectedText || !currentProject) return;

    // Replace selected text with improved text
    const newContent = editorContent.replace(selectedText, improvedText);
    setEditorContent(newContent);

    // Update current project
    const now = new Date().toISOString();

    const updatedProject = {
      ...currentProject,
      content: newContent,
      updatedAt: now,
    };

    setCurrentProject(updatedProject);

    setProjects(
      projects.map((project) => {
        if (project.id === currentProject.id) {
          return updatedProject;
        }
        return project;
      }),
    );

    // Reset improvement state
    setSelectedText("");
    setImprovedText("");
    setIsImproving(false);
  };

  // Get selected tone name
  const getSelectedToneName = () => {
    const selectedTone = writingTones.find((tone) => tone.isSelected);
    return selectedTone ? selectedTone.name : "Professional";
  };

  // Get selected style name
  const getSelectedStyleName = () => {
    const selectedStyle = writingStyles.find((style) => style.isSelected);
    return selectedStyle ? selectedStyle.name : "Descriptive";
  };

  // Get selected length name
  const getSelectedLengthName = () => {
    const selectedLength = writingLengths.find((length) => length.isSelected);
    return selectedLength ? selectedLength.name : "Standard";
  };

  // Handle text selection in editor
  const handleTextSelection = () => {
    if (editorRef.current) {
      const start = editorRef.current.selectionStart;
      const end = editorRef.current.selectionEnd;

      if (start !== end) {
        const selected = editorContent.substring(start, end);
        setSelectedText(selected);
      } else {
        setSelectedText("");
      }
    }
  };

  // Give feedback on chat message
  const giveChatFeedback = (index: number, feedback: "like" | "dislike") => {
    setMessageFeedback((prev) => ({
      ...prev,
      [index]: prev[index] === feedback ? null : feedback,
    }));
  };

  return (
    <div
      className={`${isFullscreen ? "fixed inset-0 z-50 bg-white dark:bg-gray-900" : "min-h-screen bg-gradient-to-br from-white to-gray-50 px-4 py-10 dark:from-gray-950 dark:to-gray-900"}`}
    >
      <div
        className={`mx-auto overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-xl backdrop-blur-sm transition-all duration-300 dark:border-gray-800/50 dark:bg-gray-800/90 dark:backdrop-blur-sm ${isFullscreen ? "h-screen w-full overflow-y-auto rounded-none border-0" : "max-w-6xl"}`}
      >
        {/* Header */}
        <div className="border-b border-gray-100 p-6 dark:border-gray-700/50">
          <div
            className={`flex items-center justify-between ${isFullscreen ? "mx-auto max-w-7xl" : ""}`}
          >
            <div className="flex items-center">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-teal-500 text-white shadow-lg">
                <PenTool className="h-5 w-5" />
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-xl font-bold text-transparent dark:from-blue-400 dark:to-teal-400">
                  AI Writing Assistant
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Create, improve, and refine your writing with AI
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="rounded-full bg-gray-100 p-2 text-gray-600 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="rounded-full bg-gray-100 p-2 text-gray-600 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-5 w-5" />
                ) : (
                  <Maximize2 className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 gap-4 p-4 md:grid-cols-3 ${isFullscreen ? "mx-auto max-w-7xl px-3" : ""}`}
        >
          {/* Projects Panel */}
          <div className="col-span-1">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div
                className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
                onClick={() => togglePanel("projects")}
              >
                <h2 className="font-medium text-gray-800 dark:text-gray-200">
                  Projects
                </h2>
                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsCreatingProject(!isCreatingProject);
                    }}
                    className="mr-2 flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40"
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    New
                  </button>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                      openPanels.has("projects") ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              <AnimatePresence>
                {openPanels.has("projects") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
                      {/* Create New Project Form */}
                      <AnimatePresence>
                        {isCreatingProject && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50"
                          >
                            <h3 className="mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                              Create New Project
                            </h3>
                            <div className="mb-3">
                              <input
                                type="text"
                                value={newProject.title}
                                onChange={(e) =>
                                  setNewProject({
                                    ...newProject,
                                    title: e.target.value,
                                  })
                                }
                                placeholder="Project title"
                                className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
                              />
                            </div>
                            <div className="mb-3">
                              <select
                                value={newProject.category}
                                onChange={(e) =>
                                  setNewProject({
                                    ...newProject,
                                    category: e.target.value,
                                  })
                                }
                                className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
                              >
                                <option value="general">General</option>
                                <option value="blog">Blog Post</option>
                                <option value="email">Email</option>
                                <option value="business">Business</option>
                                <option value="product">Product</option>
                                <option value="marketing">Marketing</option>
                              </select>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => setIsCreatingProject(false)}
                                className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={createNewProject}
                                disabled={!newProject.title.trim()}
                                className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
                              >
                                Create
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Search and Filter */}
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-2 pl-8 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
                          />
                          <svg
                            className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <select
                            value={selectedCategory}
                            onChange={(e) =>
                              setSelectedCategory(e.target.value as any)
                            }
                            className="rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
                          >
                            <option value="all">All Categories</option>
                            <option value="blog">Blog Post</option>
                            <option value="email">Email</option>
                            <option value="business">Business</option>
                            <option value="product">Product</option>
                            <option value="marketing">Marketing</option>
                            <option value="general">General</option>
                          </select>
                        </div>
                      </div>

                      {/* Projects List */}
                      <div className="max-h-[400px] overflow-y-auto">
                        {filteredProjects.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-8 text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                              No projects found
                            </h3>
                            <p className="mb-4 max-w-md text-gray-500 dark:text-gray-400">
                              {searchQuery || selectedCategory !== "all"
                                ? "Try adjusting your search or filters"
                                : "Create your first project to get started"}
                            </p>
                            <button
                              onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("all");
                                setIsCreatingProject(true);
                              }}
                              className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40"
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Create Project
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {filteredProjects.map((project) => (
                              <div
                                key={project.id}
                                className={`cursor-pointer rounded-lg border p-3 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 dark:hover:border-blue-700 dark:hover:bg-blue-900/20 ${
                                  currentProject &&
                                  currentProject.id === project.id
                                    ? "border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20"
                                    : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                                }`}
                                onClick={() => selectProject(project)}
                              >
                                <div className="mb-1 flex items-center justify-between">
                                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                                    {project.title}
                                  </h3>
                                  <div className="flex items-center space-x-1">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(project.id);
                                      }}
                                      className={`rounded-full p-1 ${
                                        project.isFavorite
                                          ? "text-amber-500"
                                          : "text-gray-400 hover:text-amber-500 dark:text-gray-500 dark:hover:text-amber-500"
                                      }`}
                                    >
                                      <Star
                                        className={`h-4 w-4 ${project.isFavorite ? "fill-current" : ""}`}
                                      />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteProject(project.id);
                                      }}
                                      className="rounded-full p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-500"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                  <span className="rounded-full bg-gray-100 px-2 py-0.5 dark:bg-gray-700">
                                    {project.category}
                                  </span>
                                  <span>
                                    Updated {formatDate(project.updatedAt)}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Editor Panel */}
          <div className="col-span-1 md:col-span-2">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div
                className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
                onClick={() => togglePanel("editor")}
              >
                <h2 className="font-medium text-gray-800 dark:text-gray-200">
                  {currentProject ? currentProject.title : "Editor"}
                </h2>
                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      saveProject();
                    }}
                    className="mr-2 flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40"
                  >
                    <Save className="mr-1 h-3 w-3" />
                    Save
                  </button>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                      openPanels.has("editor") ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              <AnimatePresence>
                {openPanels.has("editor") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
                      {/* Tabs */}
                      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => setSelectedTab("write")}
                            className={`border-b-2 px-4 py-2 text-sm font-medium ${
                              selectedTab === "write"
                                ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
                            }`}
                          >
                            Write
                          </button>
                          <button
                            onClick={() => setSelectedTab("improve")}
                            className={`border-b-2 px-4 py-2 text-sm font-medium ${
                              selectedTab === "improve"
                                ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
                            }`}
                          >
                            Improve
                          </button>
                          <button
                            onClick={() => setSelectedTab("chat")}
                            className={`border-b-2 px-4 py-2 text-sm font-medium ${
                              selectedTab === "chat"
                                ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
                            }`}
                          >
                            Chat
                          </button>
                        </div>
                      </div>

                      {/* Write Tab */}
                      {selectedTab === "write" && (
                        <div>
                          <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                              What would you like to write?
                            </label>
                            <div className="flex items-center">
                              <input
                                type="text"
                                value={userPrompt}
                                onChange={(e) => setUserPrompt(e.target.value)}
                                placeholder="E.g., Write an introduction about artificial intelligence in business..."
                                className="flex-1 rounded-l-lg border border-gray-300 p-3 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/50"
                              />
                              <button
                                onClick={generateContent}
                                disabled={isGenerating || !userPrompt.trim()}
                                className="rounded-r-lg bg-gradient-to-r from-blue-600 to-teal-600 px-4 py-3 font-medium text-white shadow-sm transition-all duration-200 hover:from-blue-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 dark:from-blue-500 dark:to-teal-500 dark:hover:from-blue-600 dark:hover:to-teal-600"
                              >
                                {isGenerating ? (
                                  <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                  <Wand2 className="h-5 w-5" />
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="mb-4">
                            <button
                              onClick={() =>
                                setShowAdvancedOptions(!showAdvancedOptions)
                              }
                              className="flex items-center text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                            >
                              <Sliders className="mr-2 h-4 w-4" />
                              {showAdvancedOptions
                                ? "Hide writing options"
                                : "Show writing options"}
                              <ChevronDown
                                className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                                  showAdvancedOptions ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            <AnimatePresence>
                              {showAdvancedOptions && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-3 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50"
                                >
                                  <div className="mb-4">
                                    <div className="flex items-center justify-between">
                                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Tone
                                      </label>
                                      <span className="text-xs text-gray-500 dark:text-gray-400">
                                        Selected: {getSelectedToneName()}
                                      </span>
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                      {writingTones.map((tone) => (
                                        <button
                                          key={tone.id}
                                          onClick={() => selectTone(tone.id)}
                                          className={`rounded-full px-3 py-1.5 text-xs ${
                                            tone.isSelected
                                              ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white dark:from-blue-500 dark:to-teal-500"
                                              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                          }`}
                                          title={tone.description}
                                        >
                                          {tone.name}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="mb-4">
                                    <div className="flex items-center justify-between">
                                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Style
                                      </label>
                                      <span className="text-xs text-gray-500 dark:text-gray-400">
                                        Selected: {getSelectedStyleName()}
                                      </span>
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                      {writingStyles.map((style) => (
                                        <button
                                          key={style.id}
                                          onClick={() => selectStyle(style.id)}
                                          className={`rounded-full px-3 py-1.5 text-xs ${
                                            style.isSelected
                                              ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white dark:from-blue-500 dark:to-teal-500"
                                              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                          }`}
                                          title={style.description}
                                        >
                                          {style.name}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <div className="flex items-center justify-between">
                                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Length
                                      </label>
                                      <span className="text-xs text-gray-500 dark:text-gray-400">
                                        Selected: {getSelectedLengthName()}
                                      </span>
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                      {writingLengths.map((length) => (
                                        <button
                                          key={length.id}
                                          onClick={() =>
                                            selectLength(length.id)
                                          }
                                          className={`rounded-full px-3 py-1.5 text-xs ${
                                            length.isSelected
                                              ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white dark:from-blue-500 dark:to-teal-500"
                                              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                          }`}
                                          title={length.description}
                                        >
                                          {length.name}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Editor
                              </label>
                              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                                <span>{wordCount} words</span>
                                <span>•</span>
                                <span>{characterCount} characters</span>
                                <span>•</span>
                                <span>~{readingTime} min read</span>
                              </div>
                            </div>
                            <div className="mt-2 flex space-x-1 rounded-t-lg border-b border-gray-200 bg-gray-50 px-2 py-1 dark:border-gray-700 dark:bg-gray-800/50">
                              <button className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                <Bold className="h-4 w-4" />
                              </button>
                              <button className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                <Italic className="h-4 w-4" />
                              </button>
                              <button className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                <Underline className="h-4 w-4" />
                              </button>
                              <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-gray-600"></div>
                              <button className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                <AlignLeft className="h-4 w-4" />
                              </button>
                              <button className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                <AlignCenter className="h-4 w-4" />
                              </button>
                              <button className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                <AlignRight className="h-4 w-4" />
                              </button>
                              <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-gray-600"></div>
                              <button className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                <List className="h-4 w-4" />
                              </button>
                              <button className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                <ListOrdered className="h-4 w-4" />
                              </button>
                              <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-gray-600"></div>
                              <button className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                <Link className="h-4 w-4" />
                              </button>
                              <button className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                <ImageIcon className="h-4 w-4" />
                              </button>
                            </div>
                            <textarea
                              ref={editorRef}
                              value={editorContent}
                              onChange={(e) => setEditorContent(e.target.value)}
                              onSelect={handleTextSelection}
                              className="h-64 w-full rounded-b-lg border border-gray-300 p-3 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/50"
                              placeholder="Start writing or generate content with AI..."
                            ></textarea>
                          </div>

                          <div className="flex justify-between">
                            <div className="flex space-x-2">
                              <button
                                onClick={saveProject}
                                className="flex items-center rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40"
                              >
                                <Save className="mr-1.5 h-4 w-4" />
                                Save
                              </button>
                              <button className="flex items-center rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                                <Copy className="mr-1.5 h-4 w-4" />
                                Copy
                              </button>
                            </div>
                            <button className="flex items-center rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                              <Share className="mr-1.5 h-4 w-4" />
                              Share
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Improve Tab */}
                      {selectedTab === "improve" && (
                        <div>
                          {selectedText ? (
                            <div>
                              <div className="mb-4">
                                <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Selected Text
                                </h3>
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50">
                                  <p className="text-gray-700 dark:text-gray-300">
                                    {selectedText}
                                  </p>
                                </div>
                              </div>

                              <div className="mb-4">
                                <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                  How would you like to improve this text?
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    onClick={() =>
                                      setImprovementType("rewrite")
                                    }
                                    className={`rounded-full px-3 py-1.5 text-xs ${
                                      improvementType === "rewrite"
                                        ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white dark:from-blue-500 dark:to-teal-500"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    }`}
                                  >
                                    Rewrite
                                  </button>
                                  <button
                                    onClick={() => setImprovementType("expand")}
                                    className={`rounded-full px-3 py-1.5 text-xs ${
                                      improvementType === "expand"
                                        ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white dark:from-blue-500 dark:to-teal-500"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    }`}
                                  >
                                    Expand
                                  </button>
                                  <button
                                    onClick={() =>
                                      setImprovementType("shorten")
                                    }
                                    className={`rounded-full px-3 py-1.5 text-xs ${
                                      improvementType === "shorten"
                                        ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white dark:from-blue-500 dark:to-teal-500"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    }`}
                                  >
                                    Shorten
                                  </button>
                                  <button
                                    onClick={() =>
                                      setImprovementType("simplify")
                                    }
                                    className={`rounded-full px-3 py-1.5 text-xs ${
                                      improvementType === "simplify"
                                        ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white dark:from-blue-500 dark:to-teal-500"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    }`}
                                  >
                                    Simplify
                                  </button>
                                  <button
                                    onClick={() =>
                                      setImprovementType("formalize")
                                    }
                                    className={`rounded-full px-3 py-1.5 text-xs ${
                                      improvementType === "formalize"
                                        ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white dark:from-blue-500 dark:to-teal-500"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    }`}
                                  >
                                    Make Formal
                                  </button>
                                </div>
                              </div>

                              <div className="mb-4">
                                <div className="flex items-center justify-between">
                                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Additional Instructions (Optional)
                                  </h3>
                                </div>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    value={userPrompt}
                                    onChange={(e) =>
                                      setUserPrompt(e.target.value)
                                    }
                                    placeholder="E.g., Make it more persuasive, use simpler vocabulary..."
                                    className="w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
                                  />
                                </div>
                              </div>

                              <div className="mb-4 flex justify-center">
                                <button
                                  onClick={() => {
                                    setIsImproving(true);
                                    generateContent();
                                  }}
                                  disabled={isGenerating}
                                  className="flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-teal-600 px-4 py-2 font-medium text-white shadow-md transition-all duration-200 hover:from-blue-700 hover:to-teal-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 dark:from-blue-500 dark:to-teal-500 dark:hover:from-blue-600 dark:hover:to-teal-600"
                                >
                                  {isGenerating ? (
                                    <>
                                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                      Improving...
                                    </>
                                  ) : (
                                    <>
                                      <Sparkles className="mr-2 h-5 w-5" />
                                      Improve Text
                                    </>
                                  )}
                                </button>
                              </div>

                              {improvedText && (
                                <div className="mb-4">
                                  <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Improved Text
                                  </h3>
                                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-900/30 dark:bg-blue-900/10">
                                    <p className="text-gray-700 dark:text-gray-300">
                                      {improvedText}
                                    </p>
                                  </div>
                                  <div className="mt-3 flex justify-end space-x-2">
                                    <button
                                      onClick={() =>
                                        handleCopy(
                                          improvedText,
                                          "improved_text",
                                        )
                                      }
                                      className="flex items-center rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    >
                                      {copied === "improved_text" ? (
                                        <>
                                          <CheckCheck className="mr-1 h-3 w-3 text-green-500" />
                                          Copied!
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="mr-1 h-3 w-3" />
                                          Copy
                                        </>
                                      )}
                                    </button>
                                    <button
                                      onClick={applyImprovedText}
                                      className="flex items-center rounded-lg bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40"
                                    >
                                      <Check className="mr-1 h-3 w-3" />
                                      Apply Changes
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                <Edit className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                              </div>
                              <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                                Select text to improve
                              </h3>
                              <p className="mb-4 max-w-md text-gray-500 dark:text-gray-400">
                                Highlight any text in the editor to rewrite,
                                expand, shorten, or improve it with AI.
                              </p>
                              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                <ArrowLeft className="h-4 w-4" />
                                <span>Select text in the editor first</span>
                                <ArrowRight className="h-4 w-4" />
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Chat Tab */}
                      {selectedTab === "chat" && (
                        <div>
                          <div className="mb-4 h-64 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                            {chatHistory.length === 0 ? (
                              <div className="flex h-full flex-col items-center justify-center text-center">
                                <Lightbulb className="mb-2 h-8 w-8 text-amber-500" />
                                <p className="text-gray-500 dark:text-gray-400">
                                  Start chatting with your AI writing assistant.
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                {chatHistory.map((message, index) => (
                                  <div
                                    key={index}
                                    className={`relative flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                  >
                                    <div
                                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                        message.role === "user"
                                          ? "bg-blue-600 text-white dark:bg-blue-500"
                                          : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                      }`}
                                    >
                                      {message.content}
                                      {isTyping &&
                                        index === chatHistory.length - 1 &&
                                        message.role === "assistant" && (
                                          <span className="ml-1 inline-block h-2 w-2 animate-pulse rounded-full bg-current"></span>
                                        )}

                                      {/* Message action buttons - only show for non-empty messages */}
                                      {message.content && (
                                        <div
                                          className={`absolute ${message.role === "user" ? "left-4 -translate-x-full" : "right-4 translate-x-full"} top-1/2 flex -translate-y-1/2 flex-col gap-1`}
                                        >
                                          <button
                                            onClick={() =>
                                              handleCopy(
                                                message.content,
                                                "message",
                                              )
                                            }
                                            className="rounded-full bg-gray-100 p-1.5 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                            title="Copy message"
                                          >
                                            {copied === "message" ? (
                                              <CheckCheck className="h-3.5 w-3.5 text-green-500" />
                                            ) : (
                                              <Copy className="h-3.5 w-3.5" />
                                            )}
                                          </button>

                                          {message.role === "assistant" && (
                                            <>
                                              <button
                                                onClick={() =>
                                                  giveChatFeedback(
                                                    index,
                                                    "like",
                                                  )
                                                }
                                                className={`rounded-full p-1.5 ${
                                                  messageFeedback[index] ===
                                                  "like"
                                                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-green-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-green-500"
                                                }`}
                                                title="Like message"
                                              >
                                                <ThumbsUp className="h-3.5 w-3.5" />
                                              </button>
                                              <button
                                                onClick={() =>
                                                  giveChatFeedback(
                                                    index,
                                                    "dislike",
                                                  )
                                                }
                                                className={`rounded-full p-1.5 ${
                                                  messageFeedback[index] ===
                                                  "dislike"
                                                    ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-red-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-red-500"
                                                }`}
                                                title="Dislike message"
                                              >
                                                <ThumbsDown className="h-3.5 w-3.5" />
                                              </button>
                                            </>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                                <div ref={chatEndRef} />
                              </div>
                            )}
                          </div>

                          <div className="relative overflow-hidden">
                            <input
                              type="text"
                              value={userPrompt}
                              onChange={(e) => setUserPrompt(e.target.value)}
                              placeholder="Ask your writing assistant..."
                              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-32 text-gray-700 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:flex-1"
                              onKeyDown={(e) => {
                                if (
                                  e.key === "Enter" &&
                                  !isGenerating &&
                                  userPrompt.trim()
                                ) {
                                  generateContent();
                                }
                              }}
                            />
                            <div className="absolute right-1 top-1/2 flex -translate-y-1/2 items-center gap-2">
                              <div className="flex items-center px-2">
                                <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-600 dark:hover:text-gray-400">
                                  <Smile className="h-5 w-5" />
                                </button>
                                <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-600 dark:hover:text-gray-400">
                                  <Paperclip className="h-5 w-5" />
                                </button>
                              </div>
                              <button
                                onClick={generateContent}
                                disabled={isGenerating || !userPrompt.trim()}
                                className="rounded-r-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700 disabled:opacity-70 dark:bg-blue-500 dark:hover:bg-blue-600"
                              >
                                {isGenerating ? (
                                  <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                  <Send className="h-5 w-5" />
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="mt-4">
                            <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                              Suggested Prompts
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() =>
                                  setUserPrompt(
                                    "Help me write an introduction for my blog post about AI",
                                  )
                                }
                                className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                              >
                                Write blog introduction
                              </button>
                              <button
                                onClick={() =>
                                  setUserPrompt(
                                    "Create a conclusion that summarizes my main points",
                                  )
                                }
                                className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                              >
                                Create conclusion
                              </button>
                              <button
                                onClick={() =>
                                  setUserPrompt(
                                    "Draft a professional email requesting a meeting",
                                  )
                                }
                                className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                              >
                                Draft professional email
                              </button>
                              <button
                                onClick={() =>
                                  setUserPrompt(
                                    "Suggest ways to make my writing more engaging",
                                  )
                                }
                                className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                              >
                                Writing tips
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* AI Responses Panel */}
          <div className="col-span-1 md:col-span-3">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div
                className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
                onClick={() => togglePanel("responses")}
              >
                <h2 className="font-medium text-gray-800 dark:text-gray-200">
                  AI Responses
                </h2>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                    openPanels.has("responses") ? "rotate-180" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {openPanels.has("responses") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
                      {aiResponses.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                            <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                          </div>
                          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                            No AI responses yet
                          </h3>
                          <p className="mb-4 max-w-md text-gray-500 dark:text-gray-400">
                            Generate content using the AI assistant to see
                            responses here.
                          </p>
                          <button
                            onClick={() => {
                              setSelectedTab("write");
                              setExpandedPanel("editor");
                            }}
                            className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40"
                          >
                            <Wand2 className="mr-2 h-4 w-4" />
                            Generate Content
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {aiResponses.map((response) => (
                            <div
                              key={response.id}
                              className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
                            >
                              <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                    <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                      AI Response
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {formatDate(response.timestamp)}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <button
                                    onClick={() =>
                                      toggleSaveResponse(response.id)
                                    }
                                    className={`rounded-full p-1 ${
                                      response.isSaved
                                        ? "text-amber-500"
                                        : "text-gray-400 hover:text-amber-500 dark:text-gray-500 dark:hover:text-amber-500"
                                    }`}
                                  >
                                    <Bookmark
                                      className={`h-4 w-4 ${response.isSaved ? "fill-current" : ""}`}
                                    />
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleCopy(response.content, "response");
                                    }}
                                    className="rounded-full p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                                  >
                                    {copied === "response" ? (
                                      <CheckCheck className="h-3.5 w-3.5 text-green-500" />
                                    ) : (
                                      <Copy className="h-3.5 w-3.5" />
                                    )}
                                  </button>
                                </div>
                              </div>
                              <div className="mb-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                                <p className="whitespace-pre-line text-sm text-gray-700 dark:text-gray-300">
                                  {response.content}
                                </p>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  <span className="font-medium">Prompt:</span>{" "}
                                  {response.prompt}
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() =>
                                      giveResponseFeedback(
                                        response.id,
                                        "positive",
                                      )
                                    }
                                    className={`rounded-full p-1 ${
                                      response.feedback === "positive"
                                        ? "text-green-500"
                                        : "text-gray-400 hover:text-green-500 dark:text-gray-500 dark:hover:text-green-500"
                                    }`}
                                  >
                                    <ThumbsUp className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      giveResponseFeedback(
                                        response.id,
                                        "negative",
                                      )
                                    }
                                    className={`rounded-full p-1 ${
                                      response.feedback === "negative"
                                        ? "text-red-500"
                                        : "text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-500"
                                    }`}
                                  >
                                    <ThumbsDown className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIWritingAssistant;
