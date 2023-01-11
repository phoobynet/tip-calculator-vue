<script lang="ts" setup>
import Money from '@/components/Money.vue'
import { useTipCalculatorStore } from '@/stores/useTipCalculatorState'

const { tipAmountPerPerson, totalAmountPerPerson } = useTipCalculatorStore()
</script>

<template>
  <div class="tip-result">
    <div class="amount">
      <div class="caption">
        <div>Tip Amount</div>
        <div>/ person</div>
      </div>
      <div>
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
    <button>reset</button>
  </div>
</template>

<style lang="scss" scoped>
.tip-result {
  @apply h-[257px] rounded-2xl bg-very-dark-cyan p-7 text-white;
  @apply grid auto-rows-fr;

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
    }
  }

  button {
    @apply mt-6 h-12 rounded-lg bg-strong-cyan text-sm uppercase text-very-dark-cyan;
  }
}
</style>
