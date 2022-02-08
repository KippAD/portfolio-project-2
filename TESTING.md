# Testing

## Code Validator Tests

### W3C Validator (HTML)

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

### Jshint Validator (JavaScript)

