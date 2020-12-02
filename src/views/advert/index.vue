<template>
  <div class="advert">
    <div class="add-advert">
      <el-button
        size="small"
        @click="
          $router.push({
            name: 'advert-create'
          })
        "
        >添加广告</el-button
      >
    </div>
    <el-table v-loading="loading" :data="advertList" style="width: 100%">
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="name" label="广告名称"> </el-table-column>
      <el-table-column prop="spaceName" label="广告位置"> </el-table-column>
      <el-table-column prop="img" label="广告图片">
        <template slot-scope="scope">
          <el-avatar
            shape="square"
            :size="100"
            fit="contain"
            :src="scope.row.img"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="时间">
        <template slot-scope="scope">
          <div>开始时间：{{ scope.row.startTimeFormatString }}</div>
          <div>到期时间：{{ scope.row.endTimeFormatString }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="上线/下线">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            :disabled="scope.row.isStatusLoading"
            @change="onStateChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="
              $router.push({
                name: 'advert-edit',
                params: {
                  advertId: scope.row.id
                }
              })
            "
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalCount"
      :disabled="loading"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { getAdList, getAllSpaces, updateStatus } from '@/services/advert'

export default Vue.extend({
  name: 'AdvertIndex',
  data () {
    return {
      loading: true,
      advertList: [],
      spacesList: [],
      totalCount: 0,
      filterParams: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created () {
    this.loadAdvert()
    this.getAllSpaces()
  },
  methods: {
    async loadAdvert () {
      this.loading = true
      const { data } = await getAdList(this.filterParams)
      data.content.forEach((item: any) => {
        item.isStatusLoading = false
        item.spaceName = this.compare(item.spaceId)
      })
      this.advertList = data.content
      // this.totalCount = data.content.total

      this.loading = false
    },
    async getAllSpaces () {
      const { data } = await getAllSpaces()
      this.spacesList = data.content
    },
    compare (id: number | string) {
      const spacesList = this.spacesList
      let spacesName: any = ''
      spacesList.forEach((element: any) => {
        if (id === element.id) {
          spacesName = element.name
        }
      })
      return spacesName
    },
    async onStateChange (course: any) {
      course.isStatusLoading = true
      await updateStatus({
        id: course.id,
        status: course.status
      })

      this.$message.success(`${course.status === 0 ? '下线' : '上线'}成功`)
      course.isStatusLoading = false
    },
    handleCurrentChange (page: number) {
      this.filterParams.pageNum = page
      this.loadAdvert()
    }
  }
})
</script>

<style lang="scss" scoped>
.advert {
  background: #fff;

  .add-advert {
    padding: 10px;
  }
}
</style>
