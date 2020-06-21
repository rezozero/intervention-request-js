import { newE2EPage } from '@stencil/core/testing';

describe('intervention-request-svg', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<intervention-request-svg></intervention-request-svg>');

        const element = await page.find('intervention-request-svg');
        expect(element).toHaveClass('hydrated');
    });
});
