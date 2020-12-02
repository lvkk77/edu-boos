<template>
  <el-card>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="广告名称：" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="广告位置：" prop="spaceId">
        <el-select v-model="ruleForm.spaceId" placeholder="请选择活动区域">
          <el-option
            v-for="item in spacesList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间：" prop="startTimeFormatString">
        <el-date-picker
          type="datetime"
          placeholder="选择日期"
          v-model="ruleForm.startTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="到期时间：" prop="endTimeFormatString">
        <el-date-picker
          type="datetime"
          v-model="ruleForm.endTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="上线/下线：" prop="status">
        <el-switch
          v-model="ruleForm.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="广告图片：" prop="img">
        <course-image v-model="ruleForm.img" :limit="5" />
      </el-form-item>
      <el-form-item label="广告链接：" prop="link">
        <el-input v-model="ruleForm.link"></el-input>
      </el-form-item>
      <el-form-item label="广告备注：" prop="text">
        <el-input type="textarea" v-model="ruleForm.text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSave">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import CourseImage from './CourseImage.vue'
import { Form } from 'element-ui'
import { getAdById, getAllSpaces, saveOrUpdate } from '@/services/advert'

export default Vue.extend({
  name: 'CreateOrUpdateAdverts',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    advertId: {
      type: [String, Number]
    }
  },
  components: {
    CourseImage
  },
  data () {
    return {
      ruleForm: {
        name: 'ceshi',
        startTimeFormatString: '',
        endTimeFormatString: '',
        img: '',
        link: 'www.baidu.com',
        spaceId: '',
        text: '',
        status: 0
      },
      spacesList: [],
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        startTimeFormatString: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        endTimeFormatString: [
          {
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        link: [{ required: true, message: '请输入广告链接', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getAllSpaces()
    if (this.isEdit) {
      this.loadAdvert()
    }
  },
  methods: {
    async loadAdvert () {
      const { data } = await getAdById({
        id: this.advertId
      })
      this.ruleForm = data.content
    },
    async getAllSpaces () {
      const { data } = await getAllSpaces()
      this.spacesList = data.content
    },
    async handleSave () {
      await (this.$refs.ruleForm as Form).validate()
      const { data } = await saveOrUpdate(this.ruleForm)
      if (data.state === 1) {
        this.$message.success('保存成功')
        this.$router.push('/advert')
      } else {
        this.$message.error('保存失败')
      }
    }
  }
})
</script>
