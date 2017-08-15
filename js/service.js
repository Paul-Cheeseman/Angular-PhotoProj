
//Using a local file to simulate a service, this would normally be taken from an external source

angular.module('UserStoreService', [])
    .factory('LocalUserStore', function($http) {

        LocalUsers = {
            fetch: function(data, file) {
               return $http.get(file);
            }
        };
        return LocalUsers;


    });


