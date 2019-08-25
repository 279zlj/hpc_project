<template>
  <el-row id='enter'>
    <el-row class='top'>
      <img src='../../static/images/logo_HPC.png'>
    </el-row>
    <el-row class='texttip'>
      <span class='tip'>HPC（High Performance Computing，高性能计算）</span>
      <span class='tipsmall'>通常指将计算能力积聚，用并行计算方式解决更大规模的科学，工程和商业问题</span>
    </el-row>
    <el-col :xs='12' :sm='12' :md='12' :lg='12' :xl='12' class='tstyle'>
        <img src='../../static/images/HPC_02.png' class='sbg'>
    </el-col>
    <el-col  :xs='12' :sm='12' :md='12' :lg='12' :xl='12' :offset="12" style="margin-top:7rem" >
      <el-col :span='12' :offset="6" class='logobor'>
        <el-row class="nn">
        <h2 class="welcome">欢迎登录</h2>
        <el-form :model="logindata" ref="logindata" :rules="loginrules" label-position="left" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input v-model="logindata.username" placeholder="请输入用户名" prefix-icon="el-icon-user" autofocus></el-input>
          </el-form-item>
          <el-form-item prop="passwd">
            <el-input v-model="logindata.passwd" placeholder="请输入密码" type="password" prefix-icon="el-icon-key" @keyup.enter.native="login('logindata')"></el-input>  
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login('logindata')" style="width:100%">提交</el-button>
          </el-form-item>
        </el-form>
        </el-row>
        </el-col>
    </el-col>
  </el-row> 
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    var checkname=(rule,val,callback)=>{
      if(!val){
        return callback(new Error('请输入用户名'))
      }
      else
        callback()
    }
    var checkpwd=(rule,val,callback)=>{
      if(!val){
        return callback(new Error('请输入密码'))
      }
      else
        callback()
    }
    return {
      logindata:{
        username:'',
        passwd:''
      },
      loginrules:{
        username:[
          {validator:checkname,trigger:'bulr'}
        ],
        passwd:[
          {validator:checkpwd,trigger:'blur'}
        ]
      }
    }
  },
  methods:{
    login(name){
      this.$refs[name].validate((valid)=>{
        if(valid){
          // this.$axios.post(this.$host+'login',{login:this.logindata.username,password:this.logindata.passwd}).then(res=>{
          //   if(res.data.success){
          //     sessionStorage.setItem('user',res.data.data.name)
          //     this.logindata={}
          //     this.$notify({
          //       title:'登录成功',
          //       type:'success'
          //     })
              sessionStorage.setItem('user',this.logindata.username)
              this.$router.push('task');
          //   }
          //   else{
          //     console.log(res.data)
          //   }
          // })
          
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#enter{
  background-color: #1F2325;
  height:100%;
  width:100%;
  margin:0;
  padding:0;
}
.tstyle{
  text-align:center;position:fixed;bottom:0;
}
.top{
  background-color:#1A1A1A
}
.texttip{
  color:white;margin:2rem
}
.sbg{
  width:90%;text-align:center;margin:0 auto
}
.logobor{
  border:2px solid #1775A4;border-radius:.3rem;padding:.3rem
}
.nn{
  background-color:#2F3336;padding:2rem
}
.welcome{
  text-align:center;margin-bottom:1em;color:white
}
.tip{
  display:block;font-size:.9rem
}
.tipsmall{
  display:block;font-size:.9rem
}
</style>
