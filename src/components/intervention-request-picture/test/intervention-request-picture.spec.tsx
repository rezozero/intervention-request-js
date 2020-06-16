import { newSpecPage } from '@stencil/core/testing';
import { InterventionRequestPicture } from '~/components/intervention-request-picture/intervention-request-picture';

describe('intervention-request-picture', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InterventionRequestPicture],
      html: `<intervention-request-picture></intervention-request-picture>`,
    });
    expect(page.root).toEqualHtml(`
      <intervention-request-picture>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </intervention-request-picture>
    `);
  });
});
