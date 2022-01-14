<template>
    <v-row>
        <v-col lg="4">
            <v-card :loading="carregando">
                <v-card-title>
                    Editar o produto {{$route.params.id}}
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
                <v-btn color="success" @click="editar()">Salvar</v-btn>
                <v-btn color="default" to="/produto">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props: ['id'],
    data() {
        return {
            carregando: true,
            categorias: [],
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
        await this.$axios.$get(`/Produto/${this.$route.params.id}`)
            .then((response) => {
                this.form = {
                    id: response.id,
                    nome: response.nome,
                    codigo: response.codigo,
                    descricao: response.descricao,
                    preco: response.preco,
                    categoriaId: response.categoria.id,
                }
            })
            .catch((response) => {
                this.$notifier.showMessage({ content: "Produto não encontrado", color: 'error' })
                this.$router.push('/produto')
            })

        await this.$axios.$get("/Categoria")
            .then((response) => {
                this.categorias = response
                this.carregando = false
            })
            .catch((response) => (console.log(response)))

    },
    methods: {
        async editar() {
            await this.$axios.$put(`/Produto/${this.$route.params.id}`, this.form)
                .then((response) => {
                    this.$notifier.showMessage({ content: "Produto alterado com sucesso", color: 'success' })
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
