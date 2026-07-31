import { DwGame } from '@/app/dw/DwGame';

export const attachCampaignSelector = (game: DwGame, container: HTMLElement): void => {
    const selector = document.createElement('select');
    selector.id = 'campaign-selector';
    selector.setAttribute('aria-label', 'Select campaign');

    const campaigns = game.getCampaigns();
    campaigns.forEach((campaign) => {
        const option = document.createElement('option');
        option.value = campaign.id;
        option.textContent = campaign.title;
        selector.appendChild(option);
    });

    const label = document.createElement('label');
    label.setAttribute('for', selector.id);
    label.textContent = 'Campaign: ';

    const wrapper = document.createElement('div');
    wrapper.className = 'campaign-selector';
    wrapper.appendChild(label);
    wrapper.appendChild(selector);

    const status = document.createElement('div');
    status.className = 'campaign-status';
    status.textContent = `Active: ${game.getActiveCampaignId() ?? 'none'}`;

    selector.addEventListener('change', () => {
        const ok = game.setActiveCampaign(selector.value);
        if (ok) {
            status.textContent = `Active: ${selector.value}`;
        }
    });

    container.appendChild(wrapper);
    container.appendChild(status);
};
