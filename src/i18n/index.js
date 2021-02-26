import Vue from 'vue'
import VueI18n from 'vue-i18n'
import iview_en from 'view-design/dist/locale/en-US'
import iview_zh from 'view-design/dist/locale/zh-CN'

Vue.use(VueI18n)
Vue.locale = () => {}

import zh from './config/zh'
import en from './config/en'

const navlang = navigator.language.substr(0, 2)
const localLang = navlang === 'zh' || navlang === 'en' ? navlang : false
const lang = localStorage.getItem('local') || localLang || 'zh'

const i18n = new VueI18n({
  locale: lang,
  messages: {
    en: Object.assign(en, iview_en),
    zh: Object.assign(zh, iview_zh)
  }
})

export default i18n
