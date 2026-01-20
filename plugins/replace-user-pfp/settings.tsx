import { Settings } from "./types";

const {
  plugin,
  solid,
  ui: {
    injectCss,
    
    Text,
    TextArea,
  },
} = shelter;

export const store = plugin.store as Settings;

const TEXT_AREA_PLACEHOLDER = `https://... (or) data:image/...;base64,...`;

export function settings() {
  const [img, setImg] = solid.createSignal("");

  injectCss(`
    .in-same-line {
      display: flex;
    }

    .in-same-line > * {
      flex-grow: 1;
    }
  `);
  
  return (
    <>
      <div class="in-same-line">
        <img src={img()} />
        <TextArea value={img()} onInput={setImg} resize-y={true} mono={true} placeholder={TEXT_AREA_PLACEHOLDER} />
      </div>
    </>
  );
}
