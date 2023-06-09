import type IRadioButton from '@/interfaces/IRadioButton';
import type ICheckboxButton from '@/interfaces/ICheckboxButton';

import arcadeIcon from '@/assets/svg/icon-arcade.svg';
import advancedIcon from '@/assets/svg/icon-advanced.svg';
import proIcon from '@/assets/svg/icon-pro.svg';

/** Radio buttons data */
const radioButtonsData: IRadioButton[] = [
  { icon: arcadeIcon, heading: 'Arcade', monthlyPrice: 9 },
  { icon: advancedIcon, heading: 'Advanced', monthlyPrice: 12 },
  { icon: proIcon, heading: 'Pro', monthlyPrice: 15 },
];

/** Checkbox buttons data */
const checkboxButtonsData: ICheckboxButton[] = [
  { heading: 'Online service', underHeading: 'Access to multiplayer games', monthlyPrice: 1 },
  { heading: 'Larger storage', underHeading: 'Extra 1TB of cloud save', monthlyPrice: 2 },
  { heading: 'Customizable profile', underHeading: 'Custom theme on your profile', monthlyPrice: 2 },
];

export { radioButtonsData, checkboxButtonsData };
