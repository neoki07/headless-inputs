import { LitElement } from 'lit'

export class LitLightDomElement extends LitElement {
  override createRenderRoot() {
    return this
  }
}
