import type IFormData from './IFormData';
import type IPersonalInfoForm from './IPersonalInfoForm';

export default interface IState {
  personalInfo: IPersonalInfoForm,
  isYearlyMode: boolean,
  formData: IFormData,
}
