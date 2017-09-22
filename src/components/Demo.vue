<template lang='pug'>
<div>demo</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: '',
    data () {
        return {

        }
    },
    mounted () {
        this.fetch()
    },
    computed: {

    },
    methods: {
        ...mapActions({
            fetch: 'apply/getUser'
        })
    }
}
</script>

<style lang='stylus'>

</style>
