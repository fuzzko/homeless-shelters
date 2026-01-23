(function(exports) {

//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion

//#region solid-js/web
var require_web = __commonJS({ "solid-js/web"(exports, module) {
	module.exports = shelter.solidWeb;
} });

//#endregion
//#region charity/index.ts
function setIndex(array, idx, value) {
	return array.map((thisValue, thisIdx) => thisIdx === idx ? value : thisValue);
}

//#endregion
//#region plugins/replace-user-pfp/settings.tsx
var import_web = __toESM(require_web(), 1);
var import_web$1 = __toESM(require_web(), 1);
var import_web$2 = __toESM(require_web(), 1);
var import_web$3 = __toESM(require_web(), 1);
var import_web$4 = __toESM(require_web(), 1);
var import_web$5 = __toESM(require_web(), 1);
var import_web$6 = __toESM(require_web(), 1);
const _tmpl$ = /*#__PURE__*/ (0, import_web.template)(`<div><img aria-label="avatar" width="50%" height="50%"><!#><!/></div>`, 5), _tmpl$2 = /*#__PURE__*/ (0, import_web.template)(`<div></div>`, 2);
const { plugin: plugin$1, solid: { createSignal, onCleanup, Index }, ui: { Text, TextTags, TextBox, TextArea, Button, Divider, Space } } = shelter;
const store$1 = plugin$1.store;
const TEXT_AREA_PLACEHOLDER = `https://... [or] data:image/...;base64,...`;
function settings() {
	const [img, setImg] = createSignal(store$1.replaceUrl);
	const [users, setUsers] = createSignal(store$1.users);
	onCleanup(() => {
		store$1.replaceUrl = img();
		store$1.users = users().filter((v) => /^[0-9]+$/.test(v));
		reobserveUsers();
	});
	return [
		(() => {
			const _el$ = (0, import_web$3.getNextElement)(_tmpl$), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, [_el$4, _co$] = (0, import_web$4.getNextMarker)(_el$3.nextSibling);
			_el$.style.setProperty("display", "flex");
			_el$.style.setProperty("justify-content", "space-evenly");
			_el$.style.setProperty("align-items", "center");
			_el$.style.setProperty("gap", "1em");
			_el$2.style.setProperty("border-radius", "50%");
			(0, import_web$5.insert)(_el$, (0, import_web$6.createComponent)(TextArea, {
				get value() {
					return img();
				},
				"resize-y": true,
				mono: true,
				placeholder: TEXT_AREA_PLACEHOLDER,
				onInput: setImg
			}), _el$4, _co$);
			(0, import_web$2.effect)(() => (0, import_web$1.setAttribute)(_el$2, "src", img()));
			return _el$;
		})(),
		(0, import_web$6.createComponent)(Space, {}),
		(0, import_web$6.createComponent)(Divider, {}),
		(0, import_web$6.createComponent)(Space, {}),
		(0, import_web$6.createComponent)(Index, {
			get each() {
				return users();
			},
			get fallback() {
				return [(() => {
					const _el$6 = (0, import_web$3.getNextElement)(_tmpl$2);
					_el$6.style.setProperty("width", "fit-content");
					_el$6.style.setProperty("margin-inline", "auto");
					(0, import_web$5.insert)(_el$6, (0, import_web$6.createComponent)(Text, {
						get tag() {
							return TextTags.textXS;
						},
						style: { color: "var(--text-subtle)" },
						children: "\"Add User ID\" to add user into list..."
					}));
					return _el$6;
				})(), (0, import_web$6.createComponent)(Space, {})];
			},
			children: (user, idx) => [(0, import_web$6.createComponent)(TextBox, {
				get value() {
					return user();
				},
				placeholder: "User ID here... (Leave empty to remove)",
				onInput: (newUser) => setUsers((prev) => setIndex(prev, idx, newUser))
			}), (0, import_web$6.createComponent)(Space, {})]
		}),
		(() => {
			const _el$5 = (0, import_web$3.getNextElement)(_tmpl$2);
			_el$5.style.setProperty("width", "fit-content");
			_el$5.style.setProperty("margin-left", "auto");
			(0, import_web$5.insert)(_el$5, (0, import_web$6.createComponent)(Button, {
				grow: true,
				onClick: () => setUsers((prev) => [...prev, ""]),
				children: "Add User ID"
			}));
			return _el$5;
		})(),
		(0, import_web$6.createComponent)(Space, {})
	];
}

//#endregion
//#region plugins/replace-user-pfp/index.ts
const { plugin } = shelter;
const store = plugin.store;
const scope = shelter.util.createScopedApi();
function reobserveUsers() {
	scope.disposeAllNow();
	for (const user of store.users) {
		scope.observeDom(`img[src^="https://cdn.discordapp.com/avatars/${user}/"]`, (elem) => {
			if (store.replaceUrl) elem.setAttribute("src", store.replaceUrl);
else elem.remove();
		});
		scope.observeDom(`div[class] > div[style*="https://cdn.discordapp.com/avatars/${user}/"]`, (elem) => {
			elem.style = !store.replaceUrl ? "" : `
          background-image: url("${store.replaceUrl}");
          background-size: cover;
        `;
		});
	}
}
function onLoad() {
	store.replaceUrl ??= `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png`;
	store.users ??= [];
	reobserveUsers();
}
function onUnload() {
	scope.disposeAllNow();
}

//#endregion
exports.onLoad = onLoad
exports.onUnload = onUnload
exports.reobserveUsers = reobserveUsers
exports.settings = settings
return exports;
})({});