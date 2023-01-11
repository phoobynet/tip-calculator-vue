<script lang="ts" setup>
import numeral from 'numeral'
import { computed } from 'vue'

const MONEY_FORMAT = '$0,0.00'

const props = defineProps<{ amount?: number }>()

const formatted = computed(() =>
  props.amount ? numeral(props.amount).format(MONEY_FORMAT) : '$0.00',
)
</script>

<template>
  <span>{{ formatted }}</span>
</template>
