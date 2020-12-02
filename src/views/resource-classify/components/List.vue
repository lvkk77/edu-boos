<template>
  <div class="resource-list">
    <el-card class="box-card">
      <el-row>
        <el-button size="small" @click="add">添加</el-button>
        <Dialog
          :dialogFormVisible="isDialog"
          :isEdit="isEdit"
          :currentData="currentData"
          @getCode="getCode"
          @cancelIsDialog="cancelIsDialog"
        />
      </el-row>
      <el-table
        :data="resources"
        style="width: 100%; margin-bottom: 20px"
        v-loading="isLoading"
      >
        <el-table-column prop="id" label="编号"> </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="createdTime" label="创建时间"> </el-table-column>
        <el-table-column prop="sort" label="排序"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAll } from '@/services/add-resource'
import Dialog from './Dialog.vue'

export default Vue.extend({
  name: 'Add',
  components: { Dialog },
  data () {
    return {
      resources: [], // 资源列表
      isLoading: true, // 加载状态
      isDialog: false,
      isEdit: false,
      currentData: {}
    }
  },
  created () {
    this.loadResources()
  },
  methods: {
    async loadResources () {
      this.isLoading = true // 展示加载中状态
      const { data } = await getAll()
      this.resources = data.data
      this.isLoading = false // 关闭加载中状态
    },

    add () {
      this.isDialog = true
      this.currentData = {}
    },
    getCode (e: any) {
      if (e === '000000') {
        this.isDialog = false
        this.loadResources()
      }
    },
    cancelIsDialog () {
      this.isDialog = false
    },
    handleEdit (item: any) {
      this.isDialog = true
      this.isEdit = true
      this.currentData = item
    },
    handleDelete (item: any) {
      console.log('handleDelete', item)
    }
  }
})
</script>

<style lang="scss" scoped></style>
