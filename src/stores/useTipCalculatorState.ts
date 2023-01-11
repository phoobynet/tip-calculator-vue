import { isNumber } from '@vueuse/core'
import { computed, reactive, toRefs, watch } from 'vue'

export interface TipCalculatorState {
  bill: number | undefined
  billError: string
  tip: number | undefined
  customTip: number | undefined
  customTipError: string
  people: number | undefined
  peopleError: string
}

const DEFAULT_STATE: TipCalculatorState = Object.freeze({
  bill: undefined,
  billError: '',
  tip: undefined,
  customTip: undefined,
  customTipError: '',
  people: undefined,
  peopleError: '',
})

const state = reactive<TipCalculatorState>({
  ...DEFAULT_STATE,
})

export const useTipCalculatorStore = () => {
  const tipPercent = computed(() => {
    const tip = isNumber(state.customTip)
      ? state.customTip
      : isNumber(state.tip)
      ? state.tip
      : 0

    if (tip > 0) {
      return tip / 100
    }

    return 0
  })

  const people = computed(() => (isNumber(state.people) ? state.people : 0))
  const bill = computed(() => (isNumber(state.bill) ? state.bill : 0))

  const isValid = computed(() => {
    return bill.value > 0 && people.value > 0
  })

  const tipAmountPerPerson = computed(() => {
    if (!isValid.value || tipPercent.value === 0.0) {
      return 0
    }

    return (tipPercent.value * bill.value) / people.value
  })

  const totalAmountPerPerson = computed(() => {
    if (!isValid.value) {
      return 0
    }

    return (state.bill ?? 0) / (state.people ?? 0) + tipAmountPerPerson.value
  })

  const reset = () => {
    Object.assign(state, {
      ...DEFAULT_STATE,
    })
  }

  return {
    ...toRefs(state),
    tipAmountPerPerson,
    totalAmountPerPerson,
    reset,
  }
}
