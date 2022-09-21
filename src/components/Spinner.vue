<!-- @format -->

<template>
  <div class="dual-ring"></div>
</template>

<style scoped lang="scss">
.dual-ring {
  display: inline-block;
  width: 60px;
  height: 60px;

  &:after {
    content: " ";
    display: block;
    width: 40px;
    height: 40px;
    margin: 10px;
    border-radius: 50%;
    border: 4px solid rgb(130, 130, 130);
    border-color: rgb(130, 130, 130) transparent rgb(130, 130, 130) transparent;
    animation: dual-ring 1.5s linear infinite;
  }
}

@keyframes dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
