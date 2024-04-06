import { userEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import './integer-input'

describe('integer-input', () => {
  it('without initial value has value of null', async () => {
    document.body.innerHTML = '<integer-input></integer-input>'
    await customElements.whenDefined('integer-input')

    const integerInput = document.body.querySelector('integer-input')!
    expect(integerInput.value).toBe(null)
  })

  it('reflects value specified by property', async () => {
    document.body.innerHTML = '<integer-input value="5"></integer-input>'
    await customElements.whenDefined('integer-input')

    const integerInput = document.body.querySelector('integer-input')!
    expect(integerInput.value).toBe(5)
  })

  it('reflects negative integer value specified by property', async () => {
    document.body.innerHTML = '<integer-input value="-5"></integer-input>'
    await customElements.whenDefined('integer-input')

    const integerInput = document.body.querySelector('integer-input')!
    expect(integerInput.value).toBe(-5)
  })

  it('ignores non-integer value specified by property', async () => {
    document.body.innerHTML = '<integer-input value="a"></integer-input>'
    await customElements.whenDefined('integer-input')

    const integerInput = document.body.querySelector('integer-input')!
    const shadowInput = integerInput!.shadowRoot!.querySelector('input')!
    expect(integerInput.value).toBe(null)
    expect(shadowInput.value).toBe('')
  })

  it('ignores standalone minus sign by property', async () => {
    document.body.innerHTML = '<integer-input value="-"></integer-input>'
    await customElements.whenDefined('integer-input')

    const integerInput = document.body.querySelector('integer-input')!
    const shadowInput = integerInput!.shadowRoot!.querySelector('input')!
    expect(integerInput.value).toBe(null)
    expect(shadowInput.value).toBe('')
  })

  it('updates value on user input', async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<integer-input></integer-input>'
    await customElements.whenDefined('integer-input')

    const integerInput = document.body.querySelector('integer-input')!
    const shadowInput = integerInput!.shadowRoot!.querySelector('input')!
    await user.type(shadowInput, '5')

    expect(integerInput.value).toBe(5)
  })

  it('appends digit to existing value on user input', async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<integer-input value="5"></integer-input>'
    await customElements.whenDefined('integer-input')

    const integerInput = document.body.querySelector('integer-input')!
    const shadowInput = integerInput!.shadowRoot!.querySelector('input')!
    await user.type(shadowInput, '7')

    expect(integerInput.value).toBe(57)
  })

  it('ignores non-integer user input and keeps existing value', async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<integer-input value="5"></integer-input>'
    await customElements.whenDefined('integer-input')

    const integerInput = document.body.querySelector('integer-input')!
    const shadowInput = integerInput!.shadowRoot!.querySelector('input')!
    await user.type(shadowInput, 'a')

    expect(integerInput.value).toBe(5)
    expect(shadowInput.value).toBe('5')
  })

  it('reflects standalone minus sign input', async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<integer-input></integer-input>'
    await customElements.whenDefined('integer-input')

    const integerInput = document.body.querySelector('integer-input')!
    const shadowInput = integerInput!.shadowRoot!.querySelector('input')!
    await user.type(shadowInput, '-')

    expect(integerInput.value).toBe(null)
    expect(shadowInput.value).toBe('-')
  })

  it('prevents entering more than one minus sign', async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<integer-input></integer-input>'
    await customElements.whenDefined('integer-input')

    const integerInput = document.body.querySelector('integer-input')!
    const shadowInput = integerInput!.shadowRoot!.querySelector('input')!
    await user.type(shadowInput, '--')

    expect(integerInput.value).toBe(null)
    expect(shadowInput.value).toBe('-')
  })

  it('prevents entering minus sign anywhere except at the beginning', async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<integer-input value="5"></integer-input>'
    await customElements.whenDefined('integer-input')

    const integerInput = document.body.querySelector('integer-input')!
    const shadowInput = integerInput!.shadowRoot!.querySelector('input')!
    await user.type(shadowInput, '-')

    expect(integerInput.value).toBe(5)
    expect(shadowInput.value).toBe('5')
  })

  it('resets input to null if only minus sign is present on blur', async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<integer-input></integer-input>'
    await customElements.whenDefined('integer-input')

    const integerInput = document.body.querySelector('integer-input')!
    const shadowInput = integerInput!.shadowRoot!.querySelector('input')!
    await user.type(shadowInput, '-')
    shadowInput.blur()

    expect(integerInput.value).toBe(null)
    expect(shadowInput.value).toBe('')
  })

  it('ignores non-integer value when property is directly updated via JavaScript', async () => {
    document.body.innerHTML = '<integer-input></integer-input>'
    await customElements.whenDefined('integer-input')

    const integerInput = document.body.querySelector('integer-input')!
    integerInput.value = 2.5

    expect(integerInput.value).toBe(null)
  })
})
