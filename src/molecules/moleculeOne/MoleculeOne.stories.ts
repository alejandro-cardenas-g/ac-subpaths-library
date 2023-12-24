import { Meta, StoryObj } from "@storybook/react";
import { MoleculeOne } from "./MoleculeOne";

const meta: Meta<typeof MoleculeOne> = {
  title: "Molecules / MoleculeOne",
  component: MoleculeOne,
  args: {},
};

export default meta;

type Story = StoryObj<typeof MoleculeOne>;

export const Default: Story = {
  args: {
    buttonProps: {
      text: "button text",
    },
    labelProps: {
      text: "Label text",
    },
    showLabel: true,
  },
};
