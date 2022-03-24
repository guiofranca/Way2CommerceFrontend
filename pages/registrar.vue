<template>
    <v-row>
        <v-col md="6" offset-md="3">
            <v-card
                :loading="loading"
            >
                <v-form v-on:submit="submit" method="post">

                    <v-card-title primary-title >
                        Registrar novo usuário
                    </v-card-title>

                    <v-card-text>

                            <v-text-field
                                name="Name"
                                v-model="register.Name"
                                label="Nome"
                                :error="nameError"
                                :error-messages="errors.Name"
                            ></v-text-field>

                            <v-text-field
                                name="Email"
                                v-model="register.Email"
                                label="Email"
                                :error="emailError"
                                :error-messages="errors.Email"
                            ></v-text-field>

                            <v-text-field
                                name="Password"
                                v-model="register.Password"
                                label="Senha"
                                hint="Pelo menos 8 caracteres, 1 letra, 1 numero e 1 símbolo"
                                min="8"
                                value=""
                                type="password"
                                :error="passwordError"
                                :error-messages="errors.Password"
                            ></v-text-field>

                            <v-text-field
                                name="PasswordConfirmation"
                                v-model="register.PasswordConfirmation"
                                label="Confirme a senha"
                                hint="Confirme a senha, a mesma acima! ✌️"
                                min="8"
                                value=""
                                type="password"
                            ></v-text-field>

                    </v-card-text>
                    <v-card-actions>
                        <v-btn block color="primary" type="submit">Cadastrar</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
    export default {
        auth: 'guest',
        data() {
            return {
                register: {
                    Name: '',
                    Email: '',
                    Password: '',
                    PasswordConfirmation: ''
                },
                loading: false,
                errors: {},
            }
        },
        computed: {
            passwordError: function() { return typeof(this.errors.Password) != 'undefined' },
            nameError: function() { return typeof(this.errors.Name) != 'undefined' },
            emailError: function() { return typeof(this.errors.Password) != 'undefined' },
        },
        methods: {
            async submit(e) {
                e.preventDefault()
                this.loading = true;
                await this.$axios.$post('/Auth/Register', this.register)
                    .then((response) => {
                        this.$auth.setUserToken(response.token, response.refreshToken)
                        this.$router.push('/')
                    })
                    .catch((err) => {
                        try {
                            this.errors = err.response.data.errors
                        } catch (error) {
                            this.$notifier.showMessage({ content: "Erro desconhecido", color: 'error' })
                        }
                    })
                
                this.loading = false
            }
        }
    }
</script>