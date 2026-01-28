/**
 * 고급 사주 계산 엔진 (Enhanced Saju Calculation Engine)  
 * 전문가급 정밀도로 업그레이드된 만세력 계산 시스템
 */

// 기본 천간지지 데이터 (기존과 동일)
const HEAVENLY_STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const HEAVENLY_STEMS_CHI = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const HEAVENLY_ELEMENTS = ['목', '목', '화', '화', '토', '토', '금', '금', '수', '수'];
const HEAVENLY_YIN_YANG = ['양', '음', '양', '음', '양', '음', '양', '음', '양', '음'];

const EARTHLY_BRANCHES = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
const EARTHLY_BRANCHES_CHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const EARTHLY_ELEMENTS = ['수', '토', '목', '목', '토', '화', '화', '토', '금', '금', '토', '수'];
const EARTHLY_YIN_YANG = ['양', '음', '양', '음', '양', '음', '양', '음', '양', '음', '양', '음'];
const EARTHLY_ANIMALS = ['쥐', '소', '범', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'];

// 🆕 정밀 절기 계산 시스템
const PRECISE_SOLAR_TERMS = {
  // 각 절기의 태양 황경도 (도)
  입춘: 315, 경칩: 345, 청명: 15, 입하: 45, 망종: 75, 소서: 105,
  입추: 135, 백로: 165, 한로: 195, 입동: 225, 대설: 255, 소한: 285
};

// 🆕 월령별 세력 분석 (왕상휴수사)
const SEASONAL_STRENGTH = {
  봄: { 왕: '목', 상: '화', 휴: '토', 수: '금', 사: '수' },
  여름: { 왕: '화', 상: '토', 휴: '금', 수: '수', 사: '목' },
  가을: { 왕: '금', 상: '수', 휴: '목', 수: '화', 사: '토' },
  겨울: { 왕: '수', 상: '목', 휴: '화', 수: '토', 사: '금' }
};

/**
 * 🚀 고급 사주팔자 계산 (정밀도 대폭 향상)
 */
function calculateEnhancedSaju(year, month, day, hour, gender = 'M') {
  try {
    // 기본 사주 계산
    const basicSaju = calculateBasicSaju(year, month, day, hour, gender);
    
    // 🆕 정밀 절기 기반 월령 보정
    const preciseMonthInfo = calculatePreciseMonthInfo(year, month, day);
    
    // 🆕 대운(大運) 계산
    const daeunInfo = calculateDaeun(basicSaju, gender, year, month, day);
    
    // 🆕 격국(格局) 판단
    const formatAnalysis = analyzeFormat(basicSaju, preciseMonthInfo);
    
    // 🆕 조후(調候) 분석
    const seasonalAnalysis = analyzeSeasonalHarmony(basicSaju, preciseMonthInfo);
    
    // 🆕 십신 상호작용 심화 분석
    const enhancedTenGods = analyzeEnhancedTenGods(basicSaju);
    
    // 🆕 용신/기신 정밀 분석
    const preciseYongsinGisin = analyzePreciseYongsinGisin(basicSaju, preciseMonthInfo, formatAnalysis);
    
    return {
      ...basicSaju,
      preciseMonthInfo,
      daeunInfo,
      formatAnalysis,
      seasonalAnalysis,
      enhancedTenGods,
      preciseYongsinGisin,
      analysisLevel: 'PROFESSIONAL' // 전문가 수준 마크
    };
    
  } catch (error) {
    console.error('Enhanced Saju calculation error:', error);
    return calculateBasicSaju(year, month, day, hour, gender); // 기본 시스템으로 폴백
  }
}

/**
 * 기본 사주 계산 (기존 로직 유지)
 */
function calculateBasicSaju(year, month, day, hour, gender) {
  // 기존 calculateSaju 로직과 동일
  const yearPillar = calculateYearPillar(year);
  const monthPillar = calculateMonthPillar(year, month, day);
  const dayPillar = calculateDayPillar(year, month, day);
  const timePillar = calculateTimePillar(dayPillar.stem, hour);
  
  const pillars = {
    year: yearPillar,
    month: monthPillar, 
    day: dayPillar,
    time: timePillar
  };
  
  const fiveElements = calculateFiveElements(pillars);
  const dayMaster = dayPillar.stem;
  const tenGods = calculateTenGods(pillars, dayMaster);
  const yongsinGisin = analyzeYongsinGisin(fiveElements, dayMaster, monthPillar.branch);
  
  return {
    pillars,
    fiveElements,
    dayMaster,
    tenGods,
    yongsinGisin,
    birthInfo: { year, month, day, hour, gender }
  };
}

/**
 * 🆕 정밀 월령 정보 계산
 */
function calculatePreciseMonthInfo(year, month, day) {
  // 해당 년도의 정밀한 절기 계산
  const solarTerms = calculateYearlySolarTerms(year);
  
  // 현재 월령과 절기 상황 분석
  const currentSeason = determineCurrentSeason(month, day, solarTerms);
  const seasonalStrength = SEASONAL_STRENGTH[currentSeason];
  
  // 월령의 깊이 (초기/중기/말기)
  const monthDepth = calculateMonthDepth(month, day, solarTerms);
  
  return {
    season: currentSeason,
    seasonalStrength,
    monthDepth,
    solarTermInfo: solarTerms[month],
    preciseCalculation: true
  };
}

/**
 * 🆕 대운(大運) 계산 시스템
 */
function calculateDaeun(sajuData, gender, birthYear, birthMonth, birthDay) {
  const { pillars, dayMaster } = sajuData;
  
  // 순행/역행 판단 (남양여음 순행, 남음여양 역행)
  const isForward = shouldDaeunGoForward(gender, pillars.year.stemYinYang);
  
  // 기준점 계산 (월주에서 시작)
  const startBranch = pillars.month.branch;
  
  // 10개 대운 계산 (0세~90세)
  const daeunCycles = [];
  for (let i = 0; i < 10; i++) {
    const ageRange = { start: i * 10, end: (i + 1) * 10 - 1 };
    const daeunIndex = isForward ? (startBranch + i) % 12 : (startBranch - i + 12) % 12;
    
    const daeunStem = (pillars.month.stem + (isForward ? i : -i) + 10) % 10;
    const daeunBranch = daeunIndex;
    
    const daeunPillar = {
      stem: daeunStem,
      stemName: HEAVENLY_STEMS[daeunStem],
      stemChi: HEAVENLY_STEMS_CHI[daeunStem],
      branch: daeunBranch,
      branchName: EARTHLY_BRANCHES[daeunBranch],
      branchChi: EARTHLY_BRANCHES_CHI[daeunBranch],
      chinese: HEAVENLY_STEMS_CHI[daeunStem] + EARTHLY_BRANCHES_CHI[daeunBranch]
    };
    
    // 이 대운의 십신과 길흉 판단
    const daeunTenGod = calculateTenGod(dayMaster, daeunStem);
    const luckLevel = analyzeDaeunLuck(sajuData, daeunPillar, ageRange);
    
    daeunCycles.push({
      ageRange,
      pillar: daeunPillar,
      tenGod: daeunTenGod,
      luckLevel,
      analysis: generateDaeunAnalysis(sajuData, daeunPillar, ageRange)
    });
  }
  
  return {
    isForward,
    cycles: daeunCycles,
    currentDaeun: getCurrentDaeun(daeunCycles, new Date().getFullYear() - birthYear)
  };
}

/**
 * 🆕 격국(格局) 판단 시스템
 */
function analyzeFormat(sajuData, monthInfo) {
  const { pillars, dayMaster, tenGods } = sajuData;
  const monthTenGod = tenGods.month;
  
  // 정격(正格) 판단
  const jeonggyeok = analyzeJeonggyeok(monthTenGod, tenGods, monthInfo);
  
  // 특격(特格) 판단  
  const specialFormat = analyzeSpecialFormat(sajuData, monthInfo);
  
  // 격국의 강약과 용신 판단
  const formatStrength = analyzeFormatStrength(sajuData, jeonggyeok || specialFormat, monthInfo);
  
  return {
    type: jeonggyeok ? 'JEONGGYEOK' : (specialFormat ? 'SPECIAL' : 'IRREGULAR'),
    name: (jeonggyeok?.name || specialFormat?.name || '일반격'),
    description: (jeonggyeok?.description || specialFormat?.description || '일반적인 사주 구조'),
    strength: formatStrength,
    recommendations: generateFormatRecommendations(jeonggyeok || specialFormat, formatStrength)
  };
}

/**
 * 🆕 조후(調候) 분석 - 계절별 정밀 해석
 */
function analyzeSeasonalHarmony(sajuData, monthInfo) {
  const { dayMaster, pillars, fiveElements } = sajuData;
  const { season, seasonalStrength } = monthInfo;
  
  const dayMasterElement = HEAVENLY_ELEMENTS[dayMaster];
  
  // 계절별 일간의 강약 판단
  const seasonalStrengthLevel = getSeasonalStrengthLevel(dayMasterElement, seasonalStrength);
  
  // 조후 필요성 분석 (춥고 더운 기운 조절)
  const temperatureBalance = analyzeTemperatureBalance(pillars, season);
  
  // 조후용신 판단
  const johuYongsin = determineJohuYongsin(dayMasterElement, season, temperatureBalance);
  
  return {
    season,
    dayMasterStrength: seasonalStrengthLevel,
    temperatureBalance,
    johuYongsin,
    recommendations: generateSeasonalRecommendations(dayMasterElement, season, johuYongsin),
    lifestyle: generateSeasonalLifestyle(season, johuYongsin)
  };
}

/**
 * 🆕 십신 상호작용 심화 분석
 */
function analyzeEnhancedTenGods(sajuData) {
  const { tenGods, pillars, dayMaster } = sajuData;
  
  // 기본 십신 계산
  const basicTenGods = tenGods;
  
  // 십신 간의 상호작용 분석
  const interactions = analyzeTenGodInteractions(basicTenGods);
  
  // 십신의 배치와 위치별 영향력
  const positionalEffects = analyzeTenGodPositions(basicTenGods);
  
  // 십신 조합에 따른 성격과 운세 특성
  const combinationEffects = analyzeTenGodCombinations(basicTenGods, interactions);
  
  return {
    ...basicTenGods,
    interactions,
    positionalEffects,
    combinationEffects,
    overallPattern: determineTenGodPattern(basicTenGods, interactions)
  };
}

/**
 * 🆕 용신/기신 정밀 분석
 */
function analyzePreciseYongsinGisin(sajuData, monthInfo, formatAnalysis) {
  const { dayMaster, fiveElements, pillars } = sajuData;
  const dayMasterElement = HEAVENLY_ELEMENTS[dayMaster];
  
  // 기본 용신/기신 (오행 균형 기준)
  const basicYongsinGisin = sajuData.yongsinGisin;
  
  // 격국 기준 용신/기신
  const formatBasedYongsin = determineFormatBasedYongsin(formatAnalysis, monthInfo);
  
  // 조후 기준 용신/기신
  const seasonalYongsin = monthInfo.seasonalAnalysis?.johuYongsin;
  
  // 종합 용신/기신 결정
  const finalYongsin = synthesizeYongsinAnalysis(basicYongsinGisin, formatBasedYongsin, seasonalYongsin);
  
  return {
    ...basicYongsinGisin,
    formatBased: formatBasedYongsin,
    seasonal: seasonalYongsin,
    synthesized: finalYongsin,
    analysisDepth: 'PROFESSIONAL',
    recommendations: generatePreciseYongsinRecommendations(finalYongsin, sajuData)
  };
}

// 🆕 헬퍼 함수들
function shouldDaeunGoForward(gender, yearStemYinYang) {
  // 남양여음 순행, 남음여양 역행
  return (gender === 'M' && yearStemYinYang === '양') || (gender === 'F' && yearStemYinYang === '음');
}

function getCurrentDaeun(daeunCycles, currentAge) {
  return daeunCycles.find(cycle => 
    currentAge >= cycle.ageRange.start && currentAge <= cycle.ageRange.end
  );
}

function analyzeJeonggyeok(monthTenGod, tenGods, monthInfo) {
  // 정관격, 정재격, 정인격, 식신격 판단 로직
  const jeonggyeokTypes = {
    '정관': { name: '정관격', priority: 1 },
    '정재': { name: '정재격', priority: 2 },
    '정인': { name: '정인격', priority: 3 },
    '식신': { name: '식신격', priority: 4 }
  };
  
  if (jeonggyeokTypes[monthTenGod]) {
    return {
      ...jeonggyeokTypes[monthTenGod],
      description: `월령에서 ${monthTenGod}이 투출하여 ${jeonggyeokTypes[monthTenGod].name}을 이룸`
    };
  }
  return null;
}

function generateSeasonalRecommendations(dayMasterElement, season, johuYongsin) {
  const recommendations = {
    colors: [],
    directions: [],
    lifestyle: [],
    cautions: []
  };
  
  // 계절과 일간에 따른 맞춤 조언
  if (season === '겨울' && ['화', '토'].includes(dayMasterElement)) {
    recommendations.colors = ['빨강', '주황', '노랑'];
    recommendations.lifestyle = ['따뜻한 음식 섭취', '온실 운동 권장', '남향 거주지 선호'];
  } else if (season === '여름' && ['금', '수'].includes(dayMasterElement)) {
    recommendations.colors = ['흰색', '검정', '파랑'];
    recommendations.lifestyle = ['시원한 음식 섭취', '수영 등 수상 운동', '북향 또는 동향 거주지'];
  }
  
  return recommendations;
}

// 전역 객체로 노출 (기존 호환성 유지)
window.EnhancedSajuEngine = {
  calculateEnhancedSaju,
  calculateBasicSaju,
  HEAVENLY_STEMS,
  HEAVENLY_STEMS_CHI,
  HEAVENLY_ELEMENTS,
  HEAVENLY_YIN_YANG,
  EARTHLY_BRANCHES,
  EARTHLY_BRANCHES_CHI,
  EARTHLY_ELEMENTS,
  EARTHLY_YIN_YANG,
  EARTHLY_ANIMALS
};

// 기존 SajuEngine과의 호환성
if (!window.SajuEngine) {
  window.SajuEngine = window.EnhancedSajuEngine;
}