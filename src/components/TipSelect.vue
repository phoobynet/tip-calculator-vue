<script lang="ts" setup>
import Label from '@/components/Label.vue'
import { useTipCalculatorStore } from '@/stores/useTipCalculatorState'
import { debouncedWatch, isNumber } from '@vueuse/core'
import { ref, watch } from 'vue'

const tipOptions = [5, 10, 15, 25, 50]
const { tip, customTip, customTipError } = useTipCalculatorStore()

const customTipValue = ref<number>()

watch(customTip, (newValue, oldValue) => {
  if (!!oldValue && newValue === undefined) {
    customTipValue.value = undefined
  }
})

debouncedWatch(
  tip,
  (newValue) => {
    if (newValue !== undefined) {
      customTipValue.value = undefined
    }
  },
  { debounce: 500 },
)

debouncedWatch(
  customTipValue,
  (newValue) => {
    customTipError.value = ''
    if (newValue) {
      const result = parseInt(newValue.toString())
      if (isNumber(result)) {
        if (result < 0) {
          customTipError.value = 'error'
        }
        customTip.value = result
        tip.value = undefined
      } else {
        customTip.value = undefined
      }
    } else {
      customTip.value = undefined
    }
  },
  {
    debounce: 500,
  },
)
</script>

<template>
  <div class="tip-select">
    <Label for="tip"> Select Tip % </Label>
    <div
      class="options"
      role="radiogroup"
    >
      <button
        v-for="option in tipOptions"
        role="radio"
        :key="option"
        :aria-checked="option === tip || option === customTip"
        tabindex="0"
        @click="() => (tip = option)"
      >
        {{ option }}%
      </button>
      <input
        ref="customTipRef"
        type="number"
        placeholder="Custom"
        maxlength="3"
        max="100"
        v-model="customTipValue"
        :aria-invalid="!!customTipError"
        v-keys:integer
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tip-select {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .options {
    @apply grid grid-cols-2 grid-rows-3 gap-4;
    @apply lg:grid-cols-3 lg:grid-rows-2;

    button {
      @apply h-[3rem] rounded bg-very-dark-cyan text-lg text-white;

      &[aria-checked='true'] {
        @apply bg-strong-cyan text-very-dark-cyan;
      }
    }

    input {
      @apply rounded  lg:px-2;

      &::placeholder {
        @apply text-center;
      }

      &[aria-invalid='true'] {
        @apply ring-2 ring-error-red;
      }
    }
  }
}
</style>
