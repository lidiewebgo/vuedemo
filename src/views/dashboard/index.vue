<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-tree
            :data="data"
            node-key="id"
            default-expand-all
            @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave"
            @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
            draggable
            :allow-drop="allowDrop"
            :allow-drag="allowDrag"
          ></el-tree>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <div>
            <el-dropdown>
              <el-button type="primary">
                渠道
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>渠道1</el-dropdown-item>
                <el-dropdown-item>渠道2</el-dropdown-item>
                <el-dropdown-item>渠道3</el-dropdown-item>
                <el-dropdown-item>渠道4</el-dropdown-item>
                <el-dropdown-item>渠道5</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-time-picker
              v-model="value1"
              :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
              placeholder="开始时间"
            ></el-time-picker>
            <el-time-picker
              arrow-control
              v-model="value2"
              :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
              placeholder="结束时间"
            ></el-time-picker>
            <el-button size="mini">默认按钮</el-button>
            <el-button type="primary" size="mini">主要按钮</el-button>
            <el-button type="success" size="mini">成功按钮</el-button>
          </div>
        </div>
        <!-- 用户信息加图表部分 -->
        <div class="searchInfo">
          <el-card class="box-card">
            <div class="searchInfoText" v-show="isForm">用户信息采集分析</div>
            <!-- <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div> -->
            <div id="main" style="width: 700px;height:400px;" v-show="isForm"></div>
            <!-- 富文本编辑器 -->
            <EditorBar v-show="!isForm"></EditorBar>
            <el-button type="success" @click="isForm=!isForm">{{isForm?"自定义表单":"关闭表单"}}</el-button>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EditorBar from "../../layout/components/Edit/index";
export default {
  name: "Dashboard",
  components: {
    EditorBar,
  },
  data() {
    return {
      value1: "",
      value2: "",
      isForm: true,
      editor: {
        info: "",
      },
      isClear: false,
       data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2',
            children: [{
             id: 11,
              label: '三级 3-2-1'
            }, {
              id: 12,
              label: '三级 3-2-2'
            }, {
              id: 13,
              label: '三级 3-2-3'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  mounted() {
    this.drawLine();
    console.log(this.editor.info, "jj");
  },
  methods: {
     handleDragStart(node, ev) {
        console.log('drag start', node);
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner';
        } else {
          return true;
        }
      },
      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
      },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "",
        },

        legend: {
          data: [
            "渠道一采集总数",
            "渠道二采集总数",
            "渠道一采集成功总数",
            "渠道二采集总数",
            "渠道一采集失败总数",
            "渠道二采集失败总数",
          ],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          // boundaryGap: false,
          data: [
            "2018-11-21",
            "2018-11-21",
            "2018-11-21",
            "2018-11-21",
            "2018-11-21",
            "2018-11-21",
            "2018-11-21",
            "2018-11-21",
            "2018-11-21",
            "2018-11-21",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "渠道一采集总数",
            type: "line",

            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          },
          {
            name: "渠道二采集总数",
            type: "line",

            data: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
          },
          {
            name: "渠道一采集成功总数",
            type: "line",

            data: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
          },
          {
            name: "渠道二采集总数",
            type: "line",

            data: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
          },
          {
            name: "渠道一采集失败总数",
            type: "line",

            data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
          },
          {
            name: "渠道二采集失败总数",
            type: "line",

            data: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.searchInfo > .box-card {
  min-height: 200px;
}
.searchInfoText {
  font-size: 16px;
  color: rgb(150, 191, 255);
  text-align: center;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-input {
  width: 200px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
