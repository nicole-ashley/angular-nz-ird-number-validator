describe('Directives: validation - nzIrdNumber', function () {

    var $scope,
        $compile,
        compiled;
    var suppliedValidValues = [
        '49-091-850',
        '35-901-981',
        '49-098-576',
        '136-410-132'
    ];
    var suppliedInvalidValues = [
        '136-410-133',
        '91-255-68'
    ];

    beforeEach(module('validation.nzIrdNumber'));

    beforeEach(inject(function (_$rootScope_, _$compile_) {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
    }));

    describe('Directive level validation', function () {

        var validTemplate = '<input ng-model="irdNumber" nz-ird-number/>';

        describe('configuration:', function () {

            it('throws an error when no ngModel controller is found', function () {
                var naTemplate = '<div nz-ird-number></div>';
                var compile = function() {
                    $compile(naTemplate)($scope);
                };
                $scope.$digest();
            });


            it('is limited to attribute invocation', function () {
                var spy = sinon.spy($scope, '$watch'),
                    naTemplates = [
                        '<div class="nz-ird-number"></div>',
                        '<nz-ird-number></nz-ird-number>'
                    ];

                for (var i = 0; i < naTemplates.length; i++) {
                    compiled = $compile(naTemplates[i])($scope);
                    $scope.$digest();
                    expect(spy).to.have.been.not.called;
                }
            });

        });


        // Written according to the specs at http://www.ird.govt.nz/software-developers/software-dev-specs/
        describe('behavior:', function () {
            
            it('returns true if no model value has been defined', function () {
                compiled = $compile(validTemplate)($scope);
                expect($scope.irdNumber).to.be.undefined();
                $scope.$digest();
                expect(compiled.hasClass('ng-valid')).to.be.true();
            });
            
            it('returns true if the model value is an empty string', function () {
                compiled = $compile(validTemplate)($scope);
                $scope.irdNumber = '';
                $scope.$digest();
                expect(compiled.hasClass('ng-valid')).to.be.true();
            });

            it('works with non-hyphenated IRD numbers', function() {
                compiled = $compile(validTemplate)($scope);
                $scope.irdNumber = suppliedValidValues[0].replace(/-/g, '');
                $scope.$digest();
                expect(compiled.hasClass('ng-valid')).to.be.true();
            });

            suppliedValidValues.forEach(function(testValue) {
                it('returns true on valid value ' + testValue, function () {
                    compiled = $compile(validTemplate)($scope);
                    $scope.irdNumber = testValue;
                    $scope.$digest();
                    expect(compiled.hasClass('ng-valid')).to.be.true();
                });
            });

            suppliedInvalidValues.forEach(function(testValue) {
                it('returns false on invalid value ' + testValue, function () {
                    compiled = $compile(validTemplate)($scope);
                    $scope.irdNumber = testValue;
                    $scope.$digest();
                    expect(compiled.hasClass('ng-valid')).to.be.false();
                });
            });

        });

    });

    describe('Form level validation', function () {

        var form,
            element,
            inputValue = suppliedValidValues[0],
            invalidValue = suppliedInvalidValues[0];

        beforeEach(function () {
            element = angular.element(
                '<form name="form">' +
                '  <input type="text" ng-model="test" name="test" nz-ird-number/>' +
                '</form>'
            );
            $scope.test = inputValue;
            $compile(element)($scope);
            $scope.$digest();
            form = $scope.form;
        });

        it('should check if $viewValue is valid', function () {
            form.test.$setViewValue(inputValue);
            $scope.$digest();
            expect(form.test.$error.nzIrdNumber).to.be.undefined();
        });

        it('should check if $viewValue is invalid', function () {
            form.test.$setViewValue(invalidValue);
            $scope.$digest();
            expect(form.test.$error.nzIrdNumber).to.be.true();
        });

        it('should set $modelValue undefined if $viewValue is invalid', function () {
            form.test.$setViewValue(invalidValue);
            $scope.$digest();
            expect(form.test.$modelValue).to.be.undefined();
        });

    });
});
