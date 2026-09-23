import type { DoorId, ScreenId } from "~/utils/demo";

/** State for the "What's in the app" tabs and the small interactive overlays. */
export function useDemoState() {
  return {
    screen: useState<ScreenId>("demo-screen", () => "boards"),
    hearted: useState<boolean>("demo-hearted", () => false),
    door: useState<DoorId>("demo-door", () => "friends"),
    joined: useState<boolean>("demo-joined", () => false),
  };
}
