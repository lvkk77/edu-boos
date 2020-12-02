<template>
  <el-card>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="广告位名称: " prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSave">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { getSpaceById, saveOrUpdate } from '@/services/advert-space'

export default Vue.extend({
  name: 'CreateOrUpdateAdvertSpace',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    id: {
      type: [String, Number]
    }
  },
  data () {
    return {
      ruleForm: {
        id: '',
        name: '',
        spaceKey: '',
        isDel: ''
      },
      rules: {
        name: [{ required: true, message: '请输入广告位名称', trigger: 'blur' }]
      }
    }
  },
  created () {
    if (this.isEdit) {
      this.getSpaceById()
    }
  },
  methods: {
    async getSpaceById () {
      const { data } = await getSpaceById({
        id: this.id
      })
      this.ruleForm = data.content
    },
    async handleSave () {
      ;(this.$refs.ruleForm as Form).validate()
      const { data } = await saveOrUpdate(this.ruleForm)
      if (data.state === 1) {
        this.$message.success('保存成功')
        this.$router.push('/advert-space')
      } else {
        this.$message.error('保存失败')
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
