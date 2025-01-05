<template>
  <div>
    <div class="list-common-table">
      <t-form
        ref="form"
        :data="formData"
        :label-width="0"
        colon
        :style="{ marginBottom: '8px' }"
        @reset="onReset"
        @submit="onSubmit"
      >
        <t-row>
          <t-col :span="10">
            <t-row :gutter="[16, 24]">
              <t-col :span="3">
                <t-form-item name="username">
                  <t-input-adornment
                    prepend="用户名"
                    class="form-item-content"
                    :style="{ minWidth: '134px', width: '100%' }"
                  >
                    <t-input v-model="formData.username" type="search" clearable placeholder="请输入用户名" />
                  </t-input-adornment>
                </t-form-item>
              </t-col>
              <t-col :span="3">
                <t-form-item name="account">
                  <t-input-adornment
                    prepend="账号"
                    class="form-item-content"
                    :style="{ minWidth: '134px', width: '100%' }"
                  >
                    <t-input v-model="formData.account" type="search" clearable placeholder="请输入账号" />
                  </t-input-adornment>
                </t-form-item>
              </t-col>
            </t-row>
          </t-col>

          <t-col :span="2" class="operation-container">
            <t-button theme="primary" type="submit" :style="{ marginLeft: '8px' }"> 查询 </t-button>
            <t-button type="reset" variant="base" theme="default"> 重置 </t-button>
          </t-col>
        </t-row>
      </t-form>

      <div class="table-action">
        <div></div>
        <div class="right">
          <t-button theme="primary" @click="handleNewAccount">新建账号</t-button>
        </div>
      </div>

      <div class="table-container">
        <t-table
          :data="data"
          :columns="COLUMNS"
          :row-key="rowKey"
          :vertical-align="verticalAlign"
          :hover="hover"
          :pagination="pagination"
          :loading="dataLoading"
          :header-affixed-top="headerAffixedTop"
          @page-change="rehandlePageChange"
        >
          <template #createdAt="{ col, row }"> {{ dayjs(row[col.colKey]).format('YYYY-MM-DD HH:mm:ss') }} </template>
          <template #op="slotProps">
            <!-- <a class="t-button-link" @click="rehandleClickOp(slotProps)">管理</a> -->
          </template>
        </t-table>
      </div>
    </div>

    <AddAccount @add="fetchData" ref="addAccountRef" />
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, Ref } from 'vue';
import { MessagePlugin, PrimaryTableCol, TableRowData, PageInfo } from 'tdesign-vue-next';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { getLogistics, cancel } from '@/api/logistics';
import { useSettingStore } from '@/store';
import { prefix } from '@/config/global';
import { getUsers } from '@/api/user';
import AddAccount from './AddAccount.vue';

const store = useSettingStore();

const COLUMNS: PrimaryTableCol<TableRowData>[] = [
  {
    title: '用户名',
    ellipsis: true,
    align: 'left',
    colKey: 'username',
  },
  {
    title: '账号',
    ellipsis: true,
    align: 'left',
    colKey: 'account',
  },
  {
    title: '创建时间',
    ellipsis: true,
    align: 'left',
    colKey: 'createdAt',
  },
  // {
  //   align: 'left',
  //   fixed: 'right',
  //   colKey: 'op',
  //   title: '操作',
  // },
];

const searchForm = {
  username: undefined,
  account: undefined,
};

const formData = ref({ ...searchForm });
const rowKey = 'index';
const verticalAlign = 'top' as const;
const hover = true;

const pagination = ref({
  pageSize: 20,
  total: 0,
  current: 1,
});
const confirmVisible = ref(false);

const data = ref([]);

const dataLoading = ref(false);
const fetchData = async () => {
  dataLoading.value = true;
  try {
    const { data: list } = await getUsers({
      page: pagination.value.current,
      pageSize: pagination.value.pageSize,
      account: formData.value.account,
      username: formData.value.username,
    });
    data.value = list.rows;
    pagination.value = {
      current: list.page,
      pageSize: list.pageSize,
      total: list.count,
    };
  } catch (e) {
    console.log(e);
    dataLoading.value = false;
  } finally {
    dataLoading.value = false;
  }
};

const onReset = (val) => {
  console.log(val);
};
const onSubmit = (val) => {
  if (val.validateResult) {
    fetchData();
  }
  console.log(val);
};
const rehandlePageChange = (pageInfo: PageInfo) => {
  pagination.value.current = pageInfo.current;
  pagination.value.pageSize = pageInfo.pageSize;
  fetchData();
};

const headerAffixedTop = computed(
  () =>
    ({
      offsetTop: store.isUseTabsRouter ? 48 : 0,
      container: `.${prefix}-layout`,
    } as any), // TO BE FIXED
);

const addAccountRef = ref();
const handleNewAccount = () => {
  addAccountRef.value?.handleShow();
};

onMounted(() => {
  fetchData();
});
</script>

<style lang="less" scoped>
.list-common-table {
  background-color: var(--td-bg-color-container);
  padding: 30px 32px;
  border-radius: var(--td-radius-default);

  .table-container {
    margin-top: 30px;
  }

  .table-action {
    margin-top: 32px;
    display: flex;
    justify-content: space-between;

    .right {
      display: flex;
      justify-content: end;
    }
  }
}

.form-item-content {
  width: 100%;
}

.operation-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .expand {
    .t-button__text {
      display: flex;
      align-items: center;
    }
    .t-icon {
      margin-left: 4px;
      transition: transform 0.3s ease;
    }
  }
}

.payment-col {
  display: flex;

  .trend-container {
    display: flex;
    align-items: center;
    margin-left: 8px;
  }
}

/deep/ .t-input-adornment--prepend {
  width: 100%;
}
</style>
