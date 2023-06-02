function useGraphql() {
  return function createQuery(query_params, page_params) {
    let my_params = "";
    let my_page_params = "perPage:50,";

    for (const key in page_params) {
      my_page_params += `${key}:${page_params[key]},`;
    }

    for (const key in query_params) {
      if (Array.isArray(query_params[key])) {
        my_params += `${key}:[${query_params[key].map(
          (item) => `"${item}"`
        )}],`;
      } else if (key === "search") {
        my_params += `${key}:"${query_params[key]}",`;
      } else {
        my_params += `${key}:${query_params[key]},`;
      }
    }

    let query = `query {
    Page(${my_page_params}) {

      pageInfo {
    	  total
    	  perPage
    	  currentPage
    	  lastPage
    	  hasNextPage
    	}

      media(${my_params}) {
        id
        title {
          english
          romaji
        }
        type
        duration
        averageScore
        episodes
        chapters
        coverImage {
          large
          medium
        }
        description
        endDate {
          year
          month
          day
        }
        status
        popularity
        relations {
          edges {
            relationType
          }
        }
      }
    }
  }`;
    return query;
  };
}

export default useGraphql;
