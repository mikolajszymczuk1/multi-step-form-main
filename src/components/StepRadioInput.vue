<template>
  <label class="stepRadioInput" :class="isChecked ? 'stepRadioInput--selected' : ''">
    <input
      class="stepRadioInput__input"
      type="radio"
      :name="name"
      :value="`${price}${moYr}`"
      :checked="isChecked"
      @change="emitChangeValue"
    >

    <div class="stepRadioInput__radioIcon">
      <img class="stepRadioInput__icon" :src="iconPath" :alt="heading" :title="heading">
    </div>

    <div class="stepRadioInput__wrapper">
      <h3 class="stepRadioInput__inputTitle">{{ heading }}</h3>
      <p class="stepRadioInput__price">${{ price }}/{{ moYr }}</p>
      <p v-if="isYearlyMode" class="stepRadioInput__monthsFree">2 months free</p>
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  iconPath: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  heading: {
    type: String,
    default: '',
  },
  monthlyPrice: {
    type: Number,
    default: 0,
  },
  isYearlyMode: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

/** Return monthly or yearly price */
const price = computed<number>(() => {
  if (props.isYearlyMode) {
    return props.monthlyPrice * 10;
  }

  return props.monthlyPrice;
});

/** Based on isYearlyMode prop return 'yr' or 'mo' */
const moYr = computed<string>(() => {
  if (props.isYearlyMode) {
    return 'yr';
  }

  return 'mo';
});

/** Return true if modelValue is equal current input value */
const isChecked = computed<boolean>(() => props.modelValue === `${price.value}${moYr.value}`);

/** Emit radio input value */
const emitChangeValue = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style lang="scss" scoped>
.stepRadioInput {
  display: flex;
  align-items: center;

  padding: 14px 16px 18px 16px;

  border-radius: 8px;
  border: 1px solid $LightBray;

  &--selected {
    border-color: $PurplishBlue;
    background-color: $Alabaster;
  }

  &__input {
    display: none;
  }

  &__radioIcon {
    display: flex;

    margin-right: 14px;
  }

  &__icon {}

  &__wrapper {
    font-family: $ubuntu;
  }

  &__inputTitle {
    margin-bottom: 7px;

    font-weight: 500;
    font-size: 1rem;
    color: $MarineBlue;
  }

  &__price {
    font-weight: 400;
    font-size: .875rem;
    color: $CoolBray;
  }

  &__monthsFree {
    margin-top: 11px;

    font-size: .75rem;
    color: $MarineBlue;
  }
}
</style>
