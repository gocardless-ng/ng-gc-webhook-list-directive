(function(){ 'use strict';
'use strict';

angular.module('gc.webHookListController', [
  'gc.statusCodeService'
]).controller('WebHookListController', [
  '$scope', 'StatusCodeService',
  function WebHookListController($scope, StatusCodeService) {

    $scope.getStatusCodeLabel = function getStatusCodeLabel(statusCode) {
      return StatusCodeService.getLabel(statusCode);
    };

  }
]);

'use strict';

angular.module('gc.webHookListDirective', [
  'gc.table',
  'gc.paginationNav',
  'gc.webHookListController',
  'webhook-list-template.html'
]).directive('webHookList', [
  function webHookListDirective() {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'webhook-list-template.html',
      scope: {
        webHooks: '='
      },
      controller: 'WebHookListController'
    };

  }
]);

angular.module('webhook-list-template.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('webhook-list-template.html',
    '<div><div class="well welcome-annotation" ng-hide="webHooks"><div class="page-notification"><figure class="page-notification-icon page-notification-icon--large ss-connection"></figure><h1 class="u-text-heading">Send your first web hook</h1><p>Web hooks will appear here, but none have been triggered yet.<br>Start by sending a new web hook.</p></div></div><!-- BODY CELL TEMPLATES --><span gc-set-fragment="tableBody:created_at" class="u-text-truncate u-block">{{ $row.created_at | date }}</span> <span gc-set-fragment="tableBody:response_code" class="u-text-truncate u-block"><span class="status-code" ng-class="\'status-code--\' + getStatusCodeLabel($row.response_code)">{{ $row.response_code || \'-\' }}</span></span> <!-- BODY CELL TEMPLATES END --><div class="u-margin-Bm"><gc-table table-data="webHooks" table-options="{\n' +
    '        rowUrl: \'/developer/web-hooks/{{ $row.id }}\'\n' +
    '      }" table-columns="[{\n' +
    '        field: \'created_at\',\n' +
    '        displayAs: \'Created\',\n' +
    '        className: \'created_at\'\n' +
    '      }, {\n' +
    '        field: \'action\',\n' +
    '        displayAs: \'Action\',\n' +
    '        className: \'action\'\n' +
    '      }, {\n' +
    '        field: \'resource_type\',\n' +
    '        displayAs: \'Resource Type\',\n' +
    '        className: \'resource_type\'\n' +
    '      }, {\n' +
    '        field: \'response_code\',\n' +
    '        displayAs: \'Status\',\n' +
    '        className: \'response_code\'\n' +
    '      }]"></gc-table></div><pagination-nav meta="webHooks.meta"></pagination-nav></div>');
}]);

})();