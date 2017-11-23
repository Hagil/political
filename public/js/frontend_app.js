console.log('loaded frontend_app');

var frontend_app = angular.module('presidents', []);
frontend_app.controller('data', do_data);

function do_data($scope, $http) {
    console.log('inside dodata');
    $scope.message = 'Welcome to US Politics';
    $scope.read = function () {
        console.log('reading data from backend');
        $http.get('/api/v4/read').then(function (presidents) {
            $scope.presidents = presidents.data;
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
        var data = {
            number: $scope.number,
            president: $scope.president,
            birth_year: $scope.birth_year,
            death_year: $scope.death_year,
            took_office: $scope.took_office,
            left_office: $scope.left_office,
            party: $scope.party
        }
        $http.put('/api/v4/update', data).then(function (result) {
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