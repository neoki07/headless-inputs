import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'

import './number-input.js'

interface NumberInputProps {
  value: number | null
}

const meta = {
  title: 'NumberInput',
  tags: ['autodocs'],
} satisfies Meta<NumberInputProps>

export default meta
type Story = StoryObj<NumberInputProps>

export const Default: Story = {
  args: {},
  render: () => html`<number-input></number-input>`,
}

export const ValueProperty: Story = {
  args: {
    value: 5.5,
  },
  render: ({ value }) => html`<number-input .value=${value}></number-input>`,
}
