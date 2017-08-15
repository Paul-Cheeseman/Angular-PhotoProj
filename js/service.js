
//Using a local file to simulate a service, this would normally be taken from an external source

angular.module('UserStoreService', [])
    .factory('LocalUserStore', function($http) {

        LocalUsers = {
            fetch: function(data) {
               return $http.get('js/photos.json');
            }
        };
        return LocalUsers;
    });


