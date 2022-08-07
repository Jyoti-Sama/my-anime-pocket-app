import axios from "axios";

const ANIME_URL = 'https://graphql.anilist.co';


// * Character * //

export const searchCharacterPageApi = async (character, page = 1) => {
    var data = JSON.stringify({
        query: `{
          Page(page:${page},perPage:9){
              pageInfo{
                  hasNextPage
                  currentPage
                  lastPage
                  perPage
              }
      
              characters(search:${character}) {
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

export const searchCharacterIdApi = async (id) => {
    var data = JSON.stringify({
        query: `{
          Character(id: ${id}) {
              id
              name{
                  full
                  alternative
              }
              image{
                  medium
              }
              description
              dateOfBirth{
                  day
                  month
                  year
              }
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

export const searchCharacterCharacterApi = async (id, page = 1) => {
    var data = JSON.stringify({
        query: `{
          Character(id: ${id}) {
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
                      id
                      title{
                          romaji
                          english
                      }
                      coverImage{
                          medium
                      }
                      popularity
                      meanScore
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