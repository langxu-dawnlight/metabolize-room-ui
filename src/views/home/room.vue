<template>
  <div class="room-container">
    <Spin class="loading" fix v-if="!roomInfo.id">
      <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <div class="room-title" v-if="roomInfo.id">
      <p class="name">{{ roomInfo.roomName }}</p>
      <p class="desc">描述：{{ roomInfo.roomDescription }}</p>
      <div class="opeation">
        <Dropdown placement="bottom-end">
          <a href="javascript:void(0)" class="operate">
            操作
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem @click.native="modifyRoom">编辑代谢仓</DropdownItem>
            <DropdownItem
              v-if="!readerInfo.id"
              @click.native="$refs.addReader.show()"
              >添加Reader</DropdownItem
            >
            <DropdownItem
              v-if="!gatewayInfo.id"
              @click.native="$refs.addGateway.show()"
              >添加Geteway</DropdownItem
            >
            <DropdownItem @click.native="$refs.addRoom.deleteRoom(roomId)"
              >删除代谢仓</DropdownItem
            >
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div class="room-content" v-if="roomInfo.id">
      <div class="content">
        <Card :bordered="false" class="antenna" v-if="gatewayInfo.id">
          <div slot="title" class="title">
            <p>Geteway - {{ gatewayInfo.gatewayName }}</p>
            <div class="readerId">
              ID：{{ gatewayInfo.gatewayNumber }}

              <img
                v-if="gatewayInfo.status === 1"
                class="statusImg"
                src="../../assets/image/permit.png"
                alt=""
              />
              <img
                v-if="gatewayInfo.status === 0"
                class="statusImg"
                src="../../assets/image/forbid.png"
                alt=""
              />
            </div>
            <div class="opeation">
              <Dropdown placement="bottom-end">
                <a href="javascript:void(0)" class="operate">
                  操作
                  <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem
                    @click.native="$refs.addGateway.modify({ ...gatewayInfo })"
                    >编辑Geteway</DropdownItem
                  >

                  <DropdownItem
                    v-if="gatewayInfo.status === 0"
                    @click.native="__permitGateway()"
                    >启用</DropdownItem
                  >
                  <DropdownItem
                    v-if="gatewayInfo.status === 1"
                    @click.native="__forbidGateway()"
                    >禁用</DropdownItem
                  >
                  <DropdownItem
                    @click.native="
                      $refs.addGateway.deleteGateway(gatewayInfo.id)
                    "
                    >解绑</DropdownItem
                  >
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <Row :gutter="15" class="tag-list" v-if="gatewayInfo.status === 1">
            <template v-for="item in beaconList">
              <Col span="8" :key="item.id"
                ><beacon
                  :key="item.id"
                  :beaconInfo="item"
                  @ondelete="$refs.addBeacon.deleteBeac(item.id)"
                  @modify="
                    $refs.addBeacon.modify({
                      id: item.id,
                      location: item.location,
                      objectDescription: item.objectDescription,
                      objectName: item.objectName,
                      type: item.type
                    })
                  "
                ></beacon
              ></Col>
            </template>
            <Col span="8" v-if="gatewayInfo.id"
              ><div class="addItem" @click="$refs.addBeacon.show()">
                <Icon type="md-add" size="25" color="#555e7a" />
                <span style="margin-top:5px">添加Beacon</span>
              </div>
            </Col>
          </Row>
        </Card>

        <!-- reader -->
        <Card :bordered="false" class="antenna" v-if="readerInfo.id">
          <div slot="title" class="title">
            <p>Reader - {{ readerInfo.readerName }}</p>
            <div class="readerId">
              ID：{{ readerInfo.readerNumber }}
              <img
                v-if="readerInfo.status === 1"
                class="statusImg"
                src="../../assets/image/permit.png"
                alt=""
              />
              <img
                v-if="readerInfo.status === 0"
                class="statusImg"
                src="../../assets/image/forbid.png"
                alt=""
              />
            </div>

            <div class="opeation">
              <Dropdown placement="bottom-end">
                <a href="javascript:void(0)" class="operate">
                  操作
                  <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem
                    @click.native="
                      $refs.addReader.modify({
                        id: readerInfo.id,
                        readerName: readerInfo.readerName,
                        readerNumber: readerInfo.readerNumber
                      })
                    "
                    >编辑Reader</DropdownItem
                  >
                  <DropdownItem
                    v-if="readerInfo.status === 0"
                    @click.native="__permitReader(readerInfo.id)"
                    >启用</DropdownItem
                  >
                  <DropdownItem
                    v-if="readerInfo.status === 1"
                    @click.native="__forbidReader(readerInfo.id)"
                    >禁用</DropdownItem
                  >
                  <DropdownItem
                    @click.native="$refs.addReader.deleteReader(readerInfo.id)"
                    >解绑</DropdownItem
                  >
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <Row :gutter="15" class="tag-list" v-if="readerInfo.status === 1">
            <template v-for="item in tagList">
              <Col span="8" :key="item.id"
                ><tag
                  :key="item.id"
                  :tagInfo="item"
                  @deleteTag="$refs.addTag.deleteTag(item.id)"
                  @modify="
                    $refs.addTag.modify({
                      id: item.id,
                      location: item.location,
                      objectName: item.object,
                      tagRawId: item.tagRawId
                    })
                  "
                ></tag
              ></Col>
            </template>
            <Col span="8" v-if="readerInfo.id"
              ><div class="addItem" @click="$refs.addTag.show()">
                <Icon type="md-add" size="25" color="#555e7a" />
                <span style="margin-top:5px">添加Tag</span>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
      <div class="create-reader" v-if="readerVisable && !gatewayInfo.id">
        <p>请点击创建</p>
        <div class="btn">
          <Button type="primary" @click="$refs.addReader.show()">
            Reader
          </Button>

          <Button type="primary" @click="$refs.addGateway.show()">
            Gateway
          </Button>
        </div>
      </div>
    </div>
    <addReader
      ref="addReader"
      :roomId="roomId"
      @onDelete="__getReaderByRoom"
      @onSuccess="__getReaderByRoom"
    ></addReader>
    <addTag
      :readerId="readerInfo.id"
      ref="addTag"
      @onDelete="__getReaderByRoom"
      @onSuccess="__getReaderByRoom"
    ></addTag>
    <addGateway
      ref="addGateway"
      :roomId="roomId"
      @onSuccess="__getGatewayByRoom"
      @onAddGateway="__onAddGateway"
    ></addGateway>
    <addRoom
      ref="addRoom"
      @onDelete="onDelete"
      @onSuccess="__getRoomById"
    ></addRoom>
    <addBeacon
      ref="addBeacon"
      :gatewayId="gatewayInfo.id"
      @onDelete="__getBeaconsByGateway"
      @onSuccess="__getBeaconsByGateway"
    ></addBeacon>
  </div>
