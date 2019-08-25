<template>
    
            <el-main class="content">
                <el-row class="tbar">
                    <p>{{$t('message.server')}}</p>
                </el-row>
                <el-row style="height:100%;">
                    <div class="tips">
                        <span style="display:block">node_state：</span>
                        <span class="block"><el-badge is-dot type="success" class="item" style="margin:.3em .5em 0 .5em "></el-badge>available</span>
                        <span class="block"><el-badge is-dot type="warning" class="ite" style="margin:.3em .5em 0 .5em "></el-badge>drained</span>
                        <span class="block"><el-badge is-dot type="danger" class="item" style="margin:.3em .5em 0 .5em "></el-badge>down</span>
                        <span class="block"><el-badge is-dot type="primary" class="item" style="margin:.3em .5em 0 .5em "></el-badge>reserved</span>
                        <span class="block"><el-badge is-dot type="info" class="item" style="margin:.3em .5em 0 .5em "></el-badge>maint</span>
                    </div>
                    <el-row :gutter="10" style="height:100%;margin:0 !important">
                        <el-col :xs="10" :sm="10" :md="10" :lg="6" :xl="6" class="ser" v-for='(r,i) in rackdata' :key='i'>
                            <span>rack：{{r.name}}</span>
                            <div style="bottom:3rem;position:absolute">
                            <el-row class='alone'   @click.native="lookdetail(b)" v-for='(b,i) in rackdata[i].nodes' :key='i'>
                                <el-col :span='3' style="height:100%">
                                    <el-badge is-dot type="success" class="item" style="margin:.3em .3rem 0 .3rem ;float:left" ></el-badge>
                                </el-col>
                                <el-col :span='21' style="height:100%">
                                    <div :class='[b.info.cpus<=5?"modal":"",b.info.cpus<=27&&b.info.cpus>5?"modal3":"",b.info.cpus<=52&&b.info.cpus>27?"modal1":""]' v-for='(a,i) in b.info.cpus' :key='i'></div>
                                </el-col>
                            </el-row>
                            
                            </div>
                        </el-col>
                        
                    </el-row>
                </el-row>
                 <el-dialog title="工作详情" :visible.sync="visi" width="30%" :close-on-click-modal="false">
                    <div v-for='j in jobs'>
                        <span class="block" style="font-size:1.3rem">Job {{j.job_id}}：</span>
                        <ul>
                            <li>User：{{j.username}}</li>
                            <li>State：{{j.job_state}}</li>
                            <li>Reason：{{j.state_reason}}</li>
                            <li>Nodes：{{j.nodes}}</li>
                            <li>Cores：{{j.num_cpus}}</li>
                            <li>Account：{{j.account}}</li>
                            <li>QOS：{{j.qos}}</li>
                            <li>Partition：{{j.partition}}</li>
                            <li>Command：{{j.name}}</li>
                            <li>Start time：{{j.start_time}}</li>
                            <li>Eligible time：{{j.eligible_time}}</li>
                            <li>End time：{{j.end_time}}</li>
                            <li>Time limit：{{j.time_limit}}</li>
                        </ul>
                    </div>
                    <div v-if='jobs.length<1'>
                        <p>There is no data to display.</p>
                    </div>
                    <span slot="footer" class='dialog-footer'>
                        <el-button type="primary" @click="visi=false">{{$t('message.sure')}}</el-button>
                    </span>
                </el-dialog>
            </el-main>
           
</template>
<script>
import {formatTime} from '../../assets/js/changtime'
export default {
    name:'server',
    data(){
        return{
            rackdata:[],
            jobsdata:[],
            target:'',
            jobs:[],
            visi:false
        }
    },
    mounted(){
        this.gettack()
        // console.log(this.rackdata)
    },
    methods:{
        gettack(){
            var _this=this
            this.$axios.get('http://192.168.11.232:8000/racks').then(res=>{
                _this.rackdata=res.data.racks[0]
            })
        },
        lookdetail(row){
            this.target = row.username
            this.jobs=row.jobs
            for(let  i = 0;i<this.jobs.length;i++){
                this.jobs[i].start_time=formatTime(this.jobs[i].start_time,'Y/M/D h:m:s')
                this.jobs[i].eligible_time=formatTime(this.jobs[i].eligible_time,'Y/M/D h:m:s')
                this.jobs[i].end_time=formatTime(this.jobs[i].end_time,'Y/M/D h:m:s')
            }
            this.visi=true
        }
    }
}
</script>
<style>
.block{
    display: block;
    line-height: .8em;
}
.tips{
    background-color: white;
    width:6rem;
    margin:2rem 1rem;
    padding: .5rem 1rem;
    box-shadow: 0px 5px 10px grey;
    float: left;
}
.ser{
    background: url('../../../static/images/server.png') no-repeat;
    background-size: 50% 90%;
    top:2rem;
    height: 35rem !important;
    width: 20rem !important;
    margin:2rem 0rem !important;
    background-position: center;
    text-align: center;
    /* position:relative; */
}
.alone{
    background-color: #969696;
    width: 8.6rem !important;
    height: 1.7rem !important;
    margin-left: 5.4rem !important;
    margin-right:0;
    /* margin-top:30rem; */
    /* margin-left: -4.3rem; */
    cursor: pointer;
    bottom:2rem;
    /* bottom:0; */
    margin-bottom:.5rem;
}
.modal1{
    background-color:red;height:18%;width:5%;float:right;margin:.1rem .1rem 0 .1rem;
}
.modal{
    background-color:red;height:80%;width:15%;float:right;margin:.2rem .1rem 0 .1rem;
}
.modal3{
    background-color:red;height:25%;width:8%;float:right;margin:.1rem .1rem 0 .1rem;
}
</style>
