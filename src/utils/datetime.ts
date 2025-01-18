// What unit does Date.now() return? A: milliseconds since the Unix epoch

// Create a datetime utility function that takes in a number of milliseconds and returns a "time ago" string in human readable format.
export function timeAgoHumanReadable(milliseconds: number, lang = "hr"): string {
  if (lang === "hr") {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 1) {
      // Numbers that trigger the first condition
      const trueYears: number[] = [2, 3, 4];
      const sufix = trueYears.includes(years) ? "e" : "a";
      return `prije ${years} godin${sufix}`;
    } else if (months > 2) {
      return `prije ${months} mjeseca`;
    } else if (days > 2) {
      return `prije ${days} dana`;
    } else if (hours > 2) {
      return `prije ${hours} sata`;
    } else if (minutes > 2) {
      return `prije ${minutes} minuta`;
    } else {
      return `prije ${seconds} sekundi`;
    }
  } else {
    return "Unsupported language";
  }
}

export function formatDateAndAgo(date: Date, lang = "hr-HR"): string {
  // Use croatian
  return `${date.toLocaleDateString(lang)} (${timeAgoHumanReadable(
    Date.now() - date.getTime()
  )})`;
}
