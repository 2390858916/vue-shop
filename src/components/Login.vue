<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatat_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 登录表单区 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
        <!-- 密码区域 -->
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
        <!-- 按钮区 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetloginForm">重置</el-button>
        </el-form-item>        
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 登录表单的校验规则对象
      loginFormRules: {
				// 校验规则的名称必须和数据源的属性名称保持一致
				username: [
					{ required: true, message: "请输入登录长度", tragger: "blur" },
					{ min: 3, max: 10, message: "长度在3到10字符", tragger: "blur" }
				],
				password: [
					{ required: true, message: "请输入密码长度", tragger: "blur" },
					{ min: 5, max: 18, message: "长度在6到18字符", tragger: "blur" }
				]
      },
    };
	},
	methods: {
		resetloginForm() {
			//重置表单
			this.$refs.loginFormRef.resetFields();
			//清空数值
			this.$data.loginForm.username = this.$data.loginForm.password = '';
		},
		login() {
			//表单验证 
			this.$refs.loginFormRef.validate(async valid=> {
				if (!valid) return;
				//简化 await 只能修饰异步async
				const {data: res} = await this.$http.post('login', this.loginForm);
				if(res.meta.status !==200) return this.$message.error('登陆失败');
        this.$message.success('登录成功')

        //将登陆成功之后的token 保存到客户端的session Storage中
        console.log(res);
        window.sessionStorage.setItem('token',res.data.token);
        //登陆成功跳转后台主页 路由地址主页 /home
        this.$router.push('/home')
			})
		}
	}	
}
</script>

<style lang="less">
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatat_box{
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #eee;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.btns{
  display: flex;
  justify-content: center;
}
.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>