import type { Meta, StoryObj } from '@storybook/react'

import { IntegerInput } from './integer-input.js'

const meta = {
  title: 'IntegerInput',
  component: IntegerInput,
  tags: ['autodocs'],
} satisfies Meta<typeof IntegerInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const ValueProperty: Story = {
  args: {
    value: 5,
  },
}
