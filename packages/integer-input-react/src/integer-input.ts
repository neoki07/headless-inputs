import { createComponent } from '@lit/react'
import * as React from 'react'

import { IntegerInput as IntegerInputWC } from '@headless-inputs/integer-input'

type PickedIntegerInputWCProps = Pick<IntegerInputWC, 'name' | 'value'>

export interface IntegerInputProps
  extends Omit<
      React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
      'onChange'
    >,
    Partial<PickedIntegerInputWCProps> {
  onChange?: React.ChangeEventHandler<PickedIntegerInputWCProps>
}

export const IntegerInput = createComponent({
  react: React,
  tagName: 'integer-input',
  elementClass: IntegerInputWC,
  displayName: 'IntegerInput',
  events: { onChange: 'input' },
}) as React.ForwardRefExoticComponent<IntegerInputProps>
