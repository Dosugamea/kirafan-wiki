<template lang="pug">
    span(v-else)
        v-divider
        v-list-item(@click="")
            v-list-item-content
                v-list-item-subtitle {{ $t('No Item') }}
</template>

<script>
export default {
    
}
</script>