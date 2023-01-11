import { isNumber } from '@vueuse/core'
import { Ref, computed, reactive, toRef, toRefs, watch } from 'vue'

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
    const tip =
      isNumber(state.customTip) && state.customTip >= 0
        ? state.customTip
        : isNumber(state.tip)
        ? state.tip
        : 0

    if (tip > 0) {
      return tip / 100
    }

    return 0
  })

  const peopleAmount = computed(() =>
    isNumber(state.people) ? state.people : 0,
  )
  const billAmount = computed(() => (isNumber(state.bill) ? state.bill : 0))

  const isValid = computed(() => {
    return billAmount.value > 0 && peopleAmount.value > 0
  })

  const tipAmountPerPerson = computed(() => {
    if (!isValid.value || tipPercent.value === 0.0) {
      return 0
    }

    return (tipPercent.value * billAmount.value) / peopleAmount.value
  })

  const totalAmountPerPerson = computed(() => {
    if (!isValid.value) {
      return 0
    }

    return billAmount.value / peopleAmount.value + tipAmountPerPerson.value
  })

  const reset = () => {
    Object.assign(state, {
      ...DEFAULT_STATE,
      customTip: undefined,
    })
  }

  return {
    ...toRefs(state),
    reset,
    tipAmountPerPerson,
    totalAmountPerPerson,
  }
}
