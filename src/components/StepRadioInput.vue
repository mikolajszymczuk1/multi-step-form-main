<template>
  <label
    class="stepRadioInput"
    :class="[
      isChecked ? 'stepRadioInput--selected' : '',
      isYearlyMode ? 'stepRadioInput--flexStart' : ''
    ]"
  >
    <input
      class="stepRadioInput__input"
      type="radio"
      :name="name"
      :value="heading"
      :checked="isChecked"
      @change="emitChangeValue"
      data-test="input"
    >

    <div class="stepRadioInput__radioIcon">
      <img class="stepRadioInput__icon" :src="iconPath" :alt="heading" :title="heading" data-test="icon">
    </div>

    <div class="stepRadioInput__wrapper">
      <h3 class="stepRadioInput__inputTitle" data-test="heading">{{ heading }}</h3>
      <p class="stepRadioInput__price" data-test="price">${{ price }}/{{ moYr }}</p>

      <Transition enter-active-class="animate__animated animate__fadeIn animate__faster">
        <p v-if="isYearlyMode" class="stepRadioInput__monthsFree" data-test="free">2 months free</p>
      </Transition>
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

/** Return input value */
const inputValue = computed<string>(() => props.heading);

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
const isChecked = computed<boolean>(() => props.modelValue === inputValue.value);

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
  transition: border-color 100ms ease-in-out,
              background-color 100ms ease-in-out;

  &--selected {
    border-color: $PurplishBlue;
    background-color: $Alabaster;
  }

  &--flexStart {
    align-items: flex-start;
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
