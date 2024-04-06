import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('text-input')
export class TextInput extends LitElement {
  @property()
  name: string = ''

  @property({ converter: (value) => value || null })
  value: string | null = null

  private handleInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value || null
  }

  override render() {
    return html`<input .value=${this.value ?? ''} @input=${this.handleInput} />`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'text-input': TextInput
  }
}
