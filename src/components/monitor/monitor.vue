<template>
    <div>
        <el-row>
            <iframe src="http://192.168.11.232:3000/d/XsDg4IoWz/graphite-carbon-metrics-copy?orgId=1&kiosk" style="width:100%;position:absolute;" id="mon" frameborder="0"></iframe>
        </el-row>
    </div>
</template>

<script>
export default {
    name:'monitor',
    data(){
        return{

        }
    },
    mounted(){
        function changeMobsfIframe(){
            const mobsf = document.getElementById('mon');
            const deviceWidth = document.body.clientWidth;
            const deviceHeight = document.body.clientHeight;
            mobsf.style.width = (Number(deviceWidth)-250) + 'px'; //数字是页面布局宽度差值
            mobsf.style.height = (Number(deviceHeight)-56.8) + 'px'; //数字是页面布局高度差
        }
    
        changeMobsfIframe()
    
        window.onresize = function(){
            changeMobsfIframe()
        }
    }
}
</script>

<style>

</style>