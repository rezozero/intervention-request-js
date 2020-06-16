import { newE2EPage } from '@stencil/core/testing';

describe('intervention-request-iframe', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<intervention-request-iframe></intervention-request-iframe>');

    const element = await page.find('intervention-request-iframe');
    expect(element).toHaveClass('hydrated');
  });
});
