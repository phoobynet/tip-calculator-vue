<script lang="ts" setup>
import Label from '@/components/Label.vue'
import { useTipCalculatorStore } from '@/stores/useTipCalculatorState'
import { debouncedWatch } from '@vueuse/core'
import { onMounted, ref } from 'vue'

const { people, peopleError } = useTipCalculatorStore()

const peopleInputValue = ref<number>()
const input = ref<HTMLInputElement | null>(null)

const selectAll = () => {
  input.value?.select()
  input.value?.focus()
}

debouncedWatch(
  peopleInputValue,
  (newValue) => {
    let actual: number | undefined = undefined
    peopleError.value = ''

    if (newValue !== undefined) {
      if (typeof newValue === 'string') {
        peopleError.value = ''
      } else {
        const parsed = parseFloat(newValue.toString())
        if (isNaN(parsed)) {
          peopleError.value = 'Not a valid number'
        } else if (newValue < 0) {
          peopleError.value = 'People cannot be negative'
        } else if (newValue > 9999999.99) {
          peopleError.value = 'People is too large'
        } else {
          actual = newValue
        }
      }
    }

    return (people.value = actual)
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
    class="tip-people"
    @click="selectAll"
  >
    <Label for="people">Number of People</Label>
    <div
      class="input-container"
      :data-error="!!peopleError"
    >
      <div class="icon-container">
        <img
          src="@/assets/images/icon-person.svg"
          alt=""
        />
      </div>
      <input
        ref="input"
        id="people"
        type="number"
        v-model="peopleInputValue"
        placeholder="0"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tip-people {
  @apply flex flex-col space-y-1;

  .input-container {
    @apply grid cursor-pointer items-center overflow-hidden rounded bg-very-light-grayish-cyan ring-light-grayish-cyan;
    grid-template-columns: 3.2rem minmax(0, min-content);

    .icon-container {
      place-self: center;
    }

    &:is(:hover, [data-focus='true']) {
      @apply ring-strong-cyan;
    }

    &[data-error='true'] {
      @apply ring-2 ring-error-red;
    }
  }
}
</style>
