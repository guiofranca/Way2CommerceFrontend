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
                        v-model="form.code"
                        :error-messages="errors.Code"
                    ></v-text-field>
                    <v-text-field 
                        label="Nome"
                        v-model="form.name"
                        :error-messages="errors.Name"
                    ></v-text-field>
                    <v-textarea
                        label="Descrição"
                        v-model="form.description"
                        rows="2"
                        :error-messages="errors.Description"
                        ></v-textarea>
                    <v-text-field
                        label="Preço"
                        v-model="form.price"
                        type="number"
                        :error-messages="errors.Price"
                    ></v-text-field>
                    <v-select
                        :items="categorias"
                        item-text="name"
                        item-value="id"
                        label="Categoria"
                        v-model="form.categoryIds"
                        :error-messages="errors.CategoriesIds"
                        multiple
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
                name: '',
                code: '',
                description: '',
                price: '',
                categoryIds: [],
            },
            errors: {}
        }
    },
    async mounted() {
        await this.$axios.$get(`/Product/${this.$route.params.id}`)
            .then((response) => {
                this.form = {
                    name: response.name,
                    code: response.code,
                    description: response.description,
                    price: response.price,
                    categoryIds: response.categories.map((category) => category.id),
                }
            })
            .catch((response) => {
                this.$notifier.showMessage({ content: "Produto não encontrado", color: 'error' })
                this.$router.push('/produto')
            })

        await this.$axios.$get("/Category")
            .then((response) => {
                this.categorias = response
                this.carregando = false
            })
            .catch((response) => (console.log(response)))

    },
    methods: {
        async editar() {
            await this.$axios.$patch(`/Product/${this.$route.params.id}`, this.form)
                .then((response) => {
                    this.$notifier.showMessage({ content: "Produto alterado com sucesso", color: 'success' })
                    this.$router.push('/produto')
                })
                .catch(error => {
                    try {
                        this.$notifier.showMessage({ content: error.response.data.title, color: 'error' })
                        this.errors = error.response.data.errors
                    } catch (ex) {
                        this.$notifier.showMessage({ content: "Erro desconhecido", color: 'error' })
                    }
                })
        }
    }
}
</script>
