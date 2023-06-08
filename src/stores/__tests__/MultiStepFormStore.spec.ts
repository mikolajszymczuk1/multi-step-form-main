import {
  describe, it, expect, beforeEach,
} from 'vitest';
import type IPersonalInfoForm from '@/interfaces/IPersonalInfoForm';
import { setActivePinia, createPinia } from 'pinia';
import useMultiStepFormStore from '@/stores/MultiStepFormStore';

describe('MultiStepFormStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('Getters', () => {
    it('moYr should return correct suffix based on isYearlyMode state', () => {
      const store = useMultiStepFormStore();
      expect(store.moYr).toBe('mo');
      store.changeIsYearlyMode();
      expect(store.moYr).toBe('yr');
    });

    it('price should return correct price value based on isYearlyMode state', () => {
      const store = useMultiStepFormStore();
      expect(store.price(100)).toBe(100);
      store.changeIsYearlyMode();
      expect(store.price(100)).toBe(1000);
    });
  });

  describe('Actions', () => {
    it('changeIsYearlyMode should change isYearlyMode state', () => {
      const store = useMultiStepFormStore();
      expect(store.isYearlyMode).toBeFalsy();
      store.changeIsYearlyMode();
      expect(store.isYearlyMode).toBeTruthy();
    });

    it('setPersonalInfo should correclty set personal info data', () => {
      const store = useMultiStepFormStore();
      const testPersonalInfoData: IPersonalInfoForm = {
        name: 'test',
        email: 'test@example.com',
        phone: '555555555',
      };

      expect(store.personalInfo).toEqual({ name: '', email: '', phone: '' });
      store.setPersonalInfo(testPersonalInfoData);
      expect(store.personalInfo).toEqual({ name: 'test', email: 'test@example.com', phone: '555555555' });
    });
  });
});