</template>

<script>
import tag from '_c/tag'
import beacon from '_c/beacon'
import addTag from '_c/addTag'
import addBeacon from '_c/addBeacon'
import addReader from '_c/addReader'
import addGateway from '_c/addGateway'
import addRoom from '_c/addRoom'
import eventBus from '@/views/home/eventBus.js'

import {
  getRoomById,
  getReaderByRoom,
  getGatewayByRoom,
  addGateways,
  forbidReader,
  permitReader,
  forbidGateway,
  permitGateway,
  getBeaconsByGateway
} from '@/api/common'
export default {
  components: {
    tag,
    addReader,
    addTag,
    addGateway,
    addRoom,
    beacon,
    addBeacon
  },
  data() {
    return {
      readerVisable: false,
      roomInfo: {
        id: '',
        roomDescription: '',
        roomName: ''
      },
      tagList: [],
      beaconList: [],
      gatewayInfo: {
        id: ''
      },
      readerInfo: {
        id: '',
        readerNumber: '',
        readerName: '',
        readerPower: ''
      }
    }
  },
  computed: {
    roomId() {
      return Number(this.$route.params.id) || ''
    }
  },
  watch: {
    roomId() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.readerVisable = false
      this.roomInfo = {}
      this.tagList = []
      this.beaconList = []
      this.readerInfo = {}
      this.gatewayInfo = {}
      this.__getReaderByRoom()
      this.__getRoomById()
      this.__getGatewayByRoom()
    },
    __permitReader() {
      permitReader({
        id: this.readerInfo.id,
        roomId: this.roomId
      }).then(() => {
        this.__getReaderByRoom()
      })
    },
    __forbidReader() {
      forbidReader({
        id: this.readerInfo.id,
        roomId: this.roomId
      }).then(() => {
        this.__getReaderByRoom()
        eventBus.$emit('roomUpdate')
      })
    },
    __forbidGateway() {
      forbidGateway({
        id: this.gatewayInfo.id,
        roomId: this.roomId
      }).then(() => {
        this.__getGatewayByRoom()
        eventBus.$emit('roomUpdate')
      })
    },
    __permitGateway() {
      permitGateway({
        id: this.gatewayInfo.id,
        roomId: this.roomId
      }).then(() => {
        this.__getGatewayByRoom()
      })
    },
    __onAddGateway({ gatewayNumber, gatewayName }) {
      addGateways({
        roomId: this.roomId,
        gatewayName: gatewayName,
        gatewayNumber: gatewayNumber
      }).then(res => {
        this.__getGatewayByRoom()
      })
    },
    __getRoomById() {
      getRoomById({
        roomId: this.roomId
      }).then(res => {
        this.roomInfo = res
      })
    },
    __getGatewayByRoom() {
      getGatewayByRoom({
        roomId: this.roomId
      }).then(res => {
        this.gatewayInfo = res
        this.__getBeaconsByGateway()
      })
    },
    __getBeaconsByGateway() {
      if (this.gatewayInfo.id) {
        getBeaconsByGateway({
          gatewayId: this.gatewayInfo.id
        }).then(res => {
          this.beaconList = res
        })
      }
    },
    __getReaderByRoom() {
      getReaderByRoom({
        roomId: this.roomId
      }).then(res => {
        console.log('getReaderByRoom', res)
        if (res) {
          this.readerInfo = res
          this.tagList = res && res.tags
          this.readerVisable = false
        } else {
          this.readerVisable = true
          this.readerInfo = {}
          this.tagList = []
        }
      })
    },

    modifyRoom() {
      this.$refs.addRoom.modiy({
        id: this.roomInfo.id,
        roomDescription: this.roomInfo.roomDescription,
        roomName: this.roomInfo.roomName
      })
    },
    modifyReader() {
      this.$refs.addReader.show()
    },
    onDelete() {
      this.$router.replace('/home')
    }
  }
}
</script>

