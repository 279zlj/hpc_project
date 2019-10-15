<template>
    
            <el-main class='content'>
                <el-row class='tbar'>
                    <p>{{$t('message.list')}}</p>
                </el-row>
                <el-row >
                    <el-card class='box-card card_top' shadow='alaway'>
                        <el-row>
                            <div style="text-align:center;" v-show="tasktip">
                                No Task
                            </div>
                            <el-col :xs='10' :sm='10' :md='10' :lg='7' :xl='7'>
                                <div id='allo' class="ddsize"></div>
                            </el-col>
                            <el-col :xs='14' :sm='14' :md='14' :lg='17' :xl='17'>
                                <el-col :xs='12' :sm='12' :md='12' :lg='8' :xl='8'>
                                    <div id='jobs' class="ddsize"></div>
                                </el-col>   
                                <el-col :xs='12' :sm='12' :md='12' :lg='8' :xl='8'>
                                    <div id='npart' class="ddsize"></div>
                                </el-col>
                                <el-col :xs='12' :sm='12' :md='12' :lg='8' :xl='8'>
                                    <div id='cpart' class="ddsize"></div>
                                </el-col>
                                
                                
                            </el-col>
                        </el-row>
                    </el-card>
                </el-row>
                <el-row>
                    <el-card  class='box-card' style="margin:0 1rem" shadow='alaway'>
                         <el-input v-model="search" :placeholder="$t('message.find')" prefix-icon="el-icon-search" style="width:20%;float:right"/>
                        <el-table :data='taskdata.filter(data => !search || data.login.toLowerCase().includes(search.toLowerCase()))' style="width:100%;height:18.5em;overflow-y:scroll">
                            <el-table-column label="id" prop="job_id"></el-table-column>
                            <el-table-column label="User" prop="login"></el-table-column>
                            <el-table-column label="Resources" prop="tres_req_str" width='200px'></el-table-column>
                            <el-table-column label="State" prop="job_state"></el-table-column>
                            <el-table-column label="Reason" prop="state_reason" width='200px'></el-table-column>
                            <el-table-column label="Start" prop="start_time" width='200px'></el-table-column>
                            <el-table-column label="Partition" prop="partition"></el-table-column>
                            <el-table-column :label="$t('message.oper')">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="mini" @click="detail(scope.row)">{{$t('raid.detail')}}</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                </el-row>
            </el-main>
        
