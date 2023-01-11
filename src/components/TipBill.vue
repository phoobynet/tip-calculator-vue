<script lang="ts" setup>
import Label from '@/components/Label.vue'
import { useTipCalculatorStore } from '@/stores/useTipCalculatorState'
import { debouncedWatch } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

const { bill, billError } = useTipCalculatorStore()

const billInputValue = ref<number>()
const input = ref<HTMLInputElement | null>(null)
const focussed = ref<boolean>()

const selectAll = () => {
  input.value?.select()
  input.value?.focus()
  focussed.value = true
}

watch(bill, (newValue, oldValue) => {
  if (!!oldValue && newValue === undefined) {
    billInputValue.value = undefined
  }
})

debouncedWatch(
  billInputValue,
  (newValue) => {
    let actual: number | undefined = undefined
    billError.value = ''

    if (newValue !== undefined) {
      if (typeof newValue === 'string') {
        billError.value = 'Not a valid number'
        return
      } else {
        const parsed = parseFloat(newValue.toString())
        if (isNaN(parsed)) {
          billError.value = 'Not a valid number'
        } else if (newValue < 0) {
          billError.value = `Can't be negative`
        } else if (newValue > 9999999.99) {
          billError.value = 'Bill is too large'
        } else {
          actual = newValue
        }
      }
    }

    return (bill.value = actual)
  },
  {
    debounce: 500,
  },
)

onMounted(() => {
  selectAll()
})
</script>

<template>
  <div
    class="tip-bill"
    @click="selectAll"
  >
    <Label for="bill">Bill</Label>
    <div
      class="input-container"
      :data-error="!!billError"
      :data-focus="focussed"
    >
      <div class="icon-container">
        <img
          src="@/assets/images/icon-dollar.svg"
          alt=""
        />
      </div>
      <input
        ref="input"
        id="bill"
        type="number"
        v-model.number="billInputValue"
        placeholder="0"
        @focus="() => (focussed = true)"
        @blur="() => (focussed = false)"
        :min="0"
        v-keys:money
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tip-bill {
  @apply flex flex-col space-y-1;

  .input-container {
    @apply grid cursor-pointer items-center overflow-hidden rounded bg-very-light-grayish-cyan;
    grid-template-columns: 3.2rem minmax(0, min-content);

    .icon-container {
      place-self: center;
    }

    &:is(:hover, [data-focus='true']) {
      @apply ring-2 ring-strong-cyan;
    }

    &[data-error='true'] {
      @apply ring-2 ring-error-red;
    }
  }
}
</style>
