<template>
  <div>
    <t-tabs :value="currentTab" :theme="'card'" @change="handleTabChange">
      <t-tab-panel value="all">
        <template #label> 全部 </template>
      </t-tab-panel>
      <t-tab-panel value="pending">
        <template #label> 代发货 </template>
      </t-tab-panel>
      <t-tab-panel value="transport">
        <template #label> 运送中 </template>
      </t-tab-panel>
      <t-tab-panel value="finally">
        <template #label> 已完成 </template>
      </t-tab-panel>
      <t-tab-panel value="warn">
        <template #label> 异常订单 </template>
      </t-tab-panel>
    </t-tabs>
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
                <t-form-item name="name">
                  <t-input-adornment
                    prepend="国际运单号"
                    class="form-item-content"
                    :style="{ minWidth: '134px', width: '100%' }"
                  >
                    <t-input v-model="formData.name" type="search" clearable placeholder="请输入国际运单号" />
                  </t-input-adornment>
                </t-form-item>
              </t-col>
              <t-col :span="3">
                <t-form-item name="status">
                  <t-select
                    v-model="formData.status"
                    class="form-item-content"
                    :options="CONTRACT_STATUS_OPTIONS"
                    placeholder="物流方案"
                    clearable
                  />
                </t-form-item>
              </t-col>
              <t-col :span="3">
                <t-form-item name="no">
                  <t-input
                    v-model="formData.no"
                    class="form-item-content"
                    placeholder="物流状态"
                    :style="{ minWidth: '134px' }"
                  />
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
          <t-button theme="primary" @click="handleNewLogistics">创建物流单</t-button>
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
          @change="rehandleChange"
        >
          <template #createdAt="{ col, row }"> {{ dayjs(row[col.colKey]).format('YYYY-MM-DD HH:mm:ss') }} </template>
          <template #op="slotProps">
            <a class="t-button-link" @click="rehandleClickOp(slotProps)">管理</a>
            <a class="t-button-link" @click="handleClickDelete(slotProps)">删除</a>
          </template>
        </t-table>
        <t-dialog
          v-model:visible="confirmVisible"
          header="确认删除当前所选合同？"
          :body="confirmBody"
          :on-cancel="onCancel"
          @confirm="onConfirmDelete"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, Ref } from 'vue';
import { MessagePlugin, PrimaryTableCol, TableRowData, PageInfo } from 'tdesign-vue-next';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { getLogistics } from '@/api/logistics';
import { useSettingStore } from '@/store';
import { prefix } from '@/config/global';

import { CONTRACT_STATUS_OPTIONS } from '@/constants';

const store = useSettingStore();
const router = useRouter();

const COLUMNS: PrimaryTableCol<TableRowData>[] = [
  {
    title: '物流订单号',
    fixed: 'left',
    width: 200,
    ellipsis: true,
    align: 'left',
    colKey: 'orderCode',
  },
  {
    title: '创建时间',
    fixed: 'left',
    width: 200,
    ellipsis: true,
    align: 'left',
    colKey: 'createdAt',
  },
  {
    align: 'left',
    fixed: 'right',
    width: 200,
    colKey: 'op',
    title: '操作',
  },
];

const searchForm = {
  name: '',
  no: undefined,
  status: undefined,
  type: '',
};

const formData = ref({ ...searchForm });
const rowKey = 'index';
const verticalAlign = 'top' as const;
const hover = true;

const pagination = ref({
  defaultPageSize: 20,
  total: 100,
  defaultCurrent: 1,
});
const confirmVisible = ref(false);

const data = ref([]);

const dataLoading = ref(false);
const fetchData = async () => {
  dataLoading.value = true;
  try {
    const { data: list } = await getLogistics();
    console.log(list);
    data.value = list;
    pagination.value = {
      ...pagination.value,
      total: list.length,
    };
  } catch (e) {
    console.log(e);
  } finally {
    dataLoading.value = false;
  }
};

const deleteIdx = ref(-1);
const confirmBody = computed(() => {
  if (deleteIdx.value > -1) {
    const { name } = data.value[deleteIdx.value];
    return `删除后，${name}的所有合同信息将被清空，且无法恢复`;
  }
  return '';
});

const resetIdx = () => {
  deleteIdx.value = -1;
};

const onConfirmDelete = () => {
  // 真实业务请发起请求
  data.value.splice(deleteIdx.value, 1);
  pagination.value.total = data.value.length;
  confirmVisible.value = false;
  MessagePlugin.success('删除成功');
  resetIdx();
};

const onCancel = () => {
  resetIdx();
};

onMounted(() => {
  fetchData();
});

const handleClickDelete = ({ row }) => {
  deleteIdx.value = row.rowIndex;
  confirmVisible.value = true;
};
const onReset = (val) => {
  console.log(val);
};
const onSubmit = (val) => {
  console.log(val);
};
const rehandlePageChange = (pageInfo: PageInfo, newDataSource: TableRowData[]) => {
  console.log('分页变化', pageInfo, newDataSource);
};
const rehandleChange = (changeParams, triggerAndData) => {
  console.log('统一Change', changeParams, triggerAndData);
};
const rehandleClickOp = ({ text, row }) => {
  console.log(text, row);
};

const headerAffixedTop = computed(
  () =>
    ({
      offsetTop: store.isUseTabsRouter ? 48 : 0,
      container: `.${prefix}-layout`,
    } as any), // TO BE FIXED
);

type Tabs = 'all' | 'pending' | 'transport' | 'finally' | 'warn';
const currentTab: Ref<Tabs> = ref('all');
const handleTabChange = (tab: Tabs) => {
  currentTab.value = tab;
};

const handleNewLogistics = () => {
  router.push('/logistics/edit');
};
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
