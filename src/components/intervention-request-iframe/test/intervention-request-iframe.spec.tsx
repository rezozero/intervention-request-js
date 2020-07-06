import { newSpecPage } from '@stencil/core/testing';
import { InterventionRequestIframe } from '~/components/intervention-request-iframe/intervention-request-iframe';

describe('intervention-request-iframe', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InterventionRequestIframe],
      html: `<intervention-request-iframe></intervention-request-iframe>`,
    });
    expect(page.root).toEqualHtml(`
      <intervention-request-iframe>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </intervention-request-iframe>
    `);
  });
});
