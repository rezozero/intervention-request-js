import { newE2EPage } from '@stencil/core/testing';

describe('intervention-request-picture', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<intervention-request-picture></intervention-request-picture>');

    const element = await page.find('intervention-request-picture');
    expect(element).toHaveClass('hydrated');
  });
});
