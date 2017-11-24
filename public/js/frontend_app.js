console.log('loaded frontend_app');

var frontend_app = angular.module('presidents', []);
frontend_app.controller('data', do_data);
//$scope.searchPresident = '';

//   // function to submit the form after all validation has occurred            
//   $scope.submitForm = function(isValid) {
    
//         // check to make sure the form is completely valid
//         if (isValid) {
//           alert('president added');
//         }
//         $scope.submitted = true;
//       };

function do_data($scope, $http) {
    console.log('inside dodata');
    $scope.message = 'Welcome to US Politics';
    $scope.read = function () {
        console.log('reading data from backend');
        $http.get('/api/v4/read').then(function (presidents) {
            $scope.presidents = presidents.data;
            console.log($scope.presidents);
        });
    }
    $scope.read();

    $scope.create = function () {
        console.log('creating president');
        var data = {
            number: $scope.input_number,
            president: $scope.input_president,
            birth_year: $scope.input_birth_year,
            death_year: $scope.input_death_year,
            took_office: $scope.input_took_office,
            left_office: $scope.input_left_office,
            party: $scope.input_party
        }
        $http.post('/api/v4/create', data)
            .then(function (result) {
                console.log(result);
                $scope.message = result.data.message;
                $scope.read();
            });
    }

    $scope.update = function (president) {
        console.log('updating president');
  
        $http.put('/api/v4/update', president).then(function (result) {
            console.log(result);
            $scope.message = result.data.message;
            $scope.read();
        });
    }
    $scope.delete = function (president) {
        console.log('deleting president');
        $http.delete('/api/v4/delete/' + president._id).then(function (result) {
            console.log(result);
            $scope.message = result.data.message;
            $scope.read();
        });
    }
    $scope.dropdown = function () {
        console.log('getting parties');
        $http.get('/api/v4/partydropdown').then(function (party) {
            console.log(party);
            $scope.party = party.data;
        });
    }
    $scope.dropdown();

}