import { Settings } from "./types";

const {
  plugin,
} = shelter;

const { scoped } = plugin;

const store = plugin.store as Settings;

export function onLoad(): void {
  store.replaceUrl ??= `https://cdn.discordapp.com/embed/avatars/${1337 % 5}.png`;
  store.users ??= [];
  
  for (const user of store.users) {
    scoped.observeDom(
      `div[role=img] img[src^="https://cdn.discordapp.com/avatars/${user}/"]`,
      (elem) => {
        if (store.replaceUrl) {
          elem.setAttribute("src", store.replaceUrl);
        } else {
          elem.remove();
        }
      },
    );

    scoped.observeDom(
      `div[class*=avatarSmall style*="https://cdn.discordapp.com/avatars/${user}/"]`,
      (elem) => {
        elem.style = !store.replaceUrl ? "" : `
          background-image: url("${store.replaceUrl}");
          background-size: cover;
        `;
      },
    );
  }
}

export * from "./settings";
