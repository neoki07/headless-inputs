import { expect, fixture, html } from '@open-wc/testing'
import { HelloWorld } from './hello-world'

describe('hello-world', () => {
  it('is defined', () => {
    const el = document.createElement('hello-world')
    expect(el).to.be.instanceOf(HelloWorld)
  })

  it('renders with default values', async () => {
    const el = await fixture(html`<hello-world></hello-world>`)
    expect(el).shadowDom.to.equal(`
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `)
  })

  it('renders with a set name', async () => {
    const el = await fixture(html`<hello-world name="Test"></hello-world>`)
    expect(el).shadowDom.to.equal(`
      <h1>Hello, Test!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `)
  })

  it('handles a click', async () => {
    const el = (await fixture(html`<hello-world></hello-world>`)) as HelloWorld
    const button = el.shadowRoot!.querySelector('button')!
    button.click()
    await el.updateComplete
    expect(el).shadowDom.to.equal(`
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 1</button>
      <slot></slot>
    `)
  })

  it('styling applied', async () => {
    const el = (await fixture(html`<hello-world></hello-world>`)) as HelloWorld
    await el.updateComplete
    expect(getComputedStyle(el).paddingTop).to.equal('16px')
  })
})
