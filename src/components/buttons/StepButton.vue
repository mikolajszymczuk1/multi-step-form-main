<template>
  <RouterLink
    class="stepButton"
    :class="isNext ? 'stepButton--next' : ''"
    :to="{ name: goTo }"
  >
    <slot></slot>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps({
  isNext: {
    type: Boolean,
    default: false,
  },
  goTo: {
    type: String,
  },
});
</script>

<style lang="scss">
.stepButton {
  font-family: $ubuntu;
  font-weight: 500;
  font-size: .875rem;
  color: $CoolBray;
  text-decoration: none;

  &--next {
    padding: 12px 16px;

    background-color: $MarineBlue;
    border-radius: 4px;

    color: $White;
  }
}
</style>
