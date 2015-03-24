[![Build Status](https://travis-ci.org/nikrolls/angular-nz-ird-number-validator.svg?branch=master)](https://travis-ci.org/nikrolls/angular-nz-ird-number-validator)
[![Code Climate](https://codeclimate.com/github/nikrolls/angular-nz-ird-number-validator/badges/gpa.svg)](https://codeclimate.com/github/nikrolls/angular-nz-ird-number-validator) [![Test Coverage](https://codeclimate.com/github/nikrolls/angular-nz-ird-number-validator/badges/coverage.svg)](https://codeclimate.com/github/nikrolls/angular-nz-ird-number-validator)
[![Coverage Status](https://coveralls.io/repos/nikrolls/angular-nz-ird-number-validator/badge.png)](https://coveralls.io/r/nikrolls/angular-nz-ird-number-validator)
[![Dependency Status](https://david-dm.org/nikrolls/angular-nz-ird-number-validator.svg?style=flat)](https://david-dm.org/nikrolls/angular-nz-ird-number-validator)
[![devDependency Status](https://david-dm.org/nikrolls/angular-nz-ird-number-validator/dev-status.svg?style=flat)](https://david-dm.org/nikrolls/angular-nz-ird-number-validator#info=devDependencies)

Angular Validation: NZ IRD Number
===================

Checks if an input's value is a valid NZ IRD Number.

Installation
------------

`bower install angular-nz-ird-number-validator`

Then add `validation.nzIrdNumber` to your angular dependencies

Usage
-----

**Simple Property Example**

```html
<input ng-model="irdNumber" type="text" nz-ird-number />
```

**Display Custom Error**<br>
If your form and field both are named, you can access the validation result to show/hide messages.

```html
<form name="myForm">
      Confirm: <input ng-model="irdNumber" type="text" nz-ird-number name="myIrdNumber" />
      <div ng-show="myForm.myIrdNumber.$error.nzIrdNumber">IRD Number is not valid!</div>
</form>
```
