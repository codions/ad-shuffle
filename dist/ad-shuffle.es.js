const style = document.createElement('style'); style.textContent = `.ads-styled{background-image:url(https://ad-shuffle.codions.dev/images/vectorline.jpg);background-position:center center;background-repeat:repeat;background-size:13%;height:auto!important;width:100%;text-align:center;font-family:sans-serif;margin-top:1.25rem;border:1px solid #f3f4f6;padding:.5rem;border-radius:.75rem;display:none}.rb-random-ads .ads-info{font-size:.875rem;color:#4b5563;margin-bottom:.5rem}
`; document.head.appendChild(style);
document.addEventListener("DOMContentLoaded", () => {
  const s = document.querySelectorAll(".rb-ads"), a = document.getElementById("ads-toggle-button"), r = localStorage.getItem("ads-hidden") === "true", c = (t) => {
    s.forEach((n) => {
      n.style.display = t ? "none" : "block";
    });
  };
  a && (a.textContent = r ? "Show Ads" : "Hide Ads"), c(r), a == null || a.addEventListener("click", () => {
    const t = localStorage.getItem("ads-hidden") !== "true";
    localStorage.setItem("ads-hidden", String(t)), c(t), a.textContent = t ? "Show Ads" : "Hide Ads";
  }), r || s.forEach((t) => {
    const n = t.querySelectorAll(".rb-random-ads"), l = [];
    let u = 0;
    const b = t.getAttribute("data-auto-rotate") === "true", i = 1e3 * parseInt(t.getAttribute("data-interval") || "0", 10);
    if (n.forEach((e) => {
      const d = e.getAttribute("data-start-date") ? new Date(e.getAttribute("data-start-date")) : null, o = e.getAttribute("data-end-date") ? new Date(e.getAttribute("data-end-date")) : null;
      if (d && /* @__PURE__ */ new Date() < d || o && /* @__PURE__ */ new Date() > o) return;
      const h = parseInt(e.getAttribute("data-frequency")) || 1;
      u += h;
      for (let A = 0; A < h; A++) l.push(e);
    }), l.length === 0) return;
    const g = () => {
      const e = Math.floor(Math.random() * u), d = l[e];
      n.forEach((o) => {
        o.style.display = "none";
      }), d.style.display = "block";
    };
    g(), b && i > 0 && setInterval(g, i);
  });
});
