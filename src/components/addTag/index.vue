<template>
  <div>
    <Modal
      :mask-closable="false"
      class="metabolizeModal"
      v-model="visable"
      :title="readerForm.id ? '编辑Tag' : '创建Tag'"
    >
      <Form ref="readerForm" :model="readerForm" :rules="ruleValidate">
        <FormItem label="Id" prop="tagRawId">
          <Input
            v-model="readerForm.tagRawId"
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
        <FormItem label="描述" prop="objectName">
          <Input
            v-model="readerForm.objectName"
            clearable
            maxlength="20"
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
import { addTags, updateTag, deleteTag } from '@/api/common'
export default {
  props: ['readerId'],
  data() {
    return {
      visable: false,
      readerForm: {
        tagRawId: '',
        location: '',
        objectName: ''
      },
      ruleValidate: {
        tagRawId: [{ required: true, message: 'Id不能为空', trigger: 'blur' }],
        location: [
          { required: true, message: '位置不能为空', trigger: 'blur' }
        ],
        objectName: [
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
    modify(readerInfo) {
      this.readerForm = readerInfo
      this.visable = true
    },
    deleteTag(id) {
      deleteTag({
        id
      }).then(() => {
        this.$emit('onDelete')
      })
    },
    confirm() {
      this.$refs.readerForm.validate(valid => {
        if (valid) {
          if (this.readerForm.id) {
            this.__updateTag()
          } else {
            this.__addTags()
          }

          this.visable = false
        }
      })
    },
    __addTags() {
      addTags({
        readerId: this.readerId,
        location: this.readerForm.location,
        tagRawId: this.readerForm.tagRawId,
        objectName: this.readerForm.objectName
      }).then(res => {
        if (res) {
          this.$emit('onSuccess')
        }
      })
    },
    __updateTag() {
      updateTag({
        readerId: this.readerId,
        id: this.readerForm.id,
        location: this.readerForm.location,
        tagRawId: this.readerForm.tagRawId,
        objectName: this.readerForm.objectName
      }).then(res => {
        this.$emit('onSuccess')
      })
    }
  }
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
