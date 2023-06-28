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
      +${{ store.price(monthlyPrice) }}/{{ store.moYr }}
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
import useMultiStepFormStore from '@/stores/MultiStepFormStore';
import checkmarkIcon from '@/assets/svg/icon-checkmark.svg';

const store = useMultiStepFormStore();

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
  cursor: pointer;

  @media screen and (min-width: $xlg) {
    padding: 0 24px;

    height: 81px;
  }

  &:hover {
    border-color: $PurplishBlue;
  }

  &--checked {
    border-color: $PurplishBlue;
    background-color: $Alabaster;
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

    @media screen and (min-width: $xlg) {
      margin-right: 24px;
    }

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

    @media screen and (min-width: $xlg) {
      margin-bottom: 7px;

      font-size: 1rem;
    }
  }

  &__underHeading {
    font-size: 0.75rem;
    color: $CoolBray;
    font-weight: 400;

    @media screen and (min-width: $xlg) {
      font-size: .9375rem;
    }
  }

  &__priceContainer {
    font-size: 0.75rem;
    color: $PurplishBlue;
    font-family: $ubuntu;

    @media screen and (min-width: $xlg) {
      font-size: .9375rem;
    }
  }
}
</style>
