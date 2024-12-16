/*
 * @Author: Peihua
 * @Date: 2024-12-09 18:01:16
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-15 21:25:41
 * @FilePath: \fe\src\pages\logistics\edit\constants.ts
 */
import { FormRule } from 'tdesign-vue-next';
import { cloneDeep } from 'lodash';

export const FORM_RULES: Record<string, FormRule[]> = {
  // name: [{ required: true, message: '请输入合同名称', type: 'error' }],
  // type: [{ required: true, message: '请选择合同类型', type: 'error' }],
  // payment: [{ required: true, message: '请选择合同收付类型', type: 'error' }],
  // amount: [{ required: true, message: '请输入合同金额', type: 'error' }],
  // partyA: [{ required: true, message: '请选择甲方', type: 'error' }],
  // partyB: [{ required: true, message: '请选择乙方', type: 'error' }],
  // signDate: [{ required: true, message: '请选择日期', type: 'error' }],
  // startDate: [{ required: true, message: '请选择日期', type: 'error' }],
  // endDate: [{ required: true, message: '请选择日期', type: 'error' }],
};

export const INITIAL_DATA = {
  name: '',
  type: '',
  partyA: '',
  partyB: '',
  signDate: '',
  startDate: '',
  endDate: '',
  payment: '1',
  amount: 0,
  comment: '',
  files: [],
};

export const Address = {
  name: '',
  zipCode: '',
  countryCode: '',
  state: '',
  city: '',
  detailAddress: '',
  telephone: '',
  district: '',
};

export const defaultItemParam = {
  quantity: 1,
  englishName: '',
  unitPrice: 0,
  unitPriceCurrency: 'USD',
};

export const LogisticsData = {
  solutionParam: {
    solutionCode: 'CN_GLO_EXP',
    doorPickupParam: cloneDeep(Address),
  },
  packageParams: [
    {
      weight: 0,
      itemParams: [cloneDeep(defaultItemParam)],
    },
  ],
  senderParam: cloneDeep(Address),
  receiverParam: cloneDeep(Address),
  returnerParam: cloneDeep(Address),
};
