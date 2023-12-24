import { Meta, StoryObj } from "@storybook/react";
import { RedButton } from "./RedButton";

const meta: Meta<typeof RedButton> = {
  title: "buttons/ RedButton",
  component: RedButton,
  args: {},
};

export default meta;

type Story = StoryObj<typeof RedButton>;

export const Default: Story = {
  args: {
    text: "RedButton",
  },
};
