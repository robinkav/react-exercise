import { useRef, useState } from "react";
import { ErrorText, Heading, PopOver } from "@cruk/cruk-react-components";
import format from "../../utilities/format";
import SearchForm from "../../components/SearchForm/SearchForm";
import AssetLibrary from "../../components/AssetLibrary/AssetLibrary";
import { AlertBanner } from "../../shared/theme";
import { NASA_BASEURL } from "../../shared/constants";
import Service from "../../services/service";

const Search = () => {
  const [error, setError] = useState(false);
  const [assets, setAssets] = useState([]);
  const formikRef = useRef(null);
  

  const onSubmit = (values) => {
    Service.get(
      `${NASA_BASEURL}/search`,
      { params: { ...values } },
      { removeEmptyFilters: true },
      handleResponse
    );
  };

  const handleResponse = (error, data) => {
    formikRef.current.setSubmitting(false);
    if (error) {
      setError(true);
    } else {
      setError(false);
      setAssets(format.search(data));
    }
  };

  return (
    <>
      {error && (
        <PopOver position="top" style={{"width":"100%"}}>
          <AlertBanner data-testid="lblApiError" role="alert">
            <ErrorText role="alert">An error occurred</ErrorText>
          </AlertBanner>
        </PopOver>
      )}
      <Heading>NASA Image and Video Library</Heading>
      <SearchForm onSubmit={onSubmit} formikRef={formikRef} />
      <AssetLibrary assets={assets}/>
    </>
  );
};

export default Search;
