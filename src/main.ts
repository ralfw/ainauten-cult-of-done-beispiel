import { WebUI } from "jsr:@webui/deno-webui";
import { bindAll } from "./backendbindings.ts";

let html = await Deno.readTextFile(`${import.meta.dirname}/index.html`);
const backendProxyJs = await Deno.readTextFile(
  `${import.meta.dirname}/backendproxy.js`,
);
html = html.replace(
  `<script src="backendproxy.js"></script>`,
  `<script>\n${backendProxyJs}\n</script>`,
);

const win = new WebUI();
bindAll(win);

await win.showBrowser(html, WebUI.Browser.AnyBrowser);
await WebUI.wait();
