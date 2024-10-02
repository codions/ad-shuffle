const style = document.createElement('style'); style.textContent = `.ads-styled{background-image:url(https://ad-shuffle.codions.dev/images/vectorline.jpg);background-position:center center;background-repeat:repeat;background-size:13%;height:auto!important;width:100%;text-align:center;font-family:sans-serif;margin-top:1.25rem;border:1px solid #f3f4f6;padding:.5rem;border-radius:.75rem;display:none}.rb-random-ads .ads-info{font-size:.875rem;color:#4b5563;margin-bottom:.5rem}
`; document.head.appendChild(style);
document.addEventListener("DOMContentLoaded", () => {
  const u = document.querySelectorAll(".rb-ads"), d = document.getElementById("ads-toggle-button"), i = localStorage.getItem("ads-hidden") === "true", g = (t) => {
    u.forEach((a) => {
      a.style.display = t ? "none" : "block";
    });
  };
  d && (d.textContent = i ? "Show Ads" : "Hide Ads"), g(i), d == null || d.addEventListener("click", () => {
    const t = localStorage.getItem("ads-hidden") !== "true";
    localStorage.setItem("ads-hidden", String(t)), g(t), d.textContent = t ? "Show Ads" : "Hide Ads";
  }), i || u.forEach((t) => {
    const a = t.querySelectorAll(".rb-random-ads"), h = t.getAttribute("data-auto-rotate") === "true", r = 1e3 * parseInt(t.getAttribute("data-interval") || "0", 10);
    if (t.getAttribute("data-sequential") === "true") {
      let n = 0;
      const l = a.length, o = () => {
        a.forEach((e) => {
          e.style.display = "none";
        }), a[n].style.display = "block", n = (n + 1) % l;
      };
      o(), h && r > 0 && setInterval(o, r);
    } else {
      const n = [];
      let l = 0;
      if (a.forEach((e) => {
        const s = e.getAttribute("data-start-date") ? new Date(e.getAttribute("data-start-date")) : null, c = e.getAttribute("data-end-date") ? new Date(e.getAttribute("data-end-date")) : null;
        if (s && /* @__PURE__ */ new Date() < s || c && /* @__PURE__ */ new Date() > c) return;
        const b = parseInt(e.getAttribute("data-frequency")) || 1;
        l += b;
        for (let y = 0; y < b; y++) n.push(e);
      }), n.length === 0) return;
      const o = () => {
        const e = Math.floor(Math.random() * l), s = n[e];
        a.forEach((c) => {
          c.style.display = "none";
        }), s.style.display = "block";
      };
      o(), h && r > 0 && setInterval(o, r);
    }
  });
});
