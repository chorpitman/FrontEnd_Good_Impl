 (function() {
  'use strict';

  function MainController() {
   var mainCtrl = this;
   
   mainCtrl.resetForm = resetForm;
   mainCtrl.hoverIn = hoverIn;
   mainCtrl.hoverOut = hoverOut;
   
   function resetForm() {
    mainCtrl.name = "";
    mainCtrl.range = "";
   };

   function hoverIn(){
    mainCtrl.hoverEdit = true;
   };

   function hoverOut(){
    mainCtrl.hoverEdit = false;
   };
  }

  angular.module('skills').component('mainSkills', {
   templateUrl: 'skills/component/main/skills.main.template.html',
   controller: MainController,
   controllerAs: 'mainCtrl'
  });
 })();