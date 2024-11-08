import './styles.scss';

// Definição da classe principal com métodos auxiliares
class AdManager {
    private adsContainers: NodeListOf<HTMLElement>;
    private toggleButton: HTMLElement | null;

    constructor() {
        this.adsContainers = document.querySelectorAll('.rb-ads');
        this.toggleButton = document.getElementById('ads-toggle-button');

        // Inicializa a visibilidade dos anúncios e a lógica de rotação
        this.initializeAds();
    }

    private initializeAds(): void {
        const adsHidden = this.areAdsHidden();
        this.updateAdsVisibility(adsHidden);

        if (this.toggleButton) {
            this.toggleButton.textContent = adsHidden ? 'Show Ads' : 'Hide Ads';
            this.toggleButton.addEventListener('click', () => this.toggleAds());
        }

        if (!adsHidden) {
            this.initializeRotationLogic();
        }
    }

    private areAdsHidden(): boolean {
        return localStorage.getItem('ads-hidden') === 'true';
    }

    private updateAdsVisibility(hide: boolean): void {
        this.adsContainers.forEach(container => {
            container.style.display = hide ? 'none' : 'block';
        });
    }

    public toggleAds(): void {
        const currentHiddenState = this.areAdsHidden();
        const newHiddenState = !currentHiddenState;
        localStorage.setItem('ads-hidden', String(newHiddenState));
        this.updateAdsVisibility(newHiddenState);

        if (this.toggleButton) {
            this.toggleButton.textContent = newHiddenState ? 'Show Ads' : 'Hide Ads';
        }
    }

    private initializeRotationLogic(): void {
        this.adsContainers.forEach(adsContainer => {
            const ads = adsContainer.querySelectorAll<HTMLElement>('.rb-random-ads');
            const autoRotate = adsContainer.getAttribute('data-auto-rotate') === 'true';
            const interval = parseInt(adsContainer.getAttribute('data-interval') || '0', 10) * 1000;
            const isSequential = adsContainer.getAttribute('data-sequential') === 'true';

            if (isSequential) {
                this.rotateSequentially(ads, interval, autoRotate);
            } else {
                this.rotateRandomly(ads, interval, autoRotate);
            }
        });
    }

    private rotateSequentially(ads: NodeListOf<HTMLElement>, interval: number, autoRotate: boolean): void {
        let currentIndex = 0;
        const totalAds = ads.length;

        const rotate = () => {
            ads.forEach(ad => ad.style.display = 'none');
            ads[currentIndex].style.display = 'block';
            currentIndex = (currentIndex + 1) % totalAds;
        };

        rotate();

        if (autoRotate && interval > 0) {
            setInterval(rotate, interval);
        }
    }

    private rotateRandomly(ads: NodeListOf<HTMLElement>, interval: number, autoRotate: boolean): void {
        const weightedAds: HTMLElement[] = [];
        let totalWeight = 0;

        ads.forEach(ad => {
            const startDate = ad.getAttribute('data-start-date') ? new Date(ad.getAttribute('data-start-date')!) : null;
            const endDate = ad.getAttribute('data-end-date') ? new Date(ad.getAttribute('data-end-date')!) : null;

            if ((startDate && new Date() < startDate) || (endDate && new Date() > endDate)) {
                return; // Ignora anúncios fora da data válida
            }

            const frequency = parseInt(ad.getAttribute('data-frequency')!) || 1;
            totalWeight += frequency;
            for (let i = 0; i < frequency; i++) {
                weightedAds.push(ad);
            }
        });

        if (weightedAds.length === 0) return;

        const selectRandomAd = () => {
            const randomIndex = Math.floor(Math.random() * totalWeight);
            const selectedAd = weightedAds[randomIndex];

            ads.forEach(ad => ad.style.display = 'none');
            selectedAd.style.display = 'block';
        };

        selectRandomAd();

        if (autoRotate && interval > 0) {
            setInterval(selectRandomAd, interval);
        }
    }

    // Novo método auxiliar para carregar anúncios de um endpoint
    public static async loadAdZone(zoneId: string, endpoint: string): Promise<void> {
        const adContainer = document.getElementById(zoneId);
        if (!adContainer) {
            console.warn(`Ad container with ID ${zoneId} not found`);
            return;
        }

        try {
            const response = await fetch(endpoint);
            const adContent = await response.text();
            adContainer.innerHTML = adContent;
        } catch (error) {
            console.error(`Error loading ad content for zone ${zoneId}:`, error);
        }
    }
}

// Inicializa automaticamente o script para manter o funcionamento atual
document.addEventListener("DOMContentLoaded", () => {
    new AdManager();
});

// Adiciona o `AdManager` ao escopo global para métodos auxiliares
window.AdManager = AdManager;
