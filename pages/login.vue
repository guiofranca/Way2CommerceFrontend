<template>

    <v-row>
        <v-col md="6" offset-md="3">
            <v-card
                :loading="loading"
            >
                <v-form v-on:submit="submit" method="post">

                    <v-card-title primary-title >
                        Login
                    </v-card-title>

                    <v-card-text>

                            <v-text-field
                                name="email"
                                v-model="login.email"
                                label="Email"
                                :error="error"
                            ></v-text-field>

                            <v-text-field
                                name="password"
                                v-model="login.password"
                                label="Enter your password"
                                hint="Pelo menos 8 caracteres"
                                min="8"
                                value=""
                                type="password"
                                :error="error"
                            ></v-text-field>

                    </v-card-text>
                    <v-card-actions>
                        <v-btn block color="primary" type="submit">Login</v-btn>
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
                login: {
                    email: '',
                    password: '',
                },
                loading: false,
                error: false,
            }
        },
        methods: {
            async submit(e) {
                e.preventDefault()
                this.loading = true;
                await this.$auth.loginWith('local', { data: this.login })
                    .then(() => {
                        this.$router.push('/')
                    })
                    .catch((err) => {
                        this.error = true
                    })
                
                this.loading = false
            }
        }
    }
</script>