<template>
  <div>
    <h3>{{peg.title}}</h3>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="前文" name="1">
        {{peg.premises}}
      </el-collapse-item>
      <el-collapse-item title="Consistency" name="2">
        <marked-text text="秘密保持契約書" :hlFlag="[0, 1]"></marked-text>
      </el-collapse-item>
      <el-collapse-item title="後文" name="10">
        {{peg.closing}}
      </el-collapse-item>
      <el-collapse-item title="日付" name="11">
        {{[peg.sign_date["year"], peg.sign_date["month"], peg.sign_date["day"]].join("")}}
      </el-collapse-item>
      <el-collapse-item title="署名(記名)　押印欄" name="12">
        {{peg.signature}}
      </el-collapse-item>
    </el-collapse>  
  </div>
  
</template>
<script>
  import MarkedText from './MarkedText.vue';

  export default {
    components: {
      MarkedText,
    },
    created(){
      const log = console.log;
      const peg = this.$store.state.contractPEGTree;
      // use the data structure in $store.state.contractPEGTree
      // Append el-collapse-item to the root node
      // this.$el.appendChild(this.$refs.collapse.$el);
      log(JSON.stringify(peg, null, 2));
      for (const prop in peg) {
        log(prop)
      }
    },
    computed: {
      peg() {
        return this.$store.state.contractPEGTree
      }
    }, 
    data() {
      return {
        activeNames: ['1']
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
  }
</script>