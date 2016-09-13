 (function() {
  'use strict';
  angular
   .module('skills')
   .controller("SkillsController", SkillsController);

  function SkillsController() {
   var skillsCtrl = this;
   
   skillsCtrl.push = push;
   
   skillsCtrl.list = [{
    name: 'HTML',
    percentage: '100'
   }, {
    name: 'CSS',
    percentage: '70'
   }, {
    name: 'jQuery',
    percentage: '60'
   }, {
    name: 'PHP',
    percentage: '40'
   }, {
    name: 'Lavarel 2 (framework)',
    percentage: '15'
   }];
   
   function push(name, range) {
	skillsCtrl.list.push({
     "name": name,
     "percentage": range
    });
   };
  }
 })();