<template>
  <StepCard class="thankYouStep">
    <StepHeadingTextBlock text-center>
      <template #topContent>
        <img
          class="thankYouStep__thankYouIcon"
          :src="thankYouIcon"
          alt="Thank you icon"
          title="Thank you"
        >
      </template>
      <template #title>Thank you!</template>
      <template #text>
        Thanks for confirming your subscription! We hope you have fun using our platform.
        If you ever need support, please feel free to email us at support@loremgaming.com.
      </template>
    </StepHeadingTextBlock>
  </StepCard>
</template>

<script setup lang="ts">
import StepCard from '@/components/cards/StepCard.vue';
import StepHeadingTextBlock from '@/components/StepHeadingTextBlock.vue';

import thankYouIcon from '@/assets/svg/icon-thank-you.svg';
</script>

<style scoped lang="scss">
.thankYouStep {
  padding-top: 79px;
  padding-bottom: 79px;

  &__thankYouIcon {
    margin-bottom: 24px;

    width: 56px;
    height: 56px;
  }
}
</style>
