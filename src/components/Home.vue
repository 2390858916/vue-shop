<template>
<!-- 头部区域 -->
  <el-container class="home-container">
    <el-header >
      <div>
        <img src="../assets/logo.png" alt="" width="55px">
        <span>电商管理后台</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button></el-header>
    <!-- 页面主题区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="1">
            <!-- 一级菜单模板 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="1-4-1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>二级菜单</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容组件 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  methods:{
    logout(){
      //清楚token
      window.sessionStorage.clear()
      //重定向到login页面
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
  height: 100%;
}
.el-header{
  background-color: #373D3F;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: white;
  font-size: 20px;
  > div{
    display: flex;
    align-items: center;
    span{
      margin-left: 15px;
    }
  }
}
.el-aside{
  background-color: #323743;
}
.el-main{
  background-color: #f5f5f5;
}
</style>