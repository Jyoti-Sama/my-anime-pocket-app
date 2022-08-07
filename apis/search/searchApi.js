import axios from "axios";

const ANIME_URL = 'https://graphql.anilist.co';

// character
export const searchCharacterApi = async (character) => {
    var data = JSON.stringify({
        query: `{
          Character(search: ${JSON.stringify(character)}) {
              name{
                  full
                  alternative
              }
              image{
                  medium
              }
              id
              dateOfBirth{
                  day
                  month
                  year
              }
              description
              age
              bloodType
          }
      }`,
        variables: {}
    });

    var config = {
        method: 'post',
        url: ANIME_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    try {
        const response = await axios(config);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

// character related anime
export const searchCharacterExtraApi = async (character, page = 1) => {
    var data = JSON.stringify({
        query: `{
          Character(search: ${JSON.stringify(character)}) {
              name{
                  full
              }
              id
              media(page:${page}, perPage: 5){
                  pageInfo{
                      hasNextPage
                      currentPage
                      total
                      lastPage
                      perPage
                  }
                  nodes{
                      title{
                          english
                          romaji
                      }
                      coverImage{
                          medium
                      }
                  }
              }
          }
      }`,
        variables: {}
    });

    var config = {
        method: 'post',
        url: ANIME_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    try {
        const response = await axios(config);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}


// anime
export const searchAnimeApi = async (anime) => {
    var data = JSON.stringify({
        query: `{
          Media(search: ${JSON.stringify(anime)}, type:ANIME){
              id
              title{
                  english
                  romaji
              }        
              popularity
              meanScore
              coverImage{
                  medium
              }      
          }
      }`,
        variables: {}
    });

    var config = {
        method: 'post',
        url: ANIME_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    try {
        const response = await axios(config);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

// anime character
export const searchAnimeExtraApi = async (anime, page = 1) => {
    var data = JSON.stringify({
        query: `{
          Media(search: ${JSON.stringify(anime)}, type:ANIME){
              id      
              characters(page: ${page}, perPage: 5){
                  nodes{
                      id
                      name{
                          full
                          alternative
                      }
                      image{
                          medium
                      }
                  }
              }
      
          }
      }`,
        variables: {}
    });

    var config = {
        method: 'post',
        url: ANIME_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    try {
        const response = await axios(config);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}



