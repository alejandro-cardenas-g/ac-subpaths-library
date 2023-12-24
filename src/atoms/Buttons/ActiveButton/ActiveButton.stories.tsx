import { Meta, StoryObj } from "@storybook/react";
import { ActiveButton } from "./ActiveButton";

const meta: Meta<typeof ActiveButton> = {
  title: "buttons/ ActiveButton",
  component: ActiveButton,
  args: {},
};

export default meta;

type Story = StoryObj<typeof ActiveButton>;

export const Default: Story = {
  args: {
    text: "ActiveButton",
  },
};
