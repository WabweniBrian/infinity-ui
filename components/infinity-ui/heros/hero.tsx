import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />

      {/* Hero Content */}
      <div className="relative mx-auto max-w-7xl px-3 py-24 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text Content */}
          <div className="space-y-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Revolutionize Your Workflow
            </h1>
            <p className="max-w-2xl text-xl text-muted-foreground">
              Streamline your processes, boost productivity, and take your
              business to new heights with our cutting-edge SaaS platform.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-8">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <Image
                    key={i}
                    src={`/images/1.png`}
                    alt={`User ${i + 1}`}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-background"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">2,000+</span>{" "}
                happy customers
              </p>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 via-primary/20 to-background" />
            <Image
              src="/images/bg.jpg"
              alt="SaaS Platform Illustration"
              width={600}
              height={600}
              className="relative rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute h-[50rem] w-[90rem] -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
