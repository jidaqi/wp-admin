/*
 * @Author: Peihua
 * @Date: 2024-12-22 20:36:32
 * @LastEditors: Peihua
 * @LastEditTime: 2025-01-06 00:29:04
 * @FilePath: \fe\src\api\user.ts
 * @Description:
 */
import { request } from '@/utils/request';
import { UserAdd, UserList, UserLoginReq, UserLoginRes, UserQuery } from './model/userModel';
import { Result } from '@/types/axios';

const Api = {
  Login: '/users/login',
  List: '/users/list',
  Add: '/users/add',
};

export function userLogin(data: UserLoginReq): Promise<Result<UserLoginRes>> {
  return request.post({
    url: Api.Login,
    data,
  });
}

export function getUsers(query: UserQuery): Promise<Result<UserList>> {
  return request.get({
    url: Api.List,
    params: query,
  });
}

export function addUser(data: UserAdd): Promise<Result> {
  return request.post({
    url: Api.Add,
    data,
  });
}
