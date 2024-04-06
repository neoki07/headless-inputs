import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'

import './integer-input.js'

interface IntegerInputProps {
  value: number | null
}

const meta = {
  title: 'IntegerInput',
  tags: ['autodocs'],
} satisfies Meta<IntegerInputProps>

export default meta
type Story = StoryObj<IntegerInputProps>

export const Default: Story = {
  args: {},
  render: () => html`<integer-input></integer-input>`,
}

export const ValueProperty: Story = {
  args: {
    value: 5,
  },
  render: ({ value }) => html`<integer-input .value=${value}></integer-input>`,
}
