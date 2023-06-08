import { createRouter, createWebHistory } from 'vue-router';
import useMultiStepFormStore from '@/stores/MultiStepFormStore';
import PersonalInfoStep from '@/widgets/MultiStepFormSteps/PersonalInfoStep.vue';
import SelectYourPlanStep from '@/widgets/MultiStepFormSteps/SelectYourPlanStep.vue';
import PickAddonsStep from '@/widgets/MultiStepFormSteps/PickAddonsStep.vue';
import FinishingUpStep from '@/widgets/MultiStepFormSteps/FinishingUpStep.vue';
import ThankYouStep from '@/widgets/MultiStepFormSteps/ThankYouStep.vue';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'personal-info',
          component: PersonalInfoStep,
        },
        {
          path: 'select-your-plan',
          name: 'select-your-plan',
          component: SelectYourPlanStep,
        },
        {
          path: 'pick-addons',
          name: 'pick-addons',
          component: PickAddonsStep,
        },
        {
          path: 'finishing-up',
          name: 'finishing-up',
          component: FinishingUpStep,
        },
        {
          path: 'thank-you',
          name: 'thank-you',
          component: ThankYouStep,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const store = useMultiStepFormStore();
  if (to.name !== 'personal-info'
  && (store.personalInfo.name === '' || store.personalInfo.email === '' || store.personalInfo.phone === '')) {
    next({ name: 'personal-info' });
  } else {
    next();
  }
});

export default router;
