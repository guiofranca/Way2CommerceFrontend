<template>
    <v-row>
        <v-col lg="4">
            <v-card>
                <v-card-title>
                    Criar um produto
                </v-card-title>
                <v-card-text>
                    <v-text-field 
                        label="Código"
                        v-model="form.codigo"
                    ></v-text-field>
                    <v-text-field 
                        label="Nome"
                        v-model="form.nome"
                    ></v-text-field>
                    <v-textarea
                        label="Descrição"
                        v-model="form.descricao"
                        rows="2"
                        ></v-textarea>
                    <v-text-field
                        label="Preço"
                        v-model="form.preco"
                    ></v-text-field>
                    <v-select
                        :items="categorias"
                        item-text="nome"
                        item-value="id"
                        label="Categoria"
                        v-model="form.categoriaId"
                    ></v-select>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="criar()">Salvar</v-btn>
                <v-btn color="default" to="/produto">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
        </v-col>
    </v-row>
</template>
<script>
export default {
    data() {
        return {
            categorias: [],
            carregando: true,
            rules: [
                //value => !!value || 'Required.',
                //value => (value && value.length >= 3) || 'Min 3 characters',
            ],
            form: {
                nome: '',
                codigo: '',
                descricao: '',
                preco: '',
                categoriaId: null,
            }
        }
    },
    async mounted() {
        await this.$axios.$get("/Categoria")
            .then((response) => {
                this.categorias = response
                this.carregando = false
            })
            .catch((response) => (console.log(response)))

    },
    methods: {
        async criar() {
            await this.$axios.$post("/Produto", this.form)
                .then((response) => {
                    this.$notifier.showMessage({ content: "Produto criado com sucesso", color: 'success' })
                    console.log(response)
                    this.$router.push('/produto')
                })
                .catch(error => {
                    this.$notifier.showMessage({ content: error.response.data.title, color: 'error' })
                })
        }
    }
}
</script>
