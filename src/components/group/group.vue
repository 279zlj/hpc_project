<template>
    
        <el-main class='content'>
            <el-row class='tbar'>
                <p>{{$t('message.group')}}</p>
            </el-row>
            <el-row style="margin-top:2em;">
                <el-col :span="22" :offset="1" >
                <el-row style='margin-bottom:.5em;float:right'>
                    <el-tooltip :content="$t('message.add')" placement="bottom"><el-button type='primary' icon="el-icon-circle-plus" size='small' @click='creategroup = true'></el-button></el-tooltip>
                </el-row>
                <el-table :data='groupdata.slice((currpage - 1) * pagesize, currpage * pagesize)' size='small' boder :header-cell-style="{background:'#66B1FF',color:'white'}" style="width:100%;min-height:22.5em;max-height:100%;border-radius:.5em">
                    <el-table-column :label="$t('group.id')" prop="gid"></el-table-column>
                    <el-table-column :label="$t('group.name')" prop="name"></el-table-column>
                    <el-table-column :label="$t('message.oper')" width="250">
                        <template slot-scope="scope">
                            <el-tooltip :content="$t('message.delete')" placement="bottom"><el-button type='danger' icon="el-icon-delete" size='mini' @click='deletegroup(scope.row)'></el-button></el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[15,30,45]"
                    :page-size="pagesize"
                    :total="pageTotal" style="text-align: right;margin: 1em">
                    </el-pagination>
                    <el-dialog :title="$t('group.new')" :visible.sync="creategroup" width="40%" center :before-close="handleClose" :close-on-click-modal="false">
                    <el-form :model="groupform" ref="groupform" :rules="grouprules" label-position="left" label-width="100px" class="demo-ruleForm">
                        <el-form-item :label="$t('group.name')" prop="name">
                            <el-input v-model="groupform.name" :placeholder="$t('group.input')"  autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="groupsubmit('groupform')" >{{$t('message.submit')}}</el-button>
                            <el-button @click="groupreset('groupform')" >{{$t('message.reset')}}</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
                </el-col>
                
            </el-row>
            
        </el-main>
        
</template>
<script>

export default {
    name:'user',
    data(){
        return{
            pagesize: 15,
            currpage: 1,
            creategroup:false,
            target:'',
            pageTotal:0,
            groupdata:[],
            groupform:{
                name:'',
            },
            grouprules:{
                name:[
                    { required:true, message:this.$t('group.input1'), trigger:'blur' },
                ],
               
            }
        }
    },
    mounted(){
        this.getgroup()
    },
    watch:{
        pageTotal(){
            if(this.pageTotal==(this.currpage-1)*this.pagesize&&this.pageTotal!=0){
                this.currpage-=1
            }
        }
    },
    methods:{
        getgroup(){
            this.$axios.get(this.$host+'group').then(res=>{
                this.groupdata=res.data.data
                this.pageTotal=this.groupdata.length
            }).catch(error=>{
                console.log(error)
            })
        },
        
        groupsubmit(name){
            this.$refs[name].validate((valid)=>{
                if(valid){
                    this.$axios.post(this.$host+'group',{group:this.groupform.name}).then(res=>{
                        if(res.data.success){
                            this.$notify({
                                title:'操作成功',
                                type:'success'
                            })
                        }
                        else{
                            this.$notify({
                                title:res.data.msg,
                                type:'success'
                            })
                        }
                        this.createuser=false,
                        this.getuser()
                    }).catch(error=>{
                        console.log(error)
                    })
                }
                else{
                    console.log('error')
                }
            })
        },
        deletegroup(row){
            this.target=row
            var _this=this
            this.$confirm(_this.$t('message.delete')+'：'+row.name+'？',_this.$t('message.tips'),{
                confirmButtonText:_this.$t('message.sure'),
                cancelButtonText:_this.$t('message.cancel'),
                type:'warning'
            }).then(()=>{
                this.$axios.delete(this.$host+'group',{data:{username:row.name}}).then(res=>{
                    if(res.data.success){
                        _this.$message({
                            type:'success',
                            message:_this.$t('message.success')
                        })
                    }
                    _this.getgroup()
                }).catch(error=>{
                    console.log(error)
                })
                
            }).catch(()=>{
                _this.$message({
                    type: 'info',
                    message: _this.$t('message.cancel')
                });  
            })
        },
        groupreset(name){
            this.$refs[name].resetFields();
        },
        handleClose(done){
            done();
            this.$refs['groupform'].resetFields();
        },
        handleCurrentChange(cpage) {
          this.currpage = cpage;
        },
        handleSizeChange(psize) {
          this.pagesize = psize;
        },
    }
}
</script>
<style>

</style>
