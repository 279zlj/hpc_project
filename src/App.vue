<template>
  <div id="app">
      <el-container id='con'>
        <router-view />
        <el-header style="padding:0;height:auto">
            <router-view name='top'/>
        </el-header>
        <el-container>
        <el-aside >
            <router-view name="bar" />
        </el-aside>
        <keep-alive>
        <el-main class='content'>
            <router-view name="content" />
        </el-main>
        </keep-alive>
        </el-container>
      </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body,html{
  margin:0;
  padding:0;
  top:0;
  bottom:0;
  width:100%;
  height: 100%;
}
#app{
  margin:0;
  padding:0;
  top:0;
  bottom:0;
  width:100%;
  height: 100%
}
#con{
    height:100%;
    
}
.tabstyle{
  width:100%;min-height:30em;max-height:100%;
  border-radius: .2rem
}
.block{
  display: block;
}
.el-aside{
  width:250px !important;
}
.el-main{
  padding:0 !important;
}
.tbar{
  background-color: white;
  padding-left:1rem;
  font-weight: 700;
  box-shadow: 0px 5px 5px #8E9BA7;
}
.content{
    background-color: #E4E4E4;
    height: inherit;
}
a{
  text-decoration: none
}
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
    width: 6px;
    height: 10rpx;
    background-color: #F5F5F5;
}
 
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 3px gray;
    background-color: #D6D6D6;
}
 
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    -webkit-box-shadow: inset 0 0 6px gray;
    background-color: #3390ED;
}
</style>
