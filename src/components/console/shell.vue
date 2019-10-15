<template>
    <el-tabs v-model='defaulttabs' type='card' closable @tab-remove="removetab">
        <el-tab-pane key=0 label='主机列表' name=0>
            <div class="tabsbg">
                <div style="width:98%;margin:0 auto">
                <el-table :data='ccdata.slice((currpage - 1) * pagesize, currpage * pagesize)' size='small' boder :header-cell-style="{background:'#2174FE',color:'white',height:'3rem'}" class="tabstyle" style="margin-top:1rem">
                  <el-table-column label="主机" prop="host">
                      <template slot-scope="scope">
                          <i class="el-icon-monitor" style="margin:0 .5rem" />{{scope.row.host}}
                      </template>
                  </el-table-column>
                  <el-table-column label="状态" prop="shell">
                      <template slot-scope="scope">
                          <el-tag :type="scope.row.shell ?'success':'danger'" v-text="scope.row.shell?'open':'close'"></el-tag>
                      </template>
                  </el-table-column>
                  <el-table-column label="操作">
                      <template slot-scope="scope">
                          <el-button type="primary" size="mini" @click="open(scope.row.shell)">设置</el-button>
                          <el-button type="success" size="mini" @click="enterother(scope.row.host)">进入</el-button>
                      </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10,20,30]"
                    :page-size="pagesize"
                    :total="pageTotal" style="text-align: right;margin: 1em">
                </el-pagination>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane v-for='(i,index) in tabsdata' :key='i.name' :label='i.title' :name='i.name'>
            <iframe style="width:100%;min-height:46em" id='shell' :src='i.content' scrolling="no" frameborder="0"></iframe>
        </el-tab-pane>
        <el-dialog title="Shell设置" :visible.sync="openshell" width="30%" :before-close="handleClose">
            <el-form :model="shellset" ref="shellset" label-width="100px" class="demo-ruleForm">
                功能开关：<el-switch v-model="shellset.shell" active-text="开启" inactive-text="关闭"></el-switch>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="openshell = false">取 消</el-button>
                <el-button type="primary" @click="openshell = false">确 定</el-button>
            </span>
        </el-dialog>
    </el-tabs>
</template>
<script>
export default {
    name:'console',
    data(){
        return{
            defaulttabs:0,
            pagesize: 10,
            currpage: 1,
            pageTotal:0,
            ccdata:[
                {host:'192.168.1.1',shell:false},
                {host:'192.168.1.2',shell:false}
            ],
            tabsdata:[
                
            ],
            tabindex:0,
            openshell:false,
            shellset:{
                shell:''
            }
        }
    },
    methods:{
        removetab(target){
            let tabs = this.tabsdata
            let acitve = this.defaulttabs;
            if(acitve === target){
                tabs.forEach((tab,index)=>{
                    if(tab.name === target){
                        let nextTab = tabs[index+1]||tabs[index-1]
                        if(nextTab !=undefined){
                            acitve = nextTab.name
                        }
                        else{
                            acitve = '0'
                        }
                    }
                })
            }
            this.defaulttabs = acitve
            this.tabsdata = tabs.filter(tab => tab.name !== target)
            
        },
        open(val){
            this.openshell = true
            this.shellset.shell = val
        },
        handleClose(done){
            done();
            this.$refs['shellset'].resetFields();
        },
        handleCurrentChange(cpage) {
          this.currpage = cpage;
        },
        handleSizeChange(psize) {
          this.pagesize = psize;
        },
        enterother(host){
                this.newTab = ++this.tabindex + '';
                this.tabsdata.push({
                    title:host,
                    name:this.newTab,
                    content:'http://192.168.11.232:9090/'
                })
                
                this.defaulttabs=this.newTab
        }
    }
}
</script>
<style>
.el-tabs__header{
    background-color: white !important;
    padding-top:.5rem !important;
    margin:0 !important;
}
/* .el-tabs__content{
    height: 100%;
    width:100%;
    background-color: white !important;
} */
</style>