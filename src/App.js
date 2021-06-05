import { useRef, useState } from "react";
import { ThemeProvider } from "styled-components";
import * as yup from "yup";
import { Field, Formik, Form } from "formik";
import {
  Button,
  TextField,
  Select,
  crukTheme,
  ErrorText,
  Heading,
} from "@cruk/cruk-react-components";
import * as Constants from "./shared/constants";
import {
  SiteWrapper,
  KeywordsFilterWrapper,
  FilterWrapper,
  FormSubmitWrapper,
  FormSearchWrapper,
} from "./shared/theme";
import service from "./services/service";
import format from "./utilities/format";

import AssetLibrary from "./components/AssetLibrary";

function App() {
  const [error, setError] = useState(false);
  const [assets, setAssets] = useState([]);
  const formikRef = useRef(null);

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

  const handleResponse = (error, data) => {
    formikRef.current.setSubmitting(false);
    if (error) {
      setError(error);
      return;
    }
    setAssets(format.search(data));
  };

  return (
    <ThemeProvider theme={crukTheme}>
      <SiteWrapper>
        {error && <ErrorText>An error occurred</ErrorText>}
        <Heading>NASA Image and Video Library</Heading>
          <Formik
            innerRef={formikRef}
            validateOnChange
            initialValues={{
              keywords: "",
              media_type: "",
              year_start: "",
            }}
            validationSchema={querySchema}
            onSubmit={(values) => {
              service.get("search", { params: { ...values } }, handleResponse);
            }}
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
                <Form onSubmit={handleSubmit}>
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
                              {...field}
                            />
                            {errors.keywords && touched.keywords && (
                              <ErrorText>{errors.keywords}</ErrorText>
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
                              <ErrorText>{errors.media_type}</ErrorText>
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
                              {...field}
                            />
                            {errors.year_start && touched.year_start && (
                              <ErrorText>{errors.year_start}</ErrorText>
                            )}
                          </>
                        )}
                      </Field>
                    </FilterWrapper>
                  </FormSearchWrapper>
                  <FormSubmitWrapper>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                  </FormSubmitWrapper>
                </Form>
              );
            }}
          </Formik>
          <AssetLibrary assets={assets} />
      </SiteWrapper>
    </ThemeProvider>
  );
}

export default App;
