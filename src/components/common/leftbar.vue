<template>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#25252F"
      text-color="#fff"
      active-text-color="white" 
      :unique-opened='true'
      style="height:100%">
      <router-link :to='{name:"monitor"}'><el-menu-item index="/monitor">
        <i class="el-icon-s-marketing"></i>
        <span slot="title">集群监控</span>
      </el-menu-item></router-link>
      <router-link :to='{name:"task"}'><el-menu-item index="/task">
        <i class="el-icon-tickets"></i>
        <span slot="title">{{$t('message.list')}}</span>
      </el-menu-item></router-link>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">账号管理</span>
        </template>
        <router-link :to='{name:"user"}'><el-menu-item index="/user">{{$t('message.usera')}}</el-menu-item></router-link>
        <router-link :to='{name:"group"}'><el-menu-item index="/group">{{$t('message.group')}}</el-menu-item></router-link>
      </el-submenu>
      <el-submenu index="2">
        <template slot='title'>
          <i class="el-icon-refrigerator"></i>
          <span slot="title">{{$t('message.server')}}</span>
        </template>
        <router-link :to='{name:"server"}'><el-menu-item index="/server">机房实况</el-menu-item></router-link>
        <router-link :to='{name:"detail"}'><el-menu-item index='/detail'>机房详情</el-menu-item></router-link>
      </el-submenu>
      <el-submenu index="3">
        <template slot='title'>
          <i class="el-icon-monitor"></i>
          <span slot="title">{{$t('message.filea')}}</span>
        </template>
        <router-link :to='{name:"console"}'><el-menu-item index="/console">Console</el-menu-item></router-link>
        <router-link :to='{name:"shell"}'><el-menu-item index='/shell'>Shell</el-menu-item></router-link>
      </el-submenu>
      
      <!-- <router-link :to='{name:""}'><el-menu-item index="">
        <i class="el-icon-document"></i>
        <span slot="title">文件管理</span>
      </el-menu-item></router-link> -->
    </el-menu>
</template>
<script>
export default {
    name:'leftbar',
    data(){
        return{
          barnum:''
        }
    },
    mounted(){
    },
    methods:{
      // openshell(){
      //   let href='http://192.168.11.232:9090/'
      //   window.open(href,'_blank')

      // },
      // openvnc(){
      //   let url='http://192.168.11.232:6080/vnc.html?host=192.168.11.232&port=6080'
      //   window.open(url,'_blank')
      // }
    }
}
</script>
<style scoped>
.is-active{
  background-color: #2775FD !important;
  /* border-radius: 3rem; */
  /* margin:.5rem; */
}
</style>
