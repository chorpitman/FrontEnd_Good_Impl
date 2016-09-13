 (function() {
  'use strict';
  angular.module('skills').component('skillsList', {
   templateUrl: 'skills/component/list/skills.list.template.html',
   bindings: {
    list: '='
   }
  });
 })();