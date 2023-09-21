function skillsMember() {
    return {
        name: 'skillsMember',
        templateUrl: 'app/components/skills-member/skills-member.html',
        restrict: 'E',
        controller: 'SkillsMemberCtrl',
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            member: '=',
            skills: '='
        }
    };
}