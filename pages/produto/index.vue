<template>
    <v-row>
        <v-col>
            <div v-if="!carregando">
                <TabelaProdutos :produtos="produtos" />
            </div>
            <div v-else>
                <v-skeleton-loader type="table" />
            </div>
        </v-col>
        <v-btn
            color="primary"
            fab
            large
            dark
            bottom
            right
            fixed
            :disabled="podeCriar"
            to="/produto/criar"
            title="Criar um produto"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-row>
</template>
<script>
export default {
    data() {
        return {
            produtos: [],
            carregando: true
        }
    },
    async mounted() {
        await this.$axios.$get("/Product")
        .then((response) => {
            this.produtos = response
            this.carregando = false
        })
        .catch((response) => (console.log(response)))
    },
    created() {
        $nuxt.$on("produtoApagado", (id) => {
            this.produtos = this.produtos.filter((p) => p.id != id)
        })
    },
    computed: {
        podeCriar: function() {
            return !(this.$auth.hasScope('Administrator') || this.$auth.hasScope('Moderator'))
        }
    },
}
</script>
