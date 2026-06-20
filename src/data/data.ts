import avatar from '../assets/avatar.png'
import calvinForgeCoverDesktop from '../assets/Projects/calvin-forge-11.png'
import calvinForgeCoverMobile from '../assets/Projects/calvin-forge-21.png'
import ezspecCsharpCoverDesktop from '../assets/Projects/ezspec-csharp-cover-11.png'
import ezspecCsharpCoverMobile from '../assets/Projects/ezspec-csharp-cover-21.png'
import seal from '../assets/seal.png'
import soulKnightCoverDesktop from '../assets/Projects/soul-knight-11.png'
import soulKnightCoverMobile from '../assets/Projects/soul-knight-21.png'
import { FaDiscord } from 'react-icons/fa6'
import {
  FiDatabase, FiGithub, FiGlobe, FiGrid, FiLinkedin, FiMail, FiServer,
} from 'react-icons/fi'
import type { ContactMethod, Education, Experience, Project, PurchaseRecord, Skill } from './types'

const createPurchaseDate = (year: number, month: number, day: number) => new Date(year, month - 1, day)

export { seal }

export const profile = {
  avatar,
  name: '萬祥瑞',
  badge: '軟體工程師 @ 叡揚資訊',
  location: '臺北，臺灣',
  birthYear: '生於 2003 年',
}

export const skills: Skill[] = [
  {
    corner: '壹',
    title: '後端開發',
    icon: FiServer,
    items: ['ABP Framework', 'Java / Spring Boot', 'RESTful API'],
  },
  {
    corner: '貳',
    title: '前端開發',
    icon: FiGlobe,
    items: ['TypeScript', 'HTML / CSS / JavaScript'],
  },
  {
    corner: '參',
    title: '資料與雲端',
    icon: FiDatabase,
    items: ['MySQL', 'Microsoft SQL Server', 'Microsoft Azure'],
  },
  {
    corner: '肆',
    title: '系統架構',
    icon: FiGrid,
    items: ['Test-Driven Design', 'Agile Development'],
  },
]

export const experiences: Experience[] = [
  {
    company: '叡揚資訊 (Galaxy Software Services)',
    title: '程式設計師（全職）',
    period: '2025/06 - 至今',
    items: [
      '使用 C#、ASP.NET Core 與 ABP Framework 開發與維護後端 API。',
      '使用 React 與 TypeScript 開發前端介面與資料串接。',
      '參與 DDD 系統建模與模組設計。',
      '獨立負責 Azure 應用程式部署、環境管理與正式環境監控維運。',
    ],
    active: true,
  },
  {
    company: '叡揚資訊 (Galaxy Software Services)',
    title: '助理程式設計師（實習）',
    period: '2024/07 - 2025/06',
    items: [
      '參與企業級系統開發，熟悉既有程式碼與系統架構。',
      '協助後端 API 與前端介面開發、問題修復。',
      '使用 C#、ASP.NET Core、ABP Framework、React 與 TypeScript 進行功能實作。',
    ],
  },
  {
    company: '國立臺北科技大學',
    title: '物件導向程式設計課程助教',
    period: '2024/02 - 2024/06',
    items: [
      '協助教授批改作業與考試，支援課程教學運作。',
      '管理 GitLab 與 Jenkins CI 環境，為學生建立帳號、連結 Repository，確保自動測資流程順利運作。',
      '解答學生在課程內容與作業實作上的疑問，協助排除學習障礙。',
    ],
  },
  {
    company: '國立臺北科技大學 軟體工程實驗室',
    title: 'ezKanban Team',
    period: '2023/07 - 2024/06',
    items: [
      '於 ezKanban 團隊中以 mob programming 方式參與專案開發與協作。',
      '在專案實作中學習並實踐 TDD、BDD 與 Clean Architecture 等軟體工程方法論。',
    ],
  },
]

export const education: Education[] = [
  {
    company: '國立臺北科技大學',
    title: '電資學士班（資訊工程組）',
    period: '2021/09 - 2025/07',
    active: true,
  },
  {
    title: '嘉義縣協同中學高中部',
    period: '2017/09 - 2020/07',
    compact: true,
  },
  {
    title: '嘉義縣協同中學國中部',
    period: '2015/02 - 2017/07',
    compact: true,
  },
  {
    title: '廣州中山大學附屬外國語實驗中學',
    period: '2014/09 - 2015/01',
    compact: true,
  },
  {
    title: '廣州中山大學附屬黃埔實驗小學',
    period: '2008/09 - 2014/07',
    compact: true,
  },
]

