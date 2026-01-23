import type { Settings } from "./types";

const { plugin } = shelter;

const store = plugin.store as Settings;

const scope = shelter.util.createScopedApi();

export function reobserveUsers() {
  scope.disposeAllNow();

  for (const user of store.users) {
    scope.observeDom(
      `img[src^="https://cdn.discordapp.com/avatars/${user}/"]`,
      (elem: HTMLElement) => {
        if (store.replaceUrl) {
          elem.setAttribute("src", store.replaceUrl);
        } else {
          elem.remove();
        }
      },
    );

    scope.observeDom(
      `div[class] > div[style*="https://cdn.discordapp.com/avatars/${user}/"]`,
      (elem: HTMLElement) => {
        elem.style = !store.replaceUrl
          ? ""
          : `
          background-image: url("${store.replaceUrl}");
          background-size: cover;
        `;
      },
    );
  }
}

export function onLoad(): void {
  store.replaceUrl ??= `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png`;
  store.users ??= [];

  reobserveUsers();
}

export function onUnload(): void {
  scope.disposeAllNow();
}

export * from "./settings";
