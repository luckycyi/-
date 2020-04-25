<template>
    <com :id="this.$route.params.id"></com>
</template>

<script>
import com from '../subcomponents/comment.vue' 

export default {
    components: {
        com
    }
}
</script>

<style lang="scss" scoped>

</style>