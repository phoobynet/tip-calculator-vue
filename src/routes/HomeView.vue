<script lang="ts" setup>
import Logo from '@/components/Logo.vue'
import Tip from '@/components/Tip.vue'
</script>

<template>
  <div class="home-view">
    <div class="logo-container">
      <Logo />
    </div>
    <div class="tip-container">
      <Tip />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-view {
  @apply grid h-screen grid-rows-[143px_1fr] bg-light-grayish-cyan;

  .logo-container {
    @apply flex items-center justify-center pt-1.5;
  }
}
</style>
