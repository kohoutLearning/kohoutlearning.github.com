$(document).ready();

$(function() {

ToDoList = Backbone.Collection.extend({
    initialize: function(){

    }
});

ToDoView = Backbone.View.extend({

    tagName: 'li',

    events: {
        'click #buttont':  'addToDo',
    },

    initialize: function() {
        var thisView = this;
        this.todoslist = new ToDoList;
        _.bindAll(this, 'render');
        // alert("binding");
        this.todoslist.bind("add", function( model ){
            // alert("hey");
            thisView.render( model );
        })
    },

    addToDo: function() {
        var todo_item = $('#input').val();
        this.todoslist.add( {todo_item: todo_item} );
    },

    render: function( model ) {
        $(".list").append("<li>"+ model.get("todo_item")+"</li>");
        console.log('rendered')
    },

});

var view = new ToDoView({el: 'body'});
});
