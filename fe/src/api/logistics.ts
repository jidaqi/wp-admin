/*
 * @Author: Peihua
 * @Date: 2024-12-09 13:28:08
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-15 14:43:54
 * @FilePath: \fe\src\api\logistics.ts
 * @Description:
 */
import { request } from '@/utils/request';
import type { LogisticsBody } from './model/logisticsModel';

const Api = {
  AddLogistics: '/logistics/add',
  List: '/logistics/list',
};

export function addLogistics(data: LogisticsBody): Promise<Result> {
  return request.post({
    url: Api.AddLogistics,
    data,
  });
}

export function getLogistics(): Promise<Result> {
  return request.get({
    url: Api.List,
  });
}
