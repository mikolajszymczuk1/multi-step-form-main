import IFormData from './IFormData';
import IPersonalInfoForm from './IPersonalInfoForm';

export default interface IState {
  personalInfo: IPersonalInfoForm,
  isYearlyMode: boolean,
  formData: IFormData,
}
