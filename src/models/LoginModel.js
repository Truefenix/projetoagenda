const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.valida();
    if (this.errors.length > 0) return;

    // Login do usuário
    this.user = await LoginModel.findOne({ email: this.body.email });

    if(!this.user) {
      this.errors.push('Usuário não existe');
      return;
    }
    if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida');
      this.user = null;
      return;
    }
  }

  async register() {
    this.valida();
    if (this.errors.length > 0) return; // Verifica se há erros antes de prosseguir

    await this.userExists();

    if (this.errors.length > 0) return;

    // bcryptjs
    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    // banco de dados
      this.user = await LoginModel.create(this.body);
      console.log('Usuário criado com sucesso:', this.user);
  }

  async userExists() {
    // user -> email existe?
    this.user = await LoginModel.findOne({ email: this.body.email });
    if(this.user) {this.errors.push('Email já existe');}
  }

  valida() {
    this.cleanUp();
    if (!validator.isEmail(this.body.email)) {
      this.errors.push('E-mail inválido');
    }
    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push('Senha precisa ter entre 3 e 50 caracteres');
    }
  }

  cleanUp() {
    this.body = {
      email: this.body.email,
      password: this.body.password
    };
  }
}

module.exports = Login;
