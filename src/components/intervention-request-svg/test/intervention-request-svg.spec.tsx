import { newSpecPage } from '@stencil/core/testing';
import { InterventionRequestSvg } from './intervention-request-svg';

describe('intervention-request-svg', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [InterventionRequestSvg],
            html: `<intervention-request-svg></intervention-request-svg>`,
        });
        expect(page.root).toEqualHtml(`
            <intervention-request-svg>
                <mock:shadow-root>
                    <slot></slot>
                </mock:shadow-root>
            </intervention-request-svg>
        `);
    });
});
