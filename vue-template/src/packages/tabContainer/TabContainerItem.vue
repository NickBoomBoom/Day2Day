<template>
  <div id="tab-container-item-root">
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>
<style scoped>
#tab-container-item-root {
  width: 100%;
  background: red;
  display: inline-block;
  vertical-align: top;
  font-size: 16px;
}
</style>
