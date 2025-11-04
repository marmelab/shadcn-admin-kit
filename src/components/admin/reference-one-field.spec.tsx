import { Basic, EmptyWithString, EmptyWithTranslate, WithRenderProp } from "@/stories/reference-one-field.stories";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

const NOTE_TO_DISPLAY = 'Not very hard. Bit tired after!';

describe('ReferenceOneField', () => {
    it('should render its child in the context of the related record', async () => {
        const screen = render(<Basic />);
        await expect.element(screen.getByText(NOTE_TO_DISPLAY)).toBeInTheDocument();
    });

    it('should allow to render the referenceRecord using a render prop', async () => {
        const screen = render(<WithRenderProp />);
        await expect.element(screen.getByText(NOTE_TO_DISPLAY)).toBeInTheDocument();
    });

    it('should show empty string', async () => {
        const screen = render(<EmptyWithString />);
        await expect.element(screen.getByText('This workout does not exists')).toBeInTheDocument();
    })

    it('should translate emptyText', async () => {
        const screen = render(<EmptyWithTranslate />);
        await expect.element(screen.getByText('Workout not found')).toBeInTheDocument();
    })
})