</template>
<script>
import {formatTime} from '../../assets/js/changtime'
export default {
    name:'task',
    data(){
        return{
            search: '',
            taskdata:[],
            jobsdata:[
                {value:0,name:'Running'},{value:0,name:'Pending'},{value:0,name:'Completed'}
            ],
            allocated:[{value:0, name:'allocated'},{value:0, name:'idle'},],
            nodedata:[],
            qosdata:[],
            tasktip:false,
        }
    },
    mounted(){
        this.gettask()
    },
    methods:{
        gettask(){
            var a = [] 
            var a1 = []
            var cpu = ''
            var node = []
            var qos = []
            this.$axios.get(this.$host+'jobs').then(res=>{
                this.taskdata=res.data.data
                if(this.taskdata.length != 0){
                    this.tasktip=false
                    var r = 0
                    var p = 0
                    var c = 0
                    for(let i = 0 ;i<this.taskdata.length;i++){
                        // console.log(this.taskdata[i])
                        if(this.taskdata[i].job_state == 'RUNNING'){
                            r = r+1
                        }
                        if(this.taskdata[i].job_state == 'PENDING'){
                            p = p+1
                        }
                        if(this.taskdata[i].job_state == 'COMPLETED'){
                            c = c+1
                        }
                        this.taskdata[i].start_time=formatTime(this.taskdata[i].start_time,'Y/M/D h:m:s')
                        this.taskdata[i].eligible_time=formatTime(this.taskdata[i].eligible_time,'Y/M/D h:m:s')
                        this.taskdata[i].end_time=formatTime(this.taskdata[i].end_time,'Y/M/D h:m:s')
                        cpu = this.taskdata[0].num_cpus
                        node.push(this.taskdata[0].partition)
                        if(this.taskdata[0].qos == null)
                            qos.push('null')
                        // if(Object.getOwnPropertyNames(this.taskdata[i].cpus_allocated).length != 1 )
                        //     a1.push(this.taskdata[i].cpus_allocated)
                        
                    }
                    for(let a= 0;a<this.jobsdata.length;a++){
                        if(this.jobsdata[a].name == 'Running')
                            this.jobsdata[a].value = r
                        if(this.jobsdata[a].name == 'Pending')
                            this.jobsdata[a].value = p
                        if(this.jobsdata[a].name == 'Completed')
                            this.jobsdata[a].value = c
                    }
                    for(let a= 0;a<this.allocated.length;a++){
                        if(this.allocated[a].name == 'allocated')
                            this.allocated[a].value = r
                        if(this.allocated[a].name == 'idle')
                            this.allocated[a].value = cpu-r
                    }
                    var aa = {}
                    aa.name = Array.from(new Set(node))[0]
                    aa.value = 1
                    this.nodedata.push(aa)
                    var bb = {}
                    bb.name = Array.from(new Set(qos))[0]
                    bb.value = 1
                    this.qosdata.push(bb)
                    this.jobsdata.name
                    this.drawjobs()
                    this.drawallo()
                    this.drawnpart(node)
                    this.drawcpart(qos)
                
                }
                else{
                    this.tasktip=true
                }
            }).catch(error=>{
                console.log(error)
            })
        },
        detail(row){
            console.log(row)
            const h = this.$createElement
            this.$msgbox({
                title:this.$t('raid.de'),
                message:h('div',null,[
                    h('p',null,'User：'+row.username),
                    h('p',null,'State：'+row.job_state),
                    h('p',null,'Reason：'+row.state_reason),
                    h('p',null,'Nodes：'+row.nodes),
                    h('p',null,'Cores：'+row.num_cpus),
                    h('p',null,'Account：'+row.account),
                    h('p',null,'QOS：'+row.qos),
                    h('p',null,'Partition：'+row.partition),
                    // h('p',null,'Workload：'+row.user),
                    // h('p',null,'Exclusive：'+row.user),
                    h('p',null,'Command：'+row.name),
                    h('p',null,'Start time：'+row.start_time),
                    h('p',null,'Eligible time：'+row.eligible_time),
                    h('p',null,'End time：'+row.end_time),
                    h('p',null,'Time limit：'+row.time_limit),
                ]),
                showCancelButton:true,
                confirmButtonText:this.$t('message.sure'),
                cancelButtonText:this.$t('message.cancel'),

            })
        },
        drawallo(){
            let mychart= this.$echarts.init(document.getElementById('allo'))
            mychart.setOption({
                title : {
                text: 'Allocated cores',
                x:'center',
                y:'bottom'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                // orient: 'vertical',
                // left: 'right',
                data: ['allocated','idle']
            },
            series : [
                {
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:this.allocated,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        normal:{
                            color:function(params) {
                            //自定义颜色
                            var colorList = [          
                                    '#2174FF', '#E8C054',
                                ];
                                return colorList[params.dataIndex]
                                }
                        }
                    }
                }
            ]
            })
            window.addEventListener("resize", () => { mychart.resize();});
        },
        drawjobs(){
            let mychart= this.$echarts.init(document.getElementById('jobs'))
            mychart.setOption({
                title : {
                text: 'Jobs/State',
                x:'center',
                y:'bottom'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                // orient: 'vertical',
                // left: 'right',
                data: ['Running','Pending','Completed']
            },
            series : [
                {
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data: this.jobsdata,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        normal:{
                            color:function(params) {
                            //自定义颜色
                            var colorList = [          
                                    '#E9BF54','#2174FF','#DE3842'
                                ];
                                return colorList[params.dataIndex]
                                }
                        }
                    }
                }
            ]
            })
            window.addEventListener("resize", () => { mychart.resize();});
        },
        drawnpart(dd){
            let mychart= this.$echarts.init(document.getElementById('npart'))
            mychart.setOption({
                title : {
                text: 'Nodes/Partition',
                x:'center',
                y:'bottom'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                // left: 'right',
                data: dd
            },
            series : [
                {
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:this.nodedata,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        normal:{
                            color:function(params) {
                            //自定义颜色
                            var colorList = [          
                                    '#E9C054',
                                ];
                                return colorList[params.dataIndex]
                                }
                        }
                    }
                }
            ]
            })
            window.addEventListener("resize", () => { mychart.resize();});
        },
        drawcpart(aa){
            let mychart= this.$echarts.init(document.getElementById('cpart'))
            mychart.setOption({
                title : {
                text: 'Cores/QoS',
                x:'center',
                y:'bottom'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                // orient: 'vertical',
                // left: 'right',
                data: aa
            },
            series : [
                {
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:this.qosdata,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        normal:{
                            color:function(params) {
                            //自定义颜色
                            var colorList = [          
                                    '#E9C054',
                                ];
                                return colorList[params.dataIndex]
                                }
                        }
                    }
                }
            ]
            })
            window.addEventListener("resize", () => { mychart.resize();});
        },
        
    }
}
</script>
<style>
.card_top{
    margin:1rem 1rem 1rem 1rem
}
.ddsize{
    width: 100%;
    height:17rem;
}
</style>
