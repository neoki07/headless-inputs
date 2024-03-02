import { html, LitElement, PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('integer-input')
export class IntegerInput extends LitElement {
  private _value: number | null = null
  private previousInputValue: string = ''

  @property()
  name: string = ''

  @property({
    type: Number,
    converter: (value) => {
      if (value === null || !value.match(/^-?\d+$/)) {
        return null
      }
      return Number(value)
    },
  })
  set value(value: number | null) {
    if (value === null || value.toString().match(/^-?\d+$/)) {
      this._value = value
    }
  }

  get value() {
    return this._value
  }

  override willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('value')) {
      this.previousInputValue = this._value?.toString() || ''
    }
  }

  private handleInput(event: Event) {
    const inputElement = event.target as HTMLInputElement
    if (inputElement.value === '') {
      this._value = null
    }

    if (inputElement.value.match(/^-?\d+$/)) {
      this._value = Number(inputElement.value)
    }

    if (inputElement.value === '' || inputElement.value.match(/^-?\d*$/)) {
      this.previousInputValue = inputElement.value
    } else {
      inputElement.value = this.previousInputValue
    }
  }

  private handleBlur(event: Event) {
    const inputElement = event.target as HTMLInputElement
    if (inputElement.value === '-') {
      inputElement.value = ''
    }
  }

  override render() {
    return html`<input
      .value=${this._value?.toString() ?? ''}
      @input=${this.handleInput}
      @blur=${this.handleBlur}
    />`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'integer-input': IntegerInput
  }
}
