"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRole } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Loader2, Send, X } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { sendEmailToUser } from "@/lib/actions/admin/send-general-email";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
};

interface SendEmailModalProps {
  user: User;
  onClose: () => void;
}

export const SendEmailModal = ({ user, onClose }: SendEmailModalProps) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject.trim()) {
      setError("Subject is required");
      return;
    }

    if (!message.trim()) {
      setError("Message is required");
      return;
    }

    setError(null);
    setIsSending(true);

    try {
      const result = await sendEmailToUser({
        email: user.email,
        name: user.name,
        subject: subject.trim(),
        message: message.trim(),
        userId: user.id,
      });

      if (result.success) {
        setSuccess(true);
        // Close modal after showing success message
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError(result.message || "Failed to send email");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[66] flex items-center justify-center bg-black/50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl overflow-hidden rounded-xl bg-background shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Send Email to {user.name}
            </h2>
            <button
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={onClose}
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {success ? (
            <div className="p-6">
              <div className="flex items-start rounded-lg bg-green-100 p-4 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                <Send className="mr-2 mt-0.5 h-5 w-5" />
                <div>
                  <h3 className="font-medium">Email Sent Successfully!</h3>
                  <p className="mt-1 text-sm">
                    Your email has been sent to {user.email}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              {error && (
                <div className="flex items-start rounded-lg bg-red-100 p-4 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                  <AlertCircle className="mr-2 mt-0.5 h-5 w-5" />
                  <div>
                    <h3 className="font-medium">Error</h3>
                    <p className="mt-1 text-sm">{error}</p>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="recipient">Recipient</Label>
                <Input
                  id="recipient"
                  value={user.email}
                  disabled
                  className="mt-1 bg-gray-50 dark:bg-gray-700"
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter email subject"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message here..."
                  rows={8}
                  className="mt-1 min-h-[150px] w-full rounded-lg border border-gray-200 bg-white p-3 outline-none focus:ring-2 focus:ring-brand dark:border-gray-700 dark:bg-gray-800"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-brand hover:bg-brand/90"
                  disabled={isSending}
                >
                  {isSending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Email
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
