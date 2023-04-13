<template>
  <div
    class="stepInputsWrapper"
    :class="largeSpace ? 'stepInputsWrapper--largeSpace' : ''"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  largeSpace: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.stepInputsWrapper {
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  margin-top: 22px;

  &--largeSpace {
    row-gap: 16px;
  }
}
</style>
