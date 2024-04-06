import type { Meta, StoryObj } from '@storybook/react'

import { TextInput } from './text-input.js'

const meta = {
  title: 'TextInput',
  component: TextInput,
  tags: ['autodocs'],
} satisfies Meta<typeof TextInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const ValueProperty: Story = {
  args: {
    value: 'Storybook',
  },
}
