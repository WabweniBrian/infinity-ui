import { type ClassValue, clsx } from "clsx";
import { format, formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string into a specific format.
 * @param dateString - The date string to be formatted.
 * @returns The formatted date string.
 */
export const formatDate = (dateString: Date): string => {
  const dateObject = new Date(dateString);
  const formattedDate = format(dateObject, "dd MMM, yyyy");
  return formattedDate;
};

/**
 * Formats a given date string into a relative time string.
 * @param dateString - The date string to be formatted.
 * @returns The formatted relative time string.
 */
export const formatRelativeTime = (dateString: Date): string => {
  const dateObject = new Date(dateString);
  const relativeTime = formatDistanceToNow(dateObject, { addSuffix: true });
  return relativeTime;
};

/**
 * Generates a slug from the given name.
 * @param name - The name to generate the slug from.
 * @returns The generated slug.
 */
export const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/**
 * Formats a date and time string into a specific format.
 * @param dateString - The date string to be formatted.
 * @returns The formatted date and time string.
 */
export const formatDateTime = (dateString: Date): string => {
  const dateObject = new Date(dateString);
  const formattedDate = format(dateObject, "dd MMM, yyyy hh:mm a");
  return formattedDate;
};

/**
 * Formats a given date string into a formatted date and time string.
 * @param dateString - The date string to be formatted.
 * @returns The formatted date and time string.
 */
export const formatDateTimeSec = (dateString: Date): string => {
  const dateObject = new Date(dateString);
  const formattedDate = format(dateObject, "dd MMM, yyyy hh:mm:s a");
  return formattedDate;
};

/**
 * Formats the input date string into a specific format.
 * @param dateString - The input date string to be formatted.
 * @returns The formatted date string.
 */
export const formatInputDate = (dateString: Date): string => {
  const dateObject = new Date(dateString);
  const formattedDate = format(dateObject, "yyyy-MM-dd'T'HH:mm");
  return formattedDate;
};

/**
 * Capitalizes the first letter of a string.
 *
 * @param str - The input string.
 * @returns The input string with the first letter capitalized.
 */
const capitalizeFirstLetter = (str: string): string => {
  return str.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
};

/**
 * Formats a word by replacing underscores with spaces and capitalizing the first letter of each word.
 * @param str - The word to be formatted.
 * @returns The formatted word.
 */
export const formatWord = (str: string): string => {
  if (str.includes("_")) {
    return str
      .split("_")
      .map((word) => capitalizeFirstLetter(word))
      .join(" ");
  } else if (str.includes("-")) {
    return str
      .split("-")
      .map((word) => capitalizeFirstLetter(word))
      .join(" ");
  }
  return capitalizeFirstLetter(str);
};

export const formatString = (input: string): string => {
  return input
    .split("-") // Split the string by hyphen
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(" "); // Join the words with spaces
};

export const trimFileName = (fileName: string, maxLength: number): string => {
  if (fileName.length <= maxLength) {
    return fileName; // No need to trim
  }

  const extensionIndex = fileName.lastIndexOf(".");
  const extension = fileName.substring(extensionIndex); // Get file extension including dot

  // Calculate the length of the filename excluding the extension
  const fileNameWithoutExtension = fileName.substring(0, extensionIndex);
  const availableLengthForFileName = maxLength - extension.length - 3; // -3 for the dots (...)

  // Trim the filename and append dots and extension
  const trimmedFileName =
    fileNameWithoutExtension.substring(0, availableLengthForFileName) + "...";

  return trimmedFileName + extension;
};
