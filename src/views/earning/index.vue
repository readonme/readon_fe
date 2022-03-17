<template>
  <div class="achievement-page">
    <div class="achievement-header"> 
      <img
        src="@/assets/img/achievement/mintnft.png"
        class="achievement-header-image"
      />
    <div class="achievement-header-title">My Earning</div>
      <div class="achievement-header-count">
        <div class="achievement-header-reach-count">{{sum}}</div> 
        
      </div>
    
    </div>
    <div class="earning-content">
       <el-table :data="earnings" stripe  style="width:100%;color:black;font-size:1em" >
        <el-table-column fixed sortable prop="date" label="Date"/>
        <el-table-column sortable prop="principal" label="Wallet" />
        <el-table-column prop="reward_amount" label="Amount" width="100"/> 
        <el-table-column prop="reward_type" label="Reward type" /> 
         <el-table-column prop="message" label="Message" /> 
  </el-table>
    </div>
 
  </div>
</template>
<script>
import { getRewardHistory } from "@/api/mine.js";

export default {
  name: "MyEarning",
  components: {},
    data() {
    return {
      earnings:[],
      sum:0
    };
  },
  async created() { 
    let _this = this
    let res = await getRewardHistory()
    var resarry = res.data.data
    resarry.forEach(function (ele){ 
      _this.sum += ele["reward_amount"]  
      let principal = ele["principal"]    
      ele["principal"] = principal.substring(0, 4) + ".."  + principal.substring(principal.length-4);
      ele["reward_amount"] =  ele["reward_amount"]  >  0 ? "+" +ele["reward_amount"] : ele["reward_amount"]
      ele["reward_type"] = ele["reward_type"]  ==  0 ? "READ $" : "Unkonwn"
      ele["message"] = ""  
      
    })
    this.earnings = resarry 
    console.log(this.earnings )


  },


  methods: {
     getRowClass({ row, column, rowIndex, columnIndex }) {
                return "background:#3f5c6d2c;";
            }
  }
};
</script>
<style scoped src="../../assets/css/dark/earning.css"></style>
