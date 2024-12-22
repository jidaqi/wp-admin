/*
 * @Author: Peihua
 * @Date: 2024-12-22 20:36:32
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-22 21:01:12
 * @FilePath: \fe\src\api\user.ts
 * @Description:
 */
import { request } from '@/utils/request';
import { UserLoginReq } from './model/userModel';
import { Result } from '@/types/axios';

const Api = {
  Login: '/users/login',
};

export function userLogin(data: UserLoginReq): Promise<Result<string>> {
  return request.post({
    url: Api.Login,
    data
  })
}