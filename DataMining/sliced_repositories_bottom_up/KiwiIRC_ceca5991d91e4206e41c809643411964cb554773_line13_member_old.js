_kiwi.view.Member = Backbone.View.extend({
    tagName: "li",
    initialize: function (options) {
    },
    render: function () {
        var $this = this.$el,
        $this.data('member', this.model);
    }
});
