/**
 * 사주 계산 엔진 (Saju Calculation Engine)
 * 생년월일시를 실제 사주팔자로 변환하는 만세력 계산
 */

// 천간(天干) 10개
const HEAVENLY_STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const HEAVENLY_STEMS_CHI = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const HEAVENLY_ELEMENTS = ['목', '목', '화', '화', '토', '토', '금', '금', '수', '수'];
const HEAVENLY_YIN_YANG = ['양', '음', '양', '음', '양', '음', '양', '음', '양', '음'];

// 지지(地支) 12개
const EARTHLY_BRANCHES = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
const EARTHLY_BRANCHES_CHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const EARTHLY_ELEMENTS = ['수', '토', '목', '목', '토', '화', '화', '토', '금', '금', '토', '수'];
const EARTHLY_YIN_YANG = ['양', '음', '양', '음', '양', '음', '양', '음', '양', '음', '양', '음'];
const EARTHLY_ANIMALS = ['쥐', '소', '범', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'];

// 월령 계산용 절기 데이터 (간단화)
const SOLAR_TERMS = [
  { month: 1, day: 5, term: '소한' },
  { month: 2, day: 4, term: '입춘' },
  { month: 3, day: 5, term: '경칩' },
  { month: 4, day: 5, term: '청명' },
  { month: 5, day: 5, term: '입하' },
  { month: 6, day: 6, term: '망종' },
  { month: 7, day: 7, term: '소서' },
  { month: 8, day: 7, term: '입추' },
  { month: 9, day: 8, term: '백로' },
  { month: 10, day: 8, term: '한로' },
  { month: 11, day: 7, term: '입동' },
  { month: 12, day: 7, term: '대설' }
];

/**
 * 생년월일시를 사주팔자로 변환
 */
function calculateSaju(year, month, day, hour, gender = 'M') {
  try {
    // 1. 연주(年柱) 계산
    const yearPillar = calculateYearPillar(year);
    
    // 2. 월주(月柱) 계산
    const monthPillar = calculateMonthPillar(year, month, day);
    
    // 3. 일주(日柱) 계산
    const dayPillar = calculateDayPillar(year, month, day);
    
    // 4. 시주(時柱) 계산
    const timePillar = calculateTimePillar(dayPillar.stem, hour);
    
    // 5. 십신 계산
    const tenGods = calculateTenGods(dayPillar.stem, [yearPillar.stem, monthPillar.stem, dayPillar.stem, timePillar.stem]);
    
    // 6. 오행 균형 계산
    const fiveElements = calculateFiveElements([yearPillar, monthPillar, dayPillar, timePillar]);
    
    // 7. 용신/기신 분석
    const yongsinGisin = analyzeYongsinGisin(dayPillar.stem, fiveElements, month);
    
    // 8. 대운 계산
    const luck = calculateLuck(monthPillar, year, gender);
    
    return {
      pillars: {
        year: yearPillar,
        month: monthPillar,
        day: dayPillar,
        time: timePillar
      },
      tenGods,
      fiveElements,
      yongsinGisin,
      luck,
      dayMaster: dayPillar.stem
    };
  } catch (error) {
    console.error('사주 계산 오류:', error);
    return null;
  }
}

/**
 * 연주(年柱) 계산
 */
function calculateYearPillar(year) {
  // 1984년(갑자년)을 기준으로 계산
  const baseYear = 1984;
  const yearDiff = year - baseYear;
  
  const stemIndex = (yearDiff % 10 + 10) % 10;
  const branchIndex = (yearDiff % 12 + 12) % 12;
  
  return {
    stem: stemIndex,
    branch: branchIndex,
    stemName: HEAVENLY_STEMS[stemIndex],
    branchName: EARTHLY_BRANCHES[branchIndex],
    chinese: HEAVENLY_STEMS_CHI[stemIndex] + EARTHLY_BRANCHES_CHI[branchIndex],
    animal: EARTHLY_ANIMALS[branchIndex],
    element: HEAVENLY_ELEMENTS[stemIndex]
  };
}

/**
 * 월주(月柱) 계산
 */
function calculateMonthPillar(year, month, day) {
  // 절기 기준 월령 계산 (간단화)
  let adjustedMonth = month;
  if (day < 6) {
    adjustedMonth = month === 1 ? 12 : month - 1;
  }
  
  const yearStem = calculateYearPillar(year).stem;
  
  // 월간 계산 공식
  let monthStem;
  if (yearStem % 5 === 0 || yearStem % 5 === 1) { // 갑, 기년
    monthStem = (adjustedMonth + 1) % 10;
  } else if (yearStem % 5 === 2 || yearStem % 5 === 3) { // 을, 경년
    monthStem = (adjustedMonth + 3) % 10;
  } else { // 병, 신, 정, 임년
    monthStem = (adjustedMonth + 5) % 10;
  }
  
  const monthBranch = ((adjustedMonth + 1) % 12);
  
  return {
    stem: monthStem,
    branch: monthBranch,
    stemName: HEAVENLY_STEMS[monthStem],
    branchName: EARTHLY_BRANCHES[monthBranch],
    chinese: HEAVENLY_STEMS_CHI[monthStem] + EARTHLY_BRANCHES_CHI[monthBranch],
    season: getSeasonInfo(adjustedMonth)
  };
}

/**
 * 일주(日柱) 계산 (간단화된 공식)
 */
function calculateDayPillar(year, month, day) {
  // 1900년 1월 1일을 기준일로 설정 (갑자일)
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  const dayDiff = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
  
  const stemIndex = (dayDiff % 10 + 10) % 10;
  const branchIndex = (dayDiff % 12 + 12) % 12;
  
  return {
    stem: stemIndex,
    branch: branchIndex,
    stemName: HEAVENLY_STEMS[stemIndex],
    branchName: EARTHLY_BRANCHES[branchIndex],
    chinese: HEAVENLY_STEMS_CHI[stemIndex] + EARTHLY_BRANCHES_CHI[branchIndex],
    element: HEAVENLY_ELEMENTS[stemIndex]
  };
}

/**
 * 시주(時柱) 계산
 */
function calculateTimePillar(dayStem, hour) {
  // 시간대별 지지 매칭
  const hourBranches = [11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // 23-01시는 자시
  const hourIndex = Math.floor((hour + 1) / 2) % 12;
  const timeBranch = hourBranches[hourIndex];
  
  // 일간에 따른 시간 계산
  const timeStems = [
    [0, 2, 4, 6, 8, 0, 2, 4, 6, 8, 0, 2], // 갑, 기일
    [2, 4, 6, 8, 0, 2, 4, 6, 8, 0, 2, 4], // 을, 경일
    [4, 6, 8, 0, 2, 4, 6, 8, 0, 2, 4, 6], // 병, 신일
    [6, 8, 0, 2, 4, 6, 8, 0, 2, 4, 6, 8], // 정, 임일
    [8, 0, 2, 4, 6, 8, 0, 2, 4, 6, 8, 0]  // 무, 계일
  ];
  
  const stemGroup = dayStem % 5;
  const timeStem = timeStems[stemGroup][hourIndex];
  
  return {
    stem: timeStem,
    branch: timeBranch,
    stemName: HEAVENLY_STEMS[timeStem],
    branchName: EARTHLY_BRANCHES[timeBranch],
    chinese: HEAVENLY_STEMS_CHI[timeStem] + EARTHLY_BRANCHES_CHI[timeBranch],
    timeInfo: getTimeInfo(hour)
  };
}

/**
 * 십신(十神) 계산
 */
function calculateTenGods(dayMaster, allStems) {
  const tenGodNames = [
    '비견', '겁재', '식신', '상관', '정재', '편재', '정관', '편관', '정인', '편인'
  ];
  
  const gods = {};
  
  allStems.forEach((stem, index) => {
    if (index === 2) return; // 일간 제외
    
    const relation = (stem - dayMaster + 10) % 10;
    const godIndex = Math.floor(relation / 2) * 2 + (relation % 2);
    const godName = tenGodNames[godIndex];
    
    if (!gods[godName]) gods[godName] = 0;
    gods[godName]++;
  });
  
  // 주요 십신 분석
  const sortedGods = Object.entries(gods).sort((a, b) => b[1] - a[1]);
  
  return {
    distribution: gods,
    primary: sortedGods[0]?.[0] || '비견',
    secondary: sortedGods[1]?.[0] || '정관',
    weak: Object.keys(tenGodNames).find(god => !gods[god]) || '겁재'
  };
}

/**
 * 오행 균형 계산
 */
function calculateFiveElements(pillars) {
  const elements = { '목': 0, '화': 0, '토': 0, '금': 0, '수': 0 };
  
  pillars.forEach(pillar => {
    // 천간 오행
    elements[HEAVENLY_ELEMENTS[pillar.stem]] += 2;
    // 지지 오행
    elements[EARTHLY_ELEMENTS[pillar.branch]] += 1;
  });
  
  const total = Object.values(elements).reduce((sum, val) => sum + val, 0);
  const percentages = {};
  
  Object.keys(elements).forEach(element => {
    percentages[element] = Math.round((elements[element] / total) * 100);
  });
  
  // 가장 강하고 약한 오행 찾기
  const strongest = Object.entries(percentages).sort((a, b) => b[1] - a[1])[0][0];
  const weakest = Object.entries(percentages).sort((a, b) => a[1] - b[1])[0][0];
  
  return {
    distribution: elements,
    percentages,
    strongest,
    weakest,
    balance: Math.min(...Object.values(percentages)) / Math.max(...Object.values(percentages))
  };
}

/**
 * 용신/기신 분석
 */
function analyzeYongsinGisin(dayMaster, fiveElements, month) {
  const dayElement = HEAVENLY_ELEMENTS[dayMaster];
  const season = getSeason(month);
  
  let yongsin, gisin;
  
  // 계절과 일간에 따른 기본적인 용신/기신 분석
  if (dayElement === '목') {
    if (season === '겨울' || season === '봄') {
      yongsin = '화';
      gisin = '금';
    } else {
      yongsin = '수';
      gisin = '토';
    }
  } else if (dayElement === '화') {
    if (season === '여름') {
      yongsin = '토';
      gisin = '금';
    } else {
      yongsin = '목';
      gisin = '수';
    }
  } else if (dayElement === '토') {
    yongsin = '화';
    gisin = '목';
  } else if (dayElement === '금') {
    if (season === '가을') {
      yongsin = '화';
      gisin = '수';
    } else {
      yongsin = '토';
      gisin = '화';
    }
  } else { // 수
    yongsin = '금';
    gisin = '토';
  }
  
  return { yongsin, gisin };
}

/**
 * 대운 계산
 */
function calculateLuck(monthPillar, birthYear, gender) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  
  // 대운 시작 나이 (간단화: 남자는 순행, 여자는 역행)
  const luckStart = gender === 'M' ? 4 : 6;
  const currentLuckPeriod = Math.floor((age - luckStart) / 10);
  
  // 현재 대운 계산
  let currentLuckStem, currentLuckBranch;
  
  if (gender === 'M') {
    currentLuckStem = (monthPillar.stem + currentLuckPeriod) % 10;
    currentLuckBranch = (monthPillar.branch + currentLuckPeriod) % 12;
  } else {
    currentLuckStem = (monthPillar.stem - currentLuckPeriod + 10) % 10;
    currentLuckBranch = (monthPillar.branch - currentLuckPeriod + 12) % 12;
  }
  
  return {
    currentPeriod: currentLuckPeriod,
    currentAge: age,
    stem: currentLuckStem,
    branch: currentLuckBranch,
    chinese: HEAVENLY_STEMS_CHI[currentLuckStem] + EARTHLY_BRANCHES_CHI[currentLuckBranch],
    startYear: birthYear + luckStart + (currentLuckPeriod * 10),
    endYear: birthYear + luckStart + ((currentLuckPeriod + 1) * 10) - 1
  };
}

/**
 * 유틸리티 함수들
 */
function getSeason(month) {
  if (month >= 3 && month <= 5) return '봄';
  if (month >= 6 && month <= 8) return '여름';
  if (month >= 9 && month <= 11) return '가을';
  return '겨울';
}

function getSeasonInfo(month) {
  const seasons = {
    1: '겨울 끝자락', 2: '초봄 기운', 3: '봄의 시작',
    4: '봄 한가운데', 5: '늦봄 기운', 6: '초여름',
    7: '한여름', 8: '늦여름', 9: '초가을',
    10: '가을 한가운데', 11: '늦가을', 12: '초겨울'
  };
  return seasons[month] || '사계절';
}

function getTimeInfo(hour) {
  if (hour >= 23 || hour < 1) return '한밤중 기운';
  if (hour >= 1 && hour < 3) return '새벽 전 기운';
  if (hour >= 3 && hour < 5) return '새벽 기운';
  if (hour >= 5 && hour < 7) return '이른 아침';
  if (hour >= 7 && hour < 9) return '아침 기운';
  if (hour >= 9 && hour < 11) return '오전 기운';
  if (hour >= 11 && hour < 13) return '한낮 기운';
  if (hour >= 13 && hour < 15) return '오후 기운';
  if (hour >= 15 && hour < 17) return '늦은 오후';
  if (hour >= 17 && hour < 19) return '저녁 기운';
  if (hour >= 19 && hour < 21) return '초저녁';
  return '밤 기운';
}

// 전역 함수로 내보내기
window.calculateSaju = calculateSaju;
window.SajuEngine = {
  calculateSaju,
  HEAVENLY_STEMS,
  EARTHLY_BRANCHES,
  HEAVENLY_STEMS_CHI,
  EARTHLY_BRANCHES_CHI,
  HEAVENLY_ELEMENTS,
  EARTHLY_ELEMENTS,
  EARTHLY_ANIMALS
};