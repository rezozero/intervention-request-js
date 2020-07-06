import { newE2EPage } from '@stencil/core/testing';

describe('intervention-request', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<intervention-request></intervention-request>');

        const element = await page.find('intervention-request');
        expect(element).toHaveClass('hydrated');
    });
});
