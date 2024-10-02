import './styles.scss';

document.addEventListener("DOMContentLoaded", () => {
    const adsContainers = document.querySelectorAll('.rb-ads');
    const currentDateTime = new Date();

    adsContainers.forEach(adsContainer => {
        const ads = adsContainer.querySelectorAll<HTMLElement>('.rb-random-ads');
        const weightedAds: HTMLElement[] = [];
        let totalWeight = 0;

        // Define auto-rotation behavior and interval
        const autoRotate = adsContainer.getAttribute('data-auto-rotate') === 'true';
        const interval = parseInt(adsContainer.getAttribute('data-interval') || '0', 10) * 1000; // Convert to milliseconds

        // Filter valid ads based on dates and frequency
        ads.forEach(ad => {
            const startDate = ad.getAttribute('data-start-date') ? new Date(ad.getAttribute('data-start-date')!) : null;
            const endDate = ad.getAttribute('data-end-date') ? new Date(ad.getAttribute('data-end-date')!) : null;

            if ((startDate && currentDateTime < startDate) || (endDate && currentDateTime > endDate)) {
                return; // Skip this ad if it's outside the valid date range
            }

            const frequency = parseInt(ad.getAttribute('data-frequency')!) || 1;
            totalWeight += frequency;
            for (let i = 0; i < frequency; i++) {
                weightedAds.push(ad);
            }
        });

        if (weightedAds.length === 0) {
            return; // No ads to display
        }

        const selectRandomAd = () => {
            const randomIndex = Math.floor(Math.random() * totalWeight);
            const selectedAd = weightedAds[randomIndex];

            // Hide all ads and display the selected one
            ads.forEach(ad => {
                ad.style.display = 'none';
            });

            selectedAd.style.display = 'block';
        };

        // Display the initial ad
        selectRandomAd();

        // If auto-rotation is enabled, set up the interval
        if (autoRotate && interval > 0) {
            setInterval(selectRandomAd, interval);
        }
    });
});
