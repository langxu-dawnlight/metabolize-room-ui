<template>
  <div>
    <Modal
      :mask-closable="false"
      class="metabolizeModal"
      v-model="visable"
      :title="readerForm.id ? '编辑Gateway' : '创建Gateway'"
    >
      <Form ref="readerForm" :model="readerForm" :rules="ruleValidate">
        <FormItem label="Id" prop="gatewayNumber">
          <Input
            v-model="readerForm.gatewayNumber"
            clearable
            placeholder="请输入Id"
            maxlength="20"
            show-word-limit
          ></Input>
        </FormItem>
        <FormItem label="名称" prop="gatewayName">
          <Input
            v-model="readerForm.gatewayName"
            clearable
            maxlength="20"
            show-word-limit
            placeholder="请输入名称"
          ></Input>
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
import { addGateways, updateGateway, deleteGateway } from '@/api/common'
import eventBus from '@/views/home/eventBus.js'

export default {
  props: ['roomId'],
  data() {
    return {
      visable: false,
      readerForm: {
        gatewayNumber: '',
        readerName: ''
      },
      ruleValidate: {
        gatewayNumber: [
          { required: true, message: 'Id不能为空', trigger: 'blur' }
        ],
        gatewayName: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ]
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
      this.readerForm.id = ''
      this.visable = true
    },
    modify(getewayInfo) {
      this.readerForm = getewayInfo
      this.visable = true
    },
    deleteGateway(id) {
      deleteGateway({ id }).then(() => {
        this.$emit('onSuccess')
        eventBus.$emit('roomUpdate')
      })
    },
    confirm() {
      this.$refs.readerForm.validate(valid => {
        if (valid) {
          if (this.readerForm.id) {
            this.__updateGateway()
          } else {
            this.__onAddGateway()
          }
        }
      })
    },
    __onAddGateway() {
      addGateways({
        roomId: this.roomId,
        gatewayName: this.readerForm.gatewayName,
        gatewayNumber: this.readerForm.gatewayNumber
      }).then(res => {
        if (res == -1) {
          this.$Message.info('Id已存在,请重新输入')
          return false
        }
        this.visable = false
        this.$emit('onSuccess')
      })
    },
    __updateGateway() {
      updateGateway({
        roomId: this.roomId,
        gatewayName: this.readerForm.gatewayName,
        gatewayNumber: this.readerForm.gatewayNumber,
        id: this.readerForm.id
      }).then(res => {
        if (res == -1) {
          this.$Message.info('Id已存在,请重新输入')
          return false
        }
        this.visable = false
        this.$emit('onSuccess')
      })
    }
  }
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
