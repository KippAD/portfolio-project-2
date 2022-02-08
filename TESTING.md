# Testing

## Code Validator Tests

### W3C Validator (HTML)
The HTML of the Capitals of the World Quiz was tested using the W3C Validator:

#### **Index.html**
<p  align="center"><img  src="assets/readme-images/html-errors.png" alt="Errors and warnings returned by the html w3c validator" width="50%"></p>
The validation test on the index.html returned four issues, three of which were caused by an unclosed div tag. All issues were resolved by closing the element, with the only exception being the empty heading warning - this is intentional, so the warning was ignored.

#### **Other HTML**
Tests were also carried out on each section of HTML that is loaded by Javascript.

-   **Enter Username** - No errors were returned by the validator.
-   **Difficulty Selection** - No errors were returned by the validator.
-   **Game Area** - The validator showed that the h2 element was incorrectly closed with an h3 tag.
-   **Rules Page** - Returned multiple errors, all caused by a missing character in closing div tag.
-   **Scores Page** - No errors were returned by the validator.
-   **Modals** - All html introduced through modals were checked and no errors were returned by the validator.

All warnings returned by the validator were resolved and all HTML code passes through without issue.

### Jigsaw Validator (CSS)
The HTML of the Capitals of the World Quiz was tested using the W3C Validator:

<p  align="center"><img  src="assets/readme-images/css-errors.png" alt="Errors and warnings returned by the css jigsaw validator" width="50%"></p>

The Jigsaw Validator only returned two errors, pertaining to two font-weight rules with the incorrect values. 

<p  align="center"><img  src="assets/readme-images/css-validated.png" alt="Css jigsaw validator confirming that there are no issues with the CSS code" width="50%"></p>

Both of these issues were resolved and the validation now comes back without any issues.

### Jshint Validator (JavaScript)
All four scripts were validated together with the Jshint validator.
- **script.js**
- **modals.js**
- **sounds.js**
- **questions.js**

Initially the validatore returned 152 warnings. 

<p  align="center"><img  src="assets/readme-images/js-errors.png" alt="Jshint validator initial results" width="75%"></p>

Half of the warnings were first resolved by adding '**jshint esversion: 6**' to the top of the script - this specifies to the validator that the code uses ECMAScript 6 syntax. 

The vast majority of the remaining warnings were related to misplaced semi-colons and a few were undeclared variables that had been missed in the development process. All unecessary semi-colons were removed and undeclared variables declared.

<p  align="center"><img  src="assets/readme-images/js-final-error.png" alt="Jshint validator final warning" width="75%"></p>

The final warning encountered was resolved by rearranging the order of the showAnswer function, ensuring that the function was declared outside the loop.

All issues were resolved and the validator now returns no warnings:

<p  align="center"><img  src="assets/readme-images/js-resolved.png" alt="Jshint validator final warning" width="75%"></p>


