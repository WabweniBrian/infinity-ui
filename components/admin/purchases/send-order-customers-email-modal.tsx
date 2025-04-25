"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Loader2, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendBulkEmail } from "@/lib/actions/admin/send-bulk-email";
import { Checkbox } from "@/components/ui/checkbox";

interface SendOrderCustomersEmailModalProps {
  customerIds: string[];
  customerCount: number;
  orderCount: number;
  onClose: () => void;
  onSuccess?: () => void;
}

export const SendOrderCustomersEmailModal = ({
  customerIds,
  customerCount,
  orderCount,
  onClose,
  onSuccess,
}: SendOrderCustomersEmailModalProps) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");
  const [includeButton, setIncludeButton] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

    if (includeButton) {
      if (!buttonText.trim()) {
        setError("Button text is required when including a button");
        return;
      }
      if (!buttonUrl.trim()) {
        setError("Button URL is required when including a button");
        return;
      }
    }

    setError(null);
    setIsSending(true);

    try {
      const result = await sendBulkEmail({
        userIds: customerIds,
        subject: subject.trim(),
        message: message.trim(),
        buttonText: includeButton ? buttonText.trim() : undefined,
        buttonUrl: includeButton ? buttonUrl.trim() : undefined,
      });

      if (result.success) {
        setSuccess(
          result.message ||
            `Emails sent successfully to ${customerCount} customers`,
        );

        // Call onSuccess callback if provided
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 2000);
        }
      } else {
        setError(result.message || "Failed to send emails");
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
          className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-800"
        >
          <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Email Order Customers
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sending to {customerCount} customer
                {customerCount !== 1 ? "s" : ""} from {orderCount} order
                {orderCount !== 1 ? "s" : ""}
              </p>
            </div>
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
                  <h3 className="font-medium">Emails Sent Successfully!</h3>
                  <p className="mt-1 text-sm">{success}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={onClose}>Close</Button>
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

              <div className="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeButton"
                    checked={includeButton}
                    onCheckedChange={(checked) =>
                      setIncludeButton(checked === true)
                    }
                  />
                  <Label htmlFor="includeButton" className="cursor-pointer">
                    Include a call-to-action button
                  </Label>
                </div>

                {includeButton && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <Label htmlFor="buttonText">Button Text</Label>
                      <Input
                        id="buttonText"
                        value={buttonText}
                        onChange={(e) => setButtonText(e.target.value)}
                        placeholder="e.g., View Your Orders"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="buttonUrl">Button URL</Label>
                      <Input
                        id="buttonUrl"
                        value={buttonUrl}
                        onChange={(e) => setButtonUrl(e.target.value)}
                        placeholder="e.g., https://example.com/account/orders"
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
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
                      Sending to {customerCount} customer
                      {customerCount !== 1 ? "s" : ""}...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send to {customerCount} customer
                      {customerCount !== 1 ? "s" : ""}
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
