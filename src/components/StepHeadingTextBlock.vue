<template>
  <div
    class="stepHeadingTextBlock"
    :class="textCenter ? 'stepHeadingTextBlock--textCenter' : ''"
  >
    <div class="stepHeadingTextBlock__topContent" data-test="topContent">
      <slot name="topContent"></slot>
    </div>

    <h1 class="stepHeadingTextBlock__title" data-test="title">
      <slot name="title"></slot>
    </h1>

    <p class="stepHeadingTextBlock__underTitleText" data-test="text">
      <slot name="text"></slot>
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  textCenter: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.stepHeadingTextBlock {
  font-family: $ubuntu;

  &--textCenter {
    text-align: center;
  }

  &__title {
    margin-bottom: 9px;

    color: $MarineBlue;
    font-size: 1.5rem;

    @media screen and (min-width: $xlg) {
      margin-bottom: 11px;

      font-size: 2rem;
    }
  }

  &__underTitleText {
    color: $CoolBray;
    line-height: 25px;
  }
}
</style>
