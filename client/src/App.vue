<template>
  <div>
    <header>
      <div class="headerTitle">
        <h1>YOWA</h1>
        <p>契約書を、かんたんに。</p>
      </div>
      <div class="headerMenu">
        <h4> ハイライト　</h4>
        <div>
          <input id="kou" type="radio" name="reader" value="0" v-model="picked">
          <label for="kou">甲</label> 
          <input id="otsu" type="radio" name="reader" value="1" v-model="picked">
          <label for="otsu">乙</label>
          <input id="both" type="radio" name="reader" value="2" v-model="picked">
          <label for="both">両方</label>
        </div>
        <!-- <li>要約</li>
        <li>保存済み</li>
        <li>設定</li> -->
      </div>
    </header>
    <main>
      <div class="content">
        <div class="inputArea">
          <form @submit.prevent id="input" method="POST" action="/post">
          <!-- <label for="contractType">契約書の種類を選んでください</label>
          <select name="contractType" id="contractType">
            <option value="employ">雇用</option>
            <option value="contractor">請負</option>
            <option value="trade">売買</option>
            <option value="nondisclosure">秘密保持</option>
            <option value="engagement">委任</option>
          </select><br><br> -->
            <textarea ref="contractText" id="contractText" name="contractText" :placeholder="placeholder" v-model="contractText" rows="24" cols="48"></textarea>
          </form>
        </div>
        <div class="outputText">
          <h3 v-if="peg.title" class="contractTitle">{{peg.title}}</h3>
          <!-- <p id="summarized">Output will be showed here.</p> -->
          <contract-struct></contract-struct>
        </div>
      </div>
      <div class="btnParent">
        <button form="input" @click="onSubmit" type="submit" class="btn">要約する</button>
      </div>
    </main>
  </div>
<!-- 
      <contract-input></contract-input>
      <contract-struct></contract-struct> -->
</template>
<style scoped>
  .contractTitle{
    background-color:#fff;
    position: sticky;
    width:100%;
    padding:10px;
    justify-content: center;
    text-align: center;
    top: 0%;
    /* padding: 2em; */
    /* left: 50%; */
    /* transform: translateX(-50%); */
}
</style>
<script>
// import ContractInput from './component/ContractInput.vue';
import ContractStruct from './component/ContractStruct.vue';
import http from './services/http.js';

export default {
  components: {
    ContractStruct,
  },
  computed: {
      peg() {
        return this.$store.state.contractPEGTree
      }
    }, 
  data() {
    return {
      placeholder: '契約書を入力してください',
      contractText: this.$store.state.sample,
      picked: "1",
    }
  }, 
  mounted() {
    // console.log(this.$refs.contractText)
    // this.$refs.contractText.value = this.$store.state.sample;
  }, 
  watch: {
    picked(newVal, oldVal) {
      console.log(`newVal: ${newVal}, oldVal: ${oldVal}`)
      this.$store.state.reader = parseInt(newVal)
    }
  }, 
  methods: {
    onSubmit() {
      http.postContractForm({contractText: this.contractText})
          .then((json_str) => {
            // console.log(JSON.parse(json_str));
            const pojo = JSON.parse(json_str)
            const summarized = JSON.parse(pojo['summarized']);
            console.log("Without parse " + typeof(summarized));
            this.$store.state.contractPEGTree = summarized;
            this.$message({
              message: '契約書を解析しました',
              type: 'success',
              duration: 2000
            });
          }).catch(err => {
            this.$message({
              message: '入力していただいた契約書を解析できませんでした',
              type: 'error',
              duration: 2000
            });
          })
    }
  }
}
</script>