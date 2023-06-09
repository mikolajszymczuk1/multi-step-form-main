<template>
  <div class="stepSingleSummary">
    <div class="stepSingleSummary__leftCol">
      <slot name="leftCol"></slot>
    </div>

    <div class="stepSingleSummary__rightCol">
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
