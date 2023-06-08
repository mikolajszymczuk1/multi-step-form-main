import { defineStore } from 'pinia';
import type IState from '@/interfaces/IState';
import type IPersonalInfoForm from '@/interfaces/IPersonalInfoForm';

const YEARS_SHORT = 'yr';
const MONTHS_SHORT = 'mo';
const ALL_YEAR = 12;
const FREE_MONTHS = 2;

const useMultiStepFormStore = defineStore('multiStep', {
  state: (): IState => ({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
    },
    isYearlyMode: false,
    formData: {
      selectedPlan: 'Arcade',
      selectedAddons: [],
    },
  }),
  getters: {
    /** Return years/months suffix */
    moYr(state): string {
      return state.isYearlyMode ? YEARS_SHORT : MONTHS_SHORT;
    },

    /** Return monthly or yearly price */
    price(state) {
      return (monthlyPrice: number) => (state.isYearlyMode ? monthlyPrice * (ALL_YEAR - FREE_MONTHS) : monthlyPrice);
    },
  },
  actions: {
    /** Change value for isYearlyMode state */
    changeIsYearlyMode(): void {
      this.isYearlyMode = !this.isYearlyMode;
    },

    /** Set values for personal info */
    setPersonalInfo(personalInfoValues: IPersonalInfoForm): void {
      this.personalInfo = { ...personalInfoValues };
    },
  },
});

export default useMultiStepFormStore;
