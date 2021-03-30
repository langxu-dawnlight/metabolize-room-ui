<template>
  <div class="tag-container">
    <div class="header">
      <span class="name">{{ tagInfo.tagRawId }} </span>
      <div class="opeation">
        <Dropdown placement="bottom-end">
          <a href="javascript:void(0)" class="operate">
            操作
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem @click.native="$emit('modify')">编辑</DropdownItem>
            <DropdownItem @click.native="$emit('deleteTag')">删除</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div class="content">
      <div class="item">
        <span class="name">位置: </span>
        <span>{{ tagInfo.location }}</span>
      </div>
      <div class="item">
        <span class="name">描述: </span>
        <span>{{ tagInfo.object }}</span>
      </div>
      <div class="item">
        <span class="name">状态: </span>
        <span v-if="isActive">
          <em class="online"></em>
          已连接
        </span>
        <span v-else>
          <em class="offline"></em>
          未连接
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tagInfo', 'isActive'],
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.tag-container {
  width: 100%;
  background: #202947;
  padding: 15px;
  border-radius: 5px;
  overflow: hidden;
  .header {
    position: relative;
    border-bottom: 1px solid #303e62;
    padding-right: 50px;
    padding-bottom: 10px;
    color: #ffffff;
    .name {
      font-size: 16px;
      white-space: normal;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 2;
    }
    .opeation {
      position: absolute;
      right: 0;
      top: 0;
      .operate {
        color: #b8bfd3;
      }
    }
  }
  .content {
    padding-top: 15px;
    .item {
      white-space: normal;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 2;
      margin-bottom: 4px;
      &:last-child {
        margin-bottom: 0px;
      }
      .name {
        color: #a5a9b3;
      }
      .online {
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color: #4ad991;
        border-radius: 50%;
        margin-left: 3px;
      }
      .offline {
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color: #fe1b36;
        border-radius: 50%;
        margin-left: 3px;
      }
    }
  }
}
</style>
