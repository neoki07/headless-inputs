import { html, LitElement, PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('integer-input')
export class IntegerInput extends LitElement {
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
  value: number | null = null

  override willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('value')) {
      this.previousInputValue = this.value?.toString() || ''
    }
  }

  private handleInput(event: Event) {
    const inputElement = event.target as HTMLInputElement
    if (inputElement.value === '') {
      this.value = null
    }

    if (inputElement.value.match(/^-?\d+$/)) {
      this.value = Number(inputElement.value)
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
      .value=${this.value?.toString() ?? ''}
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
