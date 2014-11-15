$(document).ready();

// Empty model
var ListItemModel = Backbone.Model.extend({});

// Empty collection; associate model and collection
var ListItemCollection = Backbone.Collection.extend({
   model: ListItemModel
});

// Create an instance of the collection
var listItems = new ListItemCollection();

// Generic view to create a list item
var ListItemView = Backbone.View.extend({
    
   // This view will expect parameters to be passed in
   initialize: function(options) {
      // Save the options for later use
      this.options = options || {};      
   },
   
    events: {
      'click':'removeItem'
    },   
    
    removeItem: function() {
      this.remove();
    },
    
   render: function() {
      // Get the model that was passed in to this view
      var newestItem = this.options.model;
      
      console.log('ListItemView.rendered');
      
      this.$el.html(newestItem.get("itemName"));
      
      return this;
   }
});

// View for the existing 'Add Button' to attach an event
// and handle the click event
var AddButtonView = Backbone.View.extend({
    el:'#add-item-button',
    
    events: {
        'click':'addItem'
    },
        
    addItem: function() {
      //alert("AddButtonView.addItem");
        // Get the new item from the text input box using
        // jQuery function .val()
        var newItem = $('#toDo-Item').val();
        //alert("newItem = " + newItem);
        // Create a new list item model with the new item name
        var item = new ListItemModel({itemName: newItem});
        console.log(item.get("itemName"));
        // Add the item to the collection
        listItems.add(item);
        // Clear the text box
        $('#toDo-Item').val('');       
    }
});

// View for the existing 'ToDo Item' textbox to attach an event
// and handle the Keyboard Enter event
var ToDoItemInputView = Backbone.View.extend({
    el:'#toDo-Item',
    
    events: {
      'keyup':'keyPressEventHandler'
    },
    
    initialize: function () {
        console.log("initialize");
    },
    
    keyPressEventHandler: function(event) {
       if (event.keyCode == 13) {
          //alert("YES");
          //addButtonView.click();
          //this.addButtonView.click();
          this.addItem();
       }    
    },
    
    addItem: function() {
      //alert("AddButtonView.addItem");
        // Get the new item from the text input box using
        // jQuery function .val()
        //var newItem = $('#toDo-Item').val();
		
		//This adds a hover tool tip of "click to remove" to the added item
        var newItem = '<div title="click to remove">'+$('#toDo-Item').val()+'</div>';
        //alert("newItem = " + newItem);
        // Create a new list item model with the new item name
        var item = new ListItemModel({itemName: newItem});
        console.log(item.get("itemName"));
        // Add the item to the collection
        listItems.add(item);
        // Clear the text box
        $('#toDo-Item').val('');       
    }    
});

// Create the initial list
var ToDoListContainerView = Backbone.View.extend({
    tagName:'div',
    
    id:'todo-list-container',
    
    initialize: function() {
      //alert("ToDoListContainerView.intialize");
        // Add a listener to the collection which will listen
        // for any additions to the collection
        listItems.on('add', this.addItemToList);
    },
    
    render:function() {
        // Render the initial empty list. No data is passed
        // because the list is empty.
        // var source = $('#shopping-list-content').html();
        // var template = Handlebars.compile(source);
        // var html = template();
        
        // this.$el.html(html);
        
        console.log('ToDoListContainerView.rendered');        
        
        return this;
    },
    // When there's a new additon to the list, render it
    addItemToList: function() {
        // Create a new list item
        var newListItem = listItems.at(listItems.length - 1);
        var itemToAdd = new ListItemView({model:newListItem});
      //alert("ToDoListContainerView.addItemToList value = "+ this);

        // Append it to the end of the existing list
        $('#lists-of-items').append(itemToAdd.render().el);
        
        return this;        
    }
});

// Create instances of each top level/standalone view and
// render as appropriate for start of application.
var addButtonView = new AddButtonView();
var toDoListContainer = new ToDoListContainerView();
var ToDoItemInputView = new ToDoItemInputView();
//$('#list-content').html(toDoListContainer.render().el);
