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

<script>
// import ContractInput from './component/ContractInput.vue';
import ContractStruct from './component/ContractStruct.vue';
import http from './services/http.js';

export default {
  components: {
    ContractStruct,
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
          }).catch(err => {
            alern("入力していただいた契約書を解析できませんでした");
          })
    }
  }
}
</script>

<style>
textarea:focus {
    border: 3px solid lightblue;
}
::placeholder {
    color: #919191;
}
.outputText {
    width: 470px;
    height: 520px;
    border: 3px solid #fff;
    border-radius: 40px;
    background-color: #F7F7F7;
    padding: 24px;
}
.btnParent {
    display: flex;
    justify-content: center;
    margin-top: 32px;
}
.btn {
    width: 240px;
    height: 64px;
    border-radius: 16px;
    font-size: 22px;
    font-weight: 400;
    background-color: black;
    color: white;
    text-align: center;
}
.btn :hover {
    background-color: #444;
}
/* radio button style */
.headerMenu h4 {
    font-size: 24px;
    font-weight: 400;
    color: #666;
    text-align: right;
}
label {
    position: relative;
    cursor: pointer;
    padding-left: 60px;
    font-size: 20px;
}
label::before,
label::after {
    content: “”;
    display: block;
    border-radius: 50%;
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
}
label::before {
    background-color: #fff;
    border: 2px solid #777;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    left: 25px;
}
label::after {
    background-color: #000;
    border-radius: 50%;
    opacity: 0;
    width: 16px;
    height: 16px;
    left: 29px
}
input:checked + label::after {
    opacity: 1;
}
.visually-hidden {
   position: absolute !important; 
   white-space: nowrap !important;
   border: 0 !important;
   clip: rect(0 0 0 0) !important;
   clip-path: inset(50%) !important;
   overflow: hidden !important;
   height: 1px !important;
   width: 1px !important;
   margin: -1px !important;
   padding: 0 !important;
}
</style>
