<template>
  <StepCard class="selectYourPlanStep">
    <StepHeadingTextBlock>
      <template #title>Select your plan</template>
      <template #text>You have the option of monthly or yearly billing.</template>
    </StepHeadingTextBlock>

    <div class="selectYourPlanStep__inputsWrapper">
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
    </div>
  </StepCard>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';

import StepCard from '@/components/cards/StepCard.vue';
import StepHeadingTextBlock from '@/components/StepHeadingTextBlock.vue';
import StepRadioInput from '@/components/StepRadioInput.vue';

import arcadeIcon from '@/assets/svg/icon-arcade.svg';
import advancedIcon from '@/assets/svg/icon-advanced.svg';
import proIcon from '@/assets/svg/icon-pro.svg';

/** Radio buttons data */
const radioButtonsData = [
  { icon: arcadeIcon, heading: 'Arcade', monthlyPrice: 9 },
  { icon: advancedIcon, heading: 'Advanced', monthlyPrice: 12 },
  { icon: proIcon, heading: 'Pro', monthlyPrice: 15 },
];

const selectedPlan: Ref<string> = ref('9mo');
const isYearlyMode: Ref<boolean> = ref(false);
</script>

<style scoped lang="scss">
.selectYourPlanStep {
  &__inputsWrapper {
    display: flex;
    flex-direction: column;
    row-gap: 12px;

    margin-top: 22px;
  }
}
</style>
