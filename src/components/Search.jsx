import React, { useEffect, useState } from 'react';

/**
 * Don't touch these imports!
 */
import { 
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults
} from '../api';

const Search = (props) => {

   // Make sure to destructure setIsLoading and setSearchResults from the props
const {setSearchResults, setIsLoading} = props;

  /**
   * We are at the Search component, a child of app. This has a form, so we need to use useState for
   * our controlled inputs:
   * 
   * centuryList, setCenturyList (default should be an empty array, [])
   * classificationList, setClassificationList (default should be an empty array, [])
   * queryString, setQueryString (default should be an empty string, '')
   * century, setCentury (default should be the string 'any')
   * classification, setClassification (default should be the string 'any')
   */

  const [queryString, setQueryString] = useState("");
  const inputHandler = (event) => {
    setQueryString(event.target.value)
  }
 
  const [inputList, setInputList] = useState([]);
  const classificationHandle = (event) => {
    setInputList(event.target.value)
  }

  const [inputCenturyList, setInputCenturyList] = useState([]);
  const centuryListHandle = (event) => {
    setInputCenturyList(event.target.value)
  }

  const [classificationList, setClassificationList] = useState([]);
  const [centuryList, setCenutryList] = useState([])
  /**
   * Inside of useEffect, use Promise.all([]) with fetchAllCenturies and fetchAllClassifications
   * 
   * In the .then() callback pass the returned lists to setCenturyList and setClassificationList
   * 
   * Make sure to console.error on caught errors from the API methods.
   */
  useEffect(async () => {
    const classificationListFromAPI = await fetchAllClassifications();
    setClassificationList(classificationListFromAPI);

    const centuryListFromAPI = await fetchAllCenturies();
    setCenutryList(centuryListFromAPI);
  }, []);

  /**
   * This is a form element, so we need to bind an onSubmit handler to it which:
   * 
   * calls event.preventDefault()
   * calls setIsLoading, set it to true
   * 
   * then, in a try/catch/finally block:
   * 
   * try to:
   * - get the results from fetchQueryResults({ century, classification, queryString })
   * - pass them to setSearchResults
   * 
   * catch: error to console.error
   * 
   * finally: call setIsLoading, set it to false
   */
  return <form id="search" onSubmit={async (event) => {
    // write code here
    event.preventDefault();
    setIsLoading(true);
    try{
    const results = await fetchQueryResults({century:inputCenturyList, classification:inputList,queryString:queryString})
    setSearchResults(results);
    console.log(results);
    } catch (error) {
      console.error("keep trying");
    } 
    finally{
    setIsLoading(false)
    }

  }}>
    <fieldset>
      <label htmlFor="keywords">Query</label>
      <input 
        id="keywords" 
        type="text" 
        placeholder="enter keywords..." 
        value={queryString} 
        onChange={inputHandler}/>
    </fieldset>

    <fieldset>
      <label htmlFor="select-classification">Classification <span className="classification-count">({ classificationList.length })</span></label>
      <select 
        name="classification"
        id="select-classification"
        value={inputList} 
        onChange={classificationHandle}>
        <option value="any">Any</option>
        {classificationList.map(
          (listValue) => <option key = {listValue.id} value = {listValue.name}>{listValue.name}</option>
        )}
      </select>
    </fieldset>

    <fieldset>   
    <label htmlFor="select-century">Century <span className="century-count">({ centuryList.length })</span></label>
      <select 
        name="century" 
        id="select-century"
        value={inputCenturyList} 
        onChange={centuryListHandle}>
        <option value="any">Any</option>
        {centuryList.map(
          (listValue) => <option key = {listValue.id} value = {listValue.name}>{listValue.name}</option>
        )}
      </select>
     </fieldset>

    <button>SEARCH</button>
    </form>
}

export default Search;