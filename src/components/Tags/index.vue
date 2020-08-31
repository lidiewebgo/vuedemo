<template>
  <div
    class="tags"
    @contextmenu.prevent
    ref="tags"
    :style="{'padding': arrowVisible ? '12px 0' : '12px 10px'}"
  >
    <div class="tags-out-box" ref="outBox">
      <div class="svg arrow" v-if="arrowVisible" @click="handleClickToLeft">
        <svg-icon icon-class="arrow-left" />
      </div>
      <div
        class="tags-box"
        ref="box"
        :style="{'padding-left': arrowVisible ? '30px' : '0', left: `${left}px`}"
      >
        <el-tag
          ref="tag"
          size="small"
          v-for="(tag, i) in tags"
          :data-index="i"
          :data-id="tag.menuId"
          :key="tag.name"
          :closable="tag.name !== 'home'"
          :effect="$route.name === tag.name ? 'dark' : 'plain'"
          @contextmenu.native.prevent="handleClickContextMenu($event)"
          @click="handleTagClick($event, tag)"
          @close="handleTagClose(tag, i)"
        >{{tag.label}}</el-tag>
      </div>
      <div class="svg arrow arrow-right" v-if="arrowVisible" @click="handleClickToRight">
        <svg-icon icon-class="arrow-right" />
      </div>
    </div>

    <ul class="right-menu" :style="{left: menuLeft, top: menuTop}" v-show="contextMenuVisible">
      <a href="javascript:;" @click="refresh">刷新</a>
      <a href="javascript:;" @click="closeTag" v-if="tagIndex !== 0">关闭</a>
      <a href="javascript:;" @click="closeOtherTag" v-if="tagIndex !== 0">关闭其它</a>
      <a href="javascript:;" @click="closeAllTag">关闭所有</a>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      contextMenuVisible: false, // 是否显示菜单
      menuLeft: "", // 右键菜单距离浏览器左边的距离
      menuTop: "", // 右键菜单距离浏览器上边的距离
      tagIndex: 0, // 当前点击的tag的索引
      tag: {}, // 当前右键点击的tag对象
      arrowVisible: false, // 是否显示箭头
      tagsBoxWidth: 0, // ref 为 outBox 的长度
      tagsWidth: 0, // ref 为 tags 的长度
      left: 0, // ref 为 box 节点相对于左边的距离，用于箭头点击
    };
  },
  mounted() {
    window.addEventListener("click", (e) => {
      const target = e.target;
      if (target.nodeName !== "SPAN") {
        // 只要点击的不是el-tag就可以关闭，因为el-tag是用span标签实现的
        this.contextMenuVisible = false;
      }
    });
  },
  computed: {
    ...mapState({
      tags: (state) => state.tags.tagList,
    }),
  },

  methods: {
    handleClickContextMenu(event) {
      const e = event || window.event;
      const target = e.target;
      this.menuLeft = e.layerX + 20 + "px"; // 菜单出现的位置距离左侧的距离
      this.menuTop = e.layerY + 20 + "px"; // 菜单出现的位置距离顶部的距离
      this.tagIndex = Number(target.getAttribute("data-index")); // 获取当前右击菜单的索引。从0开始
      this.contextMenuVisible = true; // 显示菜单

      this.tag = this.tags[this.tagIndex]; // 当前右击的菜单信息
    },
    
  },
  
};
</script>

<style lang="scss" scoped>
// tag组件样式
.tags {
  width: 100%;
  white-space: nowrap;
  background-color: blue;
  padding: 12px 10px;
  &-out-box {
    display: inline-block;
    position: relative;
  }
  &-box {
    position: relative;
    transition: 0.3s;
  }
}
</style>