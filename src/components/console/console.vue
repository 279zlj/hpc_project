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
                  <el-table-column label="状态" prop="vncval">
                      <template slot-scope="scope">
                          <el-tag :type="scope.row.vncval ?'success':'danger'" v-text="scope.row.vncval?'open':'close'"></el-tag>
                      </template>
                  </el-table-column>
                  <el-table-column label="操作">
                      <template slot-scope="scope">
                          <el-button type="primary" size="mini" @click="open(scope.row.vncval)">设置</el-button>
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
            <iframe style="width:100%;min-height:46em" :id='"shell"+i.name' scrolling="no" frameborder="0" :src='i.content'></iframe>
        </el-tab-pane>
        <el-dialog title="VNC设置" :visible.sync="openvnc" width="30%" :before-close="handleClose">
            <el-form :model="vncset" ref="vncset" label-width="100px" class="demo-ruleForm">
                功能开关：<el-switch v-model="vncset.vncval" active-text="开启" inactive-text="关闭"></el-switch>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="openvnc = false">取 消</el-button>
                <el-button type="primary" @click="openvnc = false">确 定</el-button>
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
            openvnc:false,
            ccdata:[
                {host:'192.168.1.1',vncval:true},
                {host:'192.168.1.2',vncval:false}
            ],
            tabsdata:[
                
            ],
            tabindex:0,
            vncset:{
                vncval:''
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
            this.openvnc = true
            this.vncset.vncval = val
        },
        handleClose(done){
            done();
            this.$refs['vncset'].resetFields();
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
                    content:'http://192.168.11.232:6080/vnc.html?host=192.168.11.232&port=6080'
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