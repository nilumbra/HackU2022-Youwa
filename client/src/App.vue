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
          <input class="visually-hidden" id="kou" type="radio" name="reader" value="0" v-model="picked">
          <label class="readerRadio" for="kou">甲</label> 
          <input class="visually-hidden" id="otsu" type="radio" name="reader" value="1" v-model="picked">
          <label class="readerRadio" for="otsu">乙</label>
          <input class="visually-hidden" id="both" type="radio" name="reader" value="3" v-model="picked">
          <label class="readerRadio" for="both">両方</label>
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
            <span @click="clearTextArea" class="textDelete">×</span>
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
        <template v-if="isTextAreaEmplty">
          <label id="fileUploadButtonLabel" class="file-upload-button" for="file-upload-button" @click="uploadHandler">
            Wordから要約 <i class="el-icon-upload2"></i> 
          </label>
          <input name="file-upload-button" ref="fileUploadButton" id="fileUploadButton" class="file-upload-button-input" type="file"
          @change="fileChangeHandler"
          >
        </template>
        <template v-else>
          <button form="input" @click="onSubmit" type="submit" class="btn">要約する</button>
        </template>
      </div>
    </main>
  </div>
<!-- 
      <contract-input></contract-input>
      <contract-struct></contract-struct> -->
</template>
<style scoped>
  .textDelete {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 1em;
    height: 1em;
    color: #444;
    /* background-color: #fff; */
    /* border-radius: 50%; */
    /* border: 1px solid #000; */
    font-size: 1.5em;
    font-weight: 100;
    text-align: center;
    line-height: 1em;
    opacity: 0.3;
    cursor: pointer;
  }

  .textDelete:hover {
    opacity: 0.5;
  }

  .textDelete:active {
    opacity: 0.8;
  }

  .contractTitle {
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

  .file-upload-button {
    display: block;
    width: 240px;
    height: 64px;
    border-radius: 16px;
    font-size: 22px;
    font-weight: 400;
    line-height: 64px;
    background-color: black;
    color: white;
    text-align: center;
    cursor: pointer;
  }

  .file-upload-button:hover {
      background-color: #444;
  }

  .file-upload-button-input {
      display: none;
  }
</style>
<script>
// import ContractInput from './components/ContractInput.vue';
import ContractStruct from './components/ContractStruct.vue';
import http from './utils/http.js';
import { docx2txt } from './utils/converter.js';

export default {
  components: {
    ContractStruct,
  },
  computed: {
      peg() {
        return this.$store.state.contractPEGTree
      }, 
      isTextAreaEmplty() {
        return this.contractText === ""
      },
    }, 
  data() {
    return {
      placeholder: '契約書を入力してください',
      contractText: this.$store.state.sample,
      picked: "1",
    }
  }, 
  watch: {
    picked(newVal, oldVal) {
      console.log(`newVal: ${newVal}, oldVal: ${oldVal}`)
      this.$store.state.reader = parseInt(newVal)
    },
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
    }, 
    clearTextArea() {
      this.contractText = "";
    },
    uploadHandler() {
        this.$refs.fileUploadButton.click();
    },
    // On file load, POST /post
    fileChangeHandler(e) {
      var file = e.target.files[0];
      if (file && file.name.match(/\.docx$/i)) {
          docx2txt(file, (txt) => {
            this.contractText = txt.trim();
            // console.info(txt);
            http.postContractForm({contractText: this.contractText})
              .then((json_str) => {
              // console.log(JSON.parse(json_str));
              const pojo = JSON.parse(json_str)
              const summarized = JSON.parse(pojo['summarized']);
              console.log("Without parse " + typeof(summarized));
              console.log(summarized)
              this.$store.state.contractPEGTree = summarized;
              this.$message({
                showClose: true,
                message: '契約書を解析しました',
                type: 'success',
                duration: 2000
              });
            }).catch(err => {
              this.$message({
                showClose: true,
                message: '入力していただいた契約書を解析できませんでした',
                type: 'error',
                duration: 2000
              });
            })
        });
      }
    }
  }
}
</script>