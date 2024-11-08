const style = document.createElement('style'); style.textContent = `.ads-styled{background-image:url(https://ad-shuffle.codions.dev/images/vectorline.jpg);background-position:center center;background-repeat:repeat;background-size:13%;height:auto!important;width:100%;text-align:center;font-family:sans-serif;margin-top:1.25rem;border:1px solid #f3f4f6;padding:.5rem;border-radius:.75rem;display:none}.rb-random-ads .ads-info{font-size:.875rem;color:#4b5563;margin-bottom:.5rem}
`; document.head.appendChild(style);
var A = Object.defineProperty;
var y = (c, t, e) => t in c ? A(c, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : c[t] = e;
var g = (c, t, e) => y(c, typeof t != "symbol" ? t + "" : t, e);
class h {
  constructor() {
    g(this, "adsContainers");
    g(this, "toggleButton");
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
    this.adsContainers.forEach((e) => {
      e.style.display = t ? "none" : "block";
    });
  }
  toggleAds() {
    const t = !this.areAdsHidden();
    localStorage.setItem("ads-hidden", String(t)), this.updateAdsVisibility(t), this.toggleButton && (this.toggleButton.textContent = t ? "Show Ads" : "Hide Ads");
  }
  initializeRotationLogic() {
    this.adsContainers.forEach((t) => {
      const e = t.querySelectorAll(".rb-random-ads"), i = t.getAttribute("data-auto-rotate") === "true", n = 1e3 * parseInt(t.getAttribute("data-interval") || "0", 10);
      t.getAttribute("data-sequential") === "true" ? this.rotateSequentially(e, n, i) : this.rotateRandomly(e, n, i);
    });
  }
  rotateSequentially(t, e, i) {
    let n = 0;
    const d = t.length, s = () => {
      t.forEach((a) => a.style.display = "none"), t[n].style.display = "block", n = (n + 1) % d;
    };
    s(), i && e > 0 && setInterval(s, e);
  }
  rotateRandomly(t, e, i) {
    const n = [];
    let d = 0;
    if (t.forEach((a) => {
      const r = a.getAttribute("data-start-date") ? new Date(a.getAttribute("data-start-date")) : null, o = a.getAttribute("data-end-date") ? new Date(a.getAttribute("data-end-date")) : null;
      if (r && /* @__PURE__ */ new Date() < r || o && /* @__PURE__ */ new Date() > o) return;
      const l = parseInt(a.getAttribute("data-frequency")) || 1;
      d += l;
      for (let u = 0; u < l; u++) n.push(a);
    }), n.length === 0) return;
    const s = () => {
      const a = Math.floor(Math.random() * d), r = n[a];
      t.forEach((o) => o.style.display = "none"), r.style.display = "block";
    };
    s(), i && e > 0 && setInterval(s, e);
  }
  static async loadAdZone(t, e) {
    const i = document.getElementById(t);
    if (i) try {
      const n = await fetch(e);
      if (!n.ok) throw new Error(`Failed to load ad for zone ${t}: ${n.statusText}`);
      (function(d, s, a = !0) {
        a && (d.innerHTML = "");
        const r = document.createElement("div");
        r.innerHTML = s, Array.from(r.children).forEach((o) => {
          const l = document.createElement(o.nodeName);
          Array.from(o.attributes).forEach((u) => {
            l.setAttribute(u.nodeName, u.nodeValue);
          }), o.nodeName === "SCRIPT" && o.text ? l.text = o.text : o.innerHTML && (l.innerHTML = o.innerHTML), d.appendChild(l);
        });
      })(i, await n.text(), !0);
    } catch (n) {
      console.error(`Error loading ad content for zone ${t}:`, n);
    }
    else console.warn(`Ad container with ID ${t} not found`);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  new h();
}), window.AdManager = h;
