<template>
  <div v-if="pegIsLoaded()">
    <!-- <h3 v-if="" class="contractTitle">{{peg.title}}</h3> -->
    <el-collapse v-model="activeNames" @change="handleChange" accordion> 
      <el-collapse-item title="前文" name="1">
        {{peg.premises}}
      </el-collapse-item>
      <!-- 項目 -->
      <template v-for="({ article }, index) in peg.articles" > 
        
        <el-collapse-item 
        v-if="Array.isArray(article.article_body)"
        :title="`${(index+1) + ' ' + article.article_header}`" :name="index+2" 
        :key="article.article_num">
          <!-- When article_body is Array  -->
          <div class="clause-items-container">
            <clause-items :data="article.article_body"></clause-items>
          </div>
          <!-- {{article.article_body}} -->
        </el-collapse-item>
        <el-collapse-item 
        v-else-if="article.article_body !== 'undefined'"   
        :title="`${(index+1) + ' ' + article.article_header}`" :name="index+2" :key="article.article_num">
          <template v-if="article.article_body">
            <template v-if="Array.isArray(article.article_body.clause_body)">
              <marked-text 
              :text="article.article_body.clause_body[0].clause_text" 
              :hlFlag="article.article_body.clause_body[0].flag"> 
             </marked-text>
             <!-- {{article.article_body.clause_body.slice(1)}} -->
              <article-sub-items :data="article.article_body.clause_body.slice(1)">
              </article-sub-items>
            </template>
            <template v-else>
              <marked-text
              :text="article.article_body.clause_body.clause_text"
              :hlFlag="article.article_body.clause_body.flag">
              </marked-text>
            </template>
          </template> 

          <template v-else>
            <p>{{ article.clause }}</p>
          </template>
          <!-- {{article.article_body ? article.article_body.clause_body : article.clause }} -->
         
          <!-- .clause_body[0].clause_text -->
          <!-- :hlFlag="article.article_body.clause_body[0].flag" -->

            <!-- "article.article_body.clause_body.clause_text" -->
            <!-- :hlFlag="article.article_body.clause_body.flag" -->
        </el-collapse-item>
       
      </template>
    
      <!-- 項目 -->
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
  import ArticleSubItems from './ArticleSubItems.vue';
  import ClauseItems from './ClauseItems.vue';

  export default {
    components: {
      MarkedText,
      ArticleSubItems,
      ClauseItems
    },

    computed: {
      peg() {
        return this.$store.state.contractPEGTree
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
      pegIsLoaded() {
        if (!(this.$store.state.contractPEGTree.title !== "")) {
          console.log("Peg is not loaded!!");
        }
        return this.$store.state.contractPEGTree.title !== ""
      },
    }
  }
</script>

<style>
.clause-items-container {
  transform: translateX(20px);
}

.el-collapse-item__header {
  padding-left: 20px;
  padding-right: 10px;
}

.el-collapse-item__content {
  padding-left: 20px;
  padding-right: 20px;
}

/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow */
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>