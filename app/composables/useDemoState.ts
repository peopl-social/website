import type { DoorId, ScreenId } from "~/utils/demo";

/** Demo state lives outside the screens so it survives switching tabs. */
export function useDemoState() {
  return {
    screen: useState<ScreenId>("demo-screen", () => "boards"),
    hearted: useState<boolean>("demo-hearted", () => false),
    door: useState<DoorId>("demo-door", () => "friends"),
    joined: useState<boolean>("demo-joined", () => false),
    replied: useState<boolean>("demo-replied", () => false),
  };
}
