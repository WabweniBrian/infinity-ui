"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Twitter, Instagram, Linkedin } from "lucide-react";

interface Location {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  coordinates: [number, number];
}

const InteractiveMapFooter = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const locations: Location[] = [
    {
      id: 1,
      name: "San Francisco",
      address: "123 Tech Avenue, San Francisco, CA",
      phone: "+1 (555) 123-4567",
      email: "sf@infinityui.com",
      coordinates: [150, 120],
    },
    {
      id: 2,
      name: "New York",
      address: "456 Design Street, New York, NY",
      phone: "+1 (555) 987-6543",
      email: "nyc@infinityui.com",
      coordinates: [280, 110],
    },
    {
      id: 3,
      name: "London",
      address: "789 Creative Lane, London, UK",
      phone: "+44 20 1234 5678",
      email: "london@infinityui.com",
      coordinates: [450, 100],
    },
    {
      id: 4,
      name: "Tokyo",
      address: "101 Innovation Road, Tokyo, Japan",
      phone: "+81 3 1234 5678",
      email: "tokyo@infinityui.com",
      coordinates: [800, 130],
    },
    {
      id: 5,
      name: "Sydney",
      address: "202 UI Street, Sydney, Australia",
      phone: "+61 2 1234 5678",
      email: "sydney@infinityui.com",
      coordinates: [850, 300],
    },
  ];

  useEffect(() => {
    const updateMapDimensions = () => {
      if (mapContainerRef.current) {
        setMapDimensions({
          width: mapContainerRef.current.offsetWidth,
          height: mapContainerRef.current.offsetHeight,
        });
      }
    };

    updateMapDimensions();
    window.addEventListener("resize", updateMapDimensions);

    return () => {
      window.removeEventListener("resize", updateMapDimensions);
    };
  }, []);

  const getScaledCoordinates = (coords: [number, number]) => {
    // Base map is 1000x400, scale coordinates based on actual container size
    const baseWidth = 1000;
    const baseHeight = 400;

    return {
      x: (coords[0] / baseWidth) * mapDimensions.width,
      y: (coords[1] / baseHeight) * mapDimensions.height,
    };
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Company info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="mb-6">
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-md bg-blue-500">
                  <span className="text-xl font-bold text-white">∞</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Infinity UI</h2>
              </div>
            </div>

            <p className="mb-6 text-gray-400">
              Global UI components for modern web applications. Serving clients
              worldwide with offices in key locations.
            </p>

            <div className="mb-8 flex space-x-4">
              {[Github, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>

            <form className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Subscribe to our newsletter
              </h3>
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                >
                  Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-1">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Product
                </h3>
                <ul className="space-y-2">
                  {[
                    "Features",
                    "Pricing",
                    "Documentation",
                    "Resources",
                    "Updates",
                  ].map((link, index) => (
                    <motion.li key={index}>
                      <motion.a
                        href="#"
                        whileHover={{ x: 3 }}
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        {link}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Company
                </h3>
                <ul className="space-y-2">
                  {["About", "Blog", "Careers", "Press", "Contact"].map(
                    (link, index) => (
                      <motion.li key={index}>
                        <motion.a
                          href="#"
                          whileHover={{ x: 3 }}
                          className="text-gray-400 transition-colors hover:text-white"
                        >
                          {link}
                        </motion.a>
                      </motion.li>
                    ),
                  )}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Support
                </h3>
                <ul className="space-y-2">
                  {[
                    "Help Center",
                    "Community",
                    "Status",
                    "Tutorials",
                    "FAQ",
                  ].map((link, index) => (
                    <motion.li key={index}>
                      <motion.a
                        href="#"
                        whileHover={{ x: 3 }}
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        {link}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-white">
              Our Global Offices
            </h3>

            <p className="mb-4 text-gray-400">
              Click on a location to see contact details. We have offices around
              the world to serve you better.
            </p>

            <div
              ref={mapContainerRef}
              className="relative h-64 overflow-hidden rounded-lg border border-gray-700 bg-gray-800 md:h-80"
            >
              {/* World map SVG */}
              <svg
                viewBox="0 0 1000 400"
                className="absolute inset-0 h-full w-full"
                style={{
                  filter: "drop-shadow(0px 0px 2px rgba(59, 130, 246, 0.5))",
                }}
              >
                {/* Simplified world map path */}
                <path
                  d="M70,145 Q150,120 200,140 T350,150 T450,130 T550,140 T650,150 T750,140 T850,160 T950,170 V300 H50 V145 Z"
                  fill="none"
                  stroke="#4A5568"
                  strokeWidth="1"
                />

                {/* Continental shapes - very simplified */}
                <path
                  d="M50,150 Q120,180 200,150 T300,160 T350,170 V250 H50 V150 Z"
                  fill="#374151"
                  opacity="0.5"
                />
                <path
                  d="M350,130 Q400,110 450,130 T550,140 V220 H350 V130 Z"
                  fill="#374151"
                  opacity="0.5"
                />
                <path
                  d="M570,130 Q650,150 750,130 T850,140 V240 H570 V130 Z"
                  fill="#374151"
                  opacity="0.5"
                />
                <path
                  d="M750,220 Q800,200 850,220 T900,240 V280 H750 V220 Z"
                  fill="#374151"
                  opacity="0.5"
                />

                {/* Location markers */}
                {locations.map((location) => {
                  const { x, y } = getScaledCoordinates(location.coordinates);
                  return (
                    <g key={location.id}>
                      <motion.circle
                        cx={location.coordinates[0]}
                        cy={location.coordinates[1]}
                        r={selectedLocation?.id === location.id ? 8 : 6}
                        fill={
                          selectedLocation?.id === location.id
                            ? "#3B82F6"
                            : "#1E40AF"
                        }
                        stroke="#60A5FA"
                        strokeWidth="2"
                        whileHover={{ scale: 1.2 }}
                        onClick={() => setSelectedLocation(location)}
                        style={{ cursor: "pointer" }}
                      />
                      <motion.circle
                        cx={location.coordinates[0]}
                        cy={location.coordinates[1]}
                        r={12}
                        fill="#3B82F6"
                        opacity={selectedLocation?.id === location.id ? 0.3 : 0}
                        initial={{ scale: 0 }}
                        animate={{
                          scale:
                            selectedLocation?.id === location.id
                              ? [0, 1.2, 1]
                              : 0,
                          opacity:
                            selectedLocation?.id === location.id
                              ? [0, 0.5, 0.3]
                              : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Location Information Card */}
              {selectedLocation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-0 right-0 mx-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-lg"
                  style={{
                    backdropFilter: "blur(8px)",
                    backgroundColor: "rgba(31, 41, 55, 0.8)",
                  }}
                >
                  <h4 className="mb-2 text-lg font-semibold text-white">
                    {selectedLocation.name}
                  </h4>
                  <div className="space-y-1 text-sm text-gray-300">
                    <p>{selectedLocation.address}</p>
                    <p>Phone: {selectedLocation.phone}</p>
                    <p>Email: {selectedLocation.email}</p>
                  </div>
                  <motion.button
                    className="mt-3 flex items-center text-sm text-blue-400 transition-colors hover:text-blue-300"
                    whileHover={{ x: 3 }}
                    onClick={() =>
                      window.open(`mailto:${selectedLocation.email}`, "_blank")
                    }
                  >
                    Contact this office <ArrowRight className="ml-1 h-3 w-3" />
                  </motion.button>
                </motion.div>
              )}

              {!selectedLocation && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <p className="rounded-md bg-gray-800 bg-opacity-70 px-4 py-2 text-gray-400">
                    Click on a location marker to view details
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-500"
            >
              © {new Date().getFullYear()} Infinity UI. All rights reserved.
            </motion.p>

            <div className="mt-4 flex flex-wrap gap-6 md:mt-0">
              {["Terms", "Privacy", "Cookies", "Legal"].map((item, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-sm text-gray-500 transition-colors hover:text-gray-300"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
            className="mt-6 text-center text-xs text-gray-600 md:text-left"
          >
            Infinity UI is committed to providing accessible UI components for
            developers worldwide. Our offices are available to serve you in your
            time zone.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default InteractiveMapFooter;
