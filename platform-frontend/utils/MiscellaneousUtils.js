import AVATAR_COLOURS from '@/constants/colours';

/**
 * Generates an SVG string representing a shimmer effect.
 *
 * @param {number} w - The width of the SVG.
 * @param {number} h - The height of the SVG.
 * @param {number} r - The radius of the SVG's rounded corners.
 * @return {string} The SVG string with the shimmer effect.
 */
const shimmerEffect = (w, h, r) => `
<svg width="${w}" height="${h}"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="rgb(50, 50, 55)" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="rgb(31, 34, 42)" rx="${r || 0}" ry="${
  r || 0
} />
  <rect id="r" width="${w}" height="${h}" rx="${r || 0}" ry="${
  r || 0
} fill="url(#g)" rx="10" ry="10" />
  <animate xlink:href="#r" attributeName="opacity" values="0.4;1;0.4" keyTimes="0;0.5;1" dur="1.7s" repeatCount="indefinite"  />
</svg>`;

/**
 * Converts a string to base64.
 *
 * @param {string} str - The string to be converted.
 * @return {string} The base64 representation of the input string.
 */
const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

/**
 * Generates a random colour from a predefined list of colours.
 *
 * @return {string} The randomly generated colour.
 */
const generateRandomColour = () => {
  const colourValues = Object.values(AVATAR_COLOURS);
  const randomIndex = Math.floor(Math.random() * colourValues.length);
  const newColour = colourValues[randomIndex];
  return newColour;
};

/**
 * Returns a random avatar colour. If a colour is already saved in local storage, it returns that colour.
 * Otherwise, it generates a new random colour, saves it in local storage, and returns it.
 *
 * @return {string} The random avatar colour.
 */
const getRandomAvatarColour = (state) => {
  if (state === 'random') return generateRandomColour();

  const storageKey = 'avatarColor';

  const savedColour = localStorage.getItem(storageKey);

  if (savedColour) return savedColour;

  const newColour = generateRandomColour();
  localStorage.setItem(storageKey, newColour);
  return newColour;
};

/**
 * Generate the URL for the user's avatar image.
 *
 * @param {string} avatarId - The ID of the user's avatar.
 * @param {boolean} isFullBody - Whether to generate a full body image. Defaults to false.
 * @param {boolean} transparent - Whether the image should have a transparent background. Defaults to true.
 * @return {string} The URL of the user's avatar image.
 */
const getUserAvatarImage = (
  avatarId,
  isFullBody = false,
  transparent = true
) => {
  const baseUrl = `https://models.readyplayer.me/${avatarId}.png?`;
  const blendShapeParam = 'blendShapes[Wolf3D_Head][mouthSmile]=0.3';
  const scene = transparent
    ? 'scene=fullbody-posture-v1-transparent'
    : 'scene=fullbody-portrait-v1';

  return `${baseUrl}${isFullBody ? `${scene}&` : ''}${blendShapeParam}`;
};

/**
 * Disables or enables scrolling on the webpage based on the value of the 'open' parameter.
 *
 * @param {boolean} open - A boolean value indicating whether scrolling should be disabled or enabled.
 * @return {function} A function that restores the default scrolling behavior when called.
 */
const disableScroll = (open) => {
  if (open) {
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = 'no';
  } else {
    document.documentElement.style.overflow = 'unset';
    document.body.scroll = 'yes';
  }
  return () => {
    document.documentElement.style.overflow = 'unset';
    document.body.scroll = 'yes';
  };
};

export {
  toBase64,
  shimmerEffect,
  generateRandomColour,
  getRandomAvatarColour,
  getUserAvatarImage,
  disableScroll,
};
