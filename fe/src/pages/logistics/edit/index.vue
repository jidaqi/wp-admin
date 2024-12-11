<template>
  <t-form
    ref="form"
    class="base-form"
    :data="formData"
    :rules="FORM_RULES"
    label-align="top"
    :label-width="100"
    @reset="onReset"
    @submit="onSubmit"
  >
    <div class="form-basic-container">
      <div class="form-basic-item">
        <div class="form-basic-container-title">包裹信息</div>
        <!-- 表单内容 -->

        <!-- 合同名称,合同类型 -->
        <t-row class="row-gap" :gutter="[16, 24]">
          <template v-for="(_package, packageIndex) in formData.packageParams" :key="packageIndex">
            <t-col :span="12">
              <t-form-item label="包裹总重/克" name="packageParams.weight">
                <!-- <t-input v-model="formData.name" :style="{ width: '322px' }" placeholder="请输入内容" /> -->
                <t-input-number v-model="_package.weight" theme="row" suffix="" style="width: 200px"></t-input-number>
              </t-form-item>
            </t-col>
            <t-col :span="24">
              <t-form-item label="物品信息" name="type">
                <div>
                  <t-button theme="primary" variant="outline" @click="() => _package.itemParams.push(defaultItemParam)"
                    >添加物品</t-button
                  >

                  <t-row
                    v-for="(item, index) in _package.itemParams"
                    :key="index"
                    :gutter="[8, 12]"
                    style="margin-top: 12px"
                    class="package-item"
                  >
                    <t-col :span="6">
                      <t-form-item
                        label="英文名称"
                        :name="`formData.packageParams[${packageIndex}].itemParams[${index}].englishName`"
                      >
                        <t-input v-model="item.englishName" placeholder="请输入物品英文名称"></t-input>
                      </t-form-item>
                    </t-col>
                    <t-col :span="6">
                      <t-form-item
                        label="数量"
                        :name="`formData.packageParams[${packageIndex}].itemParams[${index}].quantity`"
                      >
                        <t-input-number v-model="item.quantity"></t-input-number>
                      </t-form-item>
                    </t-col>
                    <t-col :span="6">
                      <t-form-item
                        label="价值"
                        :name="`formData.packageParams[${packageIndex}].itemParams[${index}].unitPrice`"
                      >
                        <t-input-number v-model="item.unitPrice" />
                      </t-form-item>
                    </t-col>
                    <t-col :span="6">
                      <t-form-item
                        label="货币单位"
                        :name="`formData.packageParams[${packageIndex}].itemParams[${index}].unitPriceCurrency`"
                      >
                        <t-input v-model="item.unitPriceCurrency" placeholder="货币单位" />
                      </t-form-item>
                    </t-col>

                    <t-button variant="dashed" block theme="danger" @click="() => _package.itemParams.splice(index, 1)"
                      >删除</t-button
                    >
                  </t-row>
                </div>
              </t-form-item>
            </t-col>
          </template>
        </t-row>

        <div class="form-basic-container-title form-title-gap">发件人信息</div>

        <!-- 发件人信息 -->
        <t-row class="row-gap" :gutter="[16, 24]">
          <t-col :span="6">
            <t-form-item label="姓名">
              <t-input v-model="formData.senderParam.name"></t-input>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="邮编">
              <t-input v-model="formData.senderParam.zipCode"></t-input>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="ISO国家码">
              <t-input v-model="formData.senderParam.countryCode" placeholder="CN"></t-input>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="州/省">
              <t-input v-model="formData.senderParam.state"></t-input>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="城市">
              <t-input v-model="formData.senderParam.city"></t-input>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="详细地址">
              <t-input v-model="formData.senderParam.detailAddress"></t-input>
            </t-form-item>
          </t-col>
        </t-row>

        <div class="form-basic-container-title form-title-gap">收件人信息</div>

        <!-- 发件人信息 -->
        <t-row class="row-gap" :gutter="[16, 24]">
          <t-col :span="6">
            <t-form-item label="姓名">
              <t-input v-model="formData.receiverParam.name"></t-input>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="邮编">
              <t-input v-model="formData.receiverParam.zipCode"></t-input>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="ISO国家码">
              <t-input v-model="formData.receiverParam.countryCode" placeholder="CN"></t-input>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="州/省">
              <t-input v-model="formData.receiverParam.state"></t-input>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="城市">
              <t-input v-model="formData.receiverParam.city"></t-input>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="详细地址">
              <t-input v-model="formData.receiverParam.detailAddress"></t-input>
            </t-form-item>
          </t-col>
        </t-row>

        <div class="form-basic-container-title form-title-gap">退件人信息</div>

        <!-- 发件人信息 -->
        <t-row class="row-gap" :gutter="[16, 24]">
          <t-col :span="6">
            <t-form-item label="姓名">
              <t-input v-model="formData.returnerParam.name"></t-input>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="邮编">
              <t-input v-model="formData.returnerParam.zipCode"></t-input>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="ISO国家码">
              <t-input v-model="formData.returnerParam.countryCode" placeholder="CN"></t-input>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="州/省">
              <t-input v-model="formData.returnerParam.state"></t-input>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="城市">
              <t-input v-model="formData.returnerParam.city"></t-input>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="详细地址">
              <t-input v-model="formData.returnerParam.detailAddress"></t-input>
            </t-form-item>
          </t-col>
        </t-row>
      </div>
    </div>

    <div class="form-submit-container">
      <div class="form-submit-sub">
        <div class="form-submit-left">
          <t-button theme="primary" class="form-submit-confirm" type="submit"> 提交 </t-button>
          <t-button type="reset" class="form-submit-cancel" theme="default" variant="base"> 返回 </t-button>
        </div>
      </div>
    </div>
  </t-form>
</template>

<script lang="ts">
export default {
  name: 'LogisticsEdit',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { MessagePlugin } from 'tdesign-vue-next';
import { FORM_RULES, LogisticsData, defaultItemParam } from './constants';
import { addLogistics } from '@/api/logistics';

const router = useRouter();

const formData = ref({ ...LogisticsData });

const onReset = () => {
  router.back();
};
const onSubmit = ({ validateResult }) => {
  addLogistics(formData.value);
  if (validateResult === true) {
    MessagePlugin.success('新建成功');
  }
};
</script>

<style lang="less" scoped>
@import url('./index.less');

.package-item {
  padding: 18px;
  border-radius: 12px;
  border: 1px dashed #ccc;
}
</style>
