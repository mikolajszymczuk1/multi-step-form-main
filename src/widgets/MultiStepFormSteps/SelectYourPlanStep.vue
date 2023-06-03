<template>
  <StepCard class="selectYourPlanStep">
    <StepHeadingTextBlock>
      <template #title>Select your plan</template>
      <template #text>You have the option of monthly or yearly billing.</template>
    </StepHeadingTextBlock>

    <StepInputsWrapper>
      <StepRadioInput
        v-for="button in radioButtonsData"
        :key="button.icon"
        :icon-path="button.icon"
        :heading="button.heading"
        name="plan"
        :monthly-price="button.monthlyPrice"
        v-model="selectedPlan"
        :is-yearly-mode="isYearlyMode"
      />
    </StepInputsWrapper>

    <div class="selectYourPlanStep__bottomBar">
      <p
        class="selectYourPlanStep__barText"
        :class="isYearlyMode ? '' : 'selectYourPlanStep__barText--highlight'"
      >
        Monthly
      </p>

      <PaymentModeButton @paymentMode="onChangePaymentMode" />

      <p
        class="selectYourPlanStep__barText"
        :class="isYearlyMode ? 'selectYourPlanStep__barText--highlight' : ''"
      >
        Yearly
      </p>
    </div>
  </StepCard>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';

import StepCard from '@/components/cards/StepCard.vue';
import StepInputsWrapper from '@/components/StepInputsWrapper.vue';
import StepHeadingTextBlock from '@/components/StepHeadingTextBlock.vue';
import StepRadioInput from '@/components/StepRadioInput.vue';
import PaymentModeButton from '@/components/buttons/PaymentModeButton.vue';

import arcadeIcon from '@/assets/svg/icon-arcade.svg';
import advancedIcon from '@/assets/svg/icon-advanced.svg';
import proIcon from '@/assets/svg/icon-pro.svg';

const MONTHLY_DEFAULT_VALUE = 9;
const YEARLY_DEFAULT_VALUE = 90;

/** Radio buttons data */
const radioButtonsData = [
  { icon: arcadeIcon, heading: 'Arcade', monthlyPrice: 9 },
  { icon: advancedIcon, heading: 'Advanced', monthlyPrice: 12 },
  { icon: proIcon, heading: 'Pro', monthlyPrice: 15 },
];

const selectedPlan: Ref<number> = ref(MONTHLY_DEFAULT_VALUE);
const isYearlyMode: Ref<boolean> = ref(false);

/** Change payment mode value */
const onChangePaymentMode = (value: boolean) => {
  isYearlyMode.value = value;
  selectedPlan.value = value ? YEARLY_DEFAULT_VALUE : MONTHLY_DEFAULT_VALUE;
};
</script>

<style scoped lang="scss">
.selectYourPlanStep {
  &__bottomBar {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 24px;

    margin-top: 24px;

    background-color: $Alabaster;
    border-radius: 8px;

    font-family: $ubuntu;
  }

  &__barText {
    transition: color 150ms ease-in-out;

    font-size: .875rem;
    font-weight: 500;
    color: $CoolBray;

    &--highlight {
      color: $MarineBlue;
    }
  }
}
</style>
