<script lang="ts" setup>
import TipBill from '@/components/TipBill.vue'
import TipPeople from '@/components/TipPeople.vue'
import TipResult from '@/components/TipResult.vue'
import TipSelect from '@/components/TipSelect.vue'
</script>

<template>
  <div class="tip">
    <div class="inputs">
      <TipBill />
      <TipSelect />
      <TipPeople />
    </div>
    <div class="result">
      <TipResult />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tip {
  @apply grid h-full w-[375px] grid-rows-[31.4rem_20rem] rounded-tl-3xl rounded-tr-3xl bg-white;
  @apply lg:h-[481px] lg:w-[920px] lg:grid-cols-[28.9rem_28.9rem] lg:grid-rows-1 lg:gap-0 lg:rounded-3xl;
  .inputs {
    @apply grid grid-rows-[6.7rem_15.6rem_auto] px-8 pt-[2.15rem];
    @apply lg:grid-rows-[7.4rem_12rem_auto] lg:py-[2.85rem] lg:pl-[3.1rem];
  }

  .result {
    @apply grid px-6;
    @apply lg:py-[2rem] lg:px-4;
  }
}
</style>
