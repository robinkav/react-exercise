import * as yup from "yup";
import { Field, Formik, Form } from "formik";
import {
  Button,
  TextField,
  Select,
  ErrorText,
} from "@cruk/cruk-react-components";
import * as Constants from "../../shared/constants";
import {
  KeywordsFilterWrapper,
  FilterWrapper,
  FormSubmitWrapper,
  FormSearchWrapper,
} from "./SearchFormStyles";

const SearchForm = ({ onSubmit, formikRef }) => {
  const maxFilterYear = new Date().getFullYear();
  const validYearRegex = /^[1-2][0-9][0-9][0-9]$/;

  const querySchema = yup.object().shape({
    keywords: yup
      .string()
      .trim()
      .required("Please enter keywords to search.")
      .test(
        "len",
        "Keywords must be between 2 and 50 characters.",
        (val) =>
          typeof val !== "undefined" && val.length >= 2 && val.length <= 50
      ),
    media_type: yup.string().required("Please select a media type."),
    year_start: yup
      .string()
      .trim()
      .matches(validYearRegex, "Please enter a valid year.")
      .test(
        "max",
        "Year must not be in the future.",
        (val) => typeof val === "undefined" || val <= maxFilterYear
      ),
  });

  return (
    <Formik
      innerRef={formikRef}
      validateOnChange
      initialValues={{
        keywords: "",
        media_type: "",
        year_start: "",
      }}
      validationSchema={querySchema}
      onSubmit={onSubmit}
    >
      {({
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => {
        return (
          <Form onSubmit={handleSubmit} role="search">
            <FormSearchWrapper>
              <KeywordsFilterWrapper>
                <Field name="keywords">
                  {({ field }) => (
                    <>
                      <TextField
                        label="Keywords"
                        name="keywords"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        required
                        data-testid="txtKeywords"
                        aria-describedby="keywordsError"
                        aria-required="true"
                        aria-invalid={!!errors.keywords}
                        {...field}
                      />
                      {errors.keywords && touched.keywords && (
                        <ErrorText>
                          <span id="keywordsError" data-testid="valKeywords">
                            {errors.keywords}
                          </span>
                        </ErrorText>
                      )}
                    </>
                  )}
                </Field>
              </KeywordsFilterWrapper>
              <FilterWrapper>
                <Field name="media_type">
                  {({ field }) => (
                    <>
                      <Select
                        required
                        label="Media type"
                        name="media_type"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        data-testid="ddlMediaType"
                        aria-describedby="mediaTypeError"
                        aria-required="true"
                        {...field}
                      >
                        <option key="default"></option>
                        {Constants.MEDIATYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </Select>
                      {errors.media_type && touched.media_type && (
                        <ErrorText>
                          <span id="mediaTypeError" data-testid="valMediaType">
                            {errors.media_type}
                          </span>
                        </ErrorText>
                      )}
                    </>
                  )}
                </Field>
              </FilterWrapper>
              <FilterWrapper>
                <Field name="year_start">
                  {({ field }) => (
                    <>
                      <TextField
                        label="Year start"
                        type="text"
                        name="year_start"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        data-testid="txtYearStart"
                        aria-describedby="yearStartError"
                        aria-required="true"
                        aria-invalid={!!errors.year_start}
                        {...field}
                      />
                      {errors.year_start && touched.year_start && (
                        <ErrorText>
                          <span id="yearStartError" data-testid="valYearStart">
                            {errors.year_start}
                          </span>
                        </ErrorText>
                      )}
                    </>
                  )}
                </Field>
              </FilterWrapper>
            </FormSearchWrapper>
            <FormSubmitWrapper>
              <Button
                type="submit"
                disabled={isSubmitting}
                data-testid="btnSubmitSearch"
                role="button"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </FormSubmitWrapper>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SearchForm;
