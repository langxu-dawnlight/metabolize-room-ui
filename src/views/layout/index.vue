<template>
  <div class="layout">
    <header class="header">代谢仓管理平台</header>
    <main class="main">
      <router-view></router-view>
    </main>
    <footer class="footer">
      <img class="wenjing" src="../../assets/image/wenjing.png" alt="" />
    </footer>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.layout {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #202947;
  text-align: left;
  padding: 0 25px;
  .header {
    font-size: 22px;
    height: 60px;
    line-height: 60px;
    color: #ffffff;
  }
  .main {
    width: 100%;
    height: calc(100% - 120px);
    background: #181e35;
    border-radius: 12px;
    overflow: auto;
  }
  .footer {
    height: 60px;
    align-items: center;
    display: flex;
    .wenjing {
      height: 28px;
    }
  }
}
</style>
