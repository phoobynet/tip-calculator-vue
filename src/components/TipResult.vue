<script lang="ts" setup>
import Money from '@/components/Money.vue'
import { useTipCalculatorStore } from '@/stores/useTipCalculatorState'

const { tipAmountPerPerson, totalAmountPerPerson, reset, isDirty } =
  useTipCalculatorStore()
</script>

<template>
  <div class="tip-result">
    <div class="amount">
      <div class="caption">
        <div>Tip Amount</div>
        <div>/ person</div>
      </div>
      <div class="foo">
        <Money :amount="tipAmountPerPerson" />
      </div>
    </div>
    <div class="amount">
      <div class="caption">
        <div>Total</div>
        <div>/ person</div>
      </div>
      <div>
        <Money :amount="totalAmountPerPerson" />
      </div>
    </div>
    <button
      @click="reset"
      :disabled="!isDirty"
    >
      reset
    </button>
  </div>
</template>

<style lang="scss" scoped>
.tip-result {
  @apply grid h-[257px] grid-rows-[4.2rem_4.1rem_5rem] rounded-2xl bg-very-dark-cyan px-6 py-7 text-white;
  @apply lg:h-full lg:w-[413px] lg:grid-rows-[6rem_10rem_5rem] lg:px-[2.5rem] lg:pt-[3rem];

  .amount {
    @apply flex h-[4rem] flex-row items-center justify-between;
    .caption {
      :first-child {
        @apply text-xs text-white;
      }

      :last-child {
        @apply text-xxs text-grayish-cyan;
      }
    }

    :last-child {
      @apply text-xl text-strong-cyan;
      @apply lg:text-2xl;
    }
  }

  button {
    @apply mt-6 h-12 rounded-lg bg-strong-cyan text-sm uppercase text-very-dark-cyan;

    &:hover:enabled {
      @apply bg-light-cyan;
    }

    &:disabled {
      @apply bg-disabled;
    }
  }
}
</style>
