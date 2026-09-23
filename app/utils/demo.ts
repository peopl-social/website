export type Friend = {
  id: "mara" | "jules" | "rae" | "theo" | "you";
  name: string;
  initial: string;
  /** Tailwind classes for the avatar tint. */
  tone: string;
};

export const friends: Record<Friend["id"], Friend> = {
  mara: { id: "mara", name: "Mara", initial: "M", tone: "bg-orange-100 text-orange-700" },
  jules: { id: "jules", name: "Jules", initial: "J", tone: "bg-violet-100 text-violet-700" },
  rae: { id: "rae", name: "Rae", initial: "R", tone: "bg-sunk text-ink-soft" },
  theo: { id: "theo", name: "Theo", initial: "T", tone: "bg-orange-50 text-orange-700" },
  you: { id: "you", name: "You", initial: "Y", tone: "bg-ink text-paper" },
};

/** One date and place, used everywhere the demo mentions the plan. */
export const plan = {
  weekday: "Thu",
  day: "18",
  time: "6:30 PM",
  place: "River Gate",
  title: "Sunset walk, then something cold",
};

export const springs = {
  snappy: { type: "spring", stiffness: 520, damping: 34 },
  soft: { type: "spring", stiffness: 280, damping: 30 },
} as const;

export type ScreenId = "boards" | "doors" | "plans" | "messages";
export type DoorId = "private" | "friends" | "link";
