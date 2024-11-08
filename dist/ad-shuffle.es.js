const style = document.createElement('style'); style.textContent = `.ads-styled{background-image:url(https://ad-shuffle.codions.dev/images/vectorline.jpg);background-position:center center;background-repeat:repeat;background-size:13%;height:auto!important;width:100%;text-align:center;font-family:sans-serif;margin-top:1.25rem;border:1px solid #f3f4f6;padding:.5rem;border-radius:.75rem;display:none}.rb-random-ads .ads-info{font-size:.875rem;color:#4b5563;margin-bottom:.5rem}
`; document.head.appendChild(style);
var A = Object.defineProperty;
var y = (c, t, n) => t in c ? A(c, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : c[t] = n;
var h = (c, t, n) => y(c, typeof t != "symbol" ? t + "" : t, n);
class g {
  constructor() {
    h(this, "adsContainers");
    h(this, "toggleButton");
    this.adsContainers = document.querySelectorAll(".rb-ads"), this.toggleButton = document.getElementById("ads-toggle-button"), this.initializeAds();
  }
  initializeAds() {
    const t = this.areAdsHidden();
    this.updateAdsVisibility(t), this.toggleButton && (this.toggleButton.textContent = t ? "Show Ads" : "Hide Ads", this.toggleButton.addEventListener("click", () => this.toggleAds())), t || this.initializeRotationLogic();
  }
  areAdsHidden() {
    return localStorage.getItem("ads-hidden") === "true";
  }
  updateAdsVisibility(t) {
    this.adsContainers.forEach((n) => {
      n.style.display = t ? "none" : "block";
    });
  }
  toggleAds() {
    const t = !this.areAdsHidden();
    localStorage.setItem("ads-hidden", String(t)), this.updateAdsVisibility(t), this.toggleButton && (this.toggleButton.textContent = t ? "Show Ads" : "Hide Ads");
  }
  initializeRotationLogic() {
    this.adsContainers.forEach((t) => {
      const n = t.querySelectorAll(".rb-random-ads"), o = t.getAttribute("data-auto-rotate") === "true", e = 1e3 * parseInt(t.getAttribute("data-interval") || "0", 10);
      t.getAttribute("data-sequential") === "true" ? this.rotateSequentially(n, e, o) : this.rotateRandomly(n, e, o);
    });
  }
  rotateSequentially(t, n, o) {
    let e = 0;
    const r = t.length, s = () => {
      t.forEach((a) => a.style.display = "none"), t[e].style.display = "block", e = (e + 1) % r;
    };
    s(), o && n > 0 && setInterval(s, n);
  }
  rotateRandomly(t, n, o) {
    const e = [];
    let r = 0;
    if (t.forEach((a) => {
      const d = a.getAttribute("data-start-date") ? new Date(a.getAttribute("data-start-date")) : null, i = a.getAttribute("data-end-date") ? new Date(a.getAttribute("data-end-date")) : null;
      if (d && /* @__PURE__ */ new Date() < d || i && /* @__PURE__ */ new Date() > i) return;
      const l = parseInt(a.getAttribute("data-frequency")) || 1;
      r += l;
      for (let u = 0; u < l; u++) e.push(a);
    }), e.length === 0) return;
    const s = () => {
      const a = Math.floor(Math.random() * r), d = e[a];
      t.forEach((i) => i.style.display = "none"), d.style.display = "block";
    };
    s(), o && n > 0 && setInterval(s, n);
  }
  static selectEditorByFrequency(t) {
    const n = t.reduce((e, [r, s]) => e + s, 0);
    let o = Math.random() * n;
    for (const [e, r] of t) {
      if (o < r) return e;
      o -= r;
    }
    return t[0][0];
  }
  static async loadAdZone(t, n) {
    const o = document.getElementById(t);
    if (o) try {
      const e = await fetch(n);
      if (!e.ok) throw new Error(`Failed to load ad for zone ${t}: ${e.statusText}`);
      (function(r, s, a = !0) {
        a && (r.innerHTML = "");
        const d = document.createElement("div");
        d.innerHTML = s, Array.from(d.children).forEach((i) => {
          const l = document.createElement(i.nodeName);
          Array.from(i.attributes).forEach((u) => {
            l.setAttribute(u.nodeName, u.nodeValue);
          }), i.nodeName === "SCRIPT" && i.text ? l.text = i.text : i.innerHTML && (l.innerHTML = i.innerHTML), r.appendChild(l);
        });
      })(o, await e.text(), !0);
    } catch (e) {
      console.error(`Error loading ad content for zone ${t}:`, e);
    }
    else console.warn(`Ad container with ID ${t} not found`);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  new g();
}), window.AdManager = g;
