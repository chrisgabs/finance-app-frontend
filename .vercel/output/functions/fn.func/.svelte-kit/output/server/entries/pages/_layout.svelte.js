import { c as create_ssr_component, a as subscribe, e as each, b as escape, v as validate_component } from "../../chunks/index3.js";
import "../../chunks/supabaseClient.js";
import { p as page } from "../../chunks/stores.js";
import { w as writable } from "../../chunks/index2.js";
const app = "";
const notifications = writable([
  // { message: "transaction succesful", status: true },
  // { message: "unsuccessful transaction", status: false },
  // { message: "transaction succesful", status: true },
]);
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $notifications, $$unsubscribe_notifications;
  $$unsubscribe_notifications = subscribe(notifications, (value) => $notifications = value);
  $$unsubscribe_notifications();
  return `${$notifications ? `<div class="flex flex-col fixed top-2 inset-x-2/4 gap-2 items-center mt-2 w-auto z-50">${each($notifications, ({ message, status }) => {
    return `<div class="${[
      "rounded-lg w-max shadow-xl p-2 px-3 bg-success",
      (status ? "bg-success" : "") + " " + (status == false ? "bg-error" : "")
    ].join(" ").trim()}">
          ${escape(message)}
        
      </div>`;
  })}</div>` : ``}`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_page();
  return `
${validate_component(Toast, "Toast").$$render($$result, {}, {}, {})}
${slots.default ? slots.default({}) : ``}
`;
});
export {
  Layout as default
};
