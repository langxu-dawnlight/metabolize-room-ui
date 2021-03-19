<template>
  <div class="container">
    <div class="sider">
      <div class="title">
        <span>代谢仓列表</span>
        <Icon
          @click="$refs.addReader.show()"
          type="md-add"
          size="18"
          color="#ffffff"
        />
      </div>
      <ul class="room-list">
        <li
          v-for="item in roomList"
          :key="item.id"
          :class="{
            active: item.id === activeRoomId
          }"
          @click="
            item.id !== activeRoomId && $router.replace(`/home/room/${item.id}`)
          "
        >
          <span class="name" :title="item.roomName">{{ item.roomName }}</span>
          <span class="tag-count"
            >Device {{ item.tagCounts + item.beaconCounts }}</span
          >
        </li>
      </ul>
    </div>

    <div class="main">
      <router-view @></router-view>
    </div>
    <addRoom ref="addReader" @onSuccess="__getAllRooms"></addRoom>
    <div class="init-room" v-if="initvisable">
      <p>请点击创建代谢仓</p>
      <Button type="primary" size="large" @click="$refs.addReader.show()"
        >创建代谢仓</Button
      >
    </div>
  </div>
</template>

<script>
import addRoom from '_c/addRoom'
import { getAllRooms, addRooms } from '@/api/common'
import eventBus from '@/views/home/eventBus.js'

export default {
  components: { addRoom },
  data() {
    return {
      initvisable: false,
      roomList: []
    }
  },
  created() {
    this.__getAllRooms()
    eventBus.$on('roomUpdate', () => {
      this.__getAllRooms()
    })
  },
  computed: {
    activeRoomId() {
      return Number(this.$route.params.id) || ''
    }
  },
  methods: {
    __getAllRooms() {
      getAllRooms().then(res => {
        if (res && res.length > 0) {
          this.roomList = res
          this.initvisable = false
          if (!this.activeRoomId && res[0] && res[0].id) {
            this.$router.replace(`/home/room/${res[0].id}`)
          }
        } else {
          this.initvisable = true
        }
      })
    },
    __addRooms({ roomName, roomDescription }) {
      addRooms({
        id: 0,
        roomDescription: roomDescription,
        roomName: roomName
      }).then(res => {
        this.__getAllRooms()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-left: 320px;
  .sider {
    position: absolute;
    left: 20px;
    top: 20px;
    bottom: 20px;
    width: 300px;

    font-size: 14px;
    color: #ffffff;
    border-right: 1px solid #303e62;
    overflow: hidden;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      margin-right: 19px;
    }
    .room-list {
      font-size: 14px;
      max-height: calc(100% - 40px);
      overflow: auto;
      padding-right: 10px;
      margin-right: 9px;
      li {
        height: 40px;
        border-radius: 4px;
        padding: 10px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:hover {
          background: rgba(32, 41, 71, 0.5);
        }
        &.active {
          background: #202947;
        }
        .name {
          max-width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .tag-count {
          color: #555e7a;
          line-height: 40px;
        }
      }
    }
  }
  .init-room {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #181e35;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    z-index: 9;
    p {
      margin-bottom: 15px;
      font-size: 20px;

      color: #959eba;
    }
  }
}
.main {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
