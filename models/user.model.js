import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        nomeCompleto: {
            type: String,
            required: [true, 'O nome completo é obrigatório'],
            trim: true,
            minLength: 2,
            maxLength: 100,
        },
        grau_escolaridade: {
            type: String,
            required: [true, 'O grau de escolaridade é obrigatório'],
            trim: true,
        },
        area_atuacao: {
            type: String,
            required: [true, 'A área de atuação é obrigatória'],
            trim: true,
        },
        genero: {
            type: String,
            required: [true, 'O gênero é obrigatório'],
            trim: true,
        },
        cpf: {
            type: String,
            required: [true, 'O CPF é obrigatório'],
            unique: true,
            trim: true,
            match: [/^\d{11}$/, 'O CPF deve conter 11 dígitos numéricos'],
        },
        telefone: {
            type: String,
            required: [true, 'O telefone é obrigatório'],
            trim: true,
            match: [/^\d{10,11}$/, 'O telefone deve conter 10 ou 11 dígitos numéricos'],
        },
        cep: {
            type: String,
            required: [true, 'O CEP é obrigatório'],
            trim: true,
            match: [/^\d{8}$/, 'O CEP deve conter 8 dígitos numéricos'],
        },
        estado: {
            type: String,
            required: [true, 'O estado é obrigatório'],
            trim: true,
        },
        cidade: {
            type: String,
            required: [true, 'A cidade é obrigatória'],
            trim: true,
        },
        bairro: {
            type: String,
            required: [true, 'O bairro é obrigatório'],
            trim: true,
        },
        endereco: {
            type: String,
            required: [true, 'O endereço é obrigatório'],
            trim: true,
        },
        linkedin: {
            type: String,
            trim: true,
        },
        instagram: {
            type: String,
            trim: true,
        },
        facebook: {
            type: String,
            trim: true,
        },
        miniCurriculo: {
            type: String,
            required: [true, 'O mini currículo é obrigatório'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'O email é obrigatório'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/.+\@.+\..+/, 'Digite um email válido'],
        },
        senha: {
            type: String,
            required: [true, 'A senha é obrigatória'],
            minLength: 6,
        },
        tipo: {
            type: String,
            required: [true, 'O tipo de usuário é obrigatório'],
            enum: ['empreendedor', 'avaliador', 'admin'],
        },
        empreendedor: {
            type: Object,
            default: null, 
        },
        avaliador: {
            type: Object,
            default: null, 
        },
    },
    { timestamps: true }
);

userSchema.pre('save', function (next) {
    if (this.tipo === 'empreendedor') {
        this.avaliador = null; 
    } else if (this.tipo === 'avaliador') {
        this.empreendedor = null; 
        this.avaliador = {
            monitorouStartup: this.monitorouStartup || '',
            descricaoIncubacao: this.descricaoIncubacao || '',
        };
        delete this.monitorouStartup;
        delete this.descricaoIncubacao;
    } else {
        this.empreendedor = null;
        this.avaliador = null;
    }
    next();
});

const User = mongoose.model('User', userSchema);

export default User;
