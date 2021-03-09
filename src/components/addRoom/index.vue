<template>
  <div>
    <Modal
      :mask-closable="false"
      class="metabolizeModal"
      v-model="visable"
      :title="readerForm.id ? '编辑代谢仓' : '创建代谢仓'"
    >
      <Form ref="readerForm" :model="readerForm" :rules="ruleValidate">
        <FormItem label="名称" prop="roomName">
          <Input
            v-model="readerForm.roomName"
            clearable
            placeholder="请输入名称"
            maxlength="20"
            show-word-limit
          ></Input>
        </FormItem>
        <FormItem label="描述" prop="roomDescription">
          <Input
            v-model="readerForm.roomDescription"
            type="textarea"
            :rows="4"
            clearable
            maxlength="100"
            show-word-limit
            placeholder="请输入描述"
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
import { addRooms, updateRoom, deleteRoom } from '@/api/common'
import eventBus from '@/views/home/eventBus.js'

export default {
  data() {
    return {
      visable: false,
      readerForm: {
        roomName: '',
        roomDescription: ''
      },
      ruleValidate: {
        roomName: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        roomDescription: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
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
    modiy({ id, roomDescription, roomName }) {
      this.readerForm.id = id
      this.readerForm.roomName = roomName
      this.readerForm.roomDescription = roomDescription
      this.visable = true
    },
    deleteRoom(id) {
      deleteRoom({
        id: id
      }).then(() => {
        this.$emit('onDelete')
        eventBus.$emit('roomUpdate')
      })
    },
    confirm() {
      this.$refs.readerForm.validate(valid => {
        if (valid) {
          if (this.readerForm.id) {
            this.__updateRoom()
          } else {
            this.__addRooms()
          }

          this.visable = false
        }
      })
    },
    __updateRoom() {
      updateRoom({
        id: this.readerForm.id,
        roomName: this.readerForm.roomName,
        roomDescription: this.readerForm.roomDescription
      }).then(res => {
        this.$emit('onSuccess')
        eventBus.$emit('roomUpdate')
      })
    },
    __addRooms() {
      addRooms({
        id: 0,
        roomDescription: this.readerForm.roomDescription,
        roomName: this.readerForm.roomName
      }).then(res => {
        this.$emit('onSuccess')
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
