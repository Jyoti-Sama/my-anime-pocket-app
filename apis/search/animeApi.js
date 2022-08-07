import axios from "axios";

const ANIME_URL = 'https://graphql.anilist.co';


// * Anime * //

export const searchAnimePageApi = async (anime, page = 1) => {
    var data = JSON.stringify({
        query: `{
          Page(page:${page},perPage:9){
              pageInfo{
                  hasNextPage
                  currentPage
                  lastPage
                  perPage
              }
      
              media(search:${anime}, popularity_greater: 20000){
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

export const searchAnimeIdApi = async (id) => {
    var data = JSON.stringify({
        query: `{
          Media(id: ${id}){
              season
              popularity
              averageScore
              episodes
              endDate{
                  day
                  month
                  year
              }        
              startDate{
                  day
                  month
                  year
              }
              seasonYear
              isAdult
              description
              duration
              genres
              
              trailer{        
                  thumbnail
              }
              
              bannerImage
              title{
                  english
                  romaji
              }
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

export const searchAnimeCharacterApi = async (id, page = 1) => {
    var data = JSON.stringify({
        query: `{
            Media(id: ${id}){
                id
                characters(page: ${page}, perPage: 10){
                    pageInfo{
                        currentPage
                        hasNextPage
                        total
                        perPage
                    }
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