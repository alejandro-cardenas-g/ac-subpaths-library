import { Meta, StoryObj } from "@storybook/react";
import { RedLabel } from "./RedLabel";

const meta: Meta<typeof RedLabel> = {
  title: "Labels/ RedLabel",
  component: RedLabel,
  args: {},
};

export default meta;

type Story = StoryObj<typeof RedLabel>;

export const Default: Story = {
  args: {
    text: "RedLabel",
  },
};
