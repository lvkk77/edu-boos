<template>
  <div class="dialog">
    <el-dialog
      title="添加资源"
      :before-close="cancel"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="资源名称：">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源路径：">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源分类：">
          <el-select v-model="form.categoryId" placeholder="请选择活动区域">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in resourceCategories"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input
            type="textarea"
            v-model="form.description"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getResourceCategories } from '@/services/resource-category'
import { saveOrUpdate } from '@/services/resource'

export default Vue.extend({
  name: 'Dialog',
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    currentData: {
      type: Object
    }
  },
  watch: {
    currentData: function (n) {
      this.form.name = n.name
      this.form.url = n.url
      this.form.id = n.id
      this.form.description = n.description
      this.form.categoryId = n.categoryId
    }
  },
  async created () {
    const { data } = await getResourceCategories()
    this.resourceCategories = data.data
  },

  data () {
    return {
      resourceCategories: [],
      form: {
        id: null,
        name: '',
        url: '',
        description: '',
        categoryId: ''
      }
    }
  },
  methods: {
    async saveOrUpdate () {
      const { data } = await saveOrUpdate(this.form)
      this.$message.success(data.mesg)
      this.$emit('getCode', data.code)
    },
    cancel () {
      this.$emit('cancelIsDialog')
    }
  }
})
</script>
