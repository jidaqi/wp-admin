/*
 * @Author: Peihua
 * @Date: 2024-12-09 13:28:08
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-15 20:51:27
 * @FilePath: \fe\src\api\logistics.ts
 * @Description:
 */
import { request } from '@/utils/request';
import type { LogisticsBody, LogisticsList, LogisticsQuery } from './model/logisticsModel';
import { Result } from '@/types/axios';

const Api = {
  AddLogistics: '/logistics/add',
  List: '/logistics/list',
  Cancel: '/logistics/cancel',
};

export function addLogistics(data: LogisticsBody): Promise<Result<LogisticsList>> {
  return request.post({
    url: Api.AddLogistics,
    data,
  });
}

export function getLogistics(query: LogisticsQuery): Promise<Result> {
  return request.get({
    url: Api.List,
    params: query
  });
}

export function cancel(data: { orderCode: string }): Promise<Result> {
  return request.post({
    url: Api.Cancel,
    data,
  });
}
