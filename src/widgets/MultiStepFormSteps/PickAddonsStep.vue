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
        v-model="store.formData.selectedAddons"
      >
        {{ button.underHeading }}
      </StepCheckboxInput>
    </StepInputsWrapper>
  </StepCard>
</template>

<script setup lang="ts">
import useMultiStepFormStore from '@/stores/MultiStepFormStore';
import { checkboxButtonsData } from '@/data/inputsData';

import StepCard from '@/components/cards/StepCard.vue';
import StepInputsWrapper from '@/components/StepInputsWrapper.vue';
import StepHeadingTextBlock from '@/components/StepHeadingTextBlock.vue';
import StepCheckboxInput from '@/components/StepCheckboxInput.vue';

const store = useMultiStepFormStore();
</script>
