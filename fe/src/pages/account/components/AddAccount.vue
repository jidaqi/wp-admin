<!--
 * @Author: Peihua
 * @Date: 2025-01-05 23:33:27
 * @LastEditors: Peihua
 * @LastEditTime: 2025-01-06 00:32:28
 * @FilePath: \fe\src\pages\account\components\AddAccount.vue
 * @Description: 
-->
<template>
  <div>
    <t-dialog
      :visible.sync="visible"
      header="新建账号"
      width="560px"
      @cancel="handleClose"
      @confirm="handleSubmit"
      @close-btn-click="handleClose"
    >
      <t-form
        style="padding: 18px 0"
        :data="formData"
        :rules="rules"
        @reset="onReset"
        @submit="onSubmit"
        @validate="onValidate"
        ref="fromRef"
      >
        <t-form-item label="用户名" name="username">
          <t-input v-model="formData.username" placeholder="请输入用户名"></t-input>
        </t-form-item>
        <t-form-item label="账号" name="account">
          <t-input v-model="formData.account" placeholder="请输入账号"></t-input>
        </t-form-item>
        <t-form-item label="密码" name="password" help="账号新建后该密码将不可见，请妥善保管！">
          <t-input type="password" v-model="formData.password" placeholder="请输入密码"></t-input>
        </t-form-item>
        <t-form-item label="确认密码" name="rePassword">
          <t-input type="password" v-model="formData.rePassword" placeholder="请再次输入密码"></t-input>
        </t-form-item>
      </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { CustomValidator, FormRule, FormValidateParams, FormValidateResult, MessagePlugin } from 'tdesign-vue-next';
import { ref, reactive } from 'vue';
import { addUser } from '@/api/user';
const visible = ref(false);
const handleShow = () => {
  visible.value = true;
};

const emits = defineEmits(['add']);

// 自定义异步校验器
const rePassword: CustomValidator = (val) =>
  new Promise((resolve) => {
    resolve(formData.password === val);
  });

const INITIAL_DATA = {
  account: '',
  username: '',
  password: '',
  rePassword: '',
};

const fromRef = ref();
const formData = reactive({
  ...INITIAL_DATA,
});
const rules: Record<string, FormRule[]> = {
  username: [
    {
      required: true,
      message: '用户名必填',
      type: 'error',
    },
  ],
  account: [
    {
      required: true,
      message: '账号必填',
      type: 'error',
    },
  ],
  password: [
    {
      required: true,
      message: '密码必填',
      type: 'error',
    },
  ],
  rePassword: [
    {
      required: true,
      message: '密码必填',
      type: 'error',
    },
    // 自定义校验规则：自定义异步校验规则
    {
      validator: rePassword,
      message: '两次密码不一致',
    },
  ],
};
const onReset = () => {
  MessagePlugin.success('重置成功');
};
const onSubmit = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    MessagePlugin.success('提交成功');
  } else {
    console.log('Errors: ', validateResult);
    MessagePlugin.warning(firstError);
  }
};
const onValidate = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    console.log('Validate Success');
  } else {
    console.log('Validate Errors: ', firstError, validateResult);
  }
};

const handleClose = async () => {
  visible.value = false;

  for await (let k of Object.keys(INITIAL_DATA)) {
    formData[k] = INITIAL_DATA[k];
  }

  fromRef.value?.clearValidate();
};

const handleSubmit = () => {
  const validate: (params?: FormValidateParams) => Promise<FormValidateResult<FormData>> = fromRef.value.validate;
  validate().then((result) => {
    console.log(result);
    if (result === true) {
      addUser({
        username: formData.username,
        password: formData.password,
        account: formData.account,
      }).then((result) => {
        if (result.code === 0) {
          handleClose();
          MessagePlugin.success(result.message);
          emits('add');
        }
      });
    }
  });
};
defineExpose({
  handleShow,
});
</script>

<!-- <style lang="less" scoped>
.add-user-dialog {
  height: 880px;
}
</style> -->
