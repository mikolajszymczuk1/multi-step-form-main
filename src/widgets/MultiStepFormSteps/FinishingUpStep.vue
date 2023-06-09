<template>
  <StepCard class="finishingUpStep">
    <StepHeadingTextBlock>
      <template #title>Finishing up</template>
      <template #text>Double-check everything looks OK before confirming.</template>
    </StepHeadingTextBlock>

    <div class="finishingUpStep__summaryContainer">
      <StepSingleSummary>
        <template #leftCol>
          <h3 class="finishingUpStep__heading">
            {{ store.formData.selectedPlan }} ({{ store.isYearlyMode ? 'Yearly' : 'Monthly' }})
          </h3>

          <RouterLink class="finishingUpStep__changePlanLink" :to="{ name: 'select-your-plan' }">
            Change
          </RouterLink>
        </template>

        <template #rightCol>
          <div class="finishingUpStep__price finishingUpStep__price--bold">${{ planPrice }}/{{ store.moYr }}</div>
        </template>
      </StepSingleSummary>

      <div class="finishingUpStep__addonsContainer">
        <StepSingleSummary v-for="addon in addonsWithPrices" :key="addon.heading">
          <template #leftCol>
            <h3 class="finishingUpStep__colText">{{ addon.heading }}</h3>
          </template>

          <template #rightCol>
            <div class="finishingUpStep__price">+${{ addon.price }}/{{ store.moYr }}</div>
          </template>
        </StepSingleSummary>
      </div>
    </div>

    <div class="finishingUpStep__summaryTotalBar">
      <StepSingleSummary>
        <template #leftCol>
          <h3 class="finishingUpStep__colText">Total (per {{ store.isYearlyMode ? 'year' : 'month' }})</h3>
        </template>

        <template #rightCol>
          <div class="finishingUpStep__price finishingUpStep__price--color finishingUpStep__price--bold">
            +${{ totalPrice }}/{{ store.moYr }}
          </div>
        </template>
      </StepSingleSummary>
    </div>
  </StepCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { radioButtonsData, checkboxButtonsData } from '@/data/inputsData';
import type IRadioButton from '@/interfaces/IRadioButton';
import type ICheckboxButton from '@/interfaces/ICheckboxButton';

import useMultiStepFormStore from '@/stores/MultiStepFormStore';
import StepCard from '@/components/cards/StepCard.vue';
import StepHeadingTextBlock from '@/components/StepHeadingTextBlock.vue';
import StepSingleSummary from '@/components/StepSingleSummary.vue';

type AddonWithPrice = {
  heading: string,
  price: number,
};

const store = useMultiStepFormStore();

/** Return calculated plan price */
const planPrice = computed<number>(() => {
  const price = radioButtonsData.find((el: IRadioButton) => el.heading === store.formData.selectedPlan).monthlyPrice;
  return store.price(price);
});

/** Return array of objects with addons' headings and prices */
const addonsWithPrices = computed<AddonWithPrice[]>(() => {
  const addons: AddonWithPrice[] = [];
  store.formData.selectedAddons.forEach((addon: string) => {
    const addonToAdd: ICheckboxButton = checkboxButtonsData.find((el: ICheckboxButton) => el.heading === addon);
    addons.push({ heading: addonToAdd.heading, price: store.price(addonToAdd.monthlyPrice) });
  });

  return addons;
});

/** Return total price for all selected elements */
const totalPrice = computed<number>(() => {
  let total = 0;
  total += planPrice.value;
  addonsWithPrices.value.forEach((el: AddonWithPrice) => { total += el.price; });
  return total;
});
</script>

<style scoped lang="scss">
.finishingUpStep {
  &__summaryContainer {
    margin-top: 22px;
    padding: 16px;

    background-color: $Alabaster;
    border-radius: 8px;

    font-family: $ubuntu;
  }

  &__heading {
    margin-bottom: 3px;

    color: $MarineBlue;
    font-size: 0.875rem;
    font-weight: 500;
  }

  &__changePlanLink {
    color: $CoolBray;
    font-size: 0.875rem;
  }

  &__price {
    font-size: 0.875rem;
    color: $MarineBlue;

    &--bold {
      font-weight: 700;
    }

    &--color {
      color: $PurplishBlue;
      font-size: 1rem;
    }
  }

  &__addonsContainer {
    display: flex;
    flex-direction: column;
    row-gap: 14px;

    padding-top: 12px;
    margin-top: 12px;

    border-top: solid 1px rgba($CoolBray, 0.2);
  }

  &__colText {
    font-size: 0.875rem;
    color: $CoolBray;
    font-weight: 400;
  }

  &__summaryTotalBar {
    margin-top: 24px;
    padding: 0 16px;

    font-family: $ubuntu;
  }
}
</style>
