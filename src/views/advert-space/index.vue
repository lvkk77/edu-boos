<template>
  <div class="advert-space">
    <div class="add-advert">
      <el-button
        size="small"
        @click="
          $router.push({
            name: 'addAdvertiseSpace'
          })
        "
        >添加广告位</el-button
      >
    </div>
    <el-table v-loading="loading" :data="spacesList" style="width: 100%">
      <el-table-column prop="spaceKey" label="spaceKey"> </el-table-column>
      <el-table-column prop="name" label="广告位名称"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column prop="updateTime" label="更新时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="
              $router.push({
                name: 'updateAdvertiseSpace',
                params: {
                  id: scope.row.id
                }
              })
            "
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllSpaces } from '@/services/advert-space'

export default Vue.extend({
  name: 'AdvertSpaceIndex',
  data () {
    return {
      loading: true,
      spacesList: [],
      filterParams: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created () {
    this.getAllSpaces()
  },
  methods: {
    async getAllSpaces () {
      this.loading = true
      const { data } = await getAllSpaces(this.filterParams)
      this.spacesList = data.content
      this.loading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.advert-space {
  background: #fff;

  .add-advert {
    padding: 10px;
  }
}
</style>
