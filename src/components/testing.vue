<script setup lang="ts" >
    import { ref,isRef,unref,reactive,toRef,toRefs,customRef } from "vue"
    // let count = ref(1);
    // const button = ref("pizza")

    // function duoble()
    // {
    //     count.value = unref(count) * 2;
    //     const check = isRef(count) ? count.value : count;
    //     console.log(button.value);
    // }
    const cube = reactive({
        length: 10,
        width: 20,
        height: 30,
    })

    //const length = toRef(cube,"length");
    const {length,width,height} = toRefs(cube);

</script>

<template>
    <!-- <h1>{{ count }}</h1>
    <button ref="button" @click="duoble">Press Me</button> -->
    <h1>length: {{ length }}</h1>
    <h1>width: {{ width }}</h1>
    <h1>height: {{ height }}</h1>
    <h3> Hello world </h3>
</template>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased ;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>