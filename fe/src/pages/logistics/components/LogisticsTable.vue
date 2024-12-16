<template>
  <div>
    <t-tabs :value="currentTab" :theme="'card'" @change="handleTabChange">
      <t-tab-panel value="all">
        <template #label> 全部 </template>
      </t-tab-panel>
      <t-tab-panel value="pending">
        <template #label> 待发货 </template>
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
                <t-form-item name="orderCode">
                  <t-input-adornment
                    prepend="物流订单号"
                    class="form-item-content"
                    :style="{ minWidth: '134px', width: '100%' }"
                  >
                    <t-input v-model="formData.orderCode" type="search" clearable placeholder="请输入物流订单号" />
                  </t-input-adornment>
                </t-form-item>
              </t-col>
              <t-col :span="3">
                <t-form-item name="solutionCode">
                  <t-select
                    v-model="formData.solutionCode"
                    class="form-item-content"
                    :options="SolutionMap"
                    placeholder="物流方案"
                    clearable
                  />
                </t-form-item>
              </t-col>
              <!-- <t-col :span="3">
                <t-form-item name="no">
                  <t-input
                    v-model="formData.no"
                    class="form-item-content"
                    placeholder="物流状态"
                    :style="{ minWidth: '134px' }"
                  />
                </t-form-item>
              </t-col> -->
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
        >
          <template #createdAt="{ col, row }"> {{ dayjs(row[col.colKey]).format('YYYY-MM-DD HH:mm:ss') }} </template>
          <template #op="slotProps">
            <!-- <a class="t-button-link" @click="rehandleClickOp(slotProps)">管理</a> -->
            <a class="t-button-link" @click="handleCancel(slotProps)">取消订单</a>
          </template>
        </t-table>
        <t-dialog
          v-model:visible="confirmVisible"
          header="Warn"
          :body="`确认取消当前所选物流单吗？`"
          :on-cancel="onCancel"
          @confirm="onConfirmCancel"
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
import { getLogistics, cancel } from '@/api/logistics';
import { useSettingStore } from '@/store';
import { prefix } from '@/config/global';

import { getSolutionMap } from '@/api/common';
import { MapItem } from '@/api/model/commonModel';

const store = useSettingStore();
const router = useRouter();

const COLUMNS: PrimaryTableCol<TableRowData>[] = [
  {
    title: '物流订单号',
    fixed: 'left',
    width: 180,
    ellipsis: true,
    align: 'left',
    colKey: 'orderCode',
  },
  {
    title: '末公里运单号',
    width: 280,
    ellipsis: true,
    align: 'left',
    colKey: 'trackingNumber',
  },
  {
    title: '收件人',
    ellipsis: true,
    align: 'left',
    colKey: 'receiverParam.name',
  },
  // {
  //   title: '收件地址',
  //   ellipsis: true,
  //   align: 'left',
  //   colKey: 'receiverParam.detailAddress',
  // },
  {
    title: '创建时间',
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
  orderCode: undefined,
  solutionCode: undefined,
};

const formData = ref({ ...searchForm });
const rowKey = 'index';
const verticalAlign = 'top' as const;
const hover = true;

const pagination = ref({
  pageSize: 20,
  total: 100,
  current: 1,
});
const confirmVisible = ref(false);

const data = ref([]);

const dataLoading = ref(false);
const fetchData = async () => {
  dataLoading.value = true;
  try {
    const { data: list } = await getLogistics({
      page: pagination.value.current,
      pageSize: pagination.value.pageSize,
      orderCode: formData.value.orderCode,
      solutionCode: formData.value.solutionCode,
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

const resetIdx = () => {
  cancelOrderCode.value = undefined;
};

const onConfirmCancel = async () => {
  try {
    const orderCode = cancelOrderCode.value;
    const result = await cancel({ orderCode });
    if (result.code === 0) {
      MessagePlugin.success('Success!');
    }
  } catch (err) {
    console.log(err);
  } finally {
    confirmVisible.value = false;
  }
  resetIdx();
};

const onCancel = () => {
  resetIdx();
};

const cancelOrderCode = ref();
const handleCancel = ({ row }) => {
  cancelOrderCode.value = row.orderCode;
  confirmVisible.value = true;
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

type Tabs = 'all' | 'pending' | 'transport' | 'finally' | 'warn';
const currentTab: Ref<Tabs> = ref('all');
const handleTabChange = (tab: Tabs) => {
  currentTab.value = tab;
};

const handleNewLogistics = () => {
  router.push('/logistics/edit');
};

const SolutionMap: Ref<MapItem[]> = ref([]);
const handleGetSolution = () => {
  getSolutionMap().then((result) => {
    SolutionMap.value = result.data;
  });
};

onMounted(() => {
  fetchData();
  handleGetSolution();
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
