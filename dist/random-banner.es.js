const style = document.createElement('style'); style.textContent = `.rb-random-ads{background-image:url(images/vectorline.jpg);background-position:center center;background-repeat:repeat;background-size:13%;height:auto!important;width:100%;text-align:center;font-family:sans-serif;margin-top:1.25rem;border:1px solid #f3f4f6;padding:.5rem;border-radius:.75rem;display:none}.rb-random-ads .ads-info{font-size:.875rem;color:#4b5563;margin-bottom:.5rem}
`; document.head.appendChild(style);
var styles = "";
document.addEventListener("DOMContentLoaded", () => {
  const adsContainers = document.querySelectorAll(".rb-ads");
  const currentDateTime = new Date();
  adsContainers.forEach((adsContainer) => {
    const ads = adsContainer.querySelectorAll(".rb-random-ads");
    const weightedAds = [];
    let totalWeight = 0;
    ads.forEach((ad) => {
      const startDate = ad.getAttribute("data-start-date") ? new Date(ad.getAttribute("data-start-date")) : null;
      const endDate = ad.getAttribute("data-end-date") ? new Date(ad.getAttribute("data-end-date")) : null;
      if (startDate && currentDateTime < startDate || endDate && currentDateTime > endDate) {
        return;
      }
      const frequency = parseInt(ad.getAttribute("data-frequency")) || 1;
      totalWeight += frequency;
      for (let i = 0; i < frequency; i++) {
        weightedAds.push(ad);
      }
    });
    if (weightedAds.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * totalWeight);
    const selectedAd = weightedAds[randomIndex];
    ads.forEach((ad) => {
      ad.style.display = "none";
    });
    selectedAd.style.display = "block";
  });
});
