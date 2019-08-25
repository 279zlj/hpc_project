<template>
    
        <el-main class='content'>
            <el-row class='tbar'>
                <p>{{$t('message.usera')}}</p>
            </el-row>
            <el-row style="margin-top:2em;">
                <el-col :span="22" :offset="1" >
                <el-row style='margin-bottom:.5em;float:right'>
                    <el-tooltip :content="$t('user.new')" placement="bottom"><el-button type='primary' icon="el-icon-circle-plus" size='small' @click='createuser = true'></el-button></el-tooltip>
                </el-row>
                <el-table :data='userdata.slice((currpage - 1) * pagesize, currpage * pagesize)' size='small' boder :header-cell-style="{background:'#66B1FF',color:'white'}" style="width:100%;min-height:22.5em;max-height:100%;border-radius:.5em">
                    <el-table-column :label="$t('user.id')" prop="user_id"></el-table-column>
                    <el-table-column :label="$t('user.name')" prop="name"></el-table-column>
                    <el-table-column :label="$t('group.id')" prop="gid"></el-table-column>
                    <el-table-column :label="$t('user.ms')" prop="desc" width="300"></el-table-column>
                    <el-table-column :label="$t('message.oper')" width="250">
                        <template slot-scope="scope">
                            <el-tooltip :content="$t('message.modify')" placement="bottom"><el-button type='warning' icon="el-icon-edit-outline" size='mini' @click='modifyuser(scope.row)'></el-button></el-tooltip>
                            <el-tooltip :content="$t('message.delete')" placement="bottom"><el-button type='danger' icon="el-icon-delete" size='mini' @click='deleteuser(scope.row)'></el-button></el-tooltip>
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
                    <el-dialog :title="$t('user.new')" :visible.sync="createuser" width="40%" center :before-close="handleClose" :close-on-click-modal="false">
                    <el-form :model="userform" ref="userform" :rules="userrules" label-position="left" label-width="150px" class="demo-ruleForm">
                        <el-form-item :label="$t('user.name')" prop="name">
                            <el-input v-model="userform.name" :placeholder="$t('user.input1')"  autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('user.new_pass')" prop="userpwd">
                            <el-input v-model="userform.userpwd" :placeholder="$t('user.input')" type="password" ></el-input>  
                        </el-form-item>
                        <el-form-item label="确认密码" prop="pwdsure">
                            <el-input v-model="userform.pwdsure" placeholder="请输入确认密码" type="password" ></el-input>  
                        </el-form-item>
                        <el-form-item :label="$t('group.Attribution')" prop="group">
                            <el-select v-model="userform.group" :placeholder="$t('group.input')">
                              <el-option v-for="g in groupdata" :key="g.gid" :value="g.gid" :label='g.name'></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('user.ms')" prop="cc">
                            <el-input v-model="userform.cc" :placeholder="$t('user.ms')"  ></el-input>  
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="usersubmit('userform')" >{{$t('message.submit')}}</el-button>
                            <el-button @click="userreset('userform')" >{{$t('message.reset')}}</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
                </el-col>
                
            </el-row>
            
                <el-dialog :title="$t('user.muser')" :visible.sync="modify" width="40%" center :before-close="handleClose" :close-on-click-modal="false">
                    <el-form :model="userform" ref="userform" :rules="userrules" label-width="140px" label-position="left" class="demo-ruleForm">
                        <el-form-item :label="$t('user.name')">
                            {{target.name}}
                        </el-form-item>
                        <el-form-item :label="$t('user.old')" prop='oldpwd'>
                            <el-input v-model="userform.oldpwd" :placeholder="$t('user.input4')" type="password" ></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('user.new_pass')" prop='userpwd'>
                            <el-input v-model="userform.userpwd" :placeholder="$t('user.input')" type="password" ></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('user.confirm')" prop='userpwdt'>
                            <el-input v-model="userform.userpwdt" :placeholder="$t('user.input2')" type="password" ></el-input>
                        </el-form-item>
                         <el-form-item>
                            <el-button type="primary" @click="modifysubmit('userform')">{{$t('message.submit')}}</el-button>
                            <el-button @click="userreset('userform')">{{$t('message.reset')}}</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
        </el-main>
        
