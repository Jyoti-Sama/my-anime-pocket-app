import axios from "axios"

const ANIME_URL = 'https://graphql.anilist.co';

export const animeInfoApi = async (mediaID) => {

    var data = JSON.stringify({
        query: `{
          Media(id:${mediaID}){
              season
              episodes
              popularity
              averageScore
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
              nextAiringEpisode{
                episode
                airingAt
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

export const animeRecomendationApi = async (mediaID) => {

    var data = JSON.stringify({
        query: `{
          Recommendation(mediaId:${mediaID}) {
              id
              rating
              mediaRecommendation{
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
};

