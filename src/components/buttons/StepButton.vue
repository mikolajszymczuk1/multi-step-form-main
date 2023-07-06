<template>
  <RouterLink
    class="stepButton"
    :class="[isNext ? 'stepButton--next' : '', isFinishing ? 'stepButton--finish' : '']"
    :to="{ name: goTo }"
    :data-test="isNext ? 'next-step' : 'prev-step'"
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
  isFinishing: {
    type: Boolean,
    default: false,
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
  transition: color 150ms ease-in-out;

  @media screen and (min-width: $xlg) {
    font-size: 1rem;
  }

  &:hover {
    color: $MarineBlue;
  }

  &--next {
    padding: 12px 16px;

    background-color: $MarineBlue;
    border-radius: 4px;
    transition: opacity 150ms ease-in-out;

    color: $White;

    @media screen and (min-width: $xlg) {
      padding: 14px 24px 16px 24px;

      border-radius: 8px;
    }

    &:hover {
      opacity: 0.8;

      color: white;
    }
  }

  &--finish {
    background-color: $PurplishBlue;
  }
}
</style>
