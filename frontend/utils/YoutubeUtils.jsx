/**
 * Function to fetch the title of a YouTube video given its URL
 * @param {string} url - string url of youtube video
 * @returns the title of the youtube video
 */
const fetchYoutubeTitle = async (url) => {
  const videoId = url.split('v=')[1];
  const api_key = 'AIzaSyBq1FiaDyqjzAL1S7uXlB9nXISRWD7mXxc';
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${api_key}&part=snippet`
  );
  const data = await response.json();
  const videoTitle = data.items[0].snippet.title;
  return videoTitle;
};

export default fetchYoutubeTitle;
