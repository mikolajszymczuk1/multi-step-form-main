<template>
  <StepCard class="pickAddonsStep">
    <StepHeadingTextBlock>
      <template #title>Pick add-ons</template>
      <template #text>Add-ons help enhance your gaming experience.</template>
    </StepHeadingTextBlock>

    <StepInputsWrapper>
      <StepCheckboxInput
        v-for="button in checkboxButtonsData"
        :key="button.heading"
        :name="button.heading"
        :heading="button.heading"
        :monthly-price="button.monthlyPrice"
        v-model="selectedAddons"
        :is-yearly-mode="isYearlyMode"
      >
        {{ button.underHeading }}
      </StepCheckboxInput>
    </StepInputsWrapper>
  </StepCard>
</template>

<script setup lang="ts">
import { ref, type Ref, watch } from 'vue';
import StepCard from '@/components/cards/StepCard.vue';
import StepInputsWrapper from '@/components/StepInputsWrapper.vue';
import StepHeadingTextBlock from '@/components/StepHeadingTextBlock.vue';
import StepCheckboxInput from '@/components/StepCheckboxInput.vue';

const selectedAddons: Ref<string[]> = ref([]);
const isYearlyMode: Ref<boolean> = ref(true);

/** Checkbox buttons data */
const checkboxButtonsData = [
  { heading: 'Online service', underHeading: 'Access to multiplayer games', monthlyPrice: 1 },
  { heading: 'Larger storage', underHeading: 'Extra 1TB of cloud save', monthlyPrice: 2 },
  { heading: 'Customizable profile', underHeading: 'Custom theme on your profile', monthlyPrice: 2 },
];

watch(selectedAddons, (newVal) => {
  console.log(newVal);
});
</script>
