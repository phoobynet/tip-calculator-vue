<script lang="ts" setup>
import TipBill from '@/components/TipBill.vue'
import TipPeople from '@/components/TipPeople.vue'
import TipResult from '@/components/TipResult.vue'
import TipSelect from '@/components/TipSelect.vue'
</script>

<template>
  <div class="tip">
    <div class="tip-inputs">
      <TipBill />
      <TipSelect />
      <TipPeople />
    </div>
    <div class="tip-result">
      <TipResult />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tip {
  @apply grid h-full grid-rows-[31.4rem_20rem] rounded-tl-3xl rounded-tr-3xl bg-white;
  @apply min-h-[1872px] w-[375px] lg:w-[920px];

  .tip-inputs {
    @apply grid px-8 pt-[2.15rem];
    grid-template-rows: 6.7rem 15.6rem auto;
  }

  .tip-result {
    @apply grid px-6;
  }
}
</style>
