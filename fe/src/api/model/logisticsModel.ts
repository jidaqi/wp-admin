/*
 * @Author: Peihua
 * @Date: 2024-12-09 13:28:28
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-10 06:07:57
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
