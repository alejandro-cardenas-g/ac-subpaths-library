import { Meta, StoryObj } from "@storybook/react";
import { ActiveLabel } from "./ActiveLabel";

const meta: Meta<typeof ActiveLabel> = {
  title: "Labels/ ActiveLabel",
  component: ActiveLabel,
  args: {},
};

export default meta;

type Story = StoryObj<typeof ActiveLabel>;

export const Default: Story = {
  args: {
    text: "ActiveLabel",
  },
};
