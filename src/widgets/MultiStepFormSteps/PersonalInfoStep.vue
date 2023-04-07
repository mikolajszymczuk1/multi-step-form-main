<template>
  <StepCard class="personalInfoStep">
    <StepHeadingTextBlock>
      <template #title>Personal Info</template>
      <template #text>Please provide your name, email address, and phone number.</template>
    </StepHeadingTextBlock>

    <div class="personalInfoStep__inputsWrapper">
      <StepTextInput label-text="Name" name="name" placeholder="e.g. Stephen King" />
      <StepTextInput label-text="Email Address" name="email" placeholder="e.g. stephenking@lorem.com" />
      <StepTextInput label-text="Phone Number" name="phone" placeholder="e.g. +1 234 567 890" />
    </div>
  </StepCard>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { onBeforeRouteLeave } from 'vue-router';
import StepCard from '@/components/cards/StepCard.vue';
import StepHeadingTextBlock from '@/components/StepHeadingTextBlock.vue';
import StepTextInput from '@/components/StepTextInput.vue';

interface PersonalInfoForm {
  name: string;
  email: string;
  phone: string;
}

/** Personal info schema */
const personalInfoSchema = object({
  name: string().required('Please enter your name').min(2, 'Name must be at least 2 characters long'),
  email: string().email('Please enter a valid email address').required('Please enter your email address'),
  phone: string().required('Please enter your phone number'),
});

const { validate, meta } = useForm<PersonalInfoForm>({ validationSchema: personalInfoSchema });

onBeforeRouteLeave((to, from, next) => {
  validate();
  if (meta.value.valid) {
    next();
  } else {
    next(false);
  }
});
</script>

<style scoped lang="scss">
.personalInfoStep {
  &__inputsWrapper {
    display: flex;
    flex-direction: column;
    row-gap: 16px;

    margin-top: 22px;
  }
}
</style>
