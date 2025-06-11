import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

const initializeAdmin = async () => {
    try {
        const adminExists = await User.findOne({ tipo: 'admin' });

        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('admin@2025trampolim', 10);

            const adminUser = new User({
                nomeCompleto: 'admintrampolim',
                grau_escolaridade: 'N/A',
                area_atuacao: 'N/A',
                genero: 'N/A',
                cpf: '00000000000',
                telefone: '00000000000',
                cep: '00000000',
                estado: 'N/A',
                cidade: 'N/A',
                bairro: 'N/A',
                endereco: 'N/A',
                linkedin: '',
                instagram: '',
                facebook: '',
                miniCurriculo: 'Superusuário do sistema',
                email: 'admin@trampolim.com',
                senha: hashedPassword,
                tipo: 'admin',
            });

            await adminUser.save();
            console.log('✅ Superusuário admin criado com sucesso!');
        } else {
            console.log('⚡ Superusuário admin já existe.');
        }
    } catch (error) {
        console.error('Erro ao criar o superusuário admin:', error);
    }
};

export default initializeAdmin;
