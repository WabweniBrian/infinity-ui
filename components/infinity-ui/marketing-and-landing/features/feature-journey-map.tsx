"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Sparkles, Zap, Shield, BarChart3, Users, Layers } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type JourneyNode = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  position: {
    x: number;
    y: number;
  };
  connections: string[];
};

const nodes: JourneyNode[] = [
  {
    id: "core",
    title: "Core Platform",
    description:
      "The foundation of our ecosystem with essential features and capabilities.",
    icon: Layers,
    color: "bg-indigo-500",
    position: { x: 50, y: 50 },
    connections: ["analytics", "security", "performance"],
  },
  {
    id: "analytics",
    title: "Advanced Analytics",
    description:
      "Gain insights with powerful data visualization and reporting tools.",
    icon: BarChart3,
    color: "bg-blue-500",
    position: { x: 25, y: 20 },
    connections: ["ai", "collaboration"],
  },
  {
    id: "security",
    title: "Enterprise Security",
    description: "Protect your data with industry-leading security features.",
    icon: Shield,
    color: "bg-emerald-500",
    position: { x: 75, y: 20 },
    connections: ["performance"],
  },
  {
    id: "performance",
    title: "Lightning Performance",
    description: "Blazing fast speeds and optimized resource utilization.",
    icon: Zap,
    color: "bg-amber-500",
    position: { x: 85, y: 60 },
    connections: ["collaboration"],
  },
  {
    id: "collaboration",
    title: "Team Collaboration",
    description:
      "Work together seamlessly with integrated communication tools.",
    icon: Users,
    color: "bg-purple-500",
    position: { x: 60, y: 80 },
    connections: ["core"],
  },
  {
    id: "ai",
    title: "AI Capabilities",
    description:
      "Harness the power of artificial intelligence and machine learning.",
    icon: Sparkles,
    color: "bg-rose-500",
    position: { x: 15, y: 70 },
    connections: ["core"],
  },
];

