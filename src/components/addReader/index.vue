<template>
  <div>
    <Modal
      :mask-closable="false"
      class="metabolizeModal"
      v-model="visable"
      :title="readerForm.id ? '编辑Reader' : '创建Reader'"
    >
      <Form ref="readerForm" :model="readerForm" :rules="ruleValidate">
        <FormItem label="Id" prop="readerNumber">
          <Input
            v-model="readerForm.readerNumber"
            clearable
            placeholder="请输入Id"
            maxlength="20"
            show-word-limit
            :disabled="Boolean(readerForm.id)"
          ></Input>
        </FormItem>
        <FormItem label="名称" prop="readerName">
          <Input
            v-model="readerForm.readerName"
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
import { addReaders, updateReader, deleteReader } from '@/api/common'
export default {
  props: ['roomId'],
  data() {
    return {
      visable: false,
      readerForm: {
        readerNumber: '',
        readerName: ''
      },
      ruleValidate: {
        readerNumber: [
          { required: true, message: 'Id不能为空', trigger: 'blur' }
        ],
        readerName: [
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
    modify(readerInfo) {
      this.readerForm = readerInfo
      this.visable = true
    },
    deleteReader(id) {
      deleteReader({
        id: id
      }).then(() => {
        this.$emit('onDelete')
      })
    },
    confirm() {
      this.$refs.readerForm.validate(valid => {
        if (valid) {
          if (this.readerForm.id) {
            this.__updateReader()
          } else {
            this.__addReaders()
          }

          this.visable = false
        }
      })
    },
    __updateReader() {
      updateReader({
        id: this.readerForm.id,
        readerNumber: this.readerForm.readerNumber,
        readerName: this.readerForm.readerName,
        roomId: this.roomId
      }).then(res => {
        this.$emit('onSuccess')
      })
    },
    __addReaders() {
      addReaders({
        readerNumber: this.readerForm.readerNumber,
        readerName: this.readerForm.readerName,
        roomId: this.roomId
      }).then(res => {
        this.$emit('onSuccess')
      })
    }
  }
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
