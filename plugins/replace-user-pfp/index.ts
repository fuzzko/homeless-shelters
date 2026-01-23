import * as charity from "../../charity";
import type { Settings } from "./types";

const {
  plugin,
  util: { log },
} = shelter;

const store = plugin.store as Settings;

const scope = shelter.util.createScopedApi();

export function reobserveUsers() {
  charity.log("reobserving user avatars");
  scope.disposeAllNow();

  for (const user of store.users) {
    charity.log(`registering user: ${user}`);

    scope.observeDom(
      `img[src^="https://cdn.discordapp.com/avatars/${user}/"]`,
      (elem: HTMLElement) => {
        elem.setAttribute("src", store.replaceUrl);
      },
    );

    scope.observeDom(
      `div[class] > div[style*="https://cdn.discordapp.com/avatars/${user}/"]`,
      (elem: HTMLElement) => {
        elem.style = `
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
