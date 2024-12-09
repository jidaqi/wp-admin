/*
 * @Author: Peihua
 * @Date: 2024-12-09 13:28:08
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-09 17:46:33
 * @FilePath: \fe\src\api\logistics.ts
 * @Description:
 */
import { request } from '@/utils/request';
import type { LogisticsBody } from './model/logisticsModel';

const Api = {
  AddLogistics: '/logistics/add',
};

export function addLogistics(data: LogisticsBody) {
  return request.post({
    url: Api.AddLogistics,
    data,
  });
}
