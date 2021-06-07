# CRUK technical exercise (React)

## Task details

This application consists of a form which will fetches assets from the NASA Images and Video Library API.

## Documentation for tools used

- Formik: https://formik.org/docs/overview
- Yup https://github.com/jquense/yup
- Styled components https://styled-components.com/docs
- NASA Images and Video Library API https://api.nasa.gov/

## NPM libraries added

- Axios: https://www.npmjs.com/package/axios
- Humps: https://www.npmjs.com/package/humps
- React-Router-Dom: https://www.npmjs.com/package/react-router-dom 

## Future enhancements

- Add additional integration tests for fetching media assets
- Improve overall application UX/UI styling
- Additional filters for search parameters utilising more of the available options provided by the API e.g year end
- Pagination to allow users to view more than 10 items (change page size option)
- Error reporting and logging e.g. Sentry or New Relic
- Add ESLint/Prettier pre-hooks to enforce formatting and coding rules on commit
- Improve API failure handling with retries, with improved messages displayed
- Add a page to view an individual asset in greater detail with different size options
- Add state container/management such as Redux to display alerts when errors occur
- Document all functions using JSDocs
