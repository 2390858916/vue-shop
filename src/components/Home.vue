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
      <el-aside :width="iscollapse ? '64px':'200px'">
        <!-- 汉堡按钮 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--unique-opened 之保持一个下拉菜单 -->
        <!-- router开启路由跳转 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          :collapse="iscollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <el-submenu v-for="item in menuslist" :index="item.id + ''" :key="item.id">
            <template slot="title">
              <i :class="iconobj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item v-for="subitem in item.children" :key="subitem.id" :index="'/'+subitem.path"
            @click="saveNavState('/' + subItem.path)">
              <i :class="iconobj[subitem.id]"></i>
              <span>{{subitem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容组件 -->
      <el-main>
        <router-view></router-view>
      </el-main>
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
      },
      // 汉堡按钮默认不折叠
      iscollapse:false,
      activePath: ''
    }
  },
  created(){
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
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
    },
    //汉堡按钮
    toggleCollapse(){
      this.iscollapse = !this.iscollapse
    },
    //保存路径
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
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
.toggle-button{
  background-color: #4a5064;
  font-size: 14px;
  line-height: 24px;
  color: gray;
  text-align: center;
  letter-spacing: 2px;
  cursor: pointer;
}
</style>