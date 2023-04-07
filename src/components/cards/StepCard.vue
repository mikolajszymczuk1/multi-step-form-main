<template>
  <div class="stepCard">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.stepCard {
  margin: 0 auto;
  padding: 32px 24px;

  width: 91%;

  background-color: $White;
  border-radius: 10px;
  transform: translateY(-73px);
  box-shadow: 0 25px 40px -20px rgba(black, 0.1);
}
</style>
