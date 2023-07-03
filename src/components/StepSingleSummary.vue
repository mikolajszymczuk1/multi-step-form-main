<template>
  <div class="stepSingleSummary">
    <div class="stepSingleSummary__leftCol" data-test="left-col">
      <slot name="leftCol"></slot>
    </div>

    <div class="stepSingleSummary__rightCol" data-test="right-col">
      <slot name="rightCol"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stepSingleSummary {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
