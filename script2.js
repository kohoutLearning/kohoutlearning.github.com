$(document).ready();

$(function() {

ToDoList = Backbone.Collection.extend({
    initialize: function(){

    }
});

ToDoView = Backbone.View.extend({

    tagName: 'li',

    events: {
        'click #button':  'addToDo',
        'click ".item"':  'removeItem',
    },

    initialize: function() {
        var thisView = this;
        this.todoslist = new ToDoList;
        _.bindAll(this, 'render');
         alert("binding");
        this.todoslist.bind("add", function( model ){
             alert("hey");
            thisView.render( model );
        })
    },

    addToDo: function() {
        var todo_item_val = $('#input').val();
        this.todoslist.add( {todo_item: todo_item_val} );
    },
    
    removeItem: function() {
        $(this).remove();
    },

    render: function( model ) {
        $(".list").append("<div class='item'>"+ model.get("todo_item")+"</div>");
        console.log('rendered')
    },

});

var view = new ToDoView({el: 'body'});
});
