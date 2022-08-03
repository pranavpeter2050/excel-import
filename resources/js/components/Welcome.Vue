<template>
    <h1>{{ title }}</h1>
</template>
<script>
export default {
    mounted() {
        console.log('Component mounted.')
    },
    data() {
        return {
            title: 'How To Install Vue 3 in Laravel 9 From Scratch'
        }
    }
}
</script>
