<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    //  window.addEventListener("click", (e) => {
    //   const target = e.target;
    //   if (target.nodeName !== "SPAN") {
    //     // 只要点击的不是el-tag就可以关闭，因为el-tag是用span标签实现的
    //     this.contextMenuVisible = false;
    //   }
    // });
  }
}
</script>
