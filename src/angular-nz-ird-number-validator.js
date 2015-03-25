'use strict';

angular.module('validation.nzIrdNumber', []);

angular.module('validation.nzIrdNumber').directive('nzIrdNumber', nzIrdNumber);

function nzIrdNumber() {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, elem, attrs, ctrl) {
            // Written according to the specs at http://www.ird.govt.nz/software-developers/software-dev-specs/
            ctrl.$validators.nzIrdNumber = function () {
                if(typeof ctrl.$viewValue === 'undefined' || ctrl.$viewValue === '') {
                    // No validation for an undefined model value
                    return true;
                }
                
                var input = extract(ctrl.$viewValue);
                if (!input) {
                    return false;
                }
                if(!checkValidRange(input)) {
                    return false;
                }
                
                // Remove the check digit
                var base = input.substr(0, 8);
                return calculateCheckDigit(base, input.substr(-1));
            };

            function extract(input) {
                var matches = String(input).trim().match(/(?:\d{8,9}|\d{2,3}-\d{3}-\d{3})/);
                if (matches && matches.length) {
                    // Pad to 9 digits with a leading 0, if required
                    return ('0' + matches[0].replace(/-/g, '')).substr(-9);
                } else {
                    return false;
                }
            }
            
            function checkValidRange(input) {
                var asNumber = Number(input);
                return asNumber >= 10000000 && asNumber <= 150000000;
            }

            function calculateCheckDigit(input, expected) {
                var weighting = [3, 2, 7, 6, 5, 4, 3, 2];
                var checkDigit = calculateCheckDigitFor(weighting, input);
                if (checkDigit === 10) {
                    return reCalculateCheckDigit(input, expected);
                } else {
                    return checkDigit === Number(expected);
                }
            }

            function reCalculateCheckDigit(input, expected) {
                var weighting = [7, 4, 3, 2, 5, 2, 7, 6];
                var checkDigit = calculateCheckDigitFor(weighting, input);
                if (checkDigit === 10) {
                    return false;
                } else {
                    return checkDigit === Number(expected);
                }
            }

            function calculateCheckDigitFor(weighting, input) {
                var sum = 0;
                for (var i = 0; i < weighting.length; i++) {
                    sum += Number(input.charAt(i)) * weighting[i];
                }

                var remainder = sum % 11;
                if (remainder === 0) {
                    return 0;
                } else {
                    return 11 - remainder;
                }
            }
        }
    };
}
