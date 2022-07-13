import colors from 'vuetify/es5/util/colors'
import path from 'path'
import fs from 'fs'

export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    env: {
        baseUrl: process.env.BASE_URL,
        apiUrl: process.env.API_URL,
    },

    /*server: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
            cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt'))
        }
    },*/

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - Way2Commerce',
        title: 'Way2Commerce',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/notifier.js',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
    ],

    router: {
        middleware: [
            'auth',
        ]
    },

    auth: {
        strategies: {
            local: {
                scheme: 'refresh',
                token: {
                    property: 'token',
                    global: true,
                    required: true,
                    type: 'Bearer'
                },
                user: {
                    property: false,
                    autoFetch: true
                },
                endpoints: {
                    login: { url: '/Auth/Login', method: 'post' },
                    refresh: { url: '/Auth/RefreshToken', method: 'post' },
                    logout: { url: '/Auth/Logout', method: 'post' },
                    user: { url: '/Auth/User', method: 'get' }
                },
                refreshToken: {
                    required: false,
                    tokenRequired: true,
                },
            }
        },
        redirect: {
            login: "/login",
            logout: "/",
            callback: "/login",
            home: "/"
        },
        scope: true,
        scopeKey: "roles",
    },

    axios: {
        baseURL: process.env.apiUrl,
        headers: {
            common: {
                Accept: "application/vnd.api+json",
                "content-type": "application/vnd.api+json"
            },
            post: {
                "content-type": "application/vnd.api+json"
            },
            patch: {
                "content-type": "application/vnd.api+json"
            },
            delete: {
                "content-type": "application/vnd.api+json"
            }
        }
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    }
}
