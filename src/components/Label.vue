<script lang="ts" setup>
const props = defineProps<{ for: string }>()
</script>

<template>
  <label
    :for="props.for"
    class="label"
  >
    <slot />
  </label>
</template>

<style lang="scss" scoped>
.label {
  @apply text-xs text-dark-grayish-cyan;
}
</style>