const FeatureJourneyMap = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Set initial active node
  useEffect(() => {
    if (isInView && !activeNode) {
      setActiveNode("core");
    }
  }, [isInView, activeNode]);

  // Get highlighted connections
  const getHighlightedConnections = () => {
    if (!activeNode && !hoveredNode) return [];

    const nodeId = hoveredNode || activeNode;
    const node = nodes.find((n) => n.id === nodeId);

    if (!node) return [];

    return [
      ...node.connections,
      ...nodes.filter((n) => n.connections.includes(nodeId!)).map((n) => n.id),
    ];
  };

  const highlightedConnections = getHighlightedConnections();

  // Calculate line coordinates
  const getLineCoordinates = (from: JourneyNode, to: JourneyNode) => {
    const fromX = (from.position.x / 100) * dimensions.width;
    const fromY = (from.position.y / 100) * dimensions.height;
    const toX = (to.position.x / 100) * dimensions.width;
    const toY = (to.position.y / 100) * dimensions.height;

    return { fromX, fromY, toX, toY };
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-50 py-24 dark:bg-gray-900/50">
      {/* Dark mode toggle */}
      <DarkModeToggle />
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            opacity: 0.3,
          }}
        ></div>
      </div>

      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-2 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
              Feature Ecosystem
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Explore our connected platform
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Discover how our features work together to create a seamless
              experience.
            </p>
          </motion.div>
        </div>

        <div ref={containerRef} className="relative mt-20 h-[600px] w-full">
          {/* SVG connections */}
          {dimensions.width > 0 && (
            <svg
              ref={svgRef}
              className="absolute inset-0 h-full w-full"
              style={{ overflow: "visible" }}
            >
              {nodes.map((fromNode) =>
                fromNode.connections.map((toId) => {
                  const toNode = nodes.find((n) => n.id === toId);
                  if (!toNode) return null;

                  const { fromX, fromY, toX, toY } = getLineCoordinates(
                    fromNode,
                    toNode,
                  );
                  const isHighlighted =
                    (activeNode === fromNode.id &&
                      highlightedConnections.includes(toId)) ||
                    (activeNode === toId &&
                      highlightedConnections.includes(fromNode.id)) ||
                    (hoveredNode === fromNode.id &&
                      highlightedConnections.includes(toId)) ||
                    (hoveredNode === toId &&
                      highlightedConnections.includes(fromNode.id));

                  // Calculate control points for curved lines
                  const midX = (fromX + toX) / 2;
                  const midY = (fromY + toY) / 2;
                  const dx = toX - fromX;
                  const dy = toY - fromY;
                  const normLength = Math.sqrt(dx * dx + dy * dy);
                  const offset = normLength / 4;

                  // Perpendicular offset for curve
                  const offsetX = (-dy * offset) / normLength;
                  const offsetY = (dx * offset) / normLength;

                  const controlX = midX + offsetX;
                  const controlY = midY + offsetY;

                  return (
                    <motion.path
                      key={`${fromNode.id}-${toId}`}
                      d={`M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`}
                      stroke={isHighlighted ? "currentColor" : "#e2e8f0"}
                      strokeWidth={isHighlighted ? 3 : 2}
                      fill="none"
                      className={`transition-colors duration-300 ${isHighlighted ? "text-indigo-500 dark:text-indigo-400" : "dark:stroke-gray-700"}`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={
                        isInView
                          ? { pathLength: 1, opacity: 1 }
                          : { pathLength: 0, opacity: 0 }
                      }
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  );
                }),
              )}
            </svg>
          )}

          {/* Feature nodes */}
          {nodes.map((node) => {
            const NodeIcon = node.icon;
            const isActive = activeNode === node.id;
            const isHighlighted =
              isActive ||
              hoveredNode === node.id ||
              (activeNode && highlightedConnections.includes(node.id));

            return (
              <motion.div
                key={node.id}
                className="absolute"
                style={{
                  left: `${node.position.x}%`,
                  top: `${node.position.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        scale: 1,
                        zIndex: isActive ? 10 : 1,
                      }
                    : { opacity: 0, scale: 0 }
                }
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.1 + nodes.indexOf(node) * 0.1,
                }}
                onClick={() => setActiveNode(node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <motion.div
                  className={`group relative cursor-pointer rounded-2xl bg-white p-4 shadow-lg transition-all duration-300 dark:bg-gray-800 ${
                    isActive
                      ? "ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-900"
                      : ""
                  }`}
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    scale: isHighlighted ? 1 : 0.85,
                    opacity: isHighlighted ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${node.color} text-white shadow-md`}
                    >
                      <NodeIcon className="h-6 w-6" />
                    </div>
                    <div className="max-w-[180px]">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {node.title}
                      </h3>
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 text-sm text-gray-600 dark:text-gray-300"
                          >
                            {node.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Pulse effect for active node */}
                  {isActive && (
                    <div className="absolute -inset-0.5 -z-10 animate-pulse rounded-2xl bg-indigo-500/20 blur-sm"></div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Feature details panel */}
        <AnimatePresence mode="wait">
          {activeNode && (
            <motion.div
              key={activeNode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mx-auto mt-8 max-w-2xl rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800"
            >
              {(() => {
                const node = nodes.find((n) => n.id === activeNode);
                if (!node) return null;

                const NodeIcon = node.icon;

                return (
                  <div>
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl ${node.color} text-white shadow-md`}
                      >
                        <NodeIcon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {node.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {node.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                        Connected Features
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {highlightedConnections.map((connId) => {
                          const connNode = nodes.find((n) => n.id === connId);
                          if (!connNode) return null;

                          const ConnIcon = connNode.icon;

                          return (
                            <motion.button
                              key={connId}
                              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-white ${connNode.color} shadow-sm transition-transform`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setActiveNode(connId)}
                            >
                              <ConnIcon className="h-4 w-4" />
                              <span>{connNode.title}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`rounded-lg ${node.color} px-4 py-2 text-sm font-medium text-white shadow-md transition-colors hover:opacity-90`}
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeatureJourneyMap;
