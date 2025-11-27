import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import enTranslations from './locales/en/translation.json';
import zhTranslations from './locales/zh/translation.json';

// Content data directly embedded
const enContent = [
  {
    "id": 1,
    "title": "Demon Slayer: Kimetsu no Yaiba",
    "description": "Tanjiro Kamado, a young boy who becomes a demon slayer after his family is slaughtered and his younger sister Nezuko is turned into a demon.",
    "image": "https://image.pollinations.ai/prompt/anime%20demon%20slayer%20dark%20action%20scene%20katana?width=1280&height=720&nologo=true&seed=101",
    "poster": "https://image.pollinations.ai/prompt/anime%20demon%20slayer%20portrait?width=300&height=450&nologo=true&seed=101",
    "url": "#app1",
    "tags": ["Action", "Fantasy"]
  },
  {
    "id": 2,
    "title": "Attack on Titan",
    "description": "After his hometown is destroyed and his mother is killed, young Eren Yeager vows to cleanse the earth of the giant humanoid Titans.",
    "image": "https://image.pollinations.ai/prompt/anime%20attack%20on%20titan%20colossal%20wall%20dark?width=1280&height=720&nologo=true&seed=102",
    "poster": "https://image.pollinations.ai/prompt/anime%20attack%20on%20titan%20portrait?width=300&height=450&nologo=true&seed=102",
    "url": "#app2",
    "tags": ["Anime", "Dark Fantasy", "Drama"]
  },
  {
    "id": 3,
    "title": "One Piece",
    "description": "Monkey D. Luffy refuses to let anyone or anything stand in the way of his quest to become the king of all pirates.",
    "image": "https://image.pollinations.ai/prompt/anime%20one%20piece%20ocean%20ship%20adventure?width=1280&height=720&nologo=true&seed=103",
    "poster": "https://image.pollinations.ai/prompt/anime%20one%20piece%20luffy%20portrait?width=300&height=450&nologo=true&seed=103",
    "url": "#app3",
    "tags": ["Anime", "Adventure", "Comedy"]
  }
];

const zhContent = [
  {
    "id": 1,
    "title": "鬼灭之刃",
    "description": "炭治郎鎌仓，一个年轻的男孩，在他的家人被屠杀、妹妹祢豆子变成恶鬼后，成为了鬼杀队的一员。",
    "image": "https://image.pollinations.ai/prompt/anime%20demon%20slayer%20dark%20action%20scene%20katana?width=1280&height=720&nologo=true&seed=101",
    "poster": "https://image.pollinations.ai/prompt/anime%20demon%20slayer%20portrait?width=300&height=450&nologo=true&seed=101",
    "url": "#app1",
    "tags": ["动作", "奇幻"]
  },
  {
    "id": 2,
    "title": "进击的巨人",
    "description": "在家乡被摧毁、母亲被杀后，年轻的艾伦·耶格尔发誓要清除地球上所有巨大的人形巨人。",
    "image": "https://image.pollinations.ai/prompt/anime%20attack%20on%20titan%20colossal%20wall%20dark?width=1280&height=720&nologo=true&seed=102",
    "poster": "https://image.pollinations.ai/prompt/anime%20attack%20on%20titan%20portrait?width=300&height=450&nologo=true&seed=102",
    "url": "#app2",
    "tags": ["动漫", "黑暗奇幻", "剧情"]
  },
  {
    "id": 3,
    "title": "海贼王",
    "description": "蒙奇·D·路飞决心不让任何人或任何事物阻碍他成为所有海盗之王的目标。",
    "image": "https://image.pollinations.ai/prompt/anime%20one%20piece%20ocean%20ship%20adventure?width=1280&height=720&nologo=true&seed=103",
    "poster": "https://image.pollinations.ai/prompt/anime%20one%20piece%20luffy%20portrait?width=300&height=450&nologo=true&seed=103",
    "url": "#app3",
    "tags": ["动漫", "冒险", "喜剧"]
  }
];

const savedLanguage = localStorage.getItem('language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          ...enTranslations,
          content: enContent
        }
      },
      zh: {
        translation: {
          ...zhTranslations,
          content: zhContent
        }
      }
    },
    lng: savedLanguage,
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;