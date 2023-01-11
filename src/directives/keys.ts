import { range } from 'lodash'
import { Directive } from 'vue'

const listeners = new Map<Element, (event: KeyboardEvent) => void>()

const BASE_KEYS = [
  'Backspace',
  'Delete',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Enter',
  'Tab',
  ...range(0, 10).map((x) => x.toString()),
]

const moneyKeys = [...BASE_KEYS, '.']

export const keys: Directive = {
  created(el, binding) {
    if (el.tagName !== 'INPUT') {
      console.error(
        'keys:directive failed.  v-keys is only allowed on INPUT tags',
      )
      return
    }

    const handler = (event: KeyboardEvent): void => {
      if (binding.arg === 'money') {
        if (moneyKeys.includes(event.key)) {
          return
        }
      } else if (binding.arg === 'integer') {
        if (BASE_KEYS.includes(event.key)) {
          return
        }
      }
      event.preventDefault()
    }

    listeners.set(el, handler)

    el.addEventListener('keydown', handler)
  },
  unmounted(el) {
    const handler = listeners.get(el)

    if (handler) {
      el.removeEventListener('keydown', handler)
    }
  },
}
