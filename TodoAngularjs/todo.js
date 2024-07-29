const app = angular.module("todoApp", []);

app.controller("todoCtrl", function ($scope, $http) {
  //Data for todo
  // $scope.todoData = [
  //     {text:'Learn AngularJS', completed: false},
  //     {text:'Build a todo app', completed: false},
  // ];

  $scope.todoData = [];

  $http
    .get("https://65cc5a54dd519126b83e4e51.mockapi.io/Todo")
    .then((res) => {
      console.log(res);
      $scope.todoData = res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  //function to add a new todo list
  $scope.addTodo = function () {
     if ($scope.todoText) {
      $scope.todoData.push({ text: $scope.todoText, completed: false });
      $scope.todoText = "";
    }
  };

  //function to edit todo list
  $scope.editTodo = function (todo) {
    let newText = prompt("Enter new text:", todo.text);
    if (newText !== null) {
      todo.text = newText;
      console.log(newText);
    }
  };

  // Function to delete todo list
  $scope.deleteTodo = function (todo) {
    console.log("Deleting todo:", todo);
    var index = $scope.todoData.indexOf(todo);
    console.log("Index:", index);
    if (index !== -1) {
      $scope.todoData.splice(index, 1);
    }
    console.log("Todo list after deletion:", $scope.todoData);
  };
});
