const app = angular.module("httpApp", []);

app.controller("httpCtrl", function ($scope, $http) {
  //Initialize variables
  $scope.userData = []; //Array to store user data's
  $scope.data = {}; /// Object to store current user data being edited or added
  $scope.editMode = false;
  $scope.viewMode = false;

  //Create custom directives in element
  function createHeader(){
    const header = document.getElementById('app-header');
    header.innerHTML = '<h1 class="text-white-50">User Data</h1>'
  }
  createHeader()

  //Create custom directive for input attributes
  const inputField = document.getElementById('fName');

  inputField.addEventListener('input', function() {
      const inputValue = inputField.value.trim(); // Trim to remove leading and trailing spaces

      if (inputValue === '') {
          // If input is empty, display an error message or change styles to indicate validation failure
          inputField.style.border = '2px solid rgba(226, 79, 79, 0.575)'; // Example of changing border color to red
          console.log('Input is empty');
      } else {
          // If input is not empty, remove error styles (if any)
          inputField.style.border = ''; // Reset border style to default
          console.log('Input is valid');
      }
  });

  // app.js
const buttons = document.querySelectorAll('.app-btn');

buttons.forEach(button => {
    button.style.backgroundColor = '#FFAA1D';
    button.style.color = 'black';
    button.style.padding = '5px';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
});


  //Function to retrieve employees from the API
  $scope.getData = () => {
    $http
      .get("https://65cc5a54dd519126b83e4e51.mockapi.io/Register")
      .then((res) => {
        console.log(res);
        $scope.userData = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  $scope.getData();

  $scope.openAddUser = () =>{
    $scope.editMode = false; // Set edit mode to false (for new user)
    $scope.viewMode = false;  
    $scope.data = {}; // Clear any existing data

    // Show the modal
    var modal = document.getElementById('editModal');
    modal.style.display = 'block';
    let Add = document.getElementById('title')
    Add.innerText = 'Add User'
  }

  $scope.editData = (data) => {
    $scope.editMode = true;
    $scope.viewMode = false;
    console.log($scope.editMode);

    $scope.data = angular.copy(data);
    console.log($scope.data);
     // Show the modal
     var modal = document.getElementById('editModal');
     modal.style.display = 'block';
     let edit = document.getElementById('title')
     edit.innerText = 'Edit Data'
  };

  $scope.saveData = () => {
    if ($scope.editMode) {
      $http
        .put(
          `https://65cc5a54dd519126b83e4e51.mockapi.io/Register/${$scope.data.id}`,
          $scope.data
        )
        .then((res) => {
          console.log(res);
          $scope.getData();
          $scope.cancel();
          // Close the modal
          let modal = document.getElementById('editModal');
          modal.style.display = 'none';
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // $http
      //   .post(
      //     "https://65cc5a54dd519126b83e4e51.mockapi.io/Register",
      //     $scope.data
      //   )
      //   .then((res) => {
      //     console.log(res);
      //     $scope.getData();
      //     $scope.cancel();
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      $http
        .post(
          "https://65cc5a54dd519126b83e4e51.mockapi.io/Register",
          $scope.data
        )
        .then((res) => {
          console.log(res);
          $scope.userData.push($scope.data);  
          $scope.cancel();
          // Log the added data
          console.log("Data added:", $scope.userData);
         // Close the modal
     let modal = document.getElementById('editModal');
     modal.style.display = 'none';
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  $scope.viewData = function(data) {
    // Set data to display in the modal
    $scope.data = angular.copy(data);
    
    // Set editMode to false to hide the save changes button
    $scope.editMode = false;
    $scope.viewMode = true; 
    
    // Show the modal
    let modal = document.getElementById('editModal');
    modal.style.display = 'block';
    let view = document.getElementById('title')
    view.innerText = 'View Data'
};



  // $scope.deleteUser = (id) =>{
  //   $http.delete(`https://65cc5a54dd519126b83e4e51.mockapi.io/Register/${id}`).then((res) => {
  //     console.log(res);
  //     $scope.getData();
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // }

  // $scope.deleteUser = (id) => {
  //   $http.delete(`https://65cc5a54dd519126b83e4e51.mockapi.io/Register/${id}`)
  //     .then((res) => {
  //       console.log(res);
  //       console.log("Deleting Id :", id);
  
  //       let index = -1;
  //       // Find the index of the user in $scope.userData array
  //       for (let i = 0; i < $scope.userData.length; i++) {
  //         if ($scope.userData[i].id === id) {
  //           index = i;
  //           console.log(index);
  //           break;
  //         }
  //       } 
  //       console.log("Index:", index);

  //       if (index !== -1) {
  //         // If the user is found in the array, remove it
  //         $scope.userData.splice(index, 1);
  //         console.log("after deleting :", $scope.userData);
  //       } else {
  //         console.log("User not found in the array.");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  
  //--------------------------------------------------------------async function with promise---------------------------

//   $scope.deleteUser = async (id) => {
//     try {
//         const res = await $http.delete(`https://65cc5a54dd519126b83e4e51.mockapi.io/Register/${id}`);
//         console.log(res);
//         console.log("Deleting Id :", id);

//         let index = -1;
//         // Find the index of the user in $scope.userData array
//         for (let i = 0; i < $scope.userData.length; i++) {
//             if ($scope.userData[i].id === id) {
//                 index = i;
//                 console.log(index);
//                 break;
//             }
//         }
//         console.log("Index:", index);

//         if (index !== -1) {
//             // If the user is found in the array, remove it
//             $scope.userData.splice(index, 1);
//             console.log("after deleting :", $scope.userData);
//         } else {
//             console.log("User not found in the array.");
//         }
//     } catch (err) {
//         console.log(err);
//     }
// };

$scope.deleteUser = async (index) => {
  try {
      const idToDelete = $scope.userData[index].id;
      console.log(index);
      
      // Send delete request to the API
      const res = await $http.delete(`https://65cc5a54dd519126b83e4e51.mockapi.io/Register/${idToDelete}`);
      console.log(res);
      console.log("Deleting Id :", idToDelete);
      
      // Check if the deletion was successful
      if (res.status === 200) {
          // Remove the item from $scope.userData based on the provided index
          $scope.userData.splice(index, 1);
          console.log("after deleting :", $scope.userData);
            // Apply changes to the AngularJS digest cycle
            $scope.$applyAsync();
            // console.log($scope.$applyAsync);
            //ƒ (a){try{p("$apply");try{return this.$eval(a)}finally{v.$$phase=null}}catch(b){f(b)}finally{try{v.$digest()}catch(c){throw f(c),
//c;}}}
      } else {
          console.log("Failed to delete user.");
      }
  } catch (error) {
      console.log(error);
  }
};



  // Function to cancel operation (reset input fields and edit mode)
  $scope.cancel = () => {
    $scope.data = {}; // Clear employee object
    $scope.editMode = false; // Set edit mode to false
    $scope.viewMode = false;
    console.log($scope.editMode);
    console.log($scope.viewMode);
     // Close the modal
     let modal = document.getElementById('editModal');
     modal.style.display = 'none';
  };
});