</template>
<script>

export default {
    name:'user',
    data(){
        // var checkoldpwd=(rule,val,callback)=>{
        //     if(!val){
        //         return callback(new Error('请输入旧密码'))
        //     }
        //     else{
        //         return callback()
        //     }
        // }
        var checkuserpwd=(rule,val,callback)=>{
            if(!val){
                return callback(new Error(this.$t('user.input')))
            }
            else {
                if(this.userform.pwdsure!=0){
                    this.$refs.userform.validateField('pwdsure')
                }
                callback()
                }
            
        }
        var checkpwdt=(rule,val,callback)=>{
            if(!val){
                return callback(new Error('请输入确认密码'))
            }
            else {
                if(val!=this.userform.userpwd){
                    return callback(new Error('两次密码不一致'))
                }
                    callback()
                }
        }
        
        return{
            pagesize: 15,
            currpage: 1,
            createuser:false,
            modify:false,
            target:'',
            pageTotal:0,
            userdata:[],
            groupdata:[],
            userform:{
                name:'',
                oldpwd:'',
                userpwd:'',
                pwdsure:'',
                group:'',
                cc:''
            },
            userrules:{
                name:[
                    {required:true, message:this.$t('user.input'), trigger:'blur' },
                ],
                // oldpwd:[
                //     {validator:checkoldpwd,trigger:'blur'}
                // ],
                userpwd:[
                    {required:true, validator: checkuserpwd, trigger:'blur' }
                ],
                pwdsure:[
                    {required:true, validator: checkpwdt, trigger:'blur' }
                ],
                group:[
                    { required:true, message:this.$t('group.input'), trigger:'blur' }
                ],
            }
        }
    },
    mounted(){
        this.getuser()
    },
    watch:{
        pageTotal(){
            if(this.pageTotal==(this.currpage-1)*this.pagesize&&this.pageTotal!=0){
                this.currpage-=1
            }
        }
    },
    methods:{
        getuser(){
            this.$axios.get(this.$host+'user').then(res=>{
                this.userdata=res.data.data
                this.pageTotal=this.userdata.length
            }).catch(error=>{
                console.log(error)
            })
            this.$axios.get(this.$host+'group').then(res=>{
                this.groupdata=res.data.data
            }).catch(error=>{
                console.log(error)
            })
        },
        modifyuser(row){
            this.target=row
            this.modify=true
        },
        usersubmit(name){
            this.$refs[name].validate((valid)=>{
                if(valid){
                    this.$axios.post(this.$host+'user',{username:this.userform.name,password:this.userform.userpwd,description:this.userform.content,group:this.userform.group}).then(res=>{
                        if(res.data.success){
                            this.$notify({
                                title:this.$t('message.success'),
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
        deleteuser(row){
            this.target=row
            var _this=this
            this.$confirm(_this.$t('message.delete')+'：'+row.name+'？',_this.$t('message.tips'),{
                confirmButtonText:_this.$t('message.sure'),
                cancelButtonText:_this.$t('message.cancel'),
                type:'warning'
            }).then(()=>{
                this.$axios.delete(this.$host+'user',{data:{username:row.name}}).then(res=>{
                    if(res.data.success){
                        _this.$message({
                            type:'success',
                            message:_this.$t('message.success')
                        })
                    }
                    _this.getuser()
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
        
        modifysubmit(name){
            this.$refs[name].validate((valid)=>{
                console.log('ok')
                if(valid){
                    console.log('asdas')
                }
                else{
                    console.log('error')
                }
            })
        },
        userreset(name){
            this.$refs[name].resetFields();
        },
        handleClose(done){
            done();
            this.$refs['userform'].resetFields();
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
