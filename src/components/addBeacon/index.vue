<template>
  <div>
    <Modal
      :mask-closable="false"
      class="metabolizeModal"
      v-model="visable"
      :title="readerForm.id ? '编辑Beacon' : '创建Beacon'"
    >
      <Form ref="readerForm" :model="readerForm" :rules="ruleValidate">
        <FormItem label="Id" prop="objectRawId">
          <Input
            v-model="readerForm.objectRawId"
            clearable
            placeholder="请输入Id"
            maxlength="20"
            show-word-limit
            :disabled="Boolean(readerForm.id)"
          ></Input>
        </FormItem>
        <FormItem label="位置" prop="location">
          <Input
            v-model="readerForm.location"
            clearable
            placeholder="请输入位置"
            maxlength="20"
            show-word-limit
          ></Input>
        </FormItem>
        <!-- <FormItem label="描述" prop="objectDescription">
          <Input
            v-model="readerForm.objectDescription"
            clearable
            maxlength="20"
            show-word-limit
            placeholder="请输入描述"
          ></Input>
        </FormItem> -->
        <FormItem label="类型" prop="type">
          <Select v-model="readerForm.type">
            <Option value="wristband">wristband</Option>
            <Option value="object">object</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer" class="footer">
        <Button class="cancel" @click="hide()">取消</Button>
        <Button class="confirm" @click="confirm()">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { addBeacon, updateBeacon, deleteBeacon } from '@/api/common'
import eventBus from '@/views/home/eventBus.js'

export default {
  props: ['gatewayId'],
  data() {
    return {
      visable: false,
      readerForm: {
        objectRawId: '',
        location: '',
        objectDescription: '',
        type: ''
      },
      ruleValidate: {
        objectRawId: [
          { required: true, message: 'Id不能为空', trigger: 'blur' }
        ],
        location: [
          { required: true, message: '位置不能为空', trigger: 'blur' }
        ],
        // objectDescription: [
        //   { required: true, message: '描述不能为空', trigger: 'blur' }
        // ],
        type: [{ required: true, message: '类型不能为空', trigger: 'change' }]
      }
    }
  },
  watch: {
    visable(v) {
      if (!v) {
        this.$refs.readerForm.resetFields()
      }
    }
  },
  methods: {
    hide() {
      this.visable = false
    },
    show() {
      this.readerForm = {}
      this.readerForm.id = ''
      this.visable = true
    },
    modify(beaconInfo) {
      this.readerForm = beaconInfo
      this.visable = true
    },
    deleteBeac(id) {
      deleteBeacon({
        id
      }).then(() => {
        eventBus.$emit('roomUpdate')
        this.$emit('onDelete')
      })
    },
    confirm() {
      this.$refs.readerForm.validate(valid => {
        if (valid) {
          if (this.readerForm.id) {
            this.__updateBeacon()
          } else {
            this.__addBeacon()
          }
        }
      })
    },
    __addBeacon() {
      addBeacon({
        gatewayId: this.gatewayId,
        location: this.readerForm.location,
        objectDescription: this.readerForm.objectDescription,
        objectRawId: this.readerForm.objectRawId,
        type: this.readerForm.type
      }).then(res => {
        if (res == -1) {
          this.$Message.info('Id已存在')
          return false
        }
        this.visable = false
        if (res) {
          eventBus.$emit('roomUpdate')
          this.$emit('onSuccess')
        }
      })
    },
    __updateBeacon() {
      updateBeacon({
        gatewayId: this.gatewayId,
        id: this.readerForm.id,
        location: this.readerForm.location,
        objectDescription: this.readerForm.objectDescription,
        type: this.readerForm.type,
        objectRawId: this.readerForm.objectRawId
      }).then(res => {
        if (res === -1) {
          this.$Message.info('Id已存在')
        } else {
          this.visable = false
          this.$emit('onSuccess')
        }
      })
    }
  }
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
