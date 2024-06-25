function init_manual_setup() {
    var model;

    var deploy_key_title;
    Backbone.View.prototype.close = function(){
      this.unbind();
      if (this.onClose){
      }
    }
    function status_msg(msg, alertclass, templateselector) {
      var el;
      if (templateselector === undefined) {
        el = $("#spinner-msg");
      } else {
        el = $(templateselector);
      }
    }
    window.ManualSetupRouter = Backbone.Router.extend( {
      routes: {
        "start": "enter_github_url",
      },
      enter_github_url: function() {
      },
    });
    window.GithubModel = Backbone.Model.extend({
      name: function() {
      }
    });

    window.EnterGithubURL = Backbone.View.extend({
      template: _.template($("#enter_github_url").html()),
      events : {
        'click .continue':function(ev) {

          var ghRegexp1 = /(?:https*\:\/\/)*github\.com\/(\w+)\/(\w+)\/?/;
        },
      },
    });
}
