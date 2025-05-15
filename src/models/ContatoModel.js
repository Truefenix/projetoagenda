const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  criadoEm: { type: Date, default: Date.now} // vai ser salvo a Data no momento por padrão. 
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Contato.prototype.register = async function() {
  this.valida();
  if(this.errors.length > 0) return;

  this.contato = await ContatoModel.create(this.body);
}

Contato.prototype.valida = function() {
  this.cleanUp();
  if (this.body.email && !validator.isEmail(this.body.email)) {
      this.errors.push('E-mail inválido');
    }
    if (!this.body.nome) this.errors.push('Nome é um campo obrigatório');
    if (!this.body.email && !this.body.telefone) {
      this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone');
    }
}

Contato.prototype.cleanUp = function() {
  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone
  };
}

module.exports = Contato;