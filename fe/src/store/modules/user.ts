/*
 * @Author: Peihua
 * @Date: 2024-12-08 23:32:11
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-22 21:20:15
 * @FilePath: \fe\src\store\modules\user.ts
 * @Description: 
 */
import { defineStore } from 'pinia';
import { TOKEN_NAME } from '@/config/global';
import { store, usePermissionStore } from '@/store';
import { userLogin } from '@/api/user';

const InitUserInfo = {
  roles: [],
};

type UserInfoKeys = 'account' | 'password' | 'isRemember';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem(TOKEN_NAME), // 默认token不走权限
    userInfo: { ...InitUserInfo },
    accountInfo: { account: undefined, password: undefined, isRemember: false },
  }),
  getters: {
    roles: (state) => {
      return state.userInfo?.roles;
    },
  },
  actions: {
    async login(userInfo: Record<UserInfoKeys, any>) {
      const { account, password, isRemember } = userInfo;

      const { code, data, message } = await userLogin({
        account,
        password,
      });

      if (code === 0) {
        this.token = data;

        if (isRemember) {
          this.accountInfo = {
            account,
            password,
            isRemember,
          };
        } else {
          this.accountInfo = { account: undefined, password: undefined, isRemember: false }
        }
      } else {
        throw { message };
      }
    },
    async getUserInfo() {
      const mockRemoteUserInfo = async (token: string) => {
        if (token === 'main_token') {
          return {
            name: 'td_main',
            roles: ['all'],
          };
        }
        return {
          name: 'hanyial_admin',
          roles: ['all'],
        };
      };

      const res = await mockRemoteUserInfo(this.token);

      this.userInfo = res;
    },
    async logout() {
      localStorage.removeItem(TOKEN_NAME);
      this.token = '';
      this.userInfo = { ...InitUserInfo };
    },
    async removeToken() {
      this.token = '';
    },
  },
  persist: {
    afterRestore: (ctx) => {
      if (ctx.store.roles && ctx.store.roles.length > 0) {
        const permissionStore = usePermissionStore();
        permissionStore.initRoutes(ctx.store.roles);
      }
    },
  },
});

export function getUserStore() {
  return useUserStore(store);
}
