<template>
  <button
    class="paymentModeButton"
    :class="isYearlyMode ? 'paymentModeButton--yearly' : ''"
    @click="changePaymentMode"
  ></button>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';

const emit = defineEmits<{
  (e: 'paymentMode', value: boolean): void
}>();

const isYearlyMode: Ref<boolean> = ref(false);

/** Emit current payment mode value  */
const changePaymentMode = () => {
  isYearlyMode.value = !isYearlyMode.value;
  emit('paymentMode', isYearlyMode.value);
};
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
