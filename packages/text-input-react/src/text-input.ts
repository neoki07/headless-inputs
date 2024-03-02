import { createComponent } from '@lit/react'
import * as React from 'react'

import { TextInput as TextInputWC } from '@headless-inputs/text-input'

type PickedTextInputWCProps = Pick<TextInputWC, 'name' | 'value'>

export interface TextInputProps
  extends Omit<
      React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
      'onChange'
    >,
    Partial<PickedTextInputWCProps> {
  onChange?: React.ChangeEventHandler<PickedTextInputWCProps>
}

export const TextInput = createComponent({
  react: React,
  tagName: 'text-input',
  elementClass: TextInputWC,
  displayName: 'TextInput',
  events: { onChange: 'input' },
}) as React.ForwardRefExoticComponent<TextInputProps>
