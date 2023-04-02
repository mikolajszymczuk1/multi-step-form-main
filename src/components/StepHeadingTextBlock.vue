<template>
<div class="stepHeadingTextBlock">
  <h1 class="stepHeadingTextBlock__title">
    <slot name="title"></slot>
  </h1>

  <p class="stepHeadingTextBlock__underTitleText">
    <slot name="text"></slot>
  </p>
</div>
</template>

<style scoped lang="scss">
.stepHeadingTextBlock {
  font-family: $ubuntu;

  &__title {
    margin-bottom: 9px;

    color: $MarineBlue;
    font-size: 1.5rem;
  }

  &__underTitleText {
    color: $CoolBray;
    line-height: 25px;
  }
}
</style>
