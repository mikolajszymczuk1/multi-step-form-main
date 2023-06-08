<template>
  <button
    class="paymentModeButton"
    :class="store.isYearlyMode ? 'paymentModeButton--yearly' : ''"
    @click="store.changeIsYearlyMode()"
  ></button>
</template>

<script setup lang="ts">
import useMultiStepFormStore from '@/stores/MultiStepFormStore';

const store = useMultiStepFormStore();
</script>

<style scoped lang="scss">
.paymentModeButton {
  position: relative;

  width: 38px;
  height: 20px;

  background-color: $MarineBlue;
  border: 0;
  outline: none;
  border-radius: 25px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 4px;

    width: 12px;
    height: 12px;

    transform: translateY(-50%);
    border-radius: 50%;
    background-color: $White;
    transition: transform 150ms ease-in-out;
  }

  &--yearly {
    &::before {
      transform: translate(18px, -50%);
    }
  }
}
</style>
