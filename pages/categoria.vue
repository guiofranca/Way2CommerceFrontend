<template>
    <v-row>
        <v-col lg="4">
            <div v-if="!carregando">
                <div v-if="categorias.length > 0">
                    <div v-for="categoria in categorias" :key="categoria.id" class="mb-4">
                        <CategoriaCard :categoria="categoria" />
                    </div>
                </div>
                <div v-else>
                    Não há categorias disponíveis
                </div>
            </div>
            <div v-else>
                <v-skeleton-loader type="list-item, list-item, list-item" ></v-skeleton-loader>
            </div>
        </v-col>  
    </v-row>
</template>
<script>
export default {
    data() {
        return {
            categorias: [],
            carregando: true,
        }
    },
    async mounted() {
        await this.$axios.$get("/Category")
            .then((response) => {
                this.categorias = response
                this.carregando = false
            })
            .catch((error) => this.$notifier.showMessage({ content: "Erro na consulta das categorias", color: 'error' }))
    }
}
</script>