export const projects: Project[] = [
  {
    name: 'Calvin Forge',
    host: 'GitHub',
    hostIcon: FiGithub,
    href: 'https://github.com/CalvinWan0101/calvin-forge',
    description:
      '以 React、TypeScript 與 Vite 打造的個人作品網站，整合自我介紹、精選專案、投資紀錄與聯絡方式。',
    tags: ['React', 'TypeScript', 'Vite', 'styled-components'],
    desktopImageUrl: calvinForgeCoverDesktop,
    mobileImageUrl: calvinForgeCoverMobile,
    imageAlt: 'Calvin Forge 封面',
  },
  {
    name: 'ezSpec-CSharp',
    host: 'GitHub',
    hostIcon: FiGithub,
    href: 'https://github.com/CalvinWan0101/ezspec-csharp',
    description:
      '以 C# 實作的 BDD（行為驅動開發）測試框架，靈感來源於 Gherkin 語法。支援以接近自然語言的方式撰寫測試規格，讓業務邏輯與測試行為的描述更貼近真實需求。',
    tags: ['C#', '.NET', 'BDD', 'Testing'],
    desktopImageUrl: ezspecCsharpCoverDesktop,
    mobileImageUrl: ezspecCsharpCoverMobile,
    imageAlt: 'ezSpec-CSharp 封面',
  },
  {
    name: 'Soul Knight',
    host: 'GitHub',
    hostIcon: FiGithub,
    href: 'https://github.com/calvinwan0101/soul-knight',
    description:
      '以 C++ 復刻的 Soul Knight 地下城射擊遊戲。實作角色移動、敵人 AI、武器系統與地圖生成等核心機制，探索物件導向設計在遊戲開發中的應用。',
    tags: ['C++', 'Game Dev', 'OOP'],
    desktopImageUrl: soulKnightCoverDesktop,
    mobileImageUrl: soulKnightCoverMobile,
    imageAlt: 'Soul Knight 封面',
  },
]

export const contactMethods: ContactMethod[] = [
  {
    label: 'Discord',
    value: '傳送訊息',
    subtext: '即時訊息',
    href: 'https://discord.com/users/593315109095473153',
    icon: FaDiscord,
  },
  {
    label: 'GitHub',
    value: '查看個人頁',
    subtext: '開源專案與程式碼',
    href: 'https://github.com/CalvinWan0101',
    icon: FiGithub,
  },
  {
    label: 'LinkedIn',
    value: '查看個人頁',
    subtext: '職涯經歷與專業網絡',
    href: 'https://www.linkedin.com/in/calvinwan0101',
    icon: FiLinkedin,
  },
  {
    label: 'Email',
    value: '發送郵件',
    subtext: '最直接的聯繫方式',
    href: 'mailto:calvinwan0101@gmail.com',
    icon: FiMail,
  },
]

export const purchaseHistory: PurchaseRecord[] = [
  { date: createPurchaseDate(2026, 6, 15), shares: 1.24651, price: 158.843797 },
  { date: createPurchaseDate(2026, 6, 5), shares: 1.26686, price: 157.08188 },
  { date: createPurchaseDate(2026, 5, 26), shares: 1.26458, price: 157.364439 },
  { date: createPurchaseDate(2026, 5, 15), shares: 1.29062, price: 154.189952 },
  { date: createPurchaseDate(2026, 5, 5), shares: 1.30426, price: 151.81001 },
  { date: createPurchaseDate(2026, 4, 27), shares: 1.32279, price: 150.439605 },
  { date: createPurchaseDate(2026, 4, 15), shares: 1.3373, price: 148.059644 },
  { date: createPurchaseDate(2026, 4, 6), shares: 1.4009, price: 139.910013 },
  { date: createPurchaseDate(2026, 3, 27), shares: 1, price: 135.36 },
  { date: createPurchaseDate(2026, 3, 25), shares: 1.40247, price: 139.753241 },
  { date: createPurchaseDate(2026, 3, 20), shares: 1, price: 137.41 },
  { date: createPurchaseDate(2026, 3, 16), shares: 1.38741, price: 141.270487 },
  { date: createPurchaseDate(2026, 3, 9), shares: 1, price: 139.75 },
  { date: createPurchaseDate(2026, 3, 6), shares: 1, price: 142.43 },
  { date: createPurchaseDate(2026, 3, 5), shares: 1.37359, price: 144.147559 },
  { date: createPurchaseDate(2026, 3, 3), shares: 1, price: 142.91 },
  { date: createPurchaseDate(2026, 2, 25), shares: 1.21921, price: 148.457253 },
  { date: createPurchaseDate(2026, 2, 17), shares: 1.24151, price: 145.79 },
  { date: createPurchaseDate(2026, 2, 9), shares: 1.22803, price: 146.575899 },
  { date: createPurchaseDate(2026, 1, 30), shares: 1, price: 146.13 },
  { date: createPurchaseDate(2026, 1, 14), shares: 1, price: 144.57 },
  { date: createPurchaseDate(2026, 1, 8), shares: 1, price: 143.42 },
  { date: createPurchaseDate(2026, 1, 5), shares: 1, price: 142.835 },
]
