import { userEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import './text-input'

describe('text-input', () => {
  it('without initial value has value of null', async () => {
    document.body.innerHTML = '<text-input></text-input>'
    await customElements.whenDefined('text-input')

    const textInput = document.body.querySelector('text-input')!
    expect(textInput.value).toBe(null)
  })

  it('reflects value specified by property', async () => {
    document.body.innerHTML = '<text-input value="Test"></text-input>'
    await customElements.whenDefined('text-input')

    const textInput = document.body.querySelector('text-input')!
    expect(textInput.value).toBe('Test')
  })

  it('updates value on user input', async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<text-input></text-input>'
    await customElements.whenDefined('text-input')

    const textInput = document.body.querySelector('text-input')!
    const shadowInput = textInput!.shadowRoot!.querySelector('input')!
    await user.type(shadowInput, 'Test')

    expect(textInput.value).toBe('Test')
  })
})
