import { Settings } from "./types";

const {
  plugin,
  ui: {
    Text,
  },
} = shelter;

export const store = plugin.store as Settings;

export function settings() {
  return (
    <>
      <Text>foo</Text>
    </>
  );
}
