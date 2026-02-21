import { Basic, EmptyWithString, EmptyWithTranslate, Offline, WithRenderProp } from "@/stories/reference-one-field.stories";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

const EXPECTED_WORKOUT_NOTE = 'Not very hard. Bit tired after!';

describe('ReferenceOneField', () => {
    it('should render its child in the context of the related record', async () => {
        const screen = render(<Basic />);
        await expect.element(screen.getByText(EXPECTED_WORKOUT_NOTE)).toBeInTheDocument();
    });

    it('should allow to render the referenceRecord using a render prop', async () => {
        const screen = render(<WithRenderProp />);
        await expect.element(screen.getByText(EXPECTED_WORKOUT_NOTE)).toBeInTheDocument();
    });

    it('should show empty string', async () => {
        const screen = render(<EmptyWithString />);
        await expect.element(screen.getByText('This workout does not exists')).toBeInTheDocument();
    })

    it('should translate emptyText', async () => {
        const screen = render(<EmptyWithTranslate />);
        await expect.element(screen.getByText('Workout not found')).toBeInTheDocument();
    })

    it('should render the offline prop node when offline', async () => {
        const screen = render(<Offline />);

        const toggleOfflineButton = await screen.getByText('Simulate offline');
        await toggleOfflineButton.click();
        await expect.element(screen.getByText('You are currently offline')).toBeInTheDocument();

        const toggleReferenceOneFieldVisibilityButton = await screen.getByText('Toggle ReferenceOneField visibility');
        await toggleReferenceOneFieldVisibilityButton.click();

        await expect.element(screen.getByText('You are offline, cannot load data!')).toBeInTheDocument();

        const toggleOnlineButton = await screen.getByText('Simulate online');
        await toggleOnlineButton.click();
        await expect.element(screen.getByText('You are currently online')).toBeInTheDocument();

        await expect.element(screen.getByText(EXPECTED_WORKOUT_NOTE)).toBeInTheDocument()
    })

})