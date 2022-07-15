<template>
  <div>
    <el-tree :data="treeData" :props="defaultProps" :indent="0" @node-click="handleNodeClick">
      <span class="span-ellipsis" slot-scope="{node, data}">
        <span :title="node.label"> {{node.label}} </span>
      </span>
    </el-tree>
  </div>
  <!-- <el-collapse v-model="activeNames" @change="handleChange"> -->
    <!-- <template v-for="({ articleSubItem }, articalSubItemIndex) in article.article_body.clause_body.slice(1)" > 
      <el-collapse-item 
      :title="`${articalSubItemIndex + 1}`"
      :key="articleSubItem.item_num">
        {{articleSubItem.item}}
      </el-collapse-item>
    </template> -->
  <!-- </el-collapse> -->
</template>
<style scoped>
.span-ellipsis {
  width:100%;
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
<script>

export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  created () {
    this.data.forEach(item => {
      this.treeData[0].children.push({label: `${item.item_num}. ${item.item}`})
    })
    // console.log(this.data);
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeData: [{
        label: 'もっと詳しく',
        children: []   
      }]
    }
  },
  methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    }
}
</script>
