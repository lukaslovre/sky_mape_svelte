export function trimText(text: string, maxLength: number): string {
  if (!text.length) return text;

  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}
