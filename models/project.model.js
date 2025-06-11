import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  nomeProjeto: {
    type: String,
    required: [true, 'O nome do projeto é obrigatório'], 
    trim: true,
  },
  nomeLider: {
    type: String,
    required: [true, 'O nome do líder é obrigatório'], 
    trim: true,
  },
  integrantes: {
    type: [String],
    validate: {
      validator: function (arr) {
        return arr.length <= 4;
      },
      message: 'Máximo de 4 integrantes além do líder', 
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
    required: [true, 'O estágio da ideia é obrigatório'], 
  },
  edital: {
    type: String,
    required: [true, 'O edital é obrigatório'], 
    enum: ['Edital 2025.1', 'Edital 2025.2'],
  },
  descricaoIdeia: {
    type: String,
    required: [true, 'A descrição da ideia é obrigatória'], 
    trim: true,
  },
  diferencialInovacao: {
    type: String,
    required: [true, 'O diferencial e inovação são obrigatórios'], 
    trim: true,
  },
  modeloNegocio: {
    type: String,
    required: [true, 'O modelo de negócio é obrigatório'], 
    trim: true,
  },
  tecnologiasUtilizadas: {
    type: String,
    required: [true, 'As tecnologias utilizadas são obrigatórias'], 
    trim: true,
  },
  linkPitch: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: props => `${props.value} não é um link válido!`, 
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'O ID do usuário é obrigatório'], 
  },
}, {
  timestamps: true, 
});

const Project = mongoose.model('Project', projectSchema);
export default Project;