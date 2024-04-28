import { userEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import './number-input'

describe('number-input', () => {
  it('without initial value has value of null', async () => {
    document.body.innerHTML = '<number-input></number-input>'
    await customElements.whenDefined('number-input')

    const numberInput = document.body.querySelector('number-input')!
    expect(numberInput.value).toBe(null)
  })

  it('reflects value specified by property', async () => {
    document.body.innerHTML = '<number-input value="5.5"></number-input>'
    await customElements.whenDefined('number-input')

    const numberInput = document.body.querySelector('number-input')!
    expect(numberInput.value).toBe(5.5)
  })

  it('reflects negative number value specified by property', async () => {
    document.body.innerHTML = '<number-input value="-5.5"></number-input>'
    await customElements.whenDefined('number-input')

    const numberInput = document.body.querySelector('number-input')!
    expect(numberInput.value).toBe(-5.5)
  })

  it('ignores non-number value specified by property', async () => {
    document.body.innerHTML = '<number-input value="a"></number-input>'
    await customElements.whenDefined('number-input')

    const numberInput = document.body.querySelector('number-input')!
    const innerInput = numberInput.querySelector('input')!
    expect(numberInput.value).toBe(null)
    expect(innerInput.value).toBe('')
  })

  it('ignores standalone minus sign by property', async () => {
    document.body.innerHTML = '<number-input value="-"></number-input>'
    await customElements.whenDefined('number-input')

    const numberInput = document.body.querySelector('number-input')!
    const innerInput = numberInput.querySelector('input')!
    expect(numberInput.value).toBe(null)
    expect(innerInput.value).toBe('')
  })

  it('updates value on user input', async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<number-input></number-input>'
    await customElements.whenDefined('number-input')

    const numberInput = document.body.querySelector('number-input')!
    const innerInput = numberInput.querySelector('input')!
    await user.type(innerInput, '5.5')

    expect(numberInput.value).toBe(5.5)
  })

  it('appends digit to existing value on user input', async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<number-input value="5"></number-input>'
    await customElements.whenDefined('number-input')

    const numberInput = document.body.querySelector('number-input')!
    const innerInput = numberInput.querySelector('input')!
    await user.type(innerInput, '7')

    expect(numberInput.value).toBe(57)
  })

  it('ignores non-number user input and keeps existing value', async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<number-input value="5"></number-input>'
    await customElements.whenDefined('number-input')

    const numberInput = document.body.querySelector('number-input')!
    const innerInput = numberInput.querySelector('input')!
    await user.type(innerInput, 'a')

    expect(numberInput.value).toBe(5)
    expect(innerInput.value).toBe('5')
  })

  it('reflects standalone minus sign input', async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<number-input></number-input>'
    await customElements.whenDefined('number-input')

    const numberInput = document.body.querySelector('number-input')!
    const innerInput = numberInput.querySelector('input')!
    await user.type(innerInput, '-')

    expect(numberInput.value).toBe(null)
    expect(innerInput.value).toBe('-')
  })

  it('prevents entering more than one minus sign', async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<number-input></number-input>'
    await customElements.whenDefined('number-input')

    const numberInput = document.body.querySelector('number-input')!
    const innerInput = numberInput.querySelector('input')!
    await user.type(innerInput, '--')

    expect(numberInput.value).toBe(null)
    expect(innerInput.value).toBe('-')
  })

  it('prevents entering minus sign anywhere except at the beginning', async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<number-input value="5"></number-input>'
    await customElements.whenDefined('number-input')

    const numberInput = document.body.querySelector('number-input')!
    const innerInput = numberInput.querySelector('input')!
    await user.type(innerInput, '-')

    expect(numberInput.value).toBe(5)
    expect(innerInput.value).toBe('5')
  })

  it('resets input to null if only minus sign is present on blur', async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<number-input></number-input>'
    await customElements.whenDefined('number-input')

    const numberInput = document.body.querySelector('number-input')!
    const innerInput = numberInput.querySelector('input')!
    await user.type(innerInput, '-')
    innerInput.blur()

    expect(numberInput.value).toBe(null)
    expect(innerInput.value).toBe('')
  })

  it('reflects entering decimal point following digit', async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<number-input value="5"></number-input>'
    await customElements.whenDefined('number-input')

    const numberInput = document.body.querySelector('number-input')!
    const innerInput = numberInput.querySelector('input')!
    await user.type(innerInput, '.')

    expect(numberInput.value).toBe(5)
    expect(innerInput.value).toBe('5.')
  })

  it('prevents entering decimal point after decimal point', async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<number-input value="5"></number-input>'
    await customElements.whenDefined('number-input')

    const numberInput = document.body.querySelector('number-input')!
    const innerInput = numberInput.querySelector('input')!
    await user.type(innerInput, '..')

    expect(numberInput.value).toBe(5)
    expect(innerInput.value).toBe('5.')
  })

  it('prevents entering decimal point after decimal number', async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<number-input value="5.5"></number-input>'
    await customElements.whenDefined('number-input')

    const numberInput = document.body.querySelector('number-input')!
    const innerInput = numberInput.querySelector('input')!
    await user.type(innerInput, '.')

    expect(numberInput.value).toBe(5.5)
    expect(innerInput.value).toBe('5.5')
  })

  it('prevents entering decimal point at the start', async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<number-input></number-input>'
    await customElements.whenDefined('number-input')

    const numberInput = document.body.querySelector('number-input')!
    const innerInput = numberInput.querySelector('input')!
    await user.type(innerInput, '.')

    expect(numberInput.value).toBe(null)
    expect(innerInput.value).toBe('')
  })

  it('prevents entering decimal point immediately after minus sign', async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<number-input></number-input>'
    await customElements.whenDefined('number-input')

    const numberInput = document.body.querySelector('number-input')!
    const innerInput = numberInput.querySelector('input')!
    await user.type(innerInput, '-.')

    expect(numberInput.value).toBe(null)
    expect(innerInput.value).toBe('-')
  })

  it("removes trailing decimal point on blur if it's last character", async () => {
    const user = userEvent.setup()

    document.body.innerHTML = '<number-input value="5"></number-input>'
    await customElements.whenDefined('number-input')

    const numberInput = document.body.querySelector('number-input')!
    const innerInput = numberInput.querySelector('input')!
    await user.type(innerInput, '.')
    innerInput.blur()

    expect(numberInput.value).toBe(5)
    expect(innerInput.value).toBe('5')
  })
})
