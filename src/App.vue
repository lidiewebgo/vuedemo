<template>
  <div id="app">
    <router-view @click="key" />
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    key() {
      const tag = {};
      tag.label = this.$route.meta.label;
      tag.name = this.$route.name;
      tag.path = this.$route.path;
      this.$store.dispatch("tags/setTag", tag);
      return this.$route.path;
    },
  },
  mounted() {
    //  window.addEventListener("click", (e) => {
    //   const target = e.target;
    //   if (target.nodeName !== "SPAN") {
    //     // 只要点击的不是el-tag就可以关闭，因为el-tag是用span标签实现的
    //     this.contextMenuVisible = false;
    //   }
    // });
  },
};
</script>
