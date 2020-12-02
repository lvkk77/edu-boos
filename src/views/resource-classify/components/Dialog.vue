<template>
  <div class="dialog">
    <el-dialog
      title="添加分类"
      :before-close="cancel"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="名称：">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input
            type="number"
            v-model="form.sort"
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
import { saveOrderUpdate } from '@/services/add-resource'

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
      this.form.sort = n.sort
      this.form.id = n.id
    }
  },

  data () {
    return {
      resourceCategories: [],
      form: {
        id: null,
        name: '',
        sort: 0
      }
    }
  },
  methods: {
    async saveOrUpdate () {
      const { data } = await saveOrderUpdate(this.form)
      this.$message.success(data.mesg)
      this.$emit('getCode', data.code)
    },
    cancel () {
      this.$emit('cancelIsDialog')
    }
  }
})
</script>
