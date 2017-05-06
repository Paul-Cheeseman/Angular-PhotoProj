
angular.module('UserStoreService', [])
    .factory('LocalUserStore', function($http) {

        LocalUsers = {
            fetch: function(data) {
               return $http.get('js/users.json');
            }
        };
        return LocalUsers;
    });


