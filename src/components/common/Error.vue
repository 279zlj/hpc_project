<template>
    <el-row id='Error'>
        <el-col :span='10' :offset='7' id='from'>
            <i class="el-icon-warning" id='warnning'></i>
            <p class='font'>您输入的网址无效，请确认正确网址</p>
            <p style="color:red;font-weight:700">tips：登录网址为->/</p>
        </el-col>
    </el-row>
</template>
<script>
export default {
    name:'Error',
}
</script>
<style>
#Error{
    background:url('../../../static/images/HPC_02.png') no-repeat;
    background-size:cover;
    width:100%;
    height: 100%;
    background-color: #1F2325;
    margin:0;
    padding:0;
}
#from{
    margin-top:10%;
    background-color:lightslategray;
    opacity: .7;
    height:50%;
    border-radius:1em;
    text-align: center;
}
#warnning{
    margin-top: 15%;
    text-align: center;
    font-size: 10em;
    color: red;
}
.font{
    text-align: center;
    color: white;
    font-size: 1.3em;
    font-weight: 700;
}
</style>

