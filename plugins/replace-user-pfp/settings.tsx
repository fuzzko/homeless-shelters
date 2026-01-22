import { type Settings } from "./types";

import * as charity from "../../charity";

const {
  plugin,
  solid: {
    createSignal,
    createEffect,
    onCleanup,
    Index,
  },
  ui: {
    TextBox,
    TextArea,
    Button,
    Divider,
    Space,
  },
} = shelter;

const store = plugin.store as Settings;

const TEXT_AREA_PLACEHOLDER = `https://... [or] data:image/...;base64,...`;

function AddIcon(_props: {}) {
  return (
    <>
      <svg aria-hidden="true" role="img" xmlns="http://www.w3.orgx/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path fill="currentColor" d="M13 3a1 1 0 1 0-2 0v8H3a1 1 0 1 0 0 2h8v8a1 1 0 0 0 2 0v-8h8a1 1 0 0 0 0-2h-8V3Z"></path>
      </svg>
    </>
  )
}

export function settings() {
  let imgRef = store.replaceUrl
  const [img, setImg] = createSignal(store.replaceUrl ?? "");
  const users = store.users;

  const usersList =
    users.map((user, idx) =>
      <>
        <TextBox
          value={user}
          placeholder="User ID here... (Leave empty to remove)"
          onInput={(newUser: string) => users[idx] = newUser}
        />
        <Space />
      </>
    );

  onCleanup(() => {
    store.replaceUrl = imgRef
    store.users = users.filter(user => user !== "");
  })

  return (
    <>
      <div style={{ "display": "flex", "justify-content": "space-evenly", "align-items": "center", "gap": "1em" }}>
        <img src={img()} width="50%" height="50%" style={{ "border-radius": "50%" }} />
        <TextArea
          value={imgRef}
          resize-y={true}
          mono={true}
          placeholder={TEXT_AREA_PLACEHOLDER}
          onInput={(input: string) => imgRef = input}
        />
      </div>
      <div style={{ "width": "fit-content", "margin-left": "auto" }}>
        <Button
          grow={true}
          onClick={() => setImg(imgRef)}
        >
          Preview
        </Button>
      </div>

      <Space />
      <Divider />
      <Space />

      <Index each={users}>
        {(user, idx) =>
          <>
            <TextBox
              value={user()}
              placeholder="User ID here... (Leave empty to remove)"
              onInput={(newUser: string) => users[idx] = newUser}
            />
            <Space />
          </>
        }
      </Index>

      <div style={{ "width": "fit-content", "margin-left": "auto" }}>
        <Button
          grow={true}
          onClick={() => users.push("")}
        >
          Add User ID
        </Button>
      </div>

      <Space />
    </>
  );
}
