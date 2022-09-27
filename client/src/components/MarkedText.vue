<template>
  <div>
    <!-- 甲 -->
    <span class="readerMark kou" v-if="isKou"></span>
    <!-- 乙 -->
    <span class="readerMark otsu" v-if="isOtsu"></span>
    <span>{{text}}</span>
  </div>
</template>
<style scoped>
span.readerMark {
  display: inline-block;
  height: 1em;
  width: 1em;
  border-radius: 50%;
}

span.kou {
  background-color:blueviolet;
}

span.otsu {
  background-color: yellowgreen;
}

</style>
<script>
export default {
  name: 'MarkedText',
  props: {
    text: {
      type: String,
      required: true
    },
    hlFlag: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isKou: false,
      isOtsu: false
    }
  },
  created() {
    if (this.reader === 0) { // 甲が読んでいる
      this.isKou = 0 in this.hlFlag;
    } else if (this.reader === 1) { // 乙が読んでいる
      this.isOtsu = 1 in this.hlFlag;
    } else {
      this.isKou = 0 in this.hlFlag;
      this.isOtsu = 1 in this.hlFlag;
    }
  },
  computed: {
    reader() {
      return this.$store.state.reader
    }
  },
  watch: {
    reader (newVal, oldVal) {
      if (newVal === 0) { // 甲が読んでいる
        this.isKou = 0 in this.hlFlag;
        this.isOtsu = false;
      } else if (newVal === 1) { // 乙が読んでいる
        this.isKou = false;
        this.isOtsu = 1 in this.hlFlag;
      } else {
        this.isKou = 0 in this.hlFlag;
        this.isOtsu = 1 in this.hlFlag;
      }
    }
  },
}
</script>