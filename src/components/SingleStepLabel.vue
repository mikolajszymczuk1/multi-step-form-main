<template>
  <div
    class="singleStepLabel"
    :class="active ? 'singleStepLabel--active' : ''"
  >
    <div class="singleStepLabel__number" data-test="step-number">{{ stepNumber }}</div>
    <div class="singleStepLabel__wrapper">
      <p class="singleStepLabel__stepText" data-test="step-text">STEP {{ stepNumber }}</p>
      <p class="singleStepLabel__stepLabel" data-test="step-label">{{ label }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  stepNumber: {
    type: Number,
    default: 1,
  },
  label: {
    type: String,
    default: '',
  },
  active: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.singleStepLabel {
  $self: &;
  display: flex;
  align-items: center;

  font-family: $ubuntu;

  &__number {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 33px;
    height: 33px;

    border: solid 1px $White;
    border-radius: 50%;

    font-size: .875rem;
    color: $White;
    font-weight: 500;

    #{ $self }--active & {
      background-color: $LightBlue;
      border: 0;

      color: $MarineBlue;
    }
  }

  &__wrapper {
    display: none;

    margin-left: 16px;
  }

  &__stepText {
    margin-bottom: 4px;

    font-size: .75rem;
    color: $PastelBlue;
  }

  &__stepLabel {
    color: $White;
    font-size: .875rem;
    font-weight: 500;
    letter-spacing: 1px;
  }
}
</style>
