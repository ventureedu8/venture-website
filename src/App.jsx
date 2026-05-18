import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronDown, MapPin, BookOpen, GraduationCap, 
  Users, Plane, Globe, Phone, Mail, Compass, 
  Star, MessageCircle, Briefcase, Award
} from 'lucide-react';

// --- 自訂超穩定圖示元件（放在這裡不可漏掉） ---
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

  const [formData, setFormData] = useState({
    name: '', phone: '', requirements: '', services: [], lineJoined: false
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleServiceChange = (title) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(title) ? prev.services.filter(s => s !== title) : [...prev.services, title]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`【啟文國際教育】預約免費諮詢 - ${formData.name}`);
    const body = encodeURIComponent(`您好，我想要預約免費諮詢，以下是我的資料：\n\n【聯絡人姓名】${formData.name}\n【聯絡電話】${formData.phone}\n【已加入LINE】${formData.lineJoined ? '是，已傳送貼圖' : '否'}\n\n【想諮詢的服務項目】\n${formData.services.length > 0 ? formData.services.map(s => `✔️ ${s}`).join('\n') : '未指定'}\n\n【需求描述】\n${formData.requirements || '無填寫詳細需求'}\n\n-------------------------\n此信件由 啟文國際教育官方網站 表單自動產生。`);
    window.location.href = `mailto:venture.edu8@gmail.com?subject=${subject}&body=${body}`;
  };

  const schoolsData = {
    '美國': {
      '大學～研究所': [
        { name: 'Princeton University\n普林斯頓大學', desc: '【多年穩居全球第 1｜常春藤名校】位於紐澤西州普林斯頓市，採取小班制菁英式教學...', img: './princeton.jpg' },
        { name: 'Harvard University\n哈佛大學', desc: '【穩居全球前3大｜常春藤名校】位於麻薩諸塞州，為全球最具聲望的頂級學府之一...', img: './harvard.jpg' },
        { name: 'Stanford University\n史丹佛大學', desc: '【穩居全球前3大｜矽谷的搖籃】位於加利福尼亞州矽谷中心，電腦科學為全球頂尖...', img: './stanford.jpg' },
        { name: 'Yale University\n耶魯大學', desc: '【全球前4大｜常春藤名校】位於康乃狄克州紐黑文市，以社會科學、法學聞名...', img: './yale.jpg' },
        { name: 'Columbia University\n哥倫比亞大學', desc: '【法學院全球前5｜常春藤名校】位於紐約市曼哈頓區，緊鄰華爾街具豐富實習資源...', img: './cu.jpg' },
        { name: 'Cornell University\n康乃爾大學', desc: '【全球前15大｜常春藤名校】位於紐約州伊薩卡，研究型大學，以頂尖的工學院為名...', img: './cornell.jpg' },
        { name: 'University of Pennsylvania\n賓夕法尼亞大學', desc: '【全球前15大｜常春藤名校】位於費城，以跨學科教學著稱，擁有世界權威頂尖商學院...', img: './UPenn.jpg' },
        { name: 'Johns Hopkins University\n約翰霍普金斯大學', desc: '【全球前14｜生物醫學工程全美第 1】位於馬里蘭州，為美國第一所研究型大學醫學院...', img: './jh.jpg' },
        { name: 'Brown University\n布朗大學', desc: '【全美前9｜常春藤名校】獨特的開放式課程，讓學生可自由選課、無傳統通識教育要求...', img: './brown.jpg' },
        { name: 'University of California, Los Angeles\n加州大學洛杉磯分校', desc: '【全球前13大｜公立常春藤】位於洛杉磯精華市區，豐富多元100多種主修學位...', img: './ucla.jpg' },
        { name: 'University of California, San Diego\n加州大學聖地牙哥分校', desc: '【全球前30大｜沿海理工重鎮】位於加州聖地牙哥市，提供大學生豐富實驗室經驗...', img: './uc san diego.jpg' },
        { name: 'University of California, Davis\n加州大學戴維斯分校', desc: '【農學院全球第 1｜獸醫學院的巔峰】緊鄰加州首府，農林與獸醫相關科系皆為世界頂尖...', img: './ucdavis.jpg' },
        { name: 'University of California, Santa Barbara\n加州大學聖塔芭芭拉分校', desc: '【全美公立前 14｜材料工程全美前3】位於加州聖塔芭芭拉，理工與環境科學領域領先...', img: './ucsb.jpg', imgClass: 'object-top' }
      ]
    },
    '加拿大': {
      '大學～研究所': [
        { name: 'McGill University\n麥吉爾大學', desc: '【解剖學、生理學全球前5｜加拿大第 1 】位於魁北克省蒙特婁市，有「加拿大哈佛」之稱...', img: './mg.jpg' },
        { name: 'University of Toronto\n多倫多大學', desc: '【護理學全球前4｜加拿大前3大 】位於安大略省多倫多市，醫學、生命科學等享譽全球...', img: './ut.jpg' },
        { name: 'University of British Columbia\n英屬哥倫比亞大學', desc: '【教育學全球前10｜加拿大前3大 】緊鄰溫哥華市，尚德商學院為全球頂尖商學院...', img: './ubc.jpg' }
      ]
    },
    '澳洲': {
      '小學～高中': [
        { name: 'Beaconhills College', desc: '【 小學～高中 | 私立男女合校 | 可住宿 】距墨爾本市區約45分鐘車程，校園設施走在尖端...', img: './beaconhills.jpg' },
        { name: 'Mentone Girls\' Grammar School', desc: '【 小學～高中 | 私立女校  】位於墨爾本著名別墅區Brighton的百年頂尖女校...', img: './Mentone.jpg' },
        { name: 'Nossal High School', desc: '【 高中(9-12年級) | 公立男女合校 】距墨爾本市區約15分鐘車程，學術型菁英公立高中...', img: './nossal.jpg' }
      ],
      '大學～研究所': [
        { name: 'The University of Melbourne\n墨爾本大學', desc: '【全球前20大】位於墨爾本市中心，強調跨領域學習，為澳洲最頂尖研究型大學。', img: './melbourne.jpg' },
        { name: 'The University of Sydney\n雪梨大學', desc: '【全球前20大】位於雪梨市中心，是澳洲歷史最悠久大學，孕育多位諾貝爾獎得主。', img: './sydney.jpg' },
        { name: 'Monash University\n蒙納許大學', desc: '【全球前40大】藥學、藥理學於全球位居第二，護理、商學、工程等領域實力雄厚。', img: './monash.jpg' }
      ]
    }
  };

  const stories = [
    { title: '進入夢想中的普林斯頓', name: 'Wilson Lin', school: '普林斯頓大學', content: '謝謝啟文幫我安排的背景提升規劃，不管是數學領域科研還是哈佛SSP夏校，讓我有除了成績以外的申請亮點，順利進入我的dream school !', img: './pe.jpg' },
    { title: '與孩子一起遊學真的很特別', name: 'Mrs. Liu', school: '澳洲小學插班體驗', content: '去年暑假帶著女兒到墨爾本體驗插班，沒想到能在當地公立小學上學！按啟文的推薦在附近租了一間Airbnb住一個月，接送女兒上下學。女兒本身個性比較害羞，還好行前有先上一點線上銜接課，學一些會用到的日常用語～I人女兒第1天果不其然哭著去上學（媽媽馬上衝去購物），我是沒想到她放學時竟然蹦蹦跳跳，依依不捨跟朋友道別😂 也學了不少英文！讓我安心許多。\n\n媽媽我也第一次到澳洲，還好啟文在當地有隨時支援團隊，過來的前幾天先帶我們母女倆到市中心晃晃，採購一些日常用品；開學第一天也陪著我們一起報到😊 謝謝啟文老師很貼心的照顧，讓女兒有豐富的教育體驗，感覺思考上更靈活了！我也有一趟很讚的澳洲度假之旅😆 ', img: './school.jpg' },
    { title: '跨領域申請的最佳推手', name: 'Darren Huang', school: '史丹佛大學', content: '當時還是高中生的我對於未來還有些迷茫，因緣際會下透過啟文獲得了參加 Stanford G-SIL (全球創新領袖青年計劃) 和 GCAP (創業領導力訓練) 的機會，除了讓我有升學背景上的提升，更激發了我的深層思考能力，因此之後還參與了哈佛夏校生物醫學科研項目！並在今年順利拿到 Stanford 的Offer！', img: './se.jpg' },
    { title: '平凡的成績、非凡的大學', name: 'Kelly Wang', school: '墨爾本大學(Fast track)', content: '我從小就不是那種成績特別亮眼的學生，但謝謝啟文的Jennifer老師讓我了解到原來平凡的自己也可以如此亮眼。從線上課程、參加大學在台舉辦餐會、到申請資料的準備，老師除了專業之外也充滿溫度，過程中給了我很多自信！最後竟然真的申請到墨爾本大學😭！', img: './me.jpg' },
    { title: '頂級學府哈佛攻讀碩士', name: 'Ann Lee', school: '哈佛大學 (教育學院碩士)', content: '真的很慶幸當初申請時找了啟文幫忙🙏 讓我能直通哈佛攻讀碩士！啟文的升學經驗和人脈真的很厲害👍 ', img: './he.jpg' }
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
                <img src="./logo.svg" alt="Venture Education" className={`h-12 md:h-16 w-auto object-contain transition-all duration-300 ${isScrolled ? '' : 'brightness-0 invert'}`} onError={(e) => e.currentTarget.style.display = 'none'} />
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
                <button onClick={() => scrollToSection('about')} className="hover:text-blue-500 transition font-medium flex items-center cursor-pointer">關於我們 <ChevronDown size={14} className="ml-1" /></button>
                <div className="absolute top-full left-0 w-40 bg-white text-gray-800 shadow-xl rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <button onClick={() => scrollToSection('philosophy')} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">教育理念</button>
                  <button onClick={() => scrollToSection('brand')} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">品牌亮點</button>
                  <button onClick={() => scrollToSection('founder')} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">創辦人介紹</button>
                  <button onClick={() => scrollToSection('service-locations')} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">服務據點</button>
                </div>
              </div>
              <div className="relative group py-2">
                <button onClick={() => scrollToSection('programs')} className="hover:text-blue-500 transition font-medium flex items-center cursor-pointer">服務項目 <ChevronDown size={14} className="ml-1" /></button>
                <div className="absolute top-full left-0 w-40 bg-white text-gray-800 shadow-xl rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <button onClick={() => scrollToSection('programs')} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">親子遊學</button>
                  <button onClick={() => scrollToSection('programs')} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">青少年遊學</button>
                  <button onClick={() => scrollToSection('programs')} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">線上課程</button>
                  <button onClick={() => scrollToSection('programs')} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">留學申請</button>
                  <button onClick={() => scrollToSection('programs')} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">科系選擇</button>
                  <button onClick={() => scrollToSection('programs')} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm cursor-pointer">菁英科研</button>
                </div>
              </div>
              <div className="relative group py-2">
                <button onClick={() => scrollToSection('schools')} className="hover:text-blue-500 transition font-medium flex items-center cursor-pointer">精選名校 <ChevronDown size={14} className="ml-1" /></button>
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
            <div className="flex flex-col border-b">
              <span className="text-left px-8 py-4 text-gray-800 bg-gray-50/50">精選名校</span>
              <button onClick={() => { setActiveCountryTab('澳洲'); scrollToSection('schools'); }} className="text-left px-12 py-3 text-gray-600 text-sm border-t border-gray-100">澳洲</button>
              <button onClick={() => { setActiveCountryTab('美國'); scrollToSection('schools'); }} className="text-left px-12 py-3 text-gray-600 text-sm border-t border-gray-100">美國</button>
              <button onClick={() => { setActiveCountryTab('加拿大'); scrollToSection('schools'); }} className="text-left px-12 py-3 text-gray-600 text-sm border-t border-gray-100">加拿大</button>
            </div>
            <button onClick={() => scrollToSection('stories')} className="text-left px-8 py-4 hover:bg-blue-50 text-gray-800 border-b">案例分享</button>
            <button onClick={() => scrollToSection('contact')} className="text-left px-8 py-4 text-blue-600 font-bold">聯絡我們</button>
          </div>
        )}
      </nav>

      {/* 1. 首頁封面 */}
      <header id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="./usa.svg" alt="Background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-blue-900/80 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-12 md:mt-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 md:mb-8 leading-normal md:leading-tight drop-shadow-2xl flex flex-col md:inline-block items-center z-10">
            <span className="whitespace-nowrap"><span className="text-[1.6em] text-blue-100 font-black align-bottom leading-none mr-1 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">啟</span>蒙語言天賦，</span>
            <span className="whitespace-nowrap mt-2 md:mt-0">開創外<span className="text-[1.6em] text-blue-100 font-black align-bottom leading-none mx-1 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">文</span>新境界</span>
          </h1>
          <p className="text-lg md:text-2xl text-blue-100 mb-10 max-w-2xl leading-relaxed drop-shadow-md">
            我們強調專業、客觀且充滿溫度的引導，為您量身打造專屬學習路徑，伴您穩步走向夢想。
          </p>
          <button onClick={() => scrollToSection('contact')} className="bg-blue-600 hover:bg-blue-400 text-white font-black py-5 px-12 rounded-full text-xl shadow-xl transition transform hover:-translate-y-1">預約免費諮詢</button>
          <div className="mt-8 opacity-95">
            <img src="./slogan.svg" alt="Slogan" className="w-full max-w-[80%] md:max-w-[35rem] h-12 md:h-20 lg:h-24 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
          </div>
        </div>
      </header>

      {/* 2. 關於我們 */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div id="philosophy" className="text-center mb-12 pt-4">
            <h2 className="text-blue-600 font-black mb-2 uppercase tracking-widest text-sm">PHILOSOPHY</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">教育理念</h3>
          </div>
          
          <div className="mb-20 relative bg-gradient-to-br from-blue-50 to-white rounded-[3rem] p-8 md:p-12 border border-blue-100 shadow-sm hover:shadow-md transition">
            <div className="absolute top-0 left-8 md:left-12 -translate-y-1/2 bg-blue-600 text-white p-4 rounded-2xl shadow-xl transform -rotate-3">
              <IconQuote className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div className="pt-4 space-y-4 text-gray-700 text-lg leading-relaxed text-justify">
              <p>在教育這條路上，因為自己實際走過，所以也想給孩子們最優質的教育體驗。</p>
              <p>我始終相信<span className="font-bold text-blue-700">「每個孩子都有屬於自己的亮點」</span>，有時亮點不一定是在成績，但卻也因為不在成績上，所以難以被發掘。</p>
              <p>在教學及創班的路上，我也深刻體會到，一個專業、客觀且充滿溫度的引導，對孩子的未來有多麼重要！</p>
              <p>創辦「啟文國際教育」的初衷，不僅僅是為了幫助學生拿到名校的 offer，也希望能陪伴孩子進行多方面的探索，除了提升學術背景外，也能讓每位孩子發現自己獨特的亮點，自信的在未來人生這條路上閃閃發光！</p>
              <p className="font-bold text-blue-900 text-xl pt-2">啟文不只重視學術，我們為每位客人量身訂製專屬學習、升學方案，也提供海外生活建議、時刻支援；不管您在台灣還是海外，我們隨時追蹤進度、全年無休專人回覆！</p>
            </div>
            <div className="mt-8 pt-5 border-t border-blue-100 flex justify-end items-center">
              <div className="text-right mr-6 hidden md:block">
                <p className="font-bold text-gray-800">Venture Intl Edu</p>
                <p className="text-sm text-gray-500">Founder & Educational Consultant</p>
              </div>
              <div className="flex items-center">
                <img src="./logo.svg" className="h-10 w-auto opacity-20 mr-3 brightness-0 invert" alt="Logo" onError={(e) => e.currentTarget.style.display = 'none'} />
                <img src="./sign.svg" className="h-20 w-auto mix-blend-multiply" alt="Sign" onError={(e) => e.currentTarget.style.display = 'none'} />
              </div>
            </div>
          </div>

          <div id="brand" className="text-center mb-12 pt-16 border-t border-gray-100">
            <h2 className="text-blue-600 font-black mb-2 uppercase tracking-widest text-sm">BRAND SYMBOLISM</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">品牌亮點</h3>
          </div>

          <div className="mb-20">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
              <div className="relative flex items-center justify-center bg-white rounded-[2.5rem] shadow-xl border border-gray-100 w-72 h-72 md:w-96 md:h-96 flex-shrink-0 group">
                <img src="./ven.svg" alt="Brand Icon" className="w-full h-full object-contain filter drop-shadow-xl transition-transform duration-500 scale-[1.6] group-hover:scale-[1.7]" onError={(e) => e.currentTarget.style.display = 'none'} />
              </div>
              <div className="flex-grow max-w-2xl space-y-6">
                <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-start gap-4">
                  <div className="text-amber-500 bg-amber-50 p-3 rounded-xl mt-1"><Star size={24} fill="currentColor" /></div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">視星辰為目標 <span className="text-[10px] bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">星辰部分</span></h4>
                    <p className="text-gray-600 text-sm">引領卓越未來。我們視滿天星辰為孩子不設限的未來藍圖，引領他們在求學與人生旅程上，追尋專屬自己的最亮光芒。</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-start gap-4">
                  <div className="text-blue-500 bg-blue-50 p-3 rounded-xl mt-1"><Plane size={24} /></div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">化雙翼為動力 <span className="text-[10px] bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">羽翼與 V</span></h4>
                    <p className="text-gray-600 text-sm">啟迪國際視野；雙翼不僅象徵展翅飛翔的充沛動力，更同時交織代表著 Venture 的精神象徵「V」，鼓舞孩子勇敢探索未知。</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-start gap-4">
                  <div className="text-emerald-500 bg-emerald-50 p-3 rounded-xl mt-1"><BookOpen size={24} /></div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">以書本為基石 <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">書本基底</span></h4>
                    <p className="text-gray-600 text-sm">培育扎實學力。書本是開展視野最扎實、穩固的基底，代表著學術上的誠信與追求，為未來的向上飛升奠定磐石般的根基。</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 max-w-4xl mx-auto text-center flex justify-center items-center">
              <img src="./slo.svg" alt="Slogan" className="h-64 md:h-96 w-auto max-w-full object-contain opacity-90" onError={(e) => e.currentTarget.style.display = 'none'} />
            </div>
          </div>

          <div id="service-locations" className="text-center mb-20 pt-16 border-t border-gray-100">
            <h2 className="text-blue-600 font-black mb-2 uppercase tracking-widest text-sm">LOCATION</h2>
            <h3 className="text-3xl font-bold text-gray-900 mb-12">全球合作據點</h3>
            <div className="relative w-full bg-[#0b3a5a] py-12 md:py-24 rounded-[2.5rem] flex items-center justify-center shadow-2xl overflow-hidden px-4 md:px-0">
               <div className="relative w-[160%] -left-[30%] md:w-[120%] md:-left-[10%] lg:w-full lg:left-0 max-w-[85rem] mx-auto">
                  <img src="./worldmap.svg" alt="Map" className="w-full h-auto brightness-0 invert opacity-40" onError={(e) => e.currentTarget.style.display = 'none'} />
                  
                  <div className="absolute top-[27.5%] left-[10%] flex flex-col items-center z-10"><MapPin size={24} className="text-red-400" /><div className="bg-white/90 text-blue-900 px-2 py-1 rounded text-xs font-bold whitespace-nowrap mt-1">加拿大溫哥華</div></div>
                  <div className="absolute top-[32.6%] left-[24%] flex flex-col items-center z-10"><MapPin size={24} className="text-red-400" /><div className="bg-white/90 text-blue-900 px-2 py-1 rounded text-xs font-bold whitespace-nowrap mt-1">美國波士頓</div></div>
                  <div className="absolute top-[42.3%] left-[84%] flex flex-col items-center z-20"><MapPin size={40} className="text-red-500 animate-bounce" fill="currentColor" /><div className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-black whitespace-nowrap mt-1">台灣桃園 (總部)</div></div>
                  <div className="absolute top-[85%] left-[89.7%] flex flex-col items-center z-10"><MapPin size={24} className="text-red-400" /><div className="bg-white/90 text-blue-900 px-2 py-1 rounded text-xs font-bold whitespace-nowrap mt-1">澳洲墨爾本</div></div>
               </div>
            </div>
          </div>

          <div id="founder" className="grid md:grid-cols-2 gap-12 items-start pt-16 border-t border-gray-100">
            <div className="relative h-full">
              <img src="./grad.svg" className="rounded-3xl shadow-2xl h-[450px] md:h-full md:min-h-[750px] w-full object-cover object-top border-4 border-white" alt="Founder" onError={(e) => e.currentTarget.style.display = 'none'} />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-2xl shadow-xl hidden lg:block">
                <p className="text-4xl font-black mb-1">7+</p>
                <p className="text-sm font-bold uppercase tracking-widest">年專業輔導經驗</p>
              </div>
            </div>
            
            <div className="text-left">
              <h2 className="text-blue-600 font-black mb-2 uppercase tracking-widest text-sm">FOUNDER</h2>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">創辦人Jennifer Tsai</h3>
              
              <div className="bg-blue-50 p-6 rounded-2xl mb-8 border-l-4 border-blue-600">
                <p className="text-gray-700 italic mb-2">「因為自己走過經歷過，所以也想給孩子們最優質的教育體驗。」</p>
                <p className="text-sm font-bold text-blue-900">— Jennifer Tsai</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="flex items-center text-lg font-black text-blue-900 mb-3 border-b pb-2"><GraduationCap className="mr-2 text-blue-600" size={24} /> 學歷與學術成就</h4>
                  <ul className="space-y-2 text-gray-600 text-[0.95rem]">
                    <li className="flex items-start"><IconCheckCircle className="text-green-500 mr-2 mt-0.5" size={18} /><span>美國加州大學戴維斯分校 (UC Davis) 動物科學系</span></li>
                    <li className="flex items-start"><IconCheckCircle className="text-green-500 mr-2 mt-0.5" size={18} /><span>獲高額獎學金，以 3 年榮譽榜優異成績畢業</span></li>
                    <li className="flex items-start"><IconCheckCircle className="text-green-500 mr-2 mt-0.5" size={18} /><span>優異成績錄取國立台灣大學獸醫學系</span></li>
                    <li className="flex items-start"><IconCheckCircle className="text-green-500 mr-2 mt-0.5" size={18} /><span>在校期間受邀擔任大學論文寫作輔導員</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="flex items-center text-lg font-black text-blue-900 mb-3 border-b pb-2"><Award className="mr-2 text-blue-600" size={24} /> 專業證照與教學強項</h4>
                  <ul className="space-y-2 text-gray-600 text-[0.95rem]">
                    <li className="flex items-start"><IconCheckCircle className="text-yellow-500 mr-2 mt-0.5" size={18} /><span>考取國際特許金融分析師 (CFA) 一級證照</span></li>
                    <li className="flex items-start"><IconCheckCircle className="text-yellow-500 mr-2 mt-0.5" size={18} /><span>多年托福 (TOEFL)、美國大學入學考 (SAT) 專業教學經驗</span></li>
                    <li className="flex items-start"><IconCheckCircle className="text-yellow-500 mr-2 mt-0.5" size={18} /><span>專精於英文寫作、文法，以及數理科指導</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="flex items-center text-lg font-black text-blue-900 mb-3 border-b pb-2"><Briefcase className="mr-2 text-blue-600" size={24} /> 教育指導與實務經驗</h4>
                  <ul className="space-y-2 text-gray-600 text-[0.95rem]">
                    <li className="flex items-start"><IconCheckCircle className="text-blue-500 mr-2 mt-0.5" size={18} /><span>具備海外留學、大學申請、線上課程規劃等豐富經驗</span></li>
                    <li className="flex items-start"><IconCheckCircle className="text-blue-500 mr-2 mt-0.5" size={18} /><span>開創長頸鹿美語南崁光明分校國中全科專班</span></li>
                    <li className="flex items-start"><IconCheckCircle className="text-blue-500 mr-2 mt-0.5" size={18} /><span>實地考察美、加、澳等多國名校，掌握最新教育趨勢</span></li>
                    <li className="flex items-start"><IconCheckCircle className="text-blue-500 mr-2 mt-0.5" size={18} /><span>7+年專業教學、輔導經驗</span></li>
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
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
            <p className="flex items-center text-blue-600 text-sm font-medium"><IconCheckCircle className="mr-1.5" size={18} />以下項目皆提供免費諮詢</p>
            <p className="flex items-center text-emerald-600 text-sm font-medium"><IconBanknote size={18} className="mr-1.5" />預算(不含來回機票)為粗估金額僅供參考</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {programs.map((prog, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:bg-blue-600 hover:text-white transition group flex flex-col shadow-sm">
                <div className="flex justify-between items-start mb-6 min-w-0">
                  <div className="min-w-0">
                    <h4 className="text-2xl font-bold mb-2">{prog.title}</h4>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-blue-500 group-hover:text-blue-200 whitespace-nowrap">{prog.age}</p>
                      {prog.budget && <p className="text-sm font-bold text-emerald-600 group-hover:text-emerald-100 flex items-center whitespace-nowrap"><IconBanknote size={15} className="mr-1" /> {prog.budget}</p>}
                    </div>
                  </div>
                  <div className="text-blue-600 group-hover:text-white ml-4 transform group-hover:scale-110 transition">{prog.icon}</div>
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
          <p className="text-gray-500 mb-8 font-medium">歷屆錄取名校、不限於下</p>
          
          <div className="flex justify-center space-x-4 mb-8 border-b">
            {['澳洲', '美國', '加拿大'].map((country) => (
              <button key={country} onClick={() => { setActiveCountryTab(country); setActiveLevelTab('大學～研究所'); }} className={`py-4 px-6 text-lg font-medium relative ${activeCountryTab === country ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>
                {country}{activeCountryTab === country && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600"></div>}
              </button>
            ))}
          </div>

          <div className="flex justify-center flex-wrap gap-3 mb-12">
            {Object.keys(schoolsData[activeCountryTab] || {}).map((level) => (
              <button key={level} onClick={() => setActiveLevelTab(level)} className={`py-2 px-6 rounded-full font-medium ${activeLevelTab === level ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border'}`}>
                {level}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {(schoolsData[activeCountryTab]?.[activeLevelTab] || []).map((school, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col">
                <img src={school.img} alt={school.name} className="w-full h-48 object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-xl font-bold text-gray-900 whitespace-pre-line mb-2">{school.name}</h4>
                  <p className="text-gray-600 flex-grow text-sm leading-relaxed">{school.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 案例分享 */}
      <section id="stories" className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-sm text-blue-600 font-bold uppercase mb-2">成功見證</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">案例分享</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {stories.map((story, index) => (
              <div key={index} className="bg-white p-10 rounded-3xl shadow-md border flex flex-col">
                <h4 className="text-xl font-black text-gray-900 mb-3 text-center">「{story.title}」</h4>
                <p className="text-blue-800 font-bold mb-6 text-center">{story.name} | {story.school}</p>
                {story.img && (
                  <div className="mb-6 rounded-xl overflow-hidden border flex justify-center bg-gray-50">
                    <img src={story.img} alt="錄取通知" className="w-full h-auto object-contain hover:scale-105 transition" onError={(e) => e.currentTarget.style.display = 'none'} />
                  </div>
                )}
                <p className="text-gray-600 italic leading-relaxed text-justify flex-grow whitespace-pre-line">"{story.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. 聯絡我們 */}
      <section id="contact" className="py-24 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 bg-white rounded-3xl shadow-2xl p-8 md:p-16 text-center">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-8">預約免費諮詢</h2>
          <form className="space-y-8 text-left" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">姓名 *</label>
                <input type="text" required className="w-full px-6 py-4 rounded-2xl border bg-gray-50 focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">聯絡電話 *</label>
                <input type="tel" required className="w-full px-6 py-4 rounded-2xl border bg-gray-50 focus:ring-2 focus:ring-blue-500" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>

            <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border">
              <label className="block text-blue-900 font-bold mb-4">想諮詢的服務項目 (可複選)：</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {programs.map((prog) => (
                  <label key={prog.title} className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer ${formData.services.includes(prog.title) ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}>
                    <input type="checkbox" className="w-5 h-5" checked={formData.services.includes(prog.title)} onChange={() => handleServiceChange(prog.title)} />
                    <span className="font-medium text-gray-800">{prog.title}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-emerald-50 border-emerald-100 border p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-sm">
              <div className="bg-white p-3 rounded-xl shadow-md border"><img src="./qr.jpg" alt="LINE" className="w-28 h-28 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} /><p className="text-center text-sm font-bold text-emerald-600 mt-2">掃碼加入</p></div>
              <label className="flex items-start space-x-4 cursor-pointer">
                <input type="checkbox" required className="mt-1 w-6 h-6 text-emerald-600 rounded" checked={formData.lineJoined} onChange={(e) => setFormData({...formData, lineJoined: e.target.checked})} />
                <div>
                  <span className="text-lg font-bold block mb-1">已加入官方LINE並傳貼圖，方便專業老師聯絡。 *</span>
                  <span className="text-sm text-gray-500 block">（為了確保我們能即時且順暢地與您聯繫，送出表單前煩請先加入 LINE）</span>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">需求描述</label>
              <textarea rows="4" className="w-full px-6 py-4 rounded-2xl border bg-gray-50 focus:ring-2 focus:ring-blue-500" value={formData.requirements} onChange={(e) => setFormData({...formData, requirements: e.target.value})}></textarea>
            </div>
            
            <button type="submit" className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl text-xl shadow-xl hover:bg-blue-700 transition flex justify-center items-center gap-2"><Mail size={24} /> 送出諮詢表單</button>
          </form>
        </div>
      </section>

      {/* 頁尾 */}
      <footer className="bg-gray-900 text-white py-12 border-t-4 border-blue-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-center text-center lg:text-left gap-8">
          <div className="flex flex-col items-center lg:items-start">
            <span className="text-2xl font-black tracking-widest mb-1">VENTURE</span>
            <span className="text-xs opacity-70 tracking-widest mb-1">INTERNATIONAL EDUCATION</span>
            <span className="text-base font-bold tracking-widest">啟文國際教育</span>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <img src="./slo.svg" alt="Read to Dream, Venture to Fly" className="w-full max-w-sm object-contain opacity-80" onError={(e) => e.currentTarget.style.display = 'none'} />
          </div>
          <div className="text-gray-400 text-sm flex flex-col items-center lg:items-end">
            <p className="text-white font-bold text-lg mb-2">啟泰有限公司</p>
            <p>服務地址：桃園市蘆竹區南順七街24號</p>
            <p>聯絡電話：+886 958454073</p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-gray-500 text-xs">© {new Date().getFullYear()} Venture Intl Edu. All rights reserved.</div>
      </footer>

      {/* 浮動聯絡按鈕群組 */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
        <a href="https://lin.ee/nkRQViv" target="_blank" rel="noopener noreferrer" className="bg-[#06C755] hover:bg-[#05b34c] text-white py-3 px-5 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-105 transition"><MessageCircle className="mr-2" size={24} /><span className="font-bold">官方LINE客服</span></a>
        <a href="https://www.instagram.com/venture_edu" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white py-3 px-5 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-105 transition"><IconInstagram className="mr-2" size={24} /><span className="font-bold">追蹤官方 IG</span></a>
      </div>
    </div>
  );
}