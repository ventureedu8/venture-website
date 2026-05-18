import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronDown, MapPin, BookOpen, GraduationCap, 
  Users, Plane, Globe, Phone, Mail, Compass, 
  Star, MessageCircle, Briefcase, Award
} from 'lucide-react';

// --- 自訂超穩定圖示元件（防止 lucide-react 版本不相容導致全白畫面） ---
const IconCheckCircle = ({ className, size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

const IconBanknote = ({ className, size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg>
);

const IconQuote = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg>
);

const IconInstagram = ({ className, size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
// ----------------------------------------------------------------------

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCountryTab, setActiveCountryTab] = useState('澳洲');
  const [activeLevelTab, setActiveLevelTab] = useState('大學～研究所');

  // 處理表單狀態
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    requirements: '',
    services: [],
    lineJoined: false
  });

  // 處理滾動時導覽列的樣式變化
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 平滑捲動至指定區塊
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // 處理服務項目勾選
  const handleServiceChange = (title) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(title)
        ? prev.services.filter(s => s !== title)
        : [...prev.services, title]
    }));
  };

  // 處理表單提交 (透過 mailto 將資料帶入預設信件應用程式)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`【啟文國際教育】預約免費諮詢 - ${formData.name}`);
    const body = encodeURIComponent(`您好，我想要預約免費諮詢，以下是我的資料：

【聯絡人姓名】${formData.name}
【聯絡電話】${formData.phone}
【已加入LINE】${formData.lineJoined ? '是，已傳送貼圖' : '否'}

【想諮詢的服務項目】
${formData.services.length > 0 ? formData.services.map(s => `✔️ ${s}`).join('\n') : '未指定'}

【需求描述】
${formData.requirements || '無填寫詳細需求'}

-------------------------
此信件由 啟文國際教育官方網站 表單自動產生。`);

    // 開啟使用者的電子郵件軟體並自動填寫
    window.location.href = `mailto:venture.edu8@gmail.com?subject=${subject}&body=${body}`;
  };

  // 模擬資料：多國、多教育階段學校介紹
  const schoolsData = {
    '美國': {
      '大學～研究所': [
        { 
          name: 'Princeton University\n普林斯頓大學', 
          desc: '【多年穩居全球第 1｜常春藤名校】位於紐澤西州(New Jersey)普林斯頓市，採取小班制菁英式教學，極其重視教育品質，以科學及人文研究聞名於世，培育出無數政商與學術巨頭，如美國總統、Amazon創辦人等。', 
          img: '/princeton.jpg' 
        },
        { 
          name: 'Harvard University\n哈佛大學', 
          desc: '【穩居全球前3大｜常春藤名校】位於麻薩諸塞州（Massachusetts），為全球最具聲望的頂級學府之一，培育無數各國政要、企業領袖及諾貝爾獎得主，擁有世界頂尖商學院、法學院、醫學院等。', 
          img: '/harvard.jpg' 
        },
        { 
          name: 'Stanford University\n史丹佛大學', 
          desc: '【穩居全球前3大｜矽谷的搖籃】位於美國加利福尼亞州(California) 矽谷中心，與矽谷的發展密不可分，電腦科學（CS）、商科、醫學、法律及工程領域為全球頂尖，其校友、教授創立世界級企業，如 Google、Nike、Instagram 與 Netflix 等。', 
          img: '/stanford.jpg' 
        },
        { 
          name: 'Yale University\n耶魯大學', 
          desc: '【全球前4大｜常春藤名校】位於美國康乃狄克州紐黑文市(New Haven)，以社會科學、人文學科、生命科學及法學聞名，擁有全美最具權威的法學院，極度重視學生跨領域探索及批判性思維，著名校友包含美國多位總統，被譽為「總統的搖籃」。', 
          img: '/yale.jpg' 
        },
        { 
          name: 'Columbia University\n哥倫比亞大學', 
          desc: '【法學院全球前5｜常春藤名校 】位於美國紐約市曼哈頓區（Manhattan），具豐富實習資源與人脈，政治學、經濟學與歷史學皆享譽全球，緊鄰華爾街的哥倫比亞商學院（CBS）更是金融界的權威，哥大教育學院（Teachers College）更是全美規模最大的教育學研究院，著名校友包含美國前總統歐巴馬及上百位諾貝爾獎得主。', 
          img: '/cu.jpg' 
        },
        { 
          name: 'Cornell University\n康乃爾大學', 
          desc: '【全球前15大｜常春藤名校】位於美國紐約州伊薩卡(Ithaca)，依山傍水、風景優美，研究型大學，以頂尖的工學院、商學院、建築藝術與規畫學院為名，校友為眾多諾貝爾獎得主、科學家及政商名流。', 
          img: '/cornell.jpg' 
        },
        { 
          name: 'University of Pennsylvania\n賓夕法尼亞大學', 
          desc: '【全球前15大｜常春藤名校】位於美國賓夕法尼亞州費城(Philadelphia)，以跨學科教學著稱，擁有世界權威頂尖商學院及醫學院，拥有豐富教學資源，著名校友包含伊隆·馬斯克(Elon Musk)、華倫·巴菲特(Warren Buffett)等。', 
          img: '/UPenn.jpg' 
        },
        { 
          name: 'Johns Hopkins University\n約翰霍普金斯大學', 
          desc: '【全球前14｜生物醫學工程全美第 1】位於馬里蘭州城市巴爾的摩（Baltimore)，為美國第一所研究型大學醫學院，其護理學院與公共衛生學院為世界權威，附設霍普金斯醫院被譽為全美最佳醫院；其國際關係與公共政策學院也是全球頂尖。', 
          img: '/jh.jpg' 
        },
        { 
          name: 'Brown University\n布朗大學', 
          desc: '【全美前9｜常春藤名校】獨特的開放式課程 (Open Curriculum)，讓學生可自由選課、無傳統通識教育要求，師生比1:7小班制；計算機科學 、應用數學、人文與社會科學聲譽極高，並擁有知名「自由醫學教育課程 (PLME)」。', 
          img: '/brown.jpg' 
        },
        { 
          name: 'University of California, Los Angeles\n加州大學洛杉磯分校', 
          desc: '【全球前13大｜公立常春藤】位於洛杉磯精華市區，美國頂尖的公立研究型大學，豐富多元100多種主修學位，強勢領域包含影視與戲劇、醫療與護理、商科與經濟、工程與計算機科學等；擁有頂級教學醫院（UCLA Health）。', 
          img: '/ucla.jpg' 
        },
        { 
          name: 'University of California, San Diego\n加州大學聖地牙哥分校', 
          desc: '【全球前30大｜沿海理工重鎮】位於加州聖地牙哥市，鄰近太平洋沿岸、氣候舒適宜人，提供大學生豐富的實習、實驗室經驗，為理工與生醫的重鎮，強勢科系包含生物工程、電腦科學（CS）、結構工程、神經科學等。', 
          img: '/uc san diego.jpg' 
        },
        { 
          name: 'University of California, Davis\n加州大學戴維斯分校', 
          desc: '【農學院全球第 1｜獸醫學院的巔峰】緊鄰加州首府沙加緬度(Sacramento)，為加州大學系統中面積最大的校區；由UC Berkeley的農學院發展而來，校風單純、環境幽美，農林與獸醫、生物與環境相關科系皆為世界頂尖，課程涵蓋各項實驗、實地調查等，提供學生多元實作經驗。', 
          img: '/ucdavis.jpg' 
        },
        { 
          name: 'University of California, Santa Barbara\n加州大學聖塔芭芭拉分校', 
          desc: '【全美公立前 14｜材料工程全美前3】位於美國加州聖塔芭芭拉，鄰近海岸、氣侯怡人，理工（STEM）與環境科學領域領先全球，設有極具特色的創意學院CCS (College of Creative Studies)，為學生提供更精緻化教育，涵蓋藝術、生物、計算、物理及海洋科學等。', 
          img: '/ucsb.jpg',
          imgClass: 'object-top'
        }
      ]
    },
    '加拿大': {
      '大學～研究所': [
        { 
          name: 'McGill University\n麥吉爾大學', 
          desc: '【解剖學、生理學全球前5｜加拿大第 1 】位於加拿大魁北克省蒙特婁市(Montreal)，歷史悠久並有「加拿大哈佛」之稱，地處英法雙語交會處，加拿大的醫學與生命科學權威，工程與自然科學也是其王牌科系，培育出眾多頂尖醫療專業人才及14位諾貝爾獎得主。', 
          img: '/mg.jpg' 
        },
        { 
          name: 'University of Toronto\n多倫多大學', 
          desc: '【護理學全球前4｜加拿大前3大 】位於加拿大安大略省多倫多市，生活機能佳，且提供超過 700 個學士學位及 200 個碩博士學位，其醫學、生命科學、電腦科學、商科、工程學以及國際關係學享譽全球，著名校友包含加拿大總理及多位奧斯卡金像獎得主。', 
          img: '/ut.jpg' 
        },
        { 
          name: 'University of British Columbia\n英屬哥倫比亞大學', 
          desc: '【教育學全球前10｜加拿大前3大 】緊鄰溫哥華市(Vancouver)，環境清幽、生活便利，其底下尚德商學院（Sauder School of Business）為全球頂尖商學院，科學及醫學也極具國際影響力，校園環境高度國際化，擁有上百個學生社團與校隊，提供豐富生活體驗。', 
          img: '/ubc.jpg' 
        }
      ]
    },
    '澳洲': {
      '小學～高中': [
        { 
          name: 'Beaconhills College', 
          desc: '【 小學～高中 | 私立男女合校 | 可住宿 】距墨爾本市區約45分鐘車程，校園設施走在現代科技尖端，課程涵蓋戶外活動、志工、實作等，培養學生的獨立自主能力。', 
          img: '/beaconhills.jpg',
          link: 'https://www.beaconhills.vic.edu.au/'
        },
        { 
          name: 'Mentone Girls\' Grammar School', 
          desc: '【 小學～高中 | 私立女校  】位於墨爾本著名別墅區Brighton的百年頂尖女校，課程多元、環境幽美，致力培育未來女性領袖。', 
          img: '/Mentone.jpg',
          link: 'https://www.mentonegirls.vic.edu.au/'
        },
        { 
          name: 'Nossal High School', 
          desc: '【 高中(9-12年級) | 公立男女合校 】距墨爾本市區約15分鐘車程，學術型菁英公立高中，以高升學率與充滿活力的學習環境聞名，提供多元的社團、體育、音樂及科學探究等。', 
          img: '/nossal.jpg',
          link: 'https://www.nossalhs.vic.edu.au/'
        }
      ],
      '大學～研究所': [
        { 
          name: 'The University of Melbourne\n墨爾本大學', 
          desc: '【全球前20大】位於墨爾本市中心、生活機能完善，強調跨領域學習，擁有世界頂尖商學院、法學院、醫學院等，為澳洲最頂尖研究型大學。', 
          img: '/melbourne.jpg' 
        },
        { 
          name: 'The University of Sydney\n雪梨大學', 
          desc: '【全球前20大】位於雪梨市中心，氣派古典哥德式建築，是澳洲歷史最悠久大學，孕育多位諾貝爾獎得主，擁有頂尖法學院、醫學院、商學院等。', 
          img: '/sydney.jpg' 
        },
        { 
          name: 'Monash University\n蒙納許大學', 
          desc: '【全球前40大】位於墨爾本市區及周邊多個校區，並設有海外校區，藥學、藥理學於全球位居第二，護理學、商學、工程、科技等領域實力雄厚、名列前茅。', 
          img: '/monash.jpg' 
        }
      ]
    }
  };

  const stories = [
    { 
      title: '進入夢想中的普林斯頓', 
      name: 'Wilson Lin', 
      school: '普林斯頓大學',
      content: '謝謝啟文幫我安排的背景提升規劃，不管是數學領域科研還是哈佛SSP夏校，讓我有除了成績以外的申請亮點，順利進入我的dream school !',
      img: '/pe.jpg'
    },
    { 
      title: '與孩子一起遊學真的很特別', 
      name: 'Mrs. Liu', 
      school: '澳洲小學插班體驗',
      content: '去年暑假帶著女兒到墨爾本體驗插班，沒想到能在當地公立小學上學！按啟文的推薦在附近租了一間Airbnb住一個月，接送女兒上下學。女兒本身個性比較害羞，還好行前有先上一點線上銜接課，學一些會用到的日常用語～I人女兒第1天果不其然哭著去上學（媽媽馬上衝去購物），我是沒想到她放學時竟然蹦蹦跳跳，依依不捨跟朋友道別😂 也學了不少英文！讓我安心許多。\n\n媽媽我也第一次到澳洲，還好啟文在當地有隨時支援團隊，過來的前幾天先帶我們母女倆到市中心晃晃，採購一些日常用品；開學第一天也陪著我們一起報到😊 謝謝啟文老師很貼心的照顧，讓女兒有豐富的教育體驗，感覺思考上更靈活了！我也有一趟很讚的澳洲度假之旅😆 ',
      img: '/school.jpg'
    },
    { 
      title: '跨領域申請的最佳推手', 
      name: 'Darren Huang', 
      school: '史丹佛大學',
      content: '當時還是高中生的我對於未來還有些迷茫，因緣際會下透過啟文獲得了參加 Stanford G-SIL (全球創新領袖青年計劃) 和 GCAP (創業領導力訓練) 的機會，除了讓我有升學背景上的提升，更激發了我的深層思考能力，因此之後還參與了哈佛夏校生物醫學科研項目！並在今年順利拿到 Stanford 的Offer！',
      img: '/se.jpg'
    },
    { 
      title: '平凡的成績、非凡的大學', 
      name: 'Kelly Wang', 
      school: '墨爾本大學(Fast track)',
      content: '我從小就不是那種成績特別亮眼的學生，但謝謝啟文的Jennifer老師讓我了解到原來平凡的自己也可以如此亮眼。從線上課程、參加大學在台舉辦餐會、到申請資料的準備，老師除了專業之外也充滿溫度，過程中給了我很多自信！最後竟然真的申請到墨爾本大學😭！',
      img: '/me.jpg'
    },
    { 
      title: '頂級學府哈佛攻讀碩士', 
      name: 'Ann Lee', 
      school: '哈佛大學 (教育學院碩士)',
      content: '真的很慶幸當初申請時找了啟文幫忙🙏 讓我能直通哈佛攻讀碩士！啟文的升學經驗和人脈真的很厲害👍 ',
      img: '/he.jpg'
    }
  ];

  const programs = [
    { title: '親子遊學', age: '國小～高中', budget: '新台幣約$17~30萬/月', icon: <Users size={40} />, desc: '客製化方案讓您陪伴孩子一同探索世界、共同成長，孩子提升語言能力的同時，也能與您創造美好親子專屬回憶。' },
    { title: '青少年遊學', age: '國中～高中', budget: '新台幣約$12~20萬', icon: <Plane size={40} />, desc: '與各名校合作，用最好的教育品質，讓孩子學習獨立、開發思考、增廣視野，找到學習英文的靈感與自信，同時提升學術背景，為未來升學做準備。' },
    { title: '線上課程', age: '國小～成人', budget: '新台幣約$1300~4500/小時', icon: <BookOpen size={40} />, desc: '具教育執照專業外師、中師線上課程，方便銜接國外教育或提升外語能力；課程高度客製化，並包含托福TOEFL、雅思ILETS、SAT等高端升學課程。' },
    { title: '留學/轉學申請', age: '國小～大學', budget: '依客製化需求報價', icon: <GraduationCap size={40} />, desc: '專屬學術背景提升規劃，專業落點分析、文章潤飾，協助多種方式申請各大名校 (學術/直通/捐贈)。' },
    { title: '科系選擇', age: '高中～大學', budget: '新台幣$400/30分鐘', icon: <MessageCircle size={40} />, desc: '除了專業顧問分析，可與多國名校各科系學長姐預約線上面談，實際了解該科系學習內容及未來發展。' },
    { title: '菁英科研', age: '高中～大學', budget: '依客製化需求報價', icon: <Compass size={40} />, desc: '進入哈佛、史丹佛大學等名校夏校，或與教授實際進行科學研究、論文指導等，大幅提升學術背景及申請競爭力。' }
  ];

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen w-full overflow-x-hidden selection:bg-blue-100">
      
      {/* 導覽列 */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo 區塊 */}
            <div className="flex items-center cursor-pointer group" onClick={() => scrollToSection('home')}>
              <div className="relative flex items-center">
                <img 
                  src="/logo.svg" 
                  alt="Venture Education Logo" 
                  className={`h-12 md:h-16 w-auto object-contain transition-all duration-300 ${isScrolled ? '' : 'brightness-0 invert'}`}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="hidden h-10 w-10 items-center justify-center border border-dashed rounded text-current opacity-50">
                  <Star size={20} />
                </div>
              </div>
              <div className={`flex flex-col items-center justify-center ml-3 md:ml-4 transition-colors duration-300 ${isScrolled ? 'text-[#0b3a5a]' : 'text-white'}`}>
                <span className="text-2xl md:text-[1.8rem] font-black leading-none tracking-[0.08em] uppercase w-full text-center">VENTURE</span>
                <span className="text-[0.55rem] md:text-[0.62rem] font-bold leading-none tracking-normal mt-1.5 mb-2 uppercase opacity-90 w-full text-center">INTERNATIONAL EDUCATION</span>
                <span className="text-base md:text-[1.1rem] font-bold leading-none tracking-[0.2em] w-full text-center">啟文國際教育</span>
              </div>
            </div>

            {/* 電腦版選單 */}
            <div className={`hidden md:flex space-x-8 items-center ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
              
              <div className="relative group py-2">
                <button onClick={() => scrollToSection('about')} className="hover:text-blue-500 transition font-medium flex items-center cursor-pointer">
                  關於我們 <ChevronDown size={14} className="ml-1" />
                </button>
                <div className="absolute top-full left-0 w-40 bg-white text-gray-800 shadow-xl rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <button onClick={() => scrollToSection('philosophy')} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">教育理念</button>
                  <button onClick={() => scrollToSection('brand')} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">品牌亮點</button>
                  <button onClick={() => scrollToSection('founder')} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">創辦人介紹</button>
                  <button onClick={() => scrollToSection('service-locations')} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">服務據點</button>
                </div>
              </div>

              {/* 服務項目下拉選單 */}
              <div className="relative group py-2">
                <button onClick={() => scrollToSection('programs')} className="hover:text-blue-500 transition font-medium flex items-center cursor-pointer">
                  服務項目 <ChevronDown size={14} className="ml-1" />
                </button>
                <div className="absolute top-full left-0 w-40 bg-white text-gray-800 shadow-xl rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <button onClick={() => scrollToSection('programs')} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">親子遊學</button>
                  <button onClick={() => scrollToSection('programs')} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">青少年遊學</button>
                  <button onClick={() => scrollToSection('programs')} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">線上課程</button>
                  <button onClick={() => scrollToSection('programs')} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">留學/轉學申請</button>
                  <button onClick={() => scrollToSection('programs')} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">科系選擇</button>
                  <button onClick={() => scrollToSection('programs')} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">菁英科研</button>
                </div>
              </div>

              {/* 精選名校下拉選單 */}
              <div className="relative group py-2">
                <button onClick={() => scrollToSection('schools')} className="hover:text-blue-500 transition font-medium flex items-center cursor-pointer">
                  精選名校 <ChevronDown size={14} className="ml-1" />
                </button>
                <div className="absolute top-full left-0 w-40 bg-white text-gray-800 shadow-xl rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <button onClick={() => { setActiveCountryTab('澳洲'); scrollToSection('schools'); }} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">澳洲</button>
                  <button onClick={() => { setActiveCountryTab('美國'); scrollToSection('schools'); }} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">美國</button>
                  <button onClick={() => { setActiveCountryTab('加拿大'); scrollToSection('schools'); }} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">加拿大</button>
                </div>
              </div>

              <button onClick={() => scrollToSection('stories')} className="hover:text-blue-500 transition font-medium cursor-pointer">案例分享</button>
              <button onClick={() => scrollToSection('contact')} className={`px-6 py-2 rounded-full font-bold transition ${isScrolled ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-blue-900'}`}>免費諮詢</button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={isScrolled ? 'text-gray-800' : 'text-white'}>
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* 行動版選單面板 */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-xl absolute w-full left-0 top-full flex flex-col py-4 h-[80vh] overflow-y-auto">
            <button onClick={() => scrollToSection('philosophy')} className="text-left px-8 py-4 hover:bg-blue-50 text-gray-800 border-b">教育理念</button>
            <button onClick={() => scrollToSection('brand')} className="text-left px-8 py-4 hover:bg-blue-50 text-gray-800 border-b">品牌亮點</button>
            <button onClick={() => scrollToSection('founder')} className="text-left px-8 py-4 hover:bg-blue-50 text-gray-800 border-b">創辦人介紹</button>
            <button onClick={() => scrollToSection('service-locations')} className="text-left px-8 py-4 hover:bg-blue-50 text-gray-800 border-b">服務據點</button>
            
            <button onClick={() => scrollToSection('programs')} className="text-left px-8 py-4 hover:bg-blue-50 text-gray-800 border-b">服務項目</button>

            {/* 手機版精選名校展開 */}
            <div className="flex flex-col border-b">
              <span className="text-left px-8 py-4 text-gray-800 bg-gray-50/50">精選名校</span>
              <button onClick={() => { setActiveCountryTab('澳洲'); scrollToSection('schools'); }} className="text-left px-12 py-3 hover:bg-blue-50 text-gray-600 text-sm border-t border-gray-100">澳洲</button>
              <button onClick={() => { setActiveCountryTab('美國'); scrollToSection('schools'); }} className="text-left px-12 py-3 hover:bg-blue-50 text-gray-600 text-sm border-t border-gray-100">美國</button>
              <button onClick={() => { setActiveCountryTab('加拿大'); scrollToSection('schools'); }} className="text-left px-12 py-3 hover:bg-blue-50 text-gray-600 text-sm border-t border-gray-100">加拿大</button>
            </div>

            <button onClick={() => scrollToSection('stories')} className="text-left px-8 py-4 hover:bg-blue-50 text-gray-800 border-b">案例分享</button>
            <button onClick={() => scrollToSection('contact')} className="text-left px-8 py-4 hover:bg-blue-50 text-blue-600 font-bold">聯絡我們</button>
          </div>
        )}
      </nav>

      {/* 1. 首頁封面 */}
      <header id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0">
          <img 
            src="/usa.svg" 
            alt="Hero Background" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* 藍色質感遮罩層 */}
          <div className="absolute inset-0 bg-blue-900/80 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full flex flex-col items-center justify-center mt-12 md:mt-16">
          
          {/* 藏頭詩標語：「啟和文」特別放大，並調整間距與對齊 */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 md:mb-8 leading-normal md:leading-tight drop-shadow-2xl flex flex-col md:inline-block items-center justify-center z-10">
            <span className="whitespace-nowrap">
              <span className="text-[1.6em] text-blue-100 font-black align-bottom leading-none mr-1 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">啟</span>
              蒙語言天賦，
            </span>
            <span className="whitespace-nowrap mt-2 md:mt-0">
              開創外
              <span className="text-[1.6em] text-blue-100 font-black align-bottom leading-none mx-1 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">文</span>
              新境界
            </span>
          </h1>
          
          {/* 副標題說明文字 */}
          <p className="text-lg md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            我們強調專業、客觀且充滿溫度的引導，為您量身打造專屬學習路徑，伴您穩步走向夢想。
          </p>
          
          <button onClick={() => scrollToSection('contact')} className="bg-blue-600 hover:bg-blue-400 text-white font-black py-5 px-12 rounded-full text-xl shadow-xl transition transform hover:-translate-y-1 cursor-pointer">預約免費諮詢</button>

          {/* 首頁的 SVG 標語 (slogan.svg) 放在按鈕下方 */}
          <div className="mt-6 md:mt-8 flex flex-col items-center justify-center opacity-95 hover:opacity-100 transition-opacity cursor-default w-full">
            <img 
              src="/slogan.svg" 
              alt="Read to Dream, Venture to Fly 書本孕育夢想，探索成就飛翔" 
              className="w-full max-w-[80%] md:max-w-[35rem] h-12 md:h-20 lg:h-24 object-contain object-top pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

        </div>
      </header>

      {/* 2. 關於我們 */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* 教育理念 大標題 */}
          <div id="philosophy" className="text-center mb-12 pt-4">
            <h2 className="text-blue-600 font-black mb-2 uppercase tracking-widest text-sm">PHILOSOPHY</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">教育理念</h3>
          </div>
          
          {/* A. 啟文的教育理念框框 */}
          <div className="mb-20 relative bg-gradient-to-br from-blue-50 to-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 lg:p-12 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            {/* 左上角引號裝飾 */}
            <div className="absolute top-0 left-8 md:left-12 -translate-y-1/2 bg-blue-600 text-white p-3 md:p-4 rounded-2xl shadow-xl transform -rotate-3">
              <IconQuote className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            
            <div className="pt-2 space-y-4 text-gray-700 text-base md:text-lg leading-relaxed text-justify">
              <p>
                在教育這條路上，因為自己實際走過，所以也想給孩子們最優質的教育體驗。
              </p>
              <p>
                我始終相信<span className="font-bold text-blue-700">「每個孩子都有屬於自己的亮點」</span>，有時亮點不一定是在成績，但卻也因為不在成績上，所以難以被發掘。
              </p>
              <p>
                在教學及創班的路上，我也深刻體會到，一個專業、客觀且充滿溫度的引導，對孩子的未來有多麼重要！
              </p>
              <p>
                創辦「啟文國際教育」的初衷，不僅僅是為了幫助學生拿到名校的 offer，也希望能陪伴孩子進行多方面的探索，除了提升學術背景外，也能讓每位孩子發現自己獨特的亮點，自信的在未來人生這條路上閃閃發光！
              </p>
              <p className="font-bold text-blue-900 text-lg md:text-xl pt-2">
                啟文不只重視學術，我們為每位客人量身訂製專屬學習、升學方案，也提供海外生活建議、時刻支援；不管您在台灣還是海外，我們隨時追蹤進度、全年無休專人回覆！
              </p>
            </div>

            {/* 簽名檔裝飾 */}
            <div className="mt-8 pt-5 border-t border-blue-100 flex justify-end items-center">
              <div className="text-right mr-6 hidden md:block">
                <p className="font-bold text-gray-800">Venture International Education</p>
                <p className="text-sm text-gray-500">Founder & Educational Consultant</p>
              </div>
              <div className="flex items-center">
                <img 
                  src="/logo.svg" 
                  className="h-10 w-auto object-contain opacity-20 mr-3 brightness-0 invert filter-none" 
                  alt="Venture Education" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <img 
                  src="/sign.svg" 
                  alt="Jennifer Tsai Signature" 
                  className="h-20 md:h-28 w-auto object-contain mix-blend-multiply" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>

          {/* 品牌亮點 大標題 */}
          <div id="brand" className="text-center mb-12 pt-16 border-t border-gray-100">
            <h2 className="text-blue-600 font-black mb-2 uppercase tracking-widest text-sm">BRAND SYMBOLISM</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">品牌亮點</h3>
          </div>

          {/* B. 品牌圖騰解構說明 (Logo介紹) */}
          <div className="mb-20">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
              
              {/* 左側：品牌 Logo (ven.svg) 放大2倍並改為白色背景 */}
              <div className="relative flex items-center justify-center p-0 bg-white rounded-[2.5rem] shadow-xl border border-gray-100 w-72 h-72 md:w-96 md:h-96 flex-shrink-0 group">
                <img 
                  src="/ven.svg" 
                  alt="Venture Brand Icon" 
                  className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_12px_24px_rgba(11,58,90,0.12)] transition-transform duration-500 scale-[1.6] md:scale-[2] group-hover:scale-[1.7] md:group-hover:scale-[2.1]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'; 
                  }}
                />
              </div>

              {/* 右側：圖騰三大元素解構卡片 */}
              <div className="flex-grow max-w-2xl text-left space-y-6">
                
                {/* 星星 */}
                <div className="relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300 flex items-start gap-4">
                  <div className="text-amber-500 bg-amber-50 p-3 rounded-xl mt-1 flex-shrink-0">
                    <Star size={24} fill="currentColor" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                      視星辰為目標
                      <span className="text-[10px] tracking-wider bg-amber-100 text-amber-800 font-extrabold px-2.5 py-0.5 rounded-full uppercase">星辰部分</span>
                    </h4>
                    <p className="text-gray-600 text-[0.95rem] leading-relaxed">
                      引領卓越未來。我們視滿天星辰為孩子不設限的未來藍圖，引領他們在求學與人生旅程上，追尋專屬自己的最亮光芒。
                    </p>
                  </div>
                </div>

                {/* 雙翼 */}
                <div className="relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300 flex items-start gap-4">
                  <div className="text-blue-500 bg-blue-50 p-3 rounded-xl mt-1 flex-shrink-0">
                    <Plane size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                      化雙翼為動力
                      <span className="text-[10px] tracking-wider bg-blue-100 text-blue-800 font-extrabold px-2.5 py-0.5 rounded-full uppercase">羽翼與 V</span>
                    </h4>
                    <p className="text-gray-600 text-[0.95rem] leading-relaxed">
                      啟迪國際視野；雙翼不僅象徵展翅飛翔的充沛動力，更同時交織代表著 Venture 的精神象徵「V」，鼓舞孩子勇敢探索未知。
                    </p>
                  </div>
                </div>

                {/* 書本 */}
                <div className="relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300 flex items-start gap-4">
                  <div className="text-emerald-500 bg-emerald-50 p-3 rounded-xl mt-1 flex-shrink-0">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                      以書本為基石
                      <span className="text-[10px] tracking-wider bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full uppercase">書本基底</span>
                    </h4>
                    <p className="text-gray-600 text-[0.95rem] leading-relaxed">
                      培育扎實學力。書本是開展視野最扎實、穩固的基底，代表著學術上的誠信與追求，為未來的向上飛升奠定磐石般的根基。
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* 品牌圖騰承諾與宣告 */}
            <div className="mt-12 max-w-4xl mx-auto text-center flex justify-center items-center">
              <img 
                src="/slo.svg" 
                alt="Read to Dream, Venture to Fly" 
                className="h-64 md:h-96 w-auto max-w-full object-contain opacity-90 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* C. 服務據點 */}
          <div id="service-locations" className="text-center mb-20 pt-16 border-t border-gray-100">
            <h2 className="text-blue-600 font-black mb-2 uppercase tracking-widest text-sm">LOCATION</h2>
            <h3 className="text-3xl font-bold text-gray-900 mb-12">全球合作據點</h3>
            
            {/* 世界地圖容器 */}
            <div className="relative w-full bg-[#0b3a5a] py-12 md:py-24 rounded-[2.5rem] flex items-center justify-center border border-blue-800 shadow-2xl overflow-hidden px-4 md:px-0">
               
               {/* 世界地圖 */}
               <div className="relative w-[160%] -left-[30%] md:w-[120%] md:-left-[10%] lg:w-full lg:left-0 max-w-[85rem] mx-auto">
                  
                  <img 
                    src="/worldmap.svg"
                    alt="World Map Background"
                    className="w-full h-auto brightness-0 invert opacity-40 pointer-events-none"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="hidden absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Globe size={400} className="text-white opacity-10" />
                  </div>
                  
                  {/* 標註點 1: 加拿大溫哥華 */}
                  <div className="absolute top-[27.5%] left-[10%] flex flex-col items-center justify-center group transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer">
                     <MapPin size={24} className="text-red-400 group-hover:scale-125 transition-transform" />
                     <div className="absolute bottom-full mb-1.5 bg-white/90 backdrop-blur text-blue-900 px-2 py-1 rounded text-xs font-bold shadow whitespace-nowrap">加拿大溫哥華</div>
                  </div>

                  {/* 標註點 3: 美國波士頓 */}
                  <div className="absolute top-[32.6%] left-[24%] flex flex-col items-center justify-center group transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer">
                     <MapPin size={24} className="text-red-400 group-hover:scale-125 transition-transform" />
                     <div className="absolute top-full mt-1.5 bg-white/90 backdrop-blur text-blue-900 px-2 py-1 rounded text-xs font-bold shadow whitespace-nowrap">美國波士頓</div>
                  </div>

                  {/* 標註點 4: 台灣桃園 (總部) */}
                  <div className="absolute top-[42.3%] left-[84%] flex flex-col items-center justify-center group transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer">
                     <div className="relative">
                       <MapPin size={40} className="text-red-500 animate-bounce relative z-10" fill="currentColor" />
                       <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-40 z-0"></div>
                     </div>
                     <div className="absolute top-full mt-2 bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-black shadow-lg whitespace-nowrap border border-white/20">台灣桃園 (總部)</div>
                  </div>

                  {/* 標註點 5: 澳洲墨爾本 */}
                  <div className="absolute top-[85%] left-[89.7%] flex flex-col items-center justify-center group transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer">
                     <MapPin size={24} className="text-red-400 group-hover:scale-125 transition-transform" />
                     <div className="absolute bottom-full mb-1.5 bg-white/90 backdrop-blur text-blue-900 px-2 py-1 rounded text-xs font-bold shadow whitespace-nowrap">澳洲墨爾本</div>
                  </div>

               </div>
            </div>
          </div>

          {/* D. 創辦人介紹 */}
          <div id="founder" className="grid md:grid-cols-2 gap-12 items-start pt-16 border-t border-gray-100">
            {/* 創辦人照片區塊 */}
            <div className="relative h-full">
              <img 
                src="/grad.svg" 
                className="rounded-3xl shadow-2xl h-[450px] md:h-full md:min-h-[750px] w-full object-cover object-top border-4 border-white" 
                alt="Founder" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-2xl shadow-xl hidden lg:block border-2 border-white/20">
                <p className="text-4xl font-black mb-1">7+</p>
                <p className="text-sm font-bold uppercase tracking-widest">年專業輔導經驗</p>
              </div>
            </div>
            
            <div className="text-left">
              <h2 className="text-blue-600 font-black mb-2 uppercase tracking-widest text-sm">FOUNDER</h2>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">創辦人Jennifer Tsai</h3>
              
              {/* 創辦人引言 */}
              <div className="bg-blue-50 p-6 rounded-2xl mb-8 border-l-4 border-blue-600">
                <p className="text-gray-700 italic mb-2">
                  「因為自己走過經歷過，所以也想給孩子們最優質的教育體驗。」
                </p>
                <p className="text-sm font-bold text-blue-900">— Jennifer Tsai</p>
              </div>

              {/* 學歷與經驗區塊 */}
              <div className="space-y-6">
                
                {/* 1. 學歷與學術成就 */}
                <div>
                  <h4 className="flex items-center text-lg font-black text-blue-900 mb-3 border-b border-gray-100 pb-2">
                    <GraduationCap className="mr-2 text-blue-600" size={24} /> 學歷與學術成就
                  </h4>
                  <ul className="space-y-2 text-gray-600 font-medium text-[0.95rem]">
                    <li className="flex items-start">
                      <IconCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={18} /> 
                      <div className="flex flex-col">
                        <span>美國加州大學戴維斯分校 (UC Davis) 動物科學系</span>
                        <span className="text-xs text-gray-500 mt-0.5">UC Davis 動物科學系為世界排名第一</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <IconCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={18} /> 
                      <span>獲高額獎學金，以 3 年榮譽榜優異成績畢業</span>
                    </li>
                    <li className="flex items-start">
                      <IconCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={18} /> 
                      <span>優異成績錄取國立台灣大學獸醫學系</span>
                    </li>
                    <li className="flex items-start">
                      <IconCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={18} /> 
                      <span>在校期間受邀擔任大學論文寫作輔導員</span>
                    </li>
                  </ul>
                </div>

                {/* 2. 專業證照與強項 */}
                <div>
                  <h4 className="flex items-center text-lg font-black text-blue-900 mb-3 border-b border-gray-100 pb-2">
                    <Award className="mr-2 text-blue-600" size={24} /> 專業證照與教學強項
                  </h4>
                  <ul className="space-y-2 text-gray-600 font-medium text-[0.95rem]">
                    <li className="flex items-start">
                      <IconCheckCircle className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" size={18} /> 
                      <span>考取國際特許金融分析師 (CFA) 一級證照</span>
                    </li>
                    <li className="flex items-start">
                      <IconCheckCircle className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" size={18} /> 
                      <span>多年托福 (TOEFL)、美國大學入學考 (SAT) 專業教學經驗</span>
                    </li>
                    <li className="flex items-start">
                      <IconCheckCircle className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" size={18} /> 
                      <span>專精於英文寫作、文法，以及數理科指導</span>
                    </li>
                  </ul>
                </div>

                {/* 3. 教育指導與業界經驗 */}
                <div>
                  <h4 className="flex items-center text-lg font-black text-blue-900 mb-3 border-b border-gray-100 pb-2">
                    <Briefcase className="mr-2 text-blue-600" size={24} /> 教育指導與實務經驗
                  </h4>
                  <ul className="space-y-2 text-gray-600 font-medium text-[0.95rem]">
                    <li className="flex items-start">
                      <IconCheckCircle className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" size={18} /> 
                      <span>具備海外留學、大學申請、線上課程規劃等豐富經驗</span>
                    </li>
                    <li className="flex items-start">
                      <IconCheckCircle className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" size={18} /> 
                      <span>開創長頸鹿美語南崁光明分校國中全科專班</span>
                    </li>
                    <li className="flex items-start">
                      <IconCheckCircle className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" size={18} /> 
                      <span>實地考察美、加、澳等多國名校，掌握最新教育趨勢</span>
                    </li>
                    <li className="flex items-start">
                      <IconCheckCircle className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" size={18} /> 
                      <span>7+年專業教學、輔導經驗</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. 服務項目 */}
      <section id="programs" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">我們提供的服務</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 mb-12">
            <p className="flex items-center text-blue-600/80 text-sm md:text-base tracking-wider font-medium">
              <IconCheckCircle className="mr-1.5" size={18} />
              以下項目皆提供免費諮詢
            </p>
            <p className="flex items-center text-emerald-600/60 text-sm md:text-base tracking-wider font-medium">
              <IconBanknote size={18} className="mr-1.5" />
              預算(不含來回機票)為粗估金額僅供參考
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {programs.map((prog, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl group flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  {/* 使用 min-w-0 確保文字過長時能夠適當縮放而不會破版 */}
                  <div className="min-w-0">
                    <h4 className="text-2xl font-bold mb-2">{prog.title}</h4>
                    {/* 移除 flex-wrap，強制同橫排，並微調間距 */}
                    <div className="flex items-center gap-2 md:gap-3">
                      <p className="text-sm font-bold text-blue-500 group-hover:text-blue-200 whitespace-nowrap">{prog.age}</p>
                      {prog.budget && (
                        <p className="text-[13px] sm:text-sm font-bold text-emerald-600/60 group-hover:text-emerald-100/80 flex items-center transition-colors whitespace-nowrap tracking-tight sm:tracking-normal">
                          <IconBanknote size={15} className="mr-1 flex-shrink-0" /> {prog.budget}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-blue-600 group-hover:text-white ml-4 flex-shrink-0 transition-transform duration-300 transform group-hover:scale-110">
                    {prog.icon}
                  </div>
                </div>
                <p className="text-sm leading-relaxed opacity-80">{prog.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 精選名校 */}
      <section id="schools" className="py-24 bg-gray-50 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">精選名校</h3>
          <p className="text-gray-500 text-base md:text-lg mb-8 tracking-wider font-medium">歷屆錄取名校、不限於下</p>
          
          {/* 第一層標籤：國家切換 */}
          <div className="flex justify-center space-x-4 mb-8 border-b border-gray-200">
            {['澳洲', '美國', '加拿大'].map((country) => (
              <button 
                key={country} 
                onClick={() => { setActiveCountryTab(country); setActiveLevelTab('大學～研究所'); }} 
                className={`py-4 px-6 text-lg font-medium transition relative cursor-pointer ${activeCountryTab === country ? 'text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-800'}`}
              >
                {country}{activeCountryTab === country && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-md"></div>}
              </button>
            ))}
          </div>

          {/* 第二層標籤：教育階段切換 (動態偵測該國家有的分類) */}
          <div className="flex justify-center flex-wrap gap-3 mb-12">
            {Object.keys(schoolsData[activeCountryTab] || {}).map((level) => (
              <button 
                key={level} 
                onClick={() => setActiveLevelTab(level)} 
                className={`py-2 px-6 text-sm md:text-base rounded-full transition cursor-pointer font-medium shadow-sm 
                  ${activeLevelTab === level 
                    ? 'bg-blue-600 text-white shadow-blue-600/30 transform scale-105' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-blue-600'}`}
              >
                {level}
              </button>
            ))}
          </div>

          {/* 學校列表卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(schoolsData[activeCountryTab]?.[activeLevelTab] || []).map((school, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition flex flex-col h-full text-left transform hover:-translate-y-1 duration-300">
                <img 
                  src={school.img} 
                  alt={school.name} 
                  className={`w-full h-48 object-cover ${school.imgClass || ''}`} 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-gray-900 whitespace-pre-line leading-snug pr-2">
                      {school.name}
                    </h4>
                    {school.logo && (
                      <img 
                        src={school.logo} 
                        alt={`${school.name} Logo`} 
                        className="h-10 md:h-12 w-auto object-contain ml-3 flex-shrink-0" 
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                  <p className="text-gray-600 mb-6 flex-grow text-sm leading-relaxed">{school.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 案例分享 */}
      <section id="stories" className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-2">成功見證</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">案例分享</h3>
          </div>
          {/* 因為有四個案例，排版改為 2x2 網格以維持視覺平衡 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {stories.map((story, index) => (
              <div key={index} className="bg-white p-10 rounded-[2rem] shadow-md border border-gray-100 hover:shadow-xl transition group flex flex-col">
                <h4 className="text-xl md:text-2xl font-black text-gray-900 mb-3 text-center whitespace-nowrap tracking-tight">「{story.title}」</h4>
                <p className="text-blue-800 font-bold mb-6 text-center">{story.name} | {story.school}</p>
                
                {/* 如果有設定圖片，則顯示在文字上方 */}
                {story.img && (
                  <div className="mb-6 rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50 flex items-center justify-center">
                    <img 
                      src={story.img} 
                      alt={`${story.school} 錄取通知`} 
                      className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500" 
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                <p className="text-gray-600 text-lg italic leading-relaxed text-justify flex-grow whitespace-pre-line">"{story.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. 聯絡我們 */}
      <section id="contact" className="py-24 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 bg-white rounded-[2rem] shadow-2xl p-8 md:p-14 lg:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-8 tracking-tight">預約免費諮詢</h2>
          
          <form className="space-y-8 text-left" onSubmit={handleSubmit}>
            
            {/* 聯絡人基本資訊 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-700 font-bold ml-2">姓名 <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required
                  className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 transition" 
                  placeholder="請輸入您的姓名" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 font-bold ml-2">聯絡電話 <span className="text-red-500">*</span></label>
                <input 
                  type="tel" 
                  required
                  className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 transition" 
                  placeholder="請輸入您的聯絡電話" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            {/* 服務項目 (可複選) */}
            <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100">
              <label className="block text-blue-900 font-bold mb-4 text-lg">您想諮詢的服務項目 (可複選)：</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {programs.map((prog) => (
                  <label 
                    key={prog.title} 
                    className={`flex items-center space-x-3 cursor-pointer p-3 rounded-xl border transition-all duration-200 ${
                      formData.services.includes(prog.title) 
                        ? 'bg-blue-100/50 border-blue-500 shadow-sm' 
                        : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500 cursor-pointer"
                      checked={formData.services.includes(prog.title)}
                      onChange={() => handleServiceChange(prog.title)}
                    />
                    <span className={`font-medium ${formData.services.includes(prog.title) ? 'text-blue-900' : 'text-gray-700'}`}>
                      {prog.title}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 加入 LINE 區塊 */}
            <div className="bg-emerald-50 border-2 border-emerald-100 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-sm">
              <div className="flex-shrink-0 bg-white p-3 rounded-2xl shadow-md border border-emerald-200 transform hover:scale-105 transition duration-300">
                <img 
                  src="/qr.jpg" 
                  alt="LINE QR Code" 
                  className="w-28 h-28 md:w-32 md:h-32 object-contain" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <p className="text-center text-sm font-black text-emerald-600 mt-2 tracking-widest">掃碼加入</p>
              </div>
              <div className="flex-grow flex flex-col justify-center">
                <label className="flex items-start space-x-4 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    required
                    className="mt-1 w-6 h-6 text-emerald-600 rounded-md border-gray-300 focus:ring-emerald-500 cursor-pointer flex-shrink-0"
                    checked={formData.lineJoined}
                    onChange={(e) => setFormData({...formData, lineJoined: e.target.checked})}
                  />
                  <div className="text-gray-800">
                    <span className="text-lg md:text-xl font-bold group-hover:text-emerald-700 transition block mb-1">
                      已加入官方LINE並傳貼圖，方便專業老師聯絡。 <span className="text-red-500">*</span>
                    </span>
                    <span className="text-sm text-gray-500 font-medium leading-relaxed block">
                      （為了確保我們能即時且順暢地與您聯繫，送出表單前煩請先加入 LINE）
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* 需求描述 */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-bold ml-2">需求描述</label>
              <textarea 
                rows="5" 
                className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none transition" 
                placeholder="請簡單描述您的背景或任何想詢問的問題..."
                value={formData.requirements}
                onChange={(e) => setFormData({...formData, requirements: e.target.value})}
              ></textarea>
            </div>
            
            {/* 送出按鈕 */}
            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl text-xl shadow-xl hover:bg-blue-700 hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer flex justify-center items-center gap-2"
              >
                <Mail size={24} />
                送出諮詢表單
              </button>
              <p className="text-center text-sm text-gray-400 mt-4 font-medium">
                點擊送出後，系統將自動開啟您的電子郵件軟體。
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* 頁尾 */}
      <footer className="bg-gray-900 text-white py-12 md:py-16 border-t-4 border-blue-900">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left gap-8 lg:gap-4">
            
            {/* 左側：Logo 與品牌名稱 */}
            <div className="flex items-center lg:w-1/4 justify-center lg:justify-start">
              <div className="relative flex items-center mr-3 md:mr-4">
                <img 
                  src="/logo.svg" 
                  alt="Venture Education Logo" 
                  className="h-12 md:h-16 w-auto object-contain brightness-0 invert"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="hidden h-10 w-10 items-center justify-center border border-dashed rounded text-white opacity-50">
                  <Star size={20} />
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <span className="text-2xl md:text-[1.8rem] font-black leading-none tracking-[0.08em] uppercase text-white w-full text-center">VENTURE</span>
                <span className="text-[0.55rem] md:text-[0.62rem] font-bold leading-none tracking-normal mt-1.5 mb-2 uppercase opacity-70 text-white w-full text-center">INTERNATIONAL EDUCATION</span>
                <span className="text-base md:text-[1.1rem] font-bold leading-none tracking-[0.2em] text-white w-full text-center">啟文國際教育</span>
              </div>
            </div>

            {/* 中間：頁尾專屬金色 Slogan */}
            <div className="flex justify-center items-center lg:w-1/2">
              <img 
                src="/slo.svg" 
                alt="Read to Dream, Venture to Fly 書本孕育夢想，探索成就飛翔" 
                className="w-full max-w-[24rem] md:max-w-[36rem] lg:max-w-[48rem] h-24 md:h-32 lg:h-36 object-contain object-center opacity-90 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            
            {/* 右側：公司聯絡資訊 */}
            <div className="flex flex-col items-center lg:items-end lg:w-1/4 text-gray-400 text-sm">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full md:w-auto">
                <p className="text-white font-bold text-lg mb-2 tracking-widest">啟泰有限公司</p>
                <p className="mb-1">服務地址：桃園市蘆竹區南順七街24號</p>
                <p>聯絡電話：+886 958454073</p>
              </div>
            </div>

          </div>

          {/* 底部版權宣告 (獨立區塊確保上方元件完美置中對齊) */}
          <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} 啟文國際教育. All rights reserved.
          </div>

        </div>
      </footer>

      {/* 浮動聯絡按鈕群組 */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex flex-col gap-3 items-end">
        {/* LINE 聯絡按鈕 */}
        <a 
          href="https://lin.ee/nkRQViv" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#06C755] hover:bg-[#05b34c] text-white py-3 px-5 rounded-full shadow-2xl flex items-center justify-center transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 border-2 border-white/20 w-full"
        >
          <MessageCircle className="mr-2 animate-pulse" size={24} />
          <span className="font-bold tracking-wide">官方LINE客服</span>
        </a>

        {/* IG 聯絡按鈕 */}
        <a 
          href="https://www.instagram.com/venture_edu?igsh=OXlpOXI3anNpZXNo&utm_source=qr" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] hover:opacity-90 text-white py-3 px-5 rounded-full shadow-2xl flex items-center justify-center transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 border-2 border-white/20 w-full"
        >
          <IconInstagram className="mr-2 animate-pulse" size={24} />
          <span className="font-bold tracking-wide">追蹤官方 IG</span>
        </a>
      </div>
    </div>
  );
}