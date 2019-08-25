<template>
    <el-menu
      :default-active="barnum"
      class="el-menu-vertical-demo"
      background-color="#25252F"
      text-color="#fff"
      active-text-color="white" 
      style="height:100%">
      <router-link :to='{name:"task"}'><el-menu-item index="2">
        <i class="el-icon-tickets"></i>
        <span slot="title">{{$t('message.list')}}</span>
      </el-menu-item></router-link>
      <router-link :to='{name:"user"}'><el-menu-item index="1">
        <i class="el-icon-user"></i>
        <span slot="title">{{$t('message.usera')}}</span>
      </el-menu-item></router-link>
      <router-link :to='{name:"group"}'><el-menu-item index="4">
        <i class="el-icon-s-custom"></i>
        <span slot="title">{{$t('message.group')}}</span>
      </el-menu-item></router-link>
      <router-link :to='{name:"server"}'><el-menu-item index="3">
        <i class="el-icon-refrigerator"></i>
        <span slot="title">{{$t('message.server')}}</span>
      </el-menu-item></router-link>
      <el-menu-item index='5' @click="openvnc">
        <i class="el-icon-s-marketing"></i>
        <span slot='title'>{{$t('message.filea')}}</span>
      </el-menu-item>
      <el-menu-item index="6" @click="openshell">
        <i class="el-icon-monitor"></i>
        <span slot="title">{{$t('message.vnc')}}</span>
      </el-menu-item>
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
      this.barselect()
    },
    methods:{
      barselect(){
            let name = location.hash;
            if(name == '#/user'){
                this.barnum = '1'
            }
            else if(name == '#/task'){
                this.barnum = '2'
            }
            else if(name == '#/server'){
                this.barnum = '3'
            }
            else if(name == '#/group'){
                this.barnum = '4'
            }
      },
      openshell(){
        let href='http://192.168.11.232:9090/'
        window.open(href,'_blank')

      },
      openvnc(){
        let url='http://192.168.11.232:6080/vnc.html?host=192.168.11.232&port=6080'
        window.open(url,'_blank')
      }
    }
}
</script>
<style>
.is-active{
  background-color: #4E4F54 !important;
  border-radius: 3rem;
  margin:.5rem;
}
</style>
