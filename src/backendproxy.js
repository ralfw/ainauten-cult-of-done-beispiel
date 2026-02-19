class BackendProxy {
  _readyPromise = null;

  async waitReady(options = {}) {
    const timeoutMs = options.timeoutMs ?? 8000;
    const pollMs = options.pollMs ?? 80;

    if (this._readyPromise) return this._readyPromise;

    this._readyPromise = (async () => {
      const start = Date.now();
      while (true) {
        const w = globalThis.webui;
        if (w && typeof w.call === "function") {
          try {
            await w.call("ping");
            return true;
          } catch {
            // not connected yet
          }
        }
        if (Date.now() - start > timeoutMs) {
          throw new Error("WebUI nicht verbunden (Timeout).");
        }
        await new Promise((r) => setTimeout(r, pollMs));
      }
    })();

    return this._readyPromise;
  }

  async _call(method, payload) {
    await this.waitReady();
    const w = globalThis.webui;
    if (!w || typeof w.call !== "function") {
      throw new Error("WebUI nicht bereit (webui.call fehlt).");
    }
    if (payload === undefined) return await w.call(method);
    return await w.call(method, payload);
  }

  async getBoard() {
    const json = await this._call("getBoard");
    return JSON.parse(json);
  }
}
