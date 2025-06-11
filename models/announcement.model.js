import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
    dataInicioSubmissoes: {
        type: Date,
        required: true,
    },
    dataFimSubmissoes: {
        type: Date,
        required: true,
    },
    inicioAvaliacoes: {
        type: Date,
        required: true,
    },
    fimAvaliacoes: {
        type: Date,
        required: true,
    },
    arquivoEdital: {
        type: String, 
        required: true,
    },
}, { timestamps: true });

const Announcement = mongoose.model('Announcement', announcementSchema);

export default Announcement;
