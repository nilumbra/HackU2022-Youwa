<template>
  <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item>
      <!-- :title="`${data[0].clause_num}`" -->
      <!--  + ' ' + data[0].clause_body.clause_text -->
      <template slot="title">
        
        <span class="span-ellipsis">
          {{ '１ - ' + data[0].clause_body.clause_text}}
        </span>
        
      </template>
      {{data[0].clause_body.clause_text}}
    </el-collapse-item>
    <template v-for="({clause_num, clause} ,index) in data.slice(1)"> 
      <el-collapse-item :key="index">
        <!-- :title="`${clause_num}`"  + ' ' +  clause.clause_text -->
        <template slot="title">
          <span class="span-ellipsis">
            {{clause_num }} - {{clause.clause_text}}
          </span>
        </template>
        <marked-text 
        :text="clause.clause_text" 
        :hlFlag="clause.flag">
        </marked-text>
        {{flag}}
        <!-- {{clause.clause_text}} -->
      </el-collapse-item>
    </template>
  </el-collapse>
</template>
<style>
  el-collapse-item {
    padding:20px !important;
  }
</style>
<script>
import MarkedText from './MarkedText.vue';

export default {
  components: {
    MarkedText
  },
  props:{
    data: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      activeNames: []
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
  }
}
</script>
