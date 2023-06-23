<template>
  <div class="multiStepFormWidget">
    <div class="multiStepFormWidget__topBanner">
      <SingleStepLabel step-id="personal-info" :step-number="1" label="YOUR INFO" />
      <SingleStepLabel step-id="select-your-plan" :step-number="2" label="SELECT PLAN" />
      <SingleStepLabel step-id="pick-addons" :step-number="3" label="ADD-ONS" />
      <SingleStepLabel step-id="finishing-up" :step-number="4" label="SUMMARY" />
    </div>

    <div class="multiStepFormWidget__mainContainer">
      <div class="multiStepFormWidget__singleStepContainer">
        <RouterView />
      </div>

      <div
        class="multiStepFormWidget__bottomBar"
        :class="isNotFirstStep ? 'multiStepFormWidget__bottomBar--space-between' : ''"
        v-if="route.name !== 'thank-you'"
      >
        <StepButton v-if="isNotFirstStep" :go-to="prevStep">Go Back</StepButton>
        <StepButton is-next :go-to="nextStep">Next Step</StepButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import SingleStepLabel from '@/components/SingleStepLabel.vue';
import StepButton from '@/components/buttons/StepButton.vue';

const route = useRoute();
const router = useRouter();

/** All children from '/' path as array of form steps */
const steps = router.options.routes[0].children;

/** Return true if current path is not first step */
const isNotFirstStep = computed(() => route.path !== '/');

/** Return next step name */
const nextStep = computed<string>(() => {
  let next = '';
  steps?.forEach((step, index) => {
    if (step.name === route.name && index !== steps.length - 1) {
      next = steps[index + 1].name as string;
    }
  });

  return next;
});

/** Return prev step name */
const prevStep = computed<string>(() => {
  let prev = '';
  steps?.forEach((step, index) => {
    if (step.name === route.name && index !== 0) {
      prev = steps[index - 1].name as string;
    }
  });

  return prev;
});
</script>

<style scoped lang="scss">
.multiStepFormWidget {
  @media screen and (min-width: $sm) {
    margin: 5% auto;

    width: 80%;

    background-color: $White;
    border-radius: 10px;
    overflow: hidden;
  }

  &__topBanner {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    column-gap: 16px;

    padding-top: 32px;

    height: 172px;

    background-image: url('@/assets/svg/bg-sidebar-mobile.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  &__mainContainer {
    position: relative;
  }

  &__singleStepContainer {
    margin-bottom: 72px;
  }

  &__bottomBar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;

    padding: 16px;

    width: 100%;
    height: 72px;

    background-color: $White;

    @media screen and (min-width: $sm) {
      position: relative;
    }

    &--space-between {
      justify-content: space-between;
    }
  }
}
</style>
