// const BASE_URL = "http://127.0.0.1:8000"; //uncomment for dev testing
const BASE_URL = 'https://youtube-playlist-duration-checker.vercel.app';

export default async function getData(video_id){
    const request = `${BASE_URL}/api/playlist-duration/?playlist_id=${video_id}`;
    try{
        const response = await fetch(request);
        if ( !response.ok) {
            throw new Error("Failed to Fetch Data");
        }
        const data = await response.json();
        // console.log("in API.js",data)
        return data
    }catch(error){
        console.error("Error While Fetching Data :",error);
        return null;
    }
}