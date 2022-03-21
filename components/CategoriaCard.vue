<template>
    <v-card>
        <v-card-title primary-title>
            {{categoria.name}}
        </v-card-title>
    </v-card>
</template>
<script >
export default {
    props: ['categoria']
}
</script>