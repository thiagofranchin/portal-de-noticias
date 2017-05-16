module.exports.formulario_inclusao_noticia = function(application, req, res){
  res.render("admin/form_add_noticia", {validacao : {}, noticia: {}});
}

module.exports.noticias_salvar = function(application, req, res){
  var noticia = req.body; // As informacoes do form sao salvas na variavel noticias

  //Express-validator
  //atributo NAME do input + MENSAGEM
  req.assert('titulo', 'Título é obrigatório').notEmpty();
  req.assert('resumo', 'Resumo é obrigatório').notEmpty();
  req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
  req.assert('autor', 'Autor é obrigatório').notEmpty();    
  req.assert('data_noticia', 'Data é obrigatória').notEmpty().isDate({format: 'YYYY-MM-DD'});
  req.assert('noticia', 'Noticia é obrigatório').notEmpty();

  var erros = req.validationErrors();
  console.log(erros); // Retorna um PARAM, MSG e VALUE
  if(erros){
      res.render("admin/form_add_noticia", {validacao : erros, noticia: noticia});
      return;
  }

  var connection = application.config.dbConnection();
  var noticiasModel = new application.app.models.NoticiasDAO(connection);

  noticiasModel.salvarNoticia(noticia, function(error, result){
      res.redirect('/noticias');
  });
}