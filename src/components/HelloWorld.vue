<template>
  <h1 class="message">{{ msg }}</h1>
</template>

<script setup lang="ts">
const msg = 'Hello World !';
</script>

<style lang="scss">
  .message {
    padding: 25px 0;

    color: red;
    font-family: $roboto;
    font-weight: 500;
    text-align: center;
  }
</style>
