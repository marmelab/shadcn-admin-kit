// This file is part of Shadcn Admin Kit (https://github.com/marmelab/shadcn-admin-kit)
import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { required } from "ra-core";

import {
  Basic,
  ExternalChanges,
  ExternalChangesWithParse,
  Parse,
  CustomClassName,
  NoLabel,
  Disabled,
  ReadOnly,
} from "@/stories/date-input.stories";

describe("<DateInput />", () => {
  it("should render a date input", async () => {
    const screen = render(<Basic />);
    const input = await screen.getByLabelText("Published at");
    await expect.element(input).toHaveAttribute("type", "date");
  });

  it("should accept a date string as value", async () => {
    const onSubmit = vi.fn();
    const screen = render(
      <Basic
        simpleFormProps={{
          onSubmit,
          defaultValues: { publishedAt: "2021-09-11" },
        }}
      />,
    );
    const input = await screen.getByLabelText("Published at");
    await expect.element(input).toHaveValue("2021-09-11");
  });

  it("should accept a date time string as value", async () => {
    const screen = render(
      <Basic
        simpleFormProps={{
          defaultValues: { publishedAt: "2021-09-11T06:51:17.772Z" },
        }}
      />,
    );
    const input = await screen.getByLabelText("Published at");
    await expect.element(input).toHaveValue("2021-09-11");
  });

  it("should accept a date object as value", async () => {
    const screen = render(
      <Basic
        simpleFormProps={{
          defaultValues: { publishedAt: new Date("2021-09-11") },
        }}
      />,
    );
    const input = await screen.getByLabelText("Published at");
    await expect.element(input).toHaveValue("2021-09-11");
  });

  it("should accept a parse function", async () => {
    const onSubmit = vi.fn();
    const screen = render(
      <Parse
        simpleFormProps={{
          onSubmit,
          defaultValues: { publishedAt: new Date("2021-09-11") },
        }}
      />,
    );
    const input = await screen.getByLabelText("Published at");
    await expect.element(input).toHaveValue("2021-09-11");
  });

  it("should accept custom className", async () => {
    const screen = render(<CustomClassName />);
    const input = await screen.getByLabelText("Published at");
    await expect.element(input).toHaveClass("max-w-xs");
  });

  it("should not render label when label is false", async () => {
    const screen = render(<NoLabel />);
    const label = screen.getByText("Published at");
    await expect.element(label).not.toBeInTheDocument();
  });

  it("should render as disabled", async () => {
    const screen = render(<Disabled />);
    const inputs = await screen.getByRole("group").all();
    const firstInput = inputs[0].getByRole("textbox");
    await expect.element(firstInput).toBeDisabled();
  });

  it("should render as readOnly", async () => {
    const screen = render(<ReadOnly />);
    const inputs = await screen.getByRole("group").all();
    const firstInput = inputs[0].getByRole("textbox");
    await expect.element(firstInput).toHaveAttribute("readonly");
  });

  it("should display validation error", async () => {
    const screen = render(
      <Basic
        simpleFormProps={{ mode: "onBlur" }}
        dateInputProps={{ validate: required() }}
      />,
    );
    const input = await screen.getByLabelText("Published at *");
    await input.click();
    await screen.getByRole("group").click(); // Click outside to blur
    const error = await screen.getByText("Required");
    await expect.element(error).toBeInTheDocument();
  });

  it("should change its value when the form value has changed", async () => {
    const screen = render(<ExternalChanges />);
    const valueDisplay = await screen.getByText("2021-09-11");
    await expect.element(valueDisplay).toBeInTheDocument();

    const changeButton = await screen.getByText("Change value");
    await changeButton.click();

    const newValueDisplay = await screen.getByText("2021-10-20");
    await expect.element(newValueDisplay).toBeInTheDocument();
  });

  it("should change its value when the form value has changed with a custom parse", async () => {
    const screen = render(<ExternalChangesWithParse />);

    // Check initial value contains the date
    const initialValue = await screen.getByText(/Sat Sep 11 2021/i);
    await expect.element(initialValue).toBeInTheDocument();

    const changeButton = await screen.getByText("Change value");
    await changeButton.click();

    // Check new value contains the date
    const newValue = await screen.getByText(/Wed Oct 20 2021/i);
    await expect.element(newValue).toBeInTheDocument();
  });

  it("should reset value when reset button is clicked", async () => {
    const screen = render(<ExternalChanges />);

    const changeButton = await screen.getByText("Change value");
    await changeButton.click();

    const newValueDisplay = await screen.getByText("2021-10-20");
    await expect.element(newValueDisplay).toBeInTheDocument();

    const resetButton = await screen.getByText("Reset");
    await resetButton.click();

    const originalValue = await screen.getByText("2021-09-11");
    await expect.element(originalValue).toBeInTheDocument();
  });

  describe("TimeZones", () => {
    it.each([
      ["2021-09-11T20:46:20.000+02:00", "2021-09-11"],
      ["2021-09-11 20:46:20.000+02:00", "2021-09-11"],
      ["2021-09-10T20:46:20.000-04:00", "2021-09-11"],
      ["2021-09-10 20:46:20.000-04:00", "2021-09-11"],
      ["2021-09-11T20:46:20.000Z", "2021-09-11"],
      ["2021-09-11 20:46:20.000Z", "2021-09-11"],
    ])(
      "should accept a value with timezone %s",
      async (publishedAt, expectedValue) => {
        const screen = render(
          <Basic
            simpleFormProps={{
              defaultValues: { publishedAt },
            }}
          />,
        );
        const input = await screen.getByLabelText("Published at");
        await expect.element(input).toHaveValue(expectedValue);
      },
    );
  });

  describe("error message", () => {
    it("should not be displayed if field is pristine", async () => {
      const screen = render(
        <Basic dateInputProps={{ validate: required() }} />,
      );
      const error = screen.getByText("Required");
      await expect.element(error).not.toBeInTheDocument();
    });

    it("should be displayed if field has been touched and is invalid", async () => {
      const screen = render(
        <Basic
          simpleFormProps={{ mode: "onBlur" }}
          dateInputProps={{ validate: required() }}
        />,
      );

      const input = await screen.getByLabelText("Published at *");
      await input.click();
      await screen.getByRole("group").click(); // Click outside to blur
      const error = await screen.getByText("Required");
      await expect.element(error).toBeInTheDocument();
    });
  });
});
