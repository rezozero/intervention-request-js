import { newSpecPage } from '@stencil/core/testing'
import { InterventionRequest } from '~/components/intervention-request/intervention-request'

describe('intervention-request', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [InterventionRequest],
            html: `<intervention-request></intervention-request>`,
        })

        expect(page.root).toEqualHtml(
            `<intervention-request>
                <mock:shadow-root>
                    <slot></slot>
                </mock:shadow-root>
            </intervention-request>`
        )
    });
});
