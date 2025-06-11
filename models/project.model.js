import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  nomeProjeto: {
    type: String,
    required: [true, 'O nome do projeto é obrigatório'], // Mensagem personalizada
    trim: true,
  },
  nomeLider: {
    type: String,
    required: [true, 'O nome do líder é obrigatório'], // Mensagem personalizada
    trim: true,
  },
  integrantes: {
    type: [String],
    validate: {
      validator: function (arr) {
        return arr.length <= 4;
      },
      message: 'Máximo de 4 integrantes além do líder', // Mensagem personalizada
    },
  },
  estagioIdeia: {
    type: String,
    enum: [
      'Conceitual (Pesquisa)/Ideação',
      'Em Desenvolvimento',
      'Protótipo de Baixa Fidelidade',
      'MVP sem clientes pagantes',
      'MVP com clientes pagantes',
    ],
    required: [true, 'O estágio da ideia é obrigatório'], // Mensagem personalizada
  },
  edital: {
    type: String,
    required: [true, 'O edital é obrigatório'], // Mensagem personalizada
    enum: ['Edital 2025.1', 'Edital 2025.2'],
  },
  descricaoIdeia: {
    type: String,
    required: [true, 'A descrição da ideia é obrigatória'], // Mensagem personalizada
    trim: true,
  },
  diferencialInovacao: {
    type: String,
    required: [true, 'O diferencial e inovação são obrigatórios'], // Mensagem personalizada
    trim: true,
  },
  modeloNegocio: {
    type: String,
    required: [true, 'O modelo de negócio é obrigatório'], // Mensagem personalizada
    trim: true,
  },
  tecnologiasUtilizadas: {
    type: String,
    required: [true, 'As tecnologias utilizadas são obrigatórias'], // Mensagem personalizada
    trim: true,
  },
  linkPitch: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: props => `${props.value} não é um link válido!`, // Mensagem personalizada
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'O ID do usuário é obrigatório'], // Mensagem personalizada
  },
}, {
  timestamps: true, // Adiciona createdAt e updatedAt automaticamente
});

const Project = mongoose.model('Project', projectSchema);
export default Project;