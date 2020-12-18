// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://whats-your-story.demomode.vercel.app/";

//auth
export const login = `${BASE_URL}/api/auth/login`;
export const register = `${BASE_URL}/api/auth/register`;

//story data
export const stories = `${BASE_URL}/api/stories`;
export const mystories = `${BASE_URL}/api/stories/private/`;
export const story = `${BASE_URL}/api/stories/`;
