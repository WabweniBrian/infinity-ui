"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Copy,
  Download,
  Edit,
  Layers,
  Loader2,
  Maximize2,
  Mic,
  MicOff,
  Minimize2,
  Moon,
  Music,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Sliders,
  Sparkles,
  Sun,
  Trash2,
  Volume2,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Track {
  id: string;
  name: string;
  instrument: string;
  pattern: number[];
  color: string;
  volume: number;
  muted: boolean;
  solo: boolean;
}

interface Preset {
  id: string;
  name: string;
  description: string;
  tags: string[];
  selected: boolean;
}

const AIMusicComposer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [currentStep, setCurrentStep] = useState(-1);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [presets, setPresets] = useState<Preset[]>([]);
  const [melody, setMelody] = useState<string>("");
  const [genre, setGenre] = useState<string>("electronic");
  const [mood, setMood] = useState<string>("energetic");
  const [complexity, setComplexity] = useState<number>(50);
  const [history, setHistory] = useState<
    { id: string; name: string; date: string }[]
  >([]);
  const [currentComposition, setCurrentComposition] = useState<string>(
    "Untitled Composition",
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const stepIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [openPanels, setOpenPanels] = useState<Set<string>>(
    new Set(["composer", "generator", "presets"]),
  );

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

  // Initialize audio context
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Start sequencer
  const startSequencer = () => {
    if (stepIntervalRef.current) {
      clearInterval(stepIntervalRef.current);
    }

    setIsPlaying(true);
    setCurrentStep(-1);

    const stepTime = ((60 / bpm) * 1000) / 4; // 16th notes

    stepIntervalRef.current = setInterval(() => {
      setCurrentStep((prevStep) => {
        const nextStep = (prevStep + 1) % 16;

        // Play sounds for this step
        tracks.forEach((track) => {
          if (!track.muted && track.pattern[nextStep]) {
            playSound(track.instrument, track.volume);
          }
        });

        return nextStep;
      });
    }, stepTime);
  };

  // Stop sequencer
  const stopSequencer = () => {
    if (stepIntervalRef.current) {
      clearInterval(stepIntervalRef.current);
      stepIntervalRef.current = null;
    }
    setIsPlaying(false);
    setCurrentStep(-1);
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      stopSequencer();
    } else {
      startSequencer();
    }
  };

  // Play a sound
  const playSound = (instrument: string, volume: number) => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    // Set oscillator type based on instrument
    if (instrument === "drum") {
      oscillator.type = "sine";
      oscillator.frequency.value = 150;
    } else if (instrument === "synth") {
      oscillator.type = "sawtooth";
      oscillator.frequency.value = 220;
    } else if (instrument === "bass") {
      oscillator.type = "triangle";
      oscillator.frequency.value = 80;
    } else if (instrument === "pad") {
      oscillator.type = "sine";
      oscillator.frequency.value = 440;
    }

    // Set volume
    gainNode.gain.value = volume;

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    // Start and stop
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContextRef.current.currentTime + 0.5,
    );
    oscillator.stop(audioContextRef.current.currentTime + 0.5);
  };

  // Toggle track mute
  const toggleMute = (trackId: string) => {
    setTracks(
      tracks.map((track) => {
        if (track.id === trackId) {
          return { ...track, muted: !track.muted };
        }
        return track;
      }),
    );
  };

  // Toggle track solo
  const toggleSolo = (trackId: string) => {
    const trackToSolo = tracks.find((track) => track.id === trackId);
    const isSolo = trackToSolo ? !trackToSolo.solo : false;

    setTracks(
      tracks.map((track) => {
        if (track.id === trackId) {
          return { ...track, solo: isSolo };
        }
        // If we're enabling solo on one track, mute all others
        // If we're disabling solo, unmute all tracks
        return {
          ...track,
          muted: isSolo && track.id !== trackId,
        };
      }),
    );
  };

  // Update track pattern
  const toggleStep = (trackId: string, stepIndex: number) => {
    setTracks(
      tracks.map((track) => {
        if (track.id === trackId) {
          const newPattern = [...track.pattern];
          newPattern[stepIndex] = newPattern[stepIndex] ? 0 : 1;
          return { ...track, pattern: newPattern };
        }
        return track;
      }),
    );
  };

  // Update track volume
  const updateVolume = (trackId: string, volume: number) => {
    setTracks(
      tracks.map((track) => {
        if (track.id === trackId) {
          return { ...track, volume };
        }
        return track;
      }),
    );
  };

  // Add new track
  const addTrack = () => {
    const instruments = ["drum", "synth", "bass", "pad"];
    const randomInstrument =
      instruments[Math.floor(Math.random() * instruments.length)];

    const newTrack: Track = {
      id: `track-${Date.now()}`,
      name: `Track ${tracks.length + 1}`,
      instrument: randomInstrument,
      pattern: Array(16).fill(0),
      color: getRandomColor(),
      volume: 0.7,
      muted: false,
      solo: false,
    };

    setTracks((prevTracks) => [...prevTracks, newTrack]);
  };

  // Remove track
  const removeTrack = (trackId: string) => {
    setTracks((prevTracks) =>
      prevTracks.filter((track) => track.id !== trackId),
    );
  };

  // Get random color
  const getRandomColor = () => {
    const colors = [
      "#FF5A5F",
      "#3A86FF",
      "#8338EC",
      "#FB5607",
      "#06D6A0",
      "#FFBE0B",
      "#118AB2",
      "#073B4C",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
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

  // Select preset
  const selectPreset = (presetId: string) => {
    // Find the selected preset
    const selectedPreset = presets.find((preset) => preset.id === presetId);
    if (!selectedPreset) return;

    // Update presets selection state
    setPresets(
      presets.map((preset) => ({
        ...preset,
        selected: preset.id === presetId,
      })),
    );

    setSelectedPreset(presetId);

    // Apply preset based on tags
    let newTracks: Track[] = [];

    if (selectedPreset.tags.includes("electronic")) {
      // Electronic preset
      newTracks = [
        {
          id: `track-kick-${Date.now()}`,
          name: "Kick",
          instrument: "drum",
          pattern: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // Four-on-the-floor
          color: "#FF5A5F",
          volume: 0.8,
          muted: false,
          solo: false,
        },
        {
          id: `track-snare-${Date.now()}`,
          name: "Snare",
          instrument: "drum",
          pattern: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
          color: "#3A86FF",
          volume: 0.7,
          muted: false,
          solo: false,
        },
        {
          id: `track-hihat-${Date.now()}`,
          name: "Hi-hat",
          instrument: "drum",
          pattern: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
          color: "#8338EC",
          volume: 0.6,
          muted: false,
          solo: false,
        },
        {
          id: `track-bass-${Date.now()}`,
          name: "Bass",
          instrument: "bass",
          pattern: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
          color: "#FB5607",
          volume: 0.75,
          muted: false,
          solo: false,
        },
      ];
    } else if (selectedPreset.tags.includes("hip-hop")) {
      // Hip hop preset
      newTracks = [
        {
          id: `track-kick-${Date.now()}`,
          name: "Kick",
          instrument: "drum",
          pattern: [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
          color: "#FF5A5F",
          volume: 0.8,
          muted: false,
          solo: false,
        },
        {
          id: `track-snare-${Date.now()}`,
          name: "Snare",
          instrument: "drum",
          pattern: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
          color: "#3A86FF",
          volume: 0.7,
          muted: false,
          solo: false,
        },
        {
          id: `track-hihat-${Date.now()}`,
          name: "Hi-hat",
          instrument: "drum",
          pattern: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          color: "#8338EC",
          volume: 0.5,
          muted: false,
          solo: false,
        },
        {
          id: `track-bass-${Date.now()}`,
          name: "Bass",
          instrument: "bass",
          pattern: [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0],
          color: "#FB5607",
          volume: 0.75,
          muted: false,
          solo: false,
        },
      ];
    } else if (selectedPreset.tags.includes("ambient")) {
      // Ambient preset
      newTracks = [
        {
          id: `track-pad-${Date.now()}`,
          name: "Pad",
          instrument: "pad",
          pattern: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          color: "#06D6A0",
          volume: 0.6,
          muted: false,
          solo: false,
        },
        {
          id: `track-bass-${Date.now()}`,
          name: "Bass",
          instrument: "bass",
          pattern: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
          color: "#FB5607",
          volume: 0.5,
          muted: false,
          solo: false,
        },
        {
          id: `track-hihat-${Date.now()}`,
          name: "Hi-hat",
          instrument: "drum",
          pattern: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
          color: "#8338EC",
          volume: 0.3,
          muted: false,
          solo: false,
        },
      ];
    } else {
      // Default preset
      newTracks = [
        {
          id: `track-kick-${Date.now()}`,
          name: "Kick",
          instrument: "drum",
          pattern: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
          color: "#FF5A5F",
          volume: 0.8,
          muted: false,
          solo: false,
        },
        {
          id: `track-snare-${Date.now()}`,
          name: "Snare",
          instrument: "drum",
          pattern: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
          color: "#3A86FF",
          volume: 0.7,
          muted: false,
          solo: false,
        },
      ];
    }

    // Set the new tracks
    setTracks(newTracks);

    // Update genre and mood based on preset
    if (selectedPreset.tags.includes("electronic")) {
      setGenre("electronic");
    } else if (selectedPreset.tags.includes("hip-hop")) {
      setGenre("hip-hop");
    } else if (selectedPreset.tags.includes("ambient")) {
      setGenre("ambient");
    }

    if (selectedPreset.tags.includes("chill")) {
      setMood("chill");
    } else if (selectedPreset.tags.includes("energetic")) {
      setMood("energetic");
    } else if (selectedPreset.tags.includes("dark")) {
      setMood("dark");
    }

    // Add notification toast or feedback
    console.log(`Applied preset: ${selectedPreset.name}`);
  };

  // Generate music with AI
  const generateMusic = async () => {
    setIsGenerating(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate new tracks based on parameters
    const newTracks: Track[] = [];

    // Kick drum pattern based on genre
    let kickPattern: number[] = [];
    if (genre === "electronic") {
      kickPattern = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]; // Four-on-the-floor
    } else if (genre === "hip-hop") {
      kickPattern = [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0]; // Boom bap
    } else {
      kickPattern = [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0]; // Rock/other
    }

    newTracks.push({
      id: `track-1-${Date.now()}`,
      name: "Kick",
      instrument: "drum",
      pattern: kickPattern,
      color: "#FF5A5F",
      volume: 0.8,
      muted: false,
      solo: false,
    });

    // Snare pattern
    let snarePattern: number[] = [];
    if (genre === "electronic") {
      snarePattern = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]; // On 2 and 4
    } else {
      snarePattern = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0]; // Backbeat
    }

    newTracks.push({
      id: `track-2-${Date.now()}`,
      name: "Snare",
      instrument: "drum",
      pattern: snarePattern,
      color: "#3A86FF",
      volume: 0.7,
      muted: false,
      solo: false,
    });

    // Hi-hat pattern based on complexity
    let hihatPattern: number[] = [];
    if (complexity < 30) {
      hihatPattern = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]; // Simple
    } else if (complexity < 70) {
      hihatPattern = [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1]; // Medium
    } else {
      hihatPattern = [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0]; // Complex
    }

    newTracks.push({
      id: `track-3-${Date.now()}`,
      name: "Hi-hat",
      instrument: "drum",
      pattern: hihatPattern,
      color: "#8338EC",
      volume: 0.6,
      muted: false,
      solo: false,
    });

    // Bass pattern based on mood
    let bassPattern: number[] = [];
    if (mood === "energetic") {
      bassPattern = [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0]; // Active
    } else if (mood === "chill") {
      bassPattern = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0]; // Minimal
    } else {
      bassPattern = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0]; // Varied
    }

    newTracks.push({
      id: `track-4-${Date.now()}`,
      name: "Bass",
      instrument: "bass",
      pattern: bassPattern,
      color: "#FB5607",
      volume: 0.75,
      muted: false,
      solo: false,
    });

    // Melody pattern based on complexity and mood
    let melodyPattern: number[] = [];
    if (complexity < 30) {
      if (mood === "energetic") {
        melodyPattern = [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0]; // Simple energetic
      } else {
        melodyPattern = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]; // Simple chill
      }
    } else if (complexity < 70) {
      if (mood === "energetic") {
        melodyPattern = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0]; // Medium energetic
      } else {
        melodyPattern = [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]; // Medium chill
      }
    } else {
      if (mood === "energetic") {
        melodyPattern = [1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1]; // Complex energetic
      } else {
        melodyPattern = [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]; // Complex chill
      }
    }

    newTracks.push({
      id: `track-5-${Date.now()}`,
      name: "Melody",
      instrument: "synth",
      pattern: melodyPattern,
      color: "#06D6A0",
      volume: 0.65,
      muted: false,
      solo: false,
    });

    // Add a pad track for atmospheric genres
    if (mood === "atmospheric" || genre === "ambient") {
      newTracks.push({
        id: `track-6-${Date.now()}`,
        name: "Pad",
        instrument: "pad",
        pattern: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Just on the 1
        color: "#FFBE0B",
        volume: 0.5,
        muted: false,
        solo: false,
      });
    }

    setTracks(newTracks);
    setIsGenerating(false);

    // Add to history
    const newComposition = {
      id: `comp-${Date.now()}`,
      name: currentComposition || "Untitled Composition",
      date: new Date().toISOString().split("T")[0],
    };

    setHistory((prevHistory) => [newComposition, ...prevHistory]);

    // Auto-play the generated music
    setTimeout(() => {
      if (!isPlaying) {
        startSequencer();
      }
    }, 500);
  };

  // Load composition from history
  const loadComposition = (compositionId: string) => {
    const composition = history.find((item) => item.id === compositionId);
    if (!composition) return;

    // Set the composition name
    setCurrentComposition(composition.name);

    // For demo purposes, we'll just generate new tracks
    // In a real app, you would load the saved track data
    generateMusic();
  };

  // Toggle recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);

    // In a real app, you would start/stop recording here
    if (!isRecording) {
      console.log("Recording started");
    } else {
      console.log("Recording stopped");

      // Add the recording to history
      const newRecording = {
        id: `rec-${Date.now()}`,
        name: `${currentComposition} (Recording)`,
        date: new Date().toISOString().split("T")[0],
      };

      setHistory((prevHistory) => [newRecording, ...prevHistory]);
    }
  };

  // Canvas animation for visualizer
  const startCanvasAnimation = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      if (!canvasRef.current) return;

      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw background
      ctx.fillStyle = isDarkMode ? "#1F2937" : "#F3F4F6";
      ctx.fillRect(0, 0, width, height);

      // Draw visualization based on tracks and current step
      if (isPlaying && tracks.length > 0) {
        // Draw active tracks
        const activeTracks = tracks.filter((track) => !track.muted);

        activeTracks.forEach((track, trackIndex) => {
          const trackHeight = height / activeTracks.length;
          const y = trackIndex * trackHeight;

          // Draw track background
          ctx.fillStyle = isDarkMode
            ? `${track.color}33` // 20% opacity in dark mode
            : `${track.color}1A`; // 10% opacity in light mode
          ctx.fillRect(0, y, width, trackHeight);

          // Draw pattern
          const stepWidth = width / 16;

          track.pattern.forEach((step, stepIndex) => {
            if (step) {
              // Draw step
              ctx.fillStyle = track.color;

              // Make current step brighter
              if (stepIndex === currentStep) {
                ctx.globalAlpha = 0.9;
              } else {
                ctx.globalAlpha = 0.6;
              }

              const stepX = stepIndex * stepWidth;
              const stepHeight = trackHeight * 0.8;
              const stepY = y + (trackHeight - stepHeight) / 2;

              // Draw rounded rectangle
              const radius = 4;
              ctx.beginPath();
              ctx.moveTo(stepX + radius, stepY);
              ctx.lineTo(stepX + stepWidth - radius, stepY);
              ctx.quadraticCurveTo(
                stepX + stepWidth,
                stepY,
                stepX + stepWidth,
                stepY + radius,
              );
              ctx.lineTo(stepX + stepWidth, stepY + stepHeight - radius);
              ctx.quadraticCurveTo(
                stepX + stepWidth,
                stepY + stepHeight,
                stepX + stepWidth - radius,
                stepY + stepHeight,
              );
              ctx.lineTo(stepX + radius, stepY + stepHeight);
              ctx.quadraticCurveTo(
                stepX,
                stepY + stepHeight,
                stepX,
                stepY + stepHeight - radius,
              );
              ctx.lineTo(stepX, stepY + radius);
              ctx.quadraticCurveTo(stepX, stepY, stepX + radius, stepY);
              ctx.closePath();
              ctx.fill();

              ctx.globalAlpha = 1.0;
            }
          });

          // Draw track name
          ctx.fillStyle = isDarkMode ? "#FFFFFF" : "#000000";
          ctx.font = "12px sans-serif";
          ctx.fillText(track.name, 10, y + 20);
        });

        // Draw playhead
        if (currentStep >= 0) {
          const stepWidth = width / 16;
          const stepX = currentStep * stepWidth;

          ctx.fillStyle = isDarkMode
            ? "rgba(255, 255, 255, 0.3)"
            : "rgba(0, 0, 0, 0.2)";
          ctx.fillRect(stepX, 0, stepWidth, height);
        }
      } else {
        // Draw idle state
        ctx.fillStyle = isDarkMode ? "#FFFFFF33" : "#00000033";
        ctx.font = "16px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
          "Press Play to start visualization",
          width / 2,
          height / 2,
        );
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
  }, [currentStep, isDarkMode, isPlaying, tracks]);

  // Initialize sample data
  useEffect(() => {
    // Sample tracks
    const sampleTracks: Track[] = [
      {
        id: "track-1",
        name: "Kick",
        instrument: "drum",
        pattern: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        color: "#FF5A5F",
        volume: 0.8,
        muted: false,
        solo: false,
      },
      {
        id: "track-2",
        name: "Snare",
        instrument: "drum",
        pattern: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
        color: "#3A86FF",
        volume: 0.7,
        muted: false,
        solo: false,
      },
      {
        id: "track-3",
        name: "Hi-hat",
        instrument: "drum",
        pattern: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        color: "#8338EC",
        volume: 0.6,
        muted: false,
        solo: false,
      },
      {
        id: "track-4",
        name: "Bass",
        instrument: "bass",
        pattern: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        color: "#FB5607",
        volume: 0.75,
        muted: false,
        solo: false,
      },
      {
        id: "track-5",
        name: "Melody",
        instrument: "synth",
        pattern: [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0],
        color: "#06D6A0",
        volume: 0.65,
        muted: false,
        solo: false,
      },
    ];
    setTracks(sampleTracks);

    // Sample presets
    const samplePresets: Preset[] = [
      {
        id: "preset-1",
        name: "Deep House",
        description: "Smooth, deep electronic beats with atmospheric elements",
        tags: ["electronic", "house", "chill"],
        selected: false,
      },
      {
        id: "preset-2",
        name: "Hip Hop Beat",
        description: "Classic boom bap with punchy drums and melodic samples",
        tags: ["hip-hop", "beats", "urban"],
        selected: false,
      },
      {
        id: "preset-3",
        name: "Ambient Soundscape",
        description: "Ethereal pads and textures for relaxation and focus",
        tags: ["ambient", "chill", "focus"],
        selected: false,
      },
      {
        id: "preset-4",
        name: "Synthwave",
        description: "80s inspired retro synth patterns with driving beats",
        tags: ["electronic", "retro", "synth"],
        selected: false,
      },
      {
        id: "preset-5",
        name: "Lo-Fi Study",
        description:
          "Relaxed beats with jazzy elements perfect for concentration",
        tags: ["lo-fi", "chill", "study"],
        selected: false,
      },
    ];
    setPresets(samplePresets);

    // Sample history
    const sampleHistory = [
      { id: "comp-1", name: "Summer Vibes", date: "2023-06-15" },
      { id: "comp-2", name: "Night Drive", date: "2023-06-10" },
      { id: "comp-3", name: "Morning Meditation", date: "2023-06-05" },
    ];
    setHistory(sampleHistory);

    // Start canvas animation
    startCanvasAnimation();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [startCanvasAnimation]);

  // Genre options
  const genreOptions = [
    { id: "electronic", label: "Electronic" },
    { id: "hip-hop", label: "Hip Hop" },
    { id: "ambient", label: "Ambient" },
    { id: "rock", label: "Rock" },
    { id: "jazz", label: "Jazz" },
  ];

  // Mood options
  const moodOptions = [
    { id: "energetic", label: "Energetic" },
    { id: "chill", label: "Chill" },
    { id: "dark", label: "Dark" },
    { id: "uplifting", label: "Uplifting" },
    { id: "atmospheric", label: "Atmospheric" },
  ];

  // Export composition
  const exportComposition = () => {
    // Create a JSON representation of the current composition
    const composition = {
      name: currentComposition,
      bpm,
      tracks,
      date: new Date().toISOString(),
    };

    // Convert to JSON string
    const jsonString = JSON.stringify(composition, null, 2);

    // Create a blob and download
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentComposition.replace(/\s+/g, "-").toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Add to history if not already there
    const existingComposition = history.find(
      (item) => item.name === currentComposition,
    );
    if (!existingComposition) {
      const newComposition = {
        id: `comp-${Date.now()}`,
        name: currentComposition,
        date: new Date().toISOString().split("T")[0],
      };
      setHistory((prevHistory) => [newComposition, ...prevHistory]);
    }
  };

  return (
    <div
      className={`${isFullscreen ? "fixed inset-0 z-50 bg-white dark:bg-gray-900" : "min-h-screen bg-gradient-to-br from-white to-gray-50 px-4 py-10 dark:from-gray-950 dark:to-gray-900"}`}
    >
      <div
        className={`mx-auto overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-xl backdrop-blur-sm transition-all duration-300 dark:border-gray-800/50 dark:bg-gray-800/90 dark:backdrop-blur-sm ${isFullscreen ? "h-screen w-full overflow-y-auto rounded-none border-0" : "max-w-4xl"}`}
      >
        {/* Header */}
        <div className="border-b border-gray-100 p-6 dark:border-gray-700/50">
          <div
            className={`flex items-center justify-between ${isFullscreen ? "mx-auto max-w-7xl" : ""}`}
          >
            <div className="flex items-center">
              <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-lg">
                <Music className="h-5 w-5" />
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-xl font-bold text-transparent dark:from-purple-400 dark:to-indigo-400">
                  AI Music Composer
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Create and visualize music with AI
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

        {/* Composition Info */}
        <div className="border-b border-gray-100 p-4 dark:border-gray-700/50">
          <div className={`${isFullscreen ? "mx-auto max-w-7xl px-3" : ""}`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={currentComposition}
                    onChange={(e) => setCurrentComposition(e.target.value)}
                    className="bg-transparent text-xl font-bold text-gray-800 focus:outline-none dark:text-white"
                    placeholder="Untitled Composition"
                  />
                  <Edit className="ml-2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Sliders className="mr-1 h-4 w-4" />
                  <span>BPM: </span>
                  <input
                    type="number"
                    min="60"
                    max="200"
                    value={bpm}
                    onChange={(e) => setBpm(Number.parseInt(e.target.value))}
                    className="ml-1 w-16 bg-transparent focus:outline-none dark:text-gray-400"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={toggleRecording}
                  className={`flex items-center rounded-full px-3 py-1.5 text-sm ${
                    isRecording
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {isRecording ? (
                    <MicOff className="mr-1 h-4 w-4" />
                  ) : (
                    <Mic className="mr-1 h-4 w-4" />
                  )}
                  {isRecording ? "Stop Recording" : "Record"}
                </button>
                <button
                  onClick={togglePlay}
                  className={`flex items-center rounded-full px-3 py-1.5 text-sm ${
                    isPlaying
                      ? "bg-purple-500 text-white hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700"
                      : "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40"
                  }`}
                >
                  {isPlaying ? (
                    <Pause className="mr-1 h-4 w-4" />
                  ) : (
                    <Play className="mr-1 h-4 w-4" />
                  )}
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <button
                  className="flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  onClick={() => {
                    stopSequencer();
                    setCurrentStep(-1);
                  }}
                >
                  <RotateCcw className="mr-1 h-4 w-4" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="border-b border-gray-100 p-4 dark:border-gray-700/50">
          <div className={`${isFullscreen ? "mx-auto max-w-7xl px-3" : ""}`}>
            <canvas
              ref={canvasRef}
              width={800}
              height={200}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50"
            />
          </div>
        </div>

        <div
          className={`grid grid-cols-1 gap-4 p-4 md:grid-cols-2 ${isFullscreen ? "mx-auto max-w-7xl px-3" : ""}`}
        >
          {/* Composer Panel */}
          <div className="col-span-1 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 md:col-span-2">
            <div
              className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
              onClick={() => togglePanel("composer")}
            >
              <h2 className="font-medium text-gray-800 dark:text-gray-200">
                Sequencer
              </h2>
              <ChevronDown
                className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                  openPanels.has("composer") ? "rotate-180" : ""
                }`}
              />
            </div>

            <AnimatePresence>
              {openPanels.has("composer") && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4">
                    {tracks.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                          <Music className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                          No tracks yet
                        </h3>
                        <p className="mb-4 max-w-md text-gray-500 dark:text-gray-400">
                          Add tracks to start composing or generate a
                          composition with AI.
                        </p>
                        <div className="flex space-x-4">
                          <button
                            onClick={addTrack}
                            className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Track
                          </button>
                          <button
                            onClick={() => {
                              setOpenPanels((prev) => {
                                const next = new Set(prev);
                                next.add("generator");
                                return next;
                              });
                            }}
                            className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40"
                          >
                            <Sparkles className="mr-2 h-4 w-4" />
                            AI Generator
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="mb-4 flex justify-between">
                          <button
                            onClick={addTrack}
                            className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1.5 text-sm font-medium text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40"
                          >
                            <Plus className="mr-1 h-4 w-4" />
                            Add Track
                          </button>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setOpenPanels((prev) => {
                                  const next = new Set(prev);
                                  next.add("generator");
                                  return next;
                                });
                              }}
                              className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1.5 text-sm font-medium text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40"
                            >
                              <Sparkles className="mr-1 h-4 w-4" />
                              AI Generator
                            </button>
                            <button
                              onClick={() => {
                                setOpenPanels((prev) => {
                                  const next = new Set(prev);
                                  next.add("presets");
                                  return next;
                                });
                              }}
                              className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                              <Layers className="mr-1 h-4 w-4" />
                              Presets
                            </button>
                          </div>
                        </div>

                        {/* Step numbers */}
                        <div className="mb-2 ml-32 flex">
                          {Array(16)
                            .fill(0)
                            .map((_, i) => (
                              <div
                                key={`step-${i}`}
                                className={`flex h-6 w-6 items-center justify-center text-xs ${
                                  i % 4 === 0
                                    ? "font-bold text-gray-800 dark:text-gray-200"
                                    : "text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {i + 1}
                              </div>
                            ))}
                        </div>

                        {/* Tracks */}
                        <div className="space-y-4">
                          {tracks.map((track) => (
                            <div key={track.id} className="flex items-center">
                              <div className="mr-2 w-32">
                                <div className="flex items-center">
                                  <div
                                    className="mr-2 h-3 w-3 rounded-full"
                                    style={{ backgroundColor: track.color }}
                                  ></div>
                                  <div className="font-medium text-gray-800 dark:text-gray-200">
                                    {track.name}
                                  </div>
                                </div>
                                <div className="mt-1 flex items-center space-x-1">
                                  <button
                                    onClick={() => toggleMute(track.id)}
                                    className={`rounded px-1.5 py-0.5 text-xs ${
                                      track.muted
                                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                    }`}
                                  >
                                    M
                                  </button>
                                  <button
                                    onClick={() => toggleSolo(track.id)}
                                    className={`rounded px-1.5 py-0.5 text-xs ${
                                      track.solo
                                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                    }`}
                                  >
                                    S
                                  </button>
                                  <button
                                    onClick={() => removeTrack(track.id)}
                                    className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>

                              {/* Step sequencer */}
                              <div className="flex flex-1">
                                {track.pattern.map((step, stepIndex) => (
                                  <button
                                    key={`${track.id}-step-${stepIndex}`}
                                    className={`m-0.5 h-6 w-6 rounded-md border ${
                                      step
                                        ? `bg-${track.color} border-${track.color} opacity-80`
                                        : "border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
                                    } ${
                                      currentStep === stepIndex
                                        ? "ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-gray-800"
                                        : ""
                                    }`}
                                    style={{
                                      backgroundColor: step ? track.color : "",
                                      borderColor: step ? track.color : "",
                                    }}
                                    onClick={() =>
                                      toggleStep(track.id, stepIndex)
                                    }
                                  ></button>
                                ))}
                              </div>

                              {/* Volume slider */}
                              <div className="ml-2 flex items-center">
                                <Volume2 className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <input
                                  type="range"
                                  min="0"
                                  max="1"
                                  step="0.1"
                                  value={track.volume}
                                  onChange={(e) =>
                                    updateVolume(
                                      track.id,
                                      Number.parseFloat(e.target.value),
                                    )
                                  }
                                  className="h-2 w-20 appearance-none rounded-full bg-gray-200 dark:bg-gray-700"
                                  style={{
                                    backgroundImage: `linear-gradient(to right, ${track.color}, ${track.color} ${track.volume * 100}%, transparent ${track.volume * 100}%)`,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Generator Panel */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div
              className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
              onClick={() => togglePanel("generator")}
            >
              <h2 className="font-medium text-gray-800 dark:text-gray-200">
                AI Generator
              </h2>
              <ChevronDown
                className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                  openPanels.has("generator") ? "rotate-180" : ""
                }`}
              />
            </div>

            <AnimatePresence>
              {openPanels.has("generator") && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4">
                    <div className="mb-4">
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Melody Idea (optional)
                      </label>
                      <textarea
                        value={melody}
                        onChange={(e) => setMelody(e.target.value)}
                        placeholder="Describe a melody or leave empty for AI to create one"
                        className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-400/50"
                        rows={2}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Genre
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {genreOptions.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => setGenre(option.id)}
                            className={`rounded-full px-3 py-1.5 text-sm ${
                              genre === option.id
                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white dark:from-purple-500 dark:to-indigo-500"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mood
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {moodOptions.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => setMood(option.id)}
                            className={`rounded-full px-3 py-1.5 text-sm ${
                              mood === option.id
                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white dark:from-purple-500 dark:to-indigo-500"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Complexity: {complexity}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={complexity}
                        onChange={(e) =>
                          setComplexity(Number.parseInt(e.target.value))
                        }
                        className="h-2 w-full appearance-none rounded-full bg-gray-200 dark:bg-gray-700"
                        style={{
                          backgroundImage: `linear-gradient(to right, purple, purple ${complexity}%, transparent ${complexity}%)`,
                        }}
                      />
                      <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Simple</span>
                        <span>Complex</span>
                      </div>
                    </div>

                    <button
                      onClick={generateMusic}
                      disabled={isGenerating}
                      className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 font-medium text-white shadow-md transition-all duration-200 hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70 dark:from-purple-500 dark:to-indigo-500 dark:hover:from-purple-600 dark:hover:to-indigo-600"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Generate Music
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Presets Panel */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div
              className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
              onClick={() => togglePanel("presets")}
            >
              <h2 className="font-medium text-gray-800 dark:text-gray-200">
                Presets & History
              </h2>
              <ChevronDown
                className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                  openPanels.has("presets") ? "rotate-180" : ""
                }`}
              />
            </div>

            <AnimatePresence>
              {openPanels.has("presets") && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4">
                    <div className="mb-4">
                      <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Presets
                      </h3>
                      <div className="space-y-2">
                        {presets.map((preset) => (
                          <div
                            key={preset.id}
                            className={`cursor-pointer rounded-lg border p-3 transition-all duration-200 ${
                              preset.selected
                                ? "border-purple-300 bg-purple-50 dark:border-purple-700 dark:bg-purple-900/20"
                                : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-purple-700 dark:hover:bg-purple-900/20"
                            }`}
                            onClick={() => selectPreset(preset.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="font-medium text-gray-800 dark:text-gray-200">
                                {preset.name}
                              </div>
                              {preset.selected && (
                                <Check className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                              )}
                            </div>
                            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              {preset.description}
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {preset.tags.map((tag, index) => (
                                <span
                                  key={`${preset.id}-tag-${index}`}
                                  className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        History
                      </h3>
                      <div className="space-y-2">
                        {history.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                          >
                            <div>
                              <div
                                className="cursor-pointer font-medium text-gray-800 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400"
                                onClick={() => loadComposition(item.id)}
                              >
                                {item.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {item.date}
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              <button
                                className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                onClick={() => loadComposition(item.id)}
                              >
                                <Copy className="h-4 w-4" />
                              </button>
                              <button
                                className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                onClick={exportComposition}
                              >
                                <Download className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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

export default AIMusicComposer;
