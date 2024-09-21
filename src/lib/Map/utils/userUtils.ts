import type { UserData } from "../../../types";

export function getColorForUser(user: UserData): string {
  const hash = user.id.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  const color = `hsl(${hash % 360}, 100%, 40%)`;
  return color;
}
