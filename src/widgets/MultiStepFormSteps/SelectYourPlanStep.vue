<template>
  <StepCard class="selectYourPlanStep">
    <StepHeadingTextBlock>
      <template #title>Select your plan</template>
      <template #text>You have the option of monthly or yearly billing.</template>
    </StepHeadingTextBlock>

    <StepInputsWrapper class="selectYourPlanStep__inputsWrapper">
      <StepRadioInput
        v-for="button in radioButtonsData"
        :key="button.icon"
        :icon-path="button.icon"
        :heading="button.heading"
        name="plan"
        :monthly-price="button.monthlyPrice"
        v-model="store.formData.selectedPlan"
      />
    </StepInputsWrapper>

    <div class="selectYourPlanStep__bottomBar">
      <p
        class="selectYourPlanStep__barText"
        :class="store.isYearlyMode ? '' : 'selectYourPlanStep__barText--highlight'"
      >
        Monthly
      </p>

      <PaymentModeButton />

      <p
        class="selectYourPlanStep__barText"
        :class="store.isYearlyMode ? 'selectYourPlanStep__barText--highlight' : ''"
      >
        Yearly
      </p>
    </div>
  </StepCard>
</template>

<script setup lang="ts">
import useMultiStepFormStore from '@/stores/MultiStepFormStore';
import { radioButtonsData } from '@/data/inputsData';

import StepCard from '@/components/cards/StepCard.vue';
import StepInputsWrapper from '@/components/StepInputsWrapper.vue';
import StepHeadingTextBlock from '@/components/StepHeadingTextBlock.vue';
import StepRadioInput from '@/components/StepRadioInput.vue';
import PaymentModeButton from '@/components/buttons/PaymentModeButton.vue';

const store = useMultiStepFormStore();
</script>

<style scoped lang="scss">
.selectYourPlanStep {
  &__inputsWrapper {
    @media screen and (min-width: $lg) {
      flex-direction: row;
      column-gap: 18px;
      row-gap: 0;
    }
  }

  &__bottomBar {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 24px;

    padding: 13px 0 14px 0;
    margin-top: 24px;

    background-color: $Alabaster;
    border-radius: 8px;

    font-family: $ubuntu;

    @media screen and (min-width: $xlg) {
      margin-top: 32px;
    }
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
