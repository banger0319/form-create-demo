<template>
  <el-form :rules="rules">
    <el-form-item
      v-for="item in formOptions"
      :key="item.id"
      :label="item.title"
      :prop="item.id"
    >
      <el-select
        v-if="item.type === 'select'"
        v-model="item.value"
        @change="(value:string) => handleChange(value, item.control)"
      >
        <template v-for="option in item.option" :key="option.id">
          <el-option
            v-if="option.show"
            :value="option.id"
            :label="option.label"
          ></el-option
        ></template>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { FormControl, formOptions, Method, FormItem } from './mock.js/form'
const rules = reactive<any>({})

function handleChange (value: string, control: Array<FormControl> | null) {
  if (!control) {
    return
  }
  for (const item of control) {
    const index = formOptions.value.find((form) => form.id === item.id)
    index && getMethod(item.method, index, getCondition(item, value), value)
  }
}

function getMethod (
  method: Method,
  index: FormItem,
  flag: boolean,
  value: string
) {
  switch (method) {
    case 'required':
      rules[index.id]
        ? (rules[index.id][0].required = flag)
        : (rules[index.id] = [{ required: flag }])
      break
    case 'include':
      index.option!.forEach((option) => {
        option.show = option.id === value
      })
      break
  }
}

function getCondition (item: FormControl, value: string) {
  let flag = false
  switch (item.condition) {
    case '=':
      flag = item.value === value
      break
  }
  return flag
}
</script>

<style lang="less" scoped></style>
