import { ListQuery } from "./commonModel"

/*
 * @Author: Peihua
 * @Date: 2024-12-22 20:36:47
 * @LastEditors: Peihua
 * @LastEditTime: 2025-01-06 00:28:57
 * @FilePath: \fe\src\api\model\userModel.ts
 * @Description: 
 */
export interface UserLoginReq {
  account: string
  password: string
}

export interface UserLoginRes {
  account: string
  username: string
  token: string
}

export interface UserQuery extends ListQuery {
  username: string
  account: string
}

export interface UserList {
  count: number;
  rows: {
    id: number
    username: string
    account: string
    createdAt: string
    updatedAt: string
  }[];
  page: number;
  pageSize: number;
}

export interface UserAdd {
  account: string
  username: string
  password: string
}