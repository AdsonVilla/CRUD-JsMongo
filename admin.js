// Database

const mongoose = require("mongoose")
const EquipamentSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Model: {
        type: String,
        required: true,
    },
    SN: {
        type: Number,
        required: true,
    },
    Sector: {
        type: String,
        required: true,
    },
    description: String,
    completed: Boolean,
    created_at: { type: Date, default: Date.now},
});

const Equipaments = mongoose.model("Equipaments", EquipamentSchema)


const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose') // conexão do admin-bro com mongoose

AdminBro.registerAdapter(AdminBroMongoose) // registra a conexão

const adminBroOptions = new AdminBro ({
    resources: [
        {
            resource: Equipaments,
            options: {
                properties: {
                    description: { type: 'richtext'},
                    criated_at: {
                        isVisible: { edit: false, list: true, show: true, filter: true}
                    }
                }
            }
        }
    ],

    locale: {
        translations: {
            labels: {
                Equipaments: 'Equipamentos'
            }
        }
    },

    rootPath: '/admin',
})

const router = AdminBroExpress.buildRouter(adminBroOptions)

// ===== criando o servidor =====
const express = require("express") // constante express puxa a dependência 'express'
const server = express(); // server (objeto de servidor) executa a dependência 'express'

server
    .use(adminBroOptions.options.rootPath, router) // midware - cria uma rota

// run App
const run = async () => {
    await mongoose.connect("mongodb://localhost/adminbroapp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    await server.listen(5500, () => console.log("Server working"));
}
run();


