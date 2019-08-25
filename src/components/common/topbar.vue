<template>
    <el-row id='top'>
        <el-col :xs='6' :sm='6' :md='6' :lg='6' :xl='6'>
            <img src="../../../static/images/logo_HPC.png" class="Logo">
        </el-col>
        <el-col :xs='{span:3 ,offset:7}' :sm='{span:3 ,offset:7}' :md='{span:3 ,offset:9}' :lg='{span:2 ,offset:12}' :xl='{span:2 ,offset:12}'>
            <el-dropdown style="color:white;font-size:1.1em;padding-top:1rem">
                <span class="el-dropdown-link" style="cursor:pointer">
                    {{$t('message.change')}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot='dropdown'>
                   <el-dropdown-item><span @click="changlang('ch')"><i class="el-icon-zhongwenyuyan iconfont"></i>{{$t('message.cha')}}</span></el-dropdown-item>
            <el-dropdown-item><span @click="changlang('en')"><i class="el-icon-yingwenyuyan iconfont"></i>{{$t('message.eng')}}</span></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
        <el-col :xs='4' :sm='4' :md='3' :lg='2' :xl='2'>
            <div style="color:white;font-size:1.1em;padding-top:1rem" @click="file = true">
                <el-tooltip :content="$t('message.upload')" placement="bottom">
                    <span style="cursor:pointer">{{$t('message.upload')}}</span>
                </el-tooltip>
            </div>
        </el-col>
        <el-col :xs='4' :sm='4' :md='3' :lg='2' :xl='2'>
            <el-dropdown style="color:white;font-size:1.1em;padding-top:1rem">
                <span class="el-dropdown-link" style="cursor:pointer">
                    <i class='el-icon-user-solid'></i>
                    {{user}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot='dropdown'>
                    <span @click="outlogin()"><el-dropdown-item >{{$t('message.exit')}}</el-dropdown-item></span>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
        <el-dialog :title="$t('message.upload')" :visible.sync="file" :close-on-click-modal="false" width="30%">
            <el-upload class="upload-demo" :action='this.$host+"upload"' :before-remove='bremove' multiple :file-list="filelist">
              <el-button type="primary" size='small'>{{$t('message.up')}}</el-button>
            </el-upload>
        </el-dialog>
    </el-row>
</template>
<script>
export default {
    name:'topbar',
    data(){
        return{
            user:sessionStorage.getItem('user'),
            file:false,
            filelist:[]
        }
    },
    methods:{
        outlogin(){
            this.$confirm('退出？','提示',{
                confirmButtonText:'确认',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                this.$router.push('/')
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '已取消'
                });  
            })
        },
        changlang (e) {
            localStorage.setItem('lang',e);
            this.$i18n.locale = e;
        },
        bremove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        }
    }
}
</script>
<style>
#top{
    background-color: #66B1FF;
}
.title{
    font-size: 1.2em;
    margin: 1em;
    font-weight: 700
}
.outlogin{
    margin:2em;
    line-height: 4em;
    cursor: pointer;
}
.Logo{
    margin:0.3rem 3rem 0 2rem;
    height: 3rem;
    width: 40%;
}
</style>
