import React, { useState } from 'react';

/**
 * We need to import fetchQueryResultsFromURL since we will sometimes have urls in info.prev and info.next
 * which are query urls.
 */
import { fetchQueryResultsFromURL } from '../api';

const Preview = (props) => {
	let currPage = 0;
	/**
   * Destructure setSearchResults, setFeaturedResult, and setIsLoading from props
   * and also destructure info and records from props.searchResults
   * 
   * You need info, records, setSearchResults, setFeaturedResult, and setIsLoading as available constants
   */

	const { setSearchResults, setFeaturedResult, setIsLoading } = props;
	const { info, records } = props.searchResults;

	//console.log('prev', props.searchResults.info.prev);
  console.log(records);

	/**
   * Don't touch this function, it's good to go.
   * 
   * It has to be defined inside the Preview component to have access to setIsLoading, setSearchResults, etc...
   */
	async function fetchPage(pageUrl) {
		setIsLoading(true);

		try {
			const results = await fetchQueryResultsFromURL(pageUrl);
			setSearchResults(results);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}


	const handleClick = async (url) => {
		const response = await fetchPage(
			url
		);
		return response;
	};



	return (
		<aside id="preview">
			<header className="pagination">
				{/* This button should be disabled if nothing is set in info.prev, and should call fetchPage with info.prev when clicked */}
				<button disabled={!info.prev} className="previous" onClick={() => handleClick(info.prev)}>
					Previous
				</button>
				{/* This button should be disabled if nothing is set in info.next, and should call fetchPage with info.next when clicked */}
				<button
        disabled={!info.next}
        className="next"
        onClick={() => handleClick(info.next)}>Next</button>
			</header>
			<section className="results">
        {/* {
          records.map((record) => {
            console.log(record.id);
            console.log(record.primaryimageurl)
            console.log(record.title)
          })
        } */}
        {records.map((record) => {
         return <div  
          key={record.id}
          className="object-preview"
          onClick={(event) => {
            event.preventDefault();
            // set the featured result to be this record, using setFeaturedResult
            setFeaturedResult(record)
          }}>
          { 
            // if the record.primaryimageurl exists, show this: <img src={ record.primaryimageurl } alt={ record.description } />, otherwise show nothing 
            (record.primaryimageurl !== "") ? <img src={ record.primaryimageurl } alt={ record.description } /> : null
          }
          {
            // if the record.title exists, add this: <h3>{ record.title }</h3>, otherwise show this: <h3>MISSING INFO</h3>
            (record.title !== "") ? <h3>{ record.title }</h3> : <h3>MISSING INFO</h3>
          }
        </div>
    
        }
        )}
          
       
			</section>
		</aside>
	);
};

export default Preview;
