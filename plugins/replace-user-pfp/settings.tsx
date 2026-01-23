import * as charity from "../../charity";
import { reobserveUsers } from ".";
import type { Settings } from "./types";

const {
  plugin,
  solid: { createSignal, onCleanup, Index },
  ui: { Text, TextTags, TextBox, TextArea, Button, Divider, Space },
} = shelter;

const store = plugin.store as Settings;

const TEXT_AREA_PLACEHOLDER = `https://... [or] data:image/...;base64,...`;

export function settings() {
  const [img, setImg] = createSignal(store.replaceUrl);
  const [users, setUsers] = createSignal(store.users);

  onCleanup(() => {
    store.replaceUrl = img();
    store.users = users().filter(v => /^[0-9]+$/.test(v));

    reobserveUsers();
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          "justify-content": "space-evenly",
          "align-items": "center",
          gap: "1em",
        }}
      >
        <img
          aria-label="avatar"
          src={img()}
          width="50%"
          height="50%"
          style={{ "border-radius": "50%" }}
        />

        <TextArea
          value={img()}
          resize-y={true}
          mono={true}
          placeholder={TEXT_AREA_PLACEHOLDER}
          onInput={setImg}
        />
      </div>

      <Space />
      <Divider />
      <Space />

      <Index
        each={users()}
        fallback={
          <>
            <div style={{ width: "fit-content", "margin-inline": "auto" }}>
              <Text
                tag={TextTags.textXS}
                style={{ color: "var(--text-subtle)" }}
              >
                "Add User ID" to add user into list...
              </Text>
            </div>
            <Space />
          </>
        }
      >
        {(user, idx) => (
          <>
            <TextBox
              value={user()}
              placeholder="User ID here... (Leave empty to remove)"
              onInput={(newUser: string) =>
                setUsers(prev => charity.setIndex(prev, idx, newUser))
              }
            />
            <Space />
          </>
        )}
      </Index>

      <div style={{ width: "fit-content", "margin-left": "auto" }}>
        <Button grow={true} onClick={() => setUsers(prev => [...prev, ""])}>
          Add User ID
        </Button>
      </div>

      <Space />
    </>
  );
}
