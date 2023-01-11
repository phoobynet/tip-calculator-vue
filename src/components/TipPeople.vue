<script lang="ts" setup>
import Label from '@/components/Label.vue'
import { useTipCalculatorStore } from '@/stores/useTipCalculatorState'
import { debouncedWatch } from '@vueuse/core'
import { ref, watch } from 'vue'

const { people, peopleError } = useTipCalculatorStore()

const peopleInputValue = ref<number>()
const input = ref<HTMLInputElement | null>(null)
const focussed = ref<boolean>()

const selectAll = () => {
  input.value?.select()
  input.value?.focus()
  focussed.value = true
}

watch(people, (newValue, oldValue) => {
  if (!!oldValue && newValue === undefined) {
    peopleInputValue.value = undefined
  }
})

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
          peopleError.value = 'Invalid tip'
        } else if (newValue < 0) {
          peopleError.value = `Can't be < 0`
        } else if (newValue === 0) {
          peopleError.value = `Can't be zero`
        } else if (newValue > 999) {
          peopleError.value = 'Invalid tip'
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
</script>

<template>
  <div
    class="tip-people"
    @click="selectAll"
  >
    <div class="label-container">
      <Label for="people">Number of People</Label>
      <div class="error">{{ peopleError }}</div>
    </div>
    <div
      class="input-container"
      :data-error="!!peopleError"
      :data-focus="focussed"
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
        @focus="() => (focussed = true)"
        @blur="() => (focussed = false)"
        :min="0"
        v-keys:integer
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tip-people {
  @apply flex flex-col space-y-1;

  .label-container {
    @apply flex justify-between;

    :first-child {
      @apply flex-initial;
    }

    .error {
      @apply text-error-red;
    }
  }

  .input-container {
    @apply grid cursor-pointer items-center overflow-hidden rounded bg-very-light-grayish-cyan ring-light-grayish-cyan;
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
