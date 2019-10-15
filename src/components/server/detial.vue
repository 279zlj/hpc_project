<template>
    <el-main class="content">
        <el-row class="tbar">
            <p>机房详情</p>
        </el-row>
        <el-row style="height:100%;margin-top:1em;">
            <div  style="width:98%;margin:0 auto">
            <el-table :data='serdata.slice((currpage - 1)*pagesize , currpage*pagesize)' size='small' border :header-cell-style="{background:'#2174FE',color:'white',height:'3rem'}" class="tabstyle">
                <el-table-column label="主机名" prop="host">
                    <template slot-scope="scope">
                        <i class="el-icon-monitor" style="margin:0 .5rem" />{{scope.row.nodes[0].info.node_addr}}（{{scope.row.nodes[0].info.name}}）
                    </template>
                </el-table-column>
                <el-table-column label="CPU" prop="cpu" width="300">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span='4'>
                            <span>{{scope.row.nodes[0].info.cpus}}</span>
                            <el-popover placement="top" content="CPU核数" trigger="hover" >
                                <i class="el-icon-info" slot="reference" />
                            </el-popover>
                            </el-col>
                            <el-col :span='10'>
                                <el-popover placement="top" content="CPU负载" trigger="hover" >
                                    <el-progress :percentage="scope.row.nodes[0].info.cpu_load" :color='colorchange' slot="reference" style="line-height:23px" ></el-progress>
                                </el-popover>
                            </el-col>
                            <!-- <el-col :span='10'>
                                <el-popover placement="top" content="CPU利用率" trigger="hover" >
                                    <el-progress :percentage="scope.row.cpu[2]" :color='colorchange' slot="reference" style="line-height:23px" ></el-progress>
                                </el-popover>
                            </el-col> -->
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column label="内存" prop="memory" width="300">
                    <template slot-scope="scope">
                        <!-- <el-row>
                            <el-col :span='6'>
                            <span>{{scope.row.memory[0]}}</span>
                            <el-popover placement="top" content="容量大小" trigger="hover" >
                                <i class="el-icon-info" slot="reference" />
                            </el-popover>
                            </el-col>
                            <el-col :span='9'>
                                <el-popover placement="top" content="内存负载" trigger="hover" >
                                    <el-progress :percentage="scope.row.memory[1]" :color='colorchange' slot="reference" style="line-height:23px" ></el-progress>
                                </el-popover>
                            </el-col>
                            <el-col :span='9'>
                                <el-popover placement="top" content="内存利用率" trigger="hover" >
                                    <el-progress :percentage="scope.row.memory[2]" :color='colorchange' slot="reference" style="line-height:23px" ></el-progress>
                                </el-popover>
                            </el-col>
                        </el-row> -->
                    </template>
                </el-table-column>
                <el-table-column label="磁盘" prop="disk">
                    <template slot-scope="scope">
                    <!-- <el-row>
                        <el-col :span='10'>
                        <span>{{scope.row.disk[0]}}</span>
                        <el-popover placement="top" content="磁盘大小" trigger="hover" >
                            <i class="el-icon-info" slot="reference" />
                        </el-popover>
                        </el-col>
                        <el-col :span='14'>
                            <el-popover placement="top" content="磁盘利用率" trigger="hover" >
                                <el-progress :percentage="scope.row.disk[1]" :color='colorchange' slot="reference" style="line-height:23px" ></el-progress>
                            </el-popover>
                        </el-col>
                    </el-row> -->
                    </template>
                </el-table-column>
                <el-table-column label="状态" prop="status" width="100">
                    <template slot-scope="scope">
                        <el-tag :type='scope.row.nodes[0].info.state == "up"?"success":scope.row.nodes[0].info.state == "IDLE"?"warning":"danger"'>{{scope.row.nodes[0].info.state}}</el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination layout='total,sizes,prev,pager,next,jumper'
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pagesize"
            :page-sizes="[10,20,30]"
            :total='pageTotal' style='text-align:right;margin:1em'
            >
            </el-pagination>
            </div>
        </el-row>
    </el-main>
</template>
<script>
export default {
    name:'serdetail',
    data(){
        return{
            pagesize: 10,
            currpage: 1,
            pageTotal:0,
            colorchange:[
                {color:'#67C23A',percentage:50},
                {color:'#E6A23C',percentage:80},
                {color:'#F56C6C',percentage:100}
            ],
            serdata:[]
        }
    },
    watch:{
        pageTotal(){
            if(this.pageTotal==(this.currpage-1)*this.pagesize&&this.pageTotal!=0){
                this.currpage-=1
            }
        }
    },
    mounted(){
        this.gettack()
    },
    methods:{
        gettack(){
            var _this=this
            this.$axios.get('http://192.168.11.232:8000/racks').then(res=>{
                _this.serdata=res.data.racks[0]
                console.log(_this.serdata)
            })
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