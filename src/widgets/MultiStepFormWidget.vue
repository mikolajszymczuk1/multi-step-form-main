<template>
  <div class="multiStepFormWidget">
    <div class="multiStepFormWidget__topBanner">
      <SingleStepLabel :step-number="1" label="YOUR INFO" active />
      <SingleStepLabel :step-number="2" label="SELECT PLAN" />
      <SingleStepLabel :step-number="3" label="ADD-ONS" />
      <SingleStepLabel :step-number="4" label="SUMMARY" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SingleStepLabel from '@/components/SingleStepLabel.vue';
</script>

<style scoped lang="scss">
.multiStepFormWidget {
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
}
</style>
