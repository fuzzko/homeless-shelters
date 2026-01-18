/// <reference path="../../node_modules/@uwu/shelter-defs/dist/shelter-defs/rootdefs.d.ts" />

import { Settings } from "./types";

const {
  observeDom
} = shelter;

let settings: Settings = {
  replaceUrl: null,
  users: [],
};
let unobserves = [];

export function onLoad(): void {
  for (const user of settings.users) {
    const unobserveNormalAvatar = observeDom(`div[role=img] img[src^="https://cdn.discordapp.com/avatars/${user}"]`, elem => {
      if (settings.replaceUrl != null) {
        elem.setAttribute("src", settings.replaceUrl);
      } else {
        elem.remove();
      }
    });
    const unobserveVcAvatar = observeDom(`div[class*=avatarSmall style*="/${user}/"]`, elem => {
      elem.style = `
        width: 24px;
        height: 24px;
      `;
    });
    
    unobserves.push(unobserveNormalAvatar.now);
    unobserves.push(unobserveVcAvatar.now);
  }
}