<style lang="less">
.room-container {
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  .loading.ivu-spin-fix {
    background-color: rgba(0, 0, 0, 0);
  }
  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .demo-spin-col {
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }
  .ivu-card,
  .ivu-card-body {
    background: #151a2e;
    color: #ffffff;
    padding: 0 15px;
    padding-bottom: 5px;
  }
  .ivu-card-head p,
  .ivu-card-head-inner {
    background: #151a2e;
    color: #ffffff;
  }
  .ivu-card-head {
    border-bottom: 0;
  }
  .antenna {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .title {
      position: relative;
      .opeation {
        position: absolute;
        right: 0;
        top: 15px;
      }
      .readerId {
        color: #959eba;
        font-size: 14px;
        margin-top: 5px;
      }
      .statusImg {
        position: relative;
        display: inline-block;
        height: 20px;
        top: 5px;
        left: 5px;
      }
    }
  }
}
</style>

<style lang="less" scoped>
.room-container {
  width: 100%;
  height: 100%;
  text-align: left;
  padding-left: 20px;
  color: #ffffff;
  .room-title {
    position: relative;
    padding-bottom: 10px;
    border-bottom: 1px solid #303e62;
    min-height: 65px;
    .name {
      font-size: 22px;
    }
    .desc {
      color: #959eba;
    }
    .opeation {
      position: absolute;
      right: 0;
      top: 5px;
    }
  }
  .operate {
    color: #959eba;
  }
  .room-content {
    position: relative;
    height: calc(100% - 45px);
    color: #959eba;
    padding: 15px 0;
    .create-reader {
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
      min-height: 21px;
      p {
        margin-bottom: 15px;
        font-size: 18px;
        color: #959eba;
      }
      .btn {
        button {
          margin: 0 10px;
        }
      }
    }
    .reader {
      margin-top: 5px;
      margin-bottom: 15px;
      .text {
        margin-right: 20px;
      }
    }
    .content {
      height: calc(100% - 40px);
      overflow-x: hidden;
      overflow-y: auto;
    }
    .tag-list {
      .ivu-col {
        margin-bottom: 15px;
      }
      .addItem {
        width: 100%;
        height: 100%;
        min-height: 151px;
        background: #202947;
        padding: 15px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        color: #555e7a;
        border: 1px dashed #303e62;
        cursor: pointer;
      }
    }
  }
}
</style>
