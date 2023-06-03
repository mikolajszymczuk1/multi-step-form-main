<template>
  <label
    class="stepCheckboxInput"
    :class="isChecked ? 'stepCheckboxInput--checked': ''"
  >
    <input
      class="stepCheckboxInput__input"
      type="checkbox"
      :name="name"
      :value="inputValue"
      :checked="isChecked"
      @change="emitChangeValue"
      data-test="input"
    >

    <div class="stepCheckboxInput__wrapper">
      <div class="stepCheckboxInput__customCheckbox">
        <img class="stepCheckboxInput__checkboxIcon" :src="checkmarkIcon" alt="Checkmark icon" title="Checkmark">
      </div>

      <div class="stepCheckboxInput__headingsContainer">
        <h3 class="stepCheckboxInput__heading">{{ heading }}</h3>
        <p class="stepCheckboxInput__underHeading">
          <slot></slot>
        </p>
      </div>
    </div>

    <div class="stepCheckboxInput__priceContainer">
      +${{ price }}/{{ moYr }}
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import checkmarkIcon from '@/assets/svg/icon-checkmark.svg';

const props = defineProps({
  heading: {
    type: String,
    default: '',
  },
  name: {
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
    type: Array as PropType<string[]>,
    default: () => [],
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
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

/** Return true if value exists in modelValue array for checkboxes */
const isChecked = computed<boolean>(() => props.modelValue.includes(inputValue.value));

/** Emit checkbox input value */
const emitChangeValue = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const { checked } = target;
  const newValue: string[] = [...props.modelValue];

  if (checked) {
    newValue.push(inputValue.value);
  } else {
    newValue.splice(newValue.indexOf(inputValue.value), 1);
  }

  emit('update:modelValue', newValue);
};
</script>

<style scoped lang="scss">
.stepCheckboxInput {
  $self: &;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 16px;

  height: 62px;

  border-radius: 8px;
  border: solid 1px $LightBray;
  transition: border-color 150ms ease-out;

  &--checked {
    border-color: $PurplishBlue;
  }

  &__input {
    display: none;
  }

  &__wrapper {
    display: flex;
    align-items: center;
  }

  &__customCheckbox {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 16px;

    width: 20px;
    height: 20px;

    border-radius: 4px;
    border: solid 1px $LightBray;
    overflow: hidden;
    background-color: $White;
    transition: background-color 100ms ease-out;

    #{ $self }--checked & {
      background-color: $PurplishBlue;
      border: 0;
    }
  }

  &__checkboxIcon {
    transform: scale(0);
    transition: transform 150ms ease-out;

    #{ $self }--checked & {
      transform: scale(1);
    }
  }

  &__headingsContainer {
    font-family: $ubuntu;
  }

  &__heading {
    margin-bottom: 6px;

    font-size: 0.875rem;
    font-weight: 500;
    color: $MarineBlue;
  }

  &__underHeading {
    font-size: 0.75rem;
    color: $CoolBray;
    font-weight: 400;
  }

  &__priceContainer {
    font-size: 0.75rem;
    color: $PurplishBlue;
    font-family: $ubuntu;
  }
}
</style>
