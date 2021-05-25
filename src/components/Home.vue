<template>
  <!-- 头部区域 -->
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" style="padding:10px" width="7%" />
        <span>刀客塔</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主题区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!--unique-opened 之保持一个下拉菜单 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
        >
          <el-submenu v-for="item in menuslist" :index="item.id + ''" :key="item.id">
            <template slot="title">
              <i :class="iconobj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item v-for="subitem in item.children" :key="subitem.id" :index="subitem.id + ''">
              <i :class="iconobj[subitem.id]"></i>
              <span>{{subitem.authName}}</span>
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
  data(){
    return{
      // 菜单数据
      menuslist:[],
      iconobj:{
        '125':'el-icon-user-solid',
        '103':'el-icon-s-tools',
        '101':'el-icon-s-goods',
        '102':'el-icon-s-order',
        '145':'el-icon-s-data',
        '110':'el-icon-user',
        '111':'el-icon-setting',
        '112':'el-icon-more-outline',
        '104':'el-icon-goods',
        '115':'el-icon-s-operation',
        '121':'el-icon-menu',
        '107':'el-icon-document-copy',
        '146':'el-icon-tickets'
      }
    }
  },
  created(){
    this.getMenuList()
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    //获取所有菜单
    async getMenuList(){
      //结构data 赋值res
      const {data:res} = await this.$http.get('menus')
      if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuslist = res.data
      console.log(this.menuslist);
    }
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d3f;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: white;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #323743;
  .el-menu{
    border-right: none;
  }
}
.el-main {
  background-color: #f5f5f5;
}
</style>