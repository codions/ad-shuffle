const style = document.createElement('style'); style.textContent = `.ads-styled{background-image:url(https://ad-shuffle.codions.dev/images/vectorline.jpg);background-position:center center;background-repeat:repeat;background-size:13%;height:auto!important;width:100%;text-align:center;font-family:sans-serif;margin-top:1.25rem;border:1px solid #f3f4f6;padding:.5rem;border-radius:.75rem;display:none}.rb-random-ads .ads-info{font-size:.875rem;color:#4b5563;margin-bottom:.5rem}
`; document.head.appendChild(style);
var A = Object.defineProperty;
var y = (i, t, e) => t in i ? A(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var c = (i, t, e) => y(i, typeof t != "symbol" ? t + "" : t, e);
class h {
  constructor() {
    c(this, "adsContainers");
    c(this, "toggleButton");
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
      const e = t.querySelectorAll(".rb-random-ads"), o = t.getAttribute("data-auto-rotate") === "true", n = 1e3 * parseInt(t.getAttribute("data-interval") || "0", 10);
      t.getAttribute("data-sequential") === "true" ? this.rotateSequentially(e, n, o) : this.rotateRandomly(e, n, o);
    });
  }
  rotateSequentially(t, e, o) {
    let n = 0;
    const s = t.length, d = () => {
      t.forEach((a) => a.style.display = "none"), t[n].style.display = "block", n = (n + 1) % s;
    };
    d(), o && e > 0 && setInterval(d, e);
  }
  rotateRandomly(t, e, o) {
    const n = [];
    let s = 0;
    if (t.forEach((a) => {
      const r = a.getAttribute("data-start-date") ? new Date(a.getAttribute("data-start-date")) : null, l = a.getAttribute("data-end-date") ? new Date(a.getAttribute("data-end-date")) : null;
      if (r && /* @__PURE__ */ new Date() < r || l && /* @__PURE__ */ new Date() > l) return;
      const u = parseInt(a.getAttribute("data-frequency")) || 1;
      s += u;
      for (let g = 0; g < u; g++) n.push(a);
    }), n.length === 0) return;
    const d = () => {
      const a = Math.floor(Math.random() * s), r = n[a];
      t.forEach((l) => l.style.display = "none"), r.style.display = "block";
    };
    d(), o && e > 0 && setInterval(d, e);
  }
  static async loadAdZone(t, e) {
    const o = document.getElementById(t);
    if (o) try {
      const n = await fetch(e), s = await n.text();
      o.innerHTML = s;
    } catch (n) {
      console.error(`Error loading ad content for zone ${t}:`, n);
    }
    else console.warn(`Ad container with ID ${t} not found`);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  new h();
}), window.AdManager = h;
