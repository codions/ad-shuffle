var styles = "";
document.addEventListener("DOMContentLoaded", () => {
  const adsContainers = document.querySelectorAll(".codions-ads");
  const currentDateTime = new Date();
  adsContainers.forEach((adsContainer) => {
    const ads = adsContainer.querySelectorAll(".codions-random-ads");
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
