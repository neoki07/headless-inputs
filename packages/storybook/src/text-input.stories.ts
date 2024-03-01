import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'

import '@headless-inputs/text-input'

interface TextInputProps {
  value: string | null
}

const meta = {
  title: 'TextInput',
} satisfies Meta<TextInputProps>

export default meta
type Story = StoryObj<TextInputProps>

export const Default: Story = {
  args: {},
  render: () => html`<text-input></text-input>`,
}

export const ValueProperty: Story = {
  args: {
    value: 'Storybook',
  },
  render: ({ value }) => html`<text-input .value=${value}></text-input>`,
}
