<template>
  <div class="stepTextInput">
    <label class="stepTextInput__label" :for="name" data-test="label">{{ labelText }}</label>

    <input
      :id="name"
      class="stepTextInput__input"
      :class="errorMessage ? 'stepTextInput__input--error' : ''"
      v-model="value"
      type="text"
      :name="name"
      :placeholder="placeholder"
      data-test="input"
    >

    <div class="stepTextInput__errorMessage" data-test="message">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps({
  labelText: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
});

const { errorMessage, value } = useField(() => props.name);
</script>

<style lang="scss">
.stepTextInput {
  position: relative;

  &__label {
    display: block;

    margin-bottom: 3px;

    font-family: $ubuntu;
    font-size: .75rem;
    color: $MarineBlue;

    @media screen and (min-width: $xlg) {
      margin-bottom: 8px;

      font-size: .875rem;
    }
  }

  &__input {
    padding-left: 16px;

    width: 100%;
    height: 40px;

    border-radius: 4px;
    border: solid 1px $LightBray;

    font-family: $ubuntu;
    color: $MarineBlue;
    font-size: .9375rem;
    font-weight: 500;

    @media screen and (min-width: $xlg) {
      height: 48px;

      border-radius: 8px;

      font-size: 1rem;
    }

    &::placeholder {
      color: $CoolBray;
    }

    &:focus {
      outline: solid 1px $PurplishBlue;
    }

    &--error {
      outline: solid 1px $StrawberryRed !important;
    }
  }

  &__errorMessage {
    position: absolute;
    right: 0;
    top: -3px;

    font-size: .75rem;
    color: $StrawberryRed;
    font-family: $ubuntu;
    font-weight: 700;
  }
}
</style>
