import axios from "axios"

const ANIME_URL = 'https://graphql.anilist.co';

export const trendingAnime = async (popularity = 200000, page = 1) => {

    var data = JSON.stringify({
        query: `{
          Page(page:${page},perPage:9){
              pageInfo{
                  hasNextPage
                  currentPage
                  lastPage
                  perPage
              }
      
              media(popularity_greater: ${popularity}){
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
        url: 'https://graphql.anilist.co',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': 'laravel_session=VTJzEFuqGkZyxtrGi2HgPYdm86ZTL83HQdZ42R1s'
        },
        data: data
    };

    try {
        const response = await axios(config);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};


export const upcommingAnime = async (popularity = 10000, page = 1) => {
    let d = new Date();
    let date = `${d.getDate()}`.length < 2 ? `0${d.getDate()}` : d.getDate();
    let month = `${d.getMonth() + 1}`.length < 2 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`;

    let today = `${d.getFullYear()}${month}${date}`;

    var data = JSON.stringify({
        query: `{
            Page(page:${page},perPage:10){
                pageInfo{
                    hasNextPage
                    currentPage
                    total
                    lastPage
                    perPage
                }
                media(startDate_greater:${today}, popularity_greater: ${popularity}, type:ANIME){
                    id
                    title{
                        romaji
                        english
                    }
                    coverImage{
                        medium
                    }
                    startDate{
                        day
                        month
                        year
                    }
                    popularity
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
};


export const airingAnimeApi = async (page = 1) => {
    let d = new Date();
    let date = `${d.getDate()}`.length < 2 ? `0${d.getDate()}` : d.getDate();
    let month = `${d.getMonth() + 1}`.length < 2 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`;

    let today = `${d.getFullYear()}${month}${date}`;

    var data = JSON.stringify({
        query: `{
          Page(page:${page},perPage:10){
              pageInfo{
                  hasNextPage
                  currentPage
                  total
                  lastPage
                  perPage
              }
              media(startDate_lesser: ${today}, endDate_greater: ${today},popularity_greater: 50000, type:ANIME){
                  id
                  title{
                      romaji
                      english
                  }
                  coverImage{
                      medium
                  }
                  popularity
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
};