import './styles.scss';

document.addEventListener("DOMContentLoaded", () => {
    const adsContainers = document.querySelectorAll('.rb-ads');
    const toggleButton = document.getElementById('ads-toggle-button');

    // Check if ads are hidden in LocalStorage
    const adsHidden = localStorage.getItem('ads-hidden') === 'true';

    // Function to hide/show ads based on preference
    const updateAdsVisibility = (hide: boolean) => {
        adsContainers.forEach(container => {
            container.style.display = hide ? 'none' : 'block';
        });
    };

    // Set initial button text based on stored preference
    if (toggleButton) {
        toggleButton.textContent = adsHidden ? 'Show Ads' : 'Hide Ads';
    }

    // Initial ads visibility
    updateAdsVisibility(adsHidden);

    // Toggle ads on button click
    toggleButton?.addEventListener('click', () => {
        const currentHiddenState = localStorage.getItem('ads-hidden') === 'true';
        const newHiddenState = !currentHiddenState;

        // Save new state in LocalStorage
        localStorage.setItem('ads-hidden', String(newHiddenState));

        // Update visibility
        updateAdsVisibility(newHiddenState);

        // Update button text
        toggleButton.textContent = newHiddenState ? 'Show Ads' : 'Hide Ads';
    });

    // Continue with the normal rotation logic if ads are not hidden
    if (!adsHidden) {
        adsContainers.forEach(adsContainer => {
            const ads = adsContainer.querySelectorAll<HTMLElement>('.rb-random-ads');
            const weightedAds: HTMLElement[] = [];
            let totalWeight = 0;

            const autoRotate = adsContainer.getAttribute('data-auto-rotate') === 'true';
            const interval = parseInt(adsContainer.getAttribute('data-interval') || '0', 10) * 1000;

            ads.forEach(ad => {
                const startDate = ad.getAttribute('data-start-date') ? new Date(ad.getAttribute('data-start-date')!) : null;
                const endDate = ad.getAttribute('data-end-date') ? new Date(ad.getAttribute('data-end-date')!) : null;

                if ((startDate && new Date() < startDate) || (endDate && new Date() > endDate)) {
                    return;
                }

                const frequency = parseInt(ad.getAttribute('data-frequency')!) || 1;
                totalWeight += frequency;
                for (let i = 0; i < frequency; i++) {
                    weightedAds.push(ad);
                }
            });

            if (weightedAds.length === 0) {
                return;
            }

            const selectRandomAd = () => {
                const randomIndex = Math.floor(Math.random() * totalWeight);
                const selectedAd = weightedAds[randomIndex];

                ads.forEach(ad => {
                    ad.style.display = 'none';
                });

                selectedAd.style.display = 'block';
            };

            selectRandomAd();

            if (autoRotate && interval > 0) {
                setInterval(selectRandomAd, interval);
            }
        });
    }
});
