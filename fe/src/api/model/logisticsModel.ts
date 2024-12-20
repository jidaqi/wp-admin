import { ListQuery } from './commonModel';

/*
 * @Author: Peihua
 * @Date: 2024-12-09 13:28:28
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-20 14:41:28
 * @FilePath: \fe\src\api\model\logisticsModel.ts
 * @Description: 物流接口类型定义
 */
interface Address {
  name: string;
  zipCode: string;
  countryCode: string;
  state: string;
  city: string;
  detailAddress: string;
}

export interface LogisticsBody {
  solutionParam: {
    outOrderId?: string; // 外部订单号
    doorPickupParam: Address;
  };
  packageParams: {
    weight: number;
    itemParams: {
      quantity: number;
      englishName: string;
      unitPrice: number;
      unitPriceCurrency: string;
    }[];
  }[];
  senderParam: Address;
  receiverParam: Address;
  returnerParam: Address;
}

export interface LogisticsList {
  count: number;
  rows: {
    createdAt: string;
    doorPickupParam: Address;
    doorPickupParamId: 10;
    id: 3;
    laneCode: string;
    laneLastMileCP: string;
    laneName: string;
    orderCode: string;
    outOrderId: string;
    packageParams: Address;
    receiverParam: Address;
    receiverParamId: number;
    returnerParam: Address;
    returnerParamId: number;
    senderParam: Address;
    senderParamId: number;
    solutionCode: string;
    sortCode: string;
    trackingNumber: string;
    updatedAt: string;
    userSortCode: string;
  }[];
  page: number;
  pageSize: number;
}

export interface LogisticsQuery extends ListQuery {
  orderCode?: string;
  solutionCode?: string;
}

export interface TrackResultData {
  traceDetailList: {
    actionCode: string;
    desc: string;
    location: string;
    locationDetail: { zipCode: string };
    zipCode: string;
    mergeDescription: string;
    opCode: string;
    opCodeDesc: string;
    time: string;
    timeZone: string;
  }[];
}
