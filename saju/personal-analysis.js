/**
 * 개인별 맞춤 분석 생성 엔진 (수정된 버전)
 */

/**
 * 개인별 전체 분석 생성
 */
function generatePersonalAnalysis(sajuData, mbtiType, birthInfo) {
  const analysis = {
    basicInfo: generateBasicInfo(birthInfo, sajuData),
    personality: generatePersonalityAnalysis(sajuData, mbtiType),
    pillarsAnalysis: generatePillarsAnalysis(sajuData.pillars),
    fiveElementsAnalysis: generateFiveElementsAnalysis(sajuData.fiveElements),
    tenGodsAnalysis: generateTenGodsAnalysis(sajuData.tenGods, sajuData.dayMaster),
    yongsinGisinAnalysis: generateYongsinGisinAnalysis(sajuData.yongsinGisin, sajuData.dayMaster),
    luckAnalysis: generateLuckAnalysis(sajuData, mbtiType, birthInfo),
    mbtiSajuFusion: generateMBTISajuFusion(mbtiType, sajuData),
    healthAnalysis: generateHealthAnalysis(sajuData, mbtiType, birthInfo),
    careerGuidance: generateCareerGuidance(sajuData, mbtiType),
    compatibilityAnalysis: generateCompatibilityAnalysis(sajuData, mbtiType, birthInfo),
    timePeriodAnalysis: generateTimePeriodAnalysis(sajuData, mbtiType, birthInfo),
    fortuneScores: calculateFortuneScores(sajuData, mbtiType)
  };
  
  return analysis;
}

/**
 * 기본 정보 생성
 */
function generateBasicInfo(birthInfo, sajuData) {
  const { name, year, month, day, hour, gender } = birthInfo;
  const age = new Date().getFullYear() - year + 1;
  
  return {
    name,
    age,
    gender: gender === 'M' ? '남성' : '여성',
    sajuString: `${sajuData.pillars.year.chinese} ${sajuData.pillars.month.chinese} ${sajuData.pillars.day.chinese} ${sajuData.pillars.time.chinese}`,
    dayMasterInfo: {
      name: sajuData.pillars.day.stemName,
      chinese: window.SajuEngine ? window.SajuEngine.HEAVENLY_STEMS_CHI[sajuData.dayMaster] : '',
      element: window.SajuEngine ? window.SajuEngine.HEAVENLY_ELEMENTS[sajuData.dayMaster] : '',
      characteristic: getDayMasterCharacteristic(sajuData.dayMaster)
    }
  };
}

function getDayMasterCharacteristic(dayMaster) {
  const characteristics = [
    '강직하고 개척적인', '유연하고 적응적인', '활발하고 표현적인', '섬세하고 완벽한',
    '안정적이고 신뢰적인', '포용적이고 조화적인', '강인하고 의지적인', '정밀하고 완성적인',
    '지혜롭고 전략적인', '직관적이고 창조적인'
  ];
  return characteristics[dayMaster] || '독특하고 특별한';
}

/**
 * 성격 분석 생성 (대폭 확장)
 */
function generatePersonalityAnalysis(sajuData, mbtiType) {
  const dayMaster = sajuData.dayMaster;
  const strongest = sajuData.fiveElements.strongest;
  
  const personalityTraits = {
    0: { // 갑목
      core: "강직하고 정의로운 성격으로 리더십과 개척정신이 뛰어납니다.",
      detail: `큰 나무처럼 곧은 성품을 가진 당신은 타고난 리더입니다. 원칙과 신념을 중시하며, 불의를 보면 참지 못하는 정의감이 강합니다. 
      
      **성격적 특징:**
      • 강한 의지력과 결단력으로 어려운 상황도 돌파해냅니다
      • 새로운 분야를 개척하는 것을 좋아하며, 첫 번째가 되고 싶어합니다
      • 직설적이고 솔직한 표현으로 때로는 충돌하기도 하지만, 진정성이 있습니다
      • 책임감이 강해 맡은 일은 끝까지 해내는 신뢰할 수 있는 사람입니다
      
      **인간관계:**
      • 카리스마 있는 리더십으로 많은 사람들이 따릅니다
      • 부하직원이나 후배들을 잘 챙기는 의리 있는 사람입니다
      • 때로는 고집이 세어 다른 의견을 받아들이기 어려워할 수 있습니다
      • 진실한 관계를 추구하며, 표면적인 만남보다는 깊이 있는 인연을 선호합니다
      
      **장점:**
      ✨ 강한 추진력과 실행력
      ✨ 공정하고 정의로운 판단력
      ✨ 새로운 도전을 두려워하지 않는 용기
      ✨ 사람들을 이끄는 천부적 리더십
      
      **주의사항:**
      ⚠️ 고집이 너무 세면 주변에서 멀어질 수 있습니다
      ⚠️ 직설적인 표현으로 상대방이 상처받을 수 있으니 말을 조심하세요
      ⚠️ 완벽주의 성향으로 스트레스를 받을 수 있습니다

      **일상생활에서의 모습:**
      갑목인 당신은 아침 일찍 일어나는 것을 좋아하고, 하루 계획을 세워서 체계적으로 행동합니다. 새로운 프로젝트나 도전에 대해 남들보다 먼저 아이디어를 내고, 실행에 옮기는 추진력이 뛰어납니다. 친구들 사이에서는 자연스럽게 리더 역할을 맡게 되며, 그룹의 방향을 제시하고 이끌어나가는 역할을 합니다.

      **직장에서의 모습:**
      회사에서는 새로운 사업이나 프로젝트를 기획하고 추진하는 일을 잘합니다. 동료들로부터 신뢰를 받으며, 상사들도 중요한 일을 맡기는 경우가 많습니다. 다만 때로는 너무 직설적인 표현으로 갈등이 생길 수 있으니, 조금 더 부드럽게 의견을 전달하는 연습이 필요합니다.

      **연애에서의 모습:**
      연애할 때도 주도적이고 적극적인 모습을 보입니다. 좋아하는 사람이 생기면 확실하게 표현하며, 계획적이고 진지한 교제를 합니다. 상대방에게도 솔직함과 진실함을 요구하며, 표면적인 관계보다는 깊이 있는 사랑을 추구합니다.`
    },
    
    1: { // 을목
      core: "유연하고 섬세한 성격으로 적응력과 창의력이 뛰어납니다.",
      detail: `작은 풀처럼 부드럽고 겸손한 성품을 가진 당신은 어떤 환경에서도 잘 적응하는 뛰어난 능력을 가지고 있습니다.
      
      **성격적 특징:**
      • 세심하고 배려심이 깊어 다른 사람의 마음을 잘 읽습니다
      • 창의적이고 예술적 감각이 뛰어나 아름다운 것을 추구합니다
      • 부드러운 카리스마로 사람들의 마음을 자연스럽게 움직입니다
      • 변화하는 상황에 유연하게 대처하며, 기회를 잘 포착합니다
      
      **인간관계:**
      • 따뜻한 성품으로 많은 사람들이 편안함을 느낍니다
      • 갈등을 조율하는 능력이 뛰어나 화합을 도모합니다
      • 타인의 감정에 민감해 때로는 스트레스를 받기도 합니다
      • 진정성 있는 조언과 위로로 주변 사람들에게 큰 힘이 됩니다
      
      **장점:**
      ✨ 뛰어난 적응력과 유연성
      ✨ 창의적이고 예술적인 감각
      ✨ 섬세한 배려심과 공감 능력
      ✨ 조화를 이루는 협력 능력
      
      **주의사항:**
      ⚠️ 너무 민감하면 스트레스를 많이 받을 수 있습니다
      ⚠️ 우유부단함으로 기회를 놓칠 수 있으니 결단력을 기르세요
      ⚠️ 자신의 의견을 명확히 표현하는 연습이 필요합니다

      **일상생활에서의 모습:**
      을목인 당신은 주변 환경을 아름답게 꾸미는 것을 좋아하고, 예술이나 문화 활동에 관심이 많습니다. 새로운 트렌드나 변화에 민감하게 반응하며, 빠르게 적응하는 능력이 뛰어납니다. 친구들의 고민을 잘 들어주고 적절한 조언을 해주는 역할을 자주 맡습니다.`
    },
    
    2: { // 병화
      core: "활발하고 표현력이 뛰어나며 사람들을 끌어당기는 매력이 있습니다.",
      detail: `태양처럼 밝고 따뜻한 에너지를 가진 당신은 자연스럽게 사람들의 관심과 사랑을 받는 타입입니다.
      
      **성격적 특징:**
      • 밝고 긍정적인 에너지로 주변을 환하게 만듭니다
      • 표현력이 뛰어나고 말솜씨가 좋아 사람들을 매료시킵니다
      • 열정적이고 적극적인 성격으로 일에 대한 추진력이 강합니다
      • 사교적이고 활발한 성격으로 다양한 사람들과 잘 어울립니다
      
      **장점:**
      ✨ 뛰어난 표현력과 소통 능력
      ✨ 강한 열정과 추진력
      ✨ 사람들을 끌어당기는 카리스마
      ✨ 긍정적이고 밝은 에너지`
    },
    
    3: { // 정화
      core: "섬세하고 완벽주의적 성향으로 높은 품질을 추구합니다.",
      detail: `촛불처럼 따뜻하면서도 섬세한 빛을 발하는 당신은 완벽함과 아름다움을 추구하는 예술가적 기질을 가지고 있습니다.`
    },
    
    4: { // 무토
      core: "안정적이고 신뢰할 수 있으며 현실적인 판단력이 뛰어납니다.",
      detail: `큰 산처럼 든든하고 안정적인 당신은 주변 사람들에게 믿음과 안정감을 주는 존재입니다.`
    },
    
    5: { // 기토
      core: "포용력이 크고 조화를 중시하며 협력을 잘하는 성격입니다.",
      detail: `기름진 대지처럼 모든 것을 포용하고 기르는 당신은 주변 사람들의 성장을 돕는 역할을 합니다.`
    },
    
    6: { // 경금
      core: "강한 의지력과 원칙을 가지고 있으며 완성도를 추구합니다.",
      detail: `단단한 쇠처럼 강인한 의지를 가진 당신은 어떤 어려움도 극복해내는 강인함을 가지고 있습니다.`
    },
    
    7: { // 신금
      core: "정밀하고 섬세하며 기술적 완성도를 중시하는 성격입니다.",
      detail: `보석처럼 정교하고 아름다운 당신은 세밀함과 품질에 대한 높은 기준을 가지고 있습니다.`
    },
    
    8: { // 임수
      core: "지혜롭고 포용력이 크며 깊이 있는 사고를 하는 성격입니다.",
      detail: `큰 강물처럼 깊고 넓은 지혜를 가진 당신은 포용력과 통찰력이 뛰어납니다.`
    },
    
    9: { // 계수
      core: "직관적이고 창조적이며 변화에 민감한 성격입니다.",
      detail: `이슬처럼 섬세하고 민감한 당신은 뛰어난 직감과 창의력을 가지고 있습니다.`
    }
  };

  const trait = personalityTraits[dayMaster] || {
    core: "독특하고 특별한 성격을 가지고 있습니다.",
    detail: `당신만의 고유한 특성을 가진 분으로, 전통적인 분류로는 설명하기 어려운 독특한 매력이 있습니다.`
  };

  return {
    corePersonality: trait.core,
    detailedAnalysis: trait.detail,
    mbtiInfluence: `${mbtiType} 성향이 사주적 특성과 조화를 이루어 독특한 시너지를 만들어냅니다. ${mbtiType}의 현대적 특성과 일간의 전통적 특성이 만나 더욱 풍부하고 다층적인 성격을 형성합니다.`,
    strengthsAndWeaknesses: {
      strengths: ["독특한 개성", "균형잡힌 판단력", "창의적 사고", "깊이 있는 통찰력"],
      weaknesses: ["때로는 복잡한 선택", "완벽주의 경향", "과도한 분석"],
      advice: "자신만의 강점을 인정하고 발전시켜 나가는 것이 중요합니다. MBTI와 사주의 조화를 통해 더욱 균형잡힌 성장을 이룰 수 있습니다."
    }
  };
}

/**
 * 기둥별 분석 생성 (확장)
 */
function generatePillarsAnalysis(pillars) {
  return {
    year: {
      title: `${pillars.year.chinese} - 조상과 기반 (0~15세)`,
      meaning: `${pillars.year.animal}해에 태어나신 분으로, 조상의 덕을 받으며 ${pillars.year.element}의 기운을 타고났습니다.`,
      influence: "어린 시절의 성향과 가족의 영향력을 나타내며, 평생에 걸쳐 기본 성격의 바탕이 됩니다.",
      detailedAnalysis: `연주는 당신의 뿌리와 기반을 나타내는 중요한 기둥입니다. ${pillars.year.chinese}의 조합은 조상 대대로 내려온 DNA적 특성과 어린 시절의 성장 환경을 보여줍니다. 이는 평생에 걸쳐 당신의 기본적인 성향과 가치관의 토대가 되며, 특히 위기 상황이나 중요한 결정을 내릴 때 가장 근본적인 판단 기준으로 작용합니다.`,
      lifeImpact: "인생 전반에 걸쳐 안정적인 기반과 방향성을 제공하며, 특히 가족관계와 뿌리 의식에 큰 영향을 미칩니다."
    },
    month: {
      title: `${pillars.month.chinese} - 부모와 성장기 (16~30세)`,
      meaning: `${pillars.month.season}의 기운을 받아 성장기를 보내게 됩니다.`,
      influence: "청년기의 발전 방향과 사회적 적응력, 부모와의 관계를 보여줍니다.",
      detailedAnalysis: `월주는 성장기와 사회 진출기의 특성을 나타냅니다. ${pillars.month.chinese}의 에너지는 당신의 사회적 적응력과 대인관계 능력, 그리고 진로 선택에 중요한 영향을 미칩니다. 이 시기에 형성된 관계 패턴과 가치관은 성인이 된 후에도 지속적으로 영향을 미치며, 특히 직장 생활과 사회적 성공에 핵심적인 역할을 합니다.`,
      careerInfluence: "직업 선택과 사회적 성공, 대인관계에서의 역할과 위치를 결정하는 중요한 요소입니다."
    },
    day: {
      title: `${pillars.day.chinese} - 본인의 핵심 (31~45세)`,
      meaning: "당신 자신의 본질적 성격과 배우자와의 관계를 나타냅니다.",
      influence: "성인기의 핵심적 성향과 결혼생활, 사회적 역할을 보여줍니다.",
      detailedAnalysis: `일주는 사주에서 가장 중요한 기둥으로, 당신의 핵심 정체성을 나타냅니다. ${pillars.day.chinese}의 조합은 당신만의 독특한 특성과 강점, 그리고 인생에서 추구하는 가치와 목표를 보여줍니다. 이는 모든 중요한 결정의 기준이 되며, 배우자나 가장 가까운 사람과의 관계 패턴도 결정합니다.`,
      relationshipPattern: "결혼과 파트너십, 그리고 가장 깊은 인간관계에서의 모습과 패턴을 보여주는 핵심 지표입니다."
    },
    time: {
      title: `${pillars.time.chinese} - 자손과 미래 (46세 이후)`,
      meaning: "자녀와의 인연과 노년기의 삶의 질을 나타냅니다.",
      influence: "후반기 인생의 방향과 자손 복, 말년 운세를 보여줍니다.",
      detailedAnalysis: `시주는 인생의 후반부와 다음 세대에 미치는 영향을 나타냅니다. ${pillars.time.chinese}의 에너지는 자녀 교육 방식과 후배 양성, 그리고 인생의 완성도에 큰 영향을 미칩니다. 또한 노년기의 건강과 정신적 풍요로움, 그리고 다른 사람들에게 남기게 될 유산의 성격도 보여줍니다.`,
      legacyImpact: "다음 세대에 전하게 될 가치와 지혜, 그리고 인생의 완성도와 만족도를 결정하는 중요한 요소입니다."
    }
  };
}

/**
 * 오행 분석 생성 (대폭 확장)
 */
function generateFiveElementsAnalysis(fiveElements) {
  const { strongest, weakest, balance, percentages } = fiveElements;
  
  const elementDetails = {
    '목': {
      strong: '창의력과 성장 의지가 매우 강하며, 새로운 것을 시도하는 것을 좋아합니다.',
      weak: '변화와 성장에 대한 동력이 부족할 수 있으며, 현상 유지에 안주하려는 경향이 있습니다.',
      remedy: '새로운 취미나 학습을 시작하고, 자연과 가까운 환경에서 시간을 보내세요.'
    },
    '화': {
      strong: '열정과 표현력이 뛰어나며, 사람들을 이끄는 카리스마가 있습니다.',
      weak: '열정과 추진력이 부족하여 소극적인 모습을 보일 수 있습니다.',
      remedy: '사회적 활동을 늘리고, 표현 활동이나 운동을 통해 에너지를 발산하세요.'
    },
    '토': {
      strong: '안정감과 신뢰성이 뛰어나며, 꾸준함으로 목표를 달성하는 능력이 있습니다.',
      weak: '안정성이 부족하여 일관성 있는 행동이 어려울 수 있습니다.',
      remedy: '규칙적인 생활 패턴을 만들고, 체계적인 계획을 세워 실행하세요.'
    },
    '금': {
      strong: '완벽을 추구하며 높은 품질의 결과물을 만들어내는 능력이 뛰어납니다.',
      weak: '완성도가 부족하여 대충 끝내거나 중도에 포기하는 경우가 있습니다.',
      remedy: '목표를 명확히 설정하고, 단계별로 완성해나가는 습관을 기르세요.'
    },
    '수': {
      strong: '깊이 있는 사고와 지혜로운 판단력이 뛰어나며, 본질을 꿰뚫어보는 능력이 있습니다.',
      weak: '깊이 있는 사고가 부족하여 피상적인 판단을 할 수 있습니다.',
      remedy: '독서나 명상을 통해 내면을 깊게 들여다보는 시간을 가지세요.'
    }
  };
  
  return {
    overview: `오행 중 ${strongest}이 가장 강하고 ${weakest}이 가장 약합니다. 전체적인 균형도는 ${balance}점입니다.`,
    strongest: {
      element: strongest,
      strength: elementDetails[strongest]?.strong || `${strongest} 기운이 강하여 관련된 특성이 두드러지게 나타납니다.`,
      advice: `${strongest} 기운을 적절히 조절하여 균형을 맞추는 것이 중요합니다.`,
      manifestation: `일상생활에서 ${strongest}의 특성이 강하게 나타나며, 이를 잘 활용하면 큰 강점이 될 수 있습니다.`
    },
    weakest: {
      element: weakest,
      weakness: elementDetails[weakest]?.weak || `${weakest} 기운이 부족하여 관련 영역에서 보완이 필요합니다.`,
      remedy: elementDetails[weakest]?.remedy || `${weakest} 기운을 보강하는 활동과 환경을 만들어 보세요.`,
      improvement: `${weakest} 기운을 의식적으로 보강한다면 더욱 균형잡힌 삶을 살 수 있습니다.`
    },
    balance: {
      score: balance,
      evaluation: balance > 80 ? "매우 균형잡힌" : balance > 60 ? "비교적 균형잡힌" : "불균형한",
      guidance: "오행의 균형을 맞춰가면서 전체적인 조화를 이루는 것이 중요합니다.",
      practicalAdvice: "일상생활에서 부족한 기운을 보강하고 과한 기운을 조절하여 전체적인 밸런스를 맞춰나가세요."
    },
    practicalApplication: {
      colors: `${weakest} 기운을 보강하는 색상을 활용하고, ${strongest} 기운을 조절하는 색상을 적절히 사용하세요.`,
      lifestyle: "오행의 균형을 고려한 생활 방식을 통해 더욱 조화로운 삶을 살 수 있습니다.",
      relationships: "오행의 특성을 이해하면 다른 사람들과의 관계에서도 더 나은 소통이 가능합니다."
    }
  };
}

/**
 * 십신 분석 생성 (확장)
 */
function generateTenGodsAnalysis(tenGods, dayMaster) {
  return {
    primary: "당신의 주요 십신은 개인의 특성을 잘 나타내고 있습니다.",
    characteristics: "십신의 조합에 따라 성격과 운명의 특성이 결정됩니다.",
    career: "십신에 따른 적성과 직업 방향을 참고하시기 바랍니다.",
    relationships: "인간관계에서의 패턴과 특징을 보여줍니다.",
    advice: "십신의 특성을 이해하고 활용하면 더 나은 삶을 살 수 있습니다.",
    detailedInterpretation: {
      strengths: "당신의 십신 구조는 독특한 강점과 재능을 나타냅니다.",
      challenges: "동시에 주의해야 할 부분과 개선점도 함께 보여줍니다.",
      development: "십신의 특성을 잘 개발하면 인생에서 큰 성취를 이룰 수 있습니다."
    }
  };
}

/**
 * 용신/기신 분석 생성 (대폭 확장)
 */
function generateYongsinGisinAnalysis(yongsinGisin, dayMaster) {
  const dayMasterNames = ['갑목', '을목', '병화', '정화', '무토', '기토', '경금', '신금', '임수', '계수'];
  const currentDayMaster = dayMasterNames[dayMaster] || '특별한 일간';
  
  // 오행별 상세 용신 분석
  const yongsinDetails = {
    '목': {
      meaning: '목(木) 기운이 당신에게 큰 도움이 됩니다. 성장과 발전, 창의적 사고를 상징하는 이 기운은 당신의 잠재력을 최대로 끌어올려줍니다.',
      usage: '새로운 시작이나 프로젝트를 시작할 때, 창의적인 아이디어가 필요할 때 목 기운을 의식적으로 활용하세요. 특히 봄철이나 새벽 시간대에 중요한 결정을 내리면 좋습니다.',
      practicalUse: '🌱 일상 활용법: 집이나 사무실에 관엽식물을 두고, 공원이나 숲에서 산책하는 시간을 늘리세요. 독서나 학습할 때도 자연이 보이는 곳에서 하면 효과가 좋습니다.'
    },
    '화': {
      meaning: '화(火) 기운이 당신의 열정과 표현력을 극대화시켜줍니다. 활기찬 에너지와 리더십, 소통 능력을 크게 향상시키는 강력한 도구입니다.',
      usage: '사람들과의 만남이나 발표, 중요한 협상에서 화 기운을 활용하면 뛰어난 성과를 거둘 수 있습니다. 여름철이나 한낮에 중요한 일정을 잡는 것이 유리합니다.',
      practicalUse: '🔥 일상 활용법: 밝은 조명 아래서 일하고, 사람들이 많이 모이는 장소에서의 활동을 늘리세요. 운동이나 활발한 취미 생활도 화 기운을 강화합니다.'
    },
    '토': {
      meaning: '토(土) 기운은 당신에게 안정감과 신뢰성을 제공합니다. 꾸준한 성장과 든든한 기반 마련에 최적화된 에너지입니다.',
      usage: '중요한 계약이나 장기적인 계획을 세울 때, 인간관계에서 신뢰를 쌓아야 할 때 토 기운을 활용하세요. 환절기나 오후 시간대가 특히 유리합니다.',
      practicalUse: '🏔️ 일상 활용법: 규칙적인 생활 패턴을 유지하고, 집 안의 중앙 공간을 깔끔하게 정리해두세요. 요리나 원예 활동도 매우 도움이 됩니다.'
    },
    '금': {
      meaning: '금(金) 기운은 당신의 완성도와 품질을 한 단계 높여줍니다. 정확한 판단력과 효율성, 고급스러움을 추구할 때 최고의 힘을 발휘합니다.',
      usage: '중요한 결정을 내려야 할 때나 품질이 중요한 일을 할 때 금 기운을 활용하세요. 가을철이나 해질 무렵의 시간대가 특히 효과적입니다.',
      practicalUse: '⚡ 일상 활용법: 금속 소재의 액세서리나 시계를 착용하고, 깔끔하고 정돈된 환경에서 일하세요. 정밀한 작업이나 분석이 필요한 일에 집중하는 것이 좋습니다.'
    },
    '수': {
      meaning: '수(Water) 기운은 당신의 지혜와 통찰력을 깊게 해줍니다. 복잡한 문제 해결과 창의적 발상, 인간관계의 유연성을 크게 향상시킵니다.',
      usage: '깊이 있는 사고가 필요한 일이나 연구, 학습에 몰입할 때 수 기운을 활용하세요. 겨울철이나 밤 시간대에 중요한 영감을 얻을 가능성이 높습니다.',
      practicalUse: '💧 일상 활용법: 물을 자주 마시고, 목욕이나 샤워 시간을 늘리세요. 조용한 환경에서 명상이나 독서를 하고, 강이나 바다 근처에서 산책하면 수 기운이 강화됩니다.'
    }
  };

  // 오행별 상세 기신 분석
  const gisinDetails = {
    '목': {
      meaning: '목(木) 기운이 과하면 조급함과 무모한 도전으로 이어질 수 있습니다.',
      caution: '너무 성급하게 결정하거나 무리한 성장을 추구하지 마세요. 계획 없는 확장은 위험합니다.',
      management: '🚨 관리 방법: 새로운 일을 시작하기 전에 충분히 계획을 세우고, 한 번에 너무 많은 것을 시도하지 마세요. 목 기운이 과할 때는 금 기운(정리, 마무리)으로 균형을 맞추는 것이 좋습니다.'
    },
    '화': {
      meaning: '화(火) 기운이 과하면 감정적 흥분과 성급한 판단으로 문제가 생길 수 있습니다.',
      caution: '과도한 열정으로 인한 번아웃이나 갈등 상황을 주의하세요. 너무 앞서가려 하지 마세요.',
      management: '🧊 관리 방법: 중요한 결정은 하루 정도 시간을 두고 내리고, 격한 감정이 일어날 때는 깊게 숨을 쉬며 진정하세요. 차가운 물을 마시거나 조용한 곳에서 휴식을 취하는 것이 도움됩니다.'
    },
    '토': {
      meaning: '토(土) 기운이 과하면 고집과 변화 거부로 발전이 막힐 수 있습니다.',
      caution: '지나친 보수성과 변화에 대한 두려움으로 기회를 놓치지 마세요. 유연성을 잃지 않는 것이 중요합니다.',
      management: '🌪️ 관리 방법: 정기적으로 새로운 경험을 해보고, 다른 사람의 의견에 귀 기울이세요. 토 기운이 과할 때는 목 기운(새로운 학습, 변화)으로 활력을 불어넣는 것이 좋습니다.'
    },
    '금': {
      meaning: '금(金) 기운이 과하면 지나친 완벽주의와 경직성으로 스트레스가 증가합니다.',
      caution: '모든 것을 완벽하게 하려는 강박과 비판적 태도로 인한 인간관계 악화를 주의하세요.',
      management: '🌊 관리 방법: 때로는 70-80%의 완성도로도 충분하다는 마음가짐을 가지세요. 유연성을 기르기 위해 예술 활동이나 자유로운 표현을 해보는 것이 좋습니다.'
    },
    '수': {
      meaning: '수(Water) 기운이 과하면 우유부단함과 과도한 걱정으로 행동력이 떨어집니다.',
      caution: '지나친 고민과 분석으로 실행을 미루거나 기회를 놓치는 일이 없도록 주의하세요.',
      management: '🔥 관리 방법: 정해진 시간 안에 결정을 내리는 연습을 하고, 실행을 우선시하는 습관을 기르세요. 수 기운이 과할 때는 화 기운(운동, 활발한 활동)으로 균형을 맞추세요.'
    }
  };

  const yongsin = yongsinDetails[yongsinGisin.yongsin] || {
    meaning: `${yongsinGisin.yongsin} 기운이 당신에게 도움이 됩니다.`,
    usage: '이 기운을 의식적으로 활용해보세요.',
    practicalUse: '일상생활에서 관련된 활동을 늘려보시기 바랍니다.'
  };

  const gisin = gisinDetails[yongsinGisin.gisin] || {
    meaning: `${yongsinGisin.gisin} 기운을 주의해야 합니다.`,
    caution: '이 기운이 과하지 않도록 조절하세요.',
    management: '균형을 맞추는 것이 중요합니다.'
  };

  return {
    yongsin: {
      element: yongsinGisin.yongsin,
      meaning: yongsin.meaning,
      usage: yongsin.usage,
      practicalUse: yongsin.practicalUse
    },
    gisin: {
      element: yongsinGisin.gisin,
      meaning: gisin.meaning,
      caution: gisin.caution,
      management: gisin.management
    },
    guidance: `${currentDayMaster}인 당신은 ${yongsinGisin.yongsin} 기운을 적극 활용하고 ${yongsinGisin.gisin} 기운은 적절히 조절하여 인생의 균형을 맞춰나가시기 바랍니다.`,
    application: {
      daily: `매일 ${yongsinGisin.yongsin} 기운을 의식한 선택을 하고, ${yongsinGisin.gisin} 기운이 과해지지 않도록 주의깊게 관찰하세요.`,
      longTerm: `장기적으로 ${yongsinGisin.yongsin}을 강화하는 환경과 활동을 늘리고, ${yongsinGisin.gisin}의 부정적 영향을 최소화하는 생활 패턴을 만들어나가세요.`
    }
  };
}

/**
 * 운세 분석 생성 (확장)
 */
function generateLuckAnalysis(sajuData, mbtiType, birthInfo) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthInfo.year + 1;
  
  return {
    yearly: {
      theme: `${currentYear}년은 ${age}세인 당신에게 성장과 발전의 해입니다.`,
      fortune: "전반적으로 안정적인 운세를 보이며, 꾸준한 노력이 결실을 맺을 것입니다.",
      advice: "새로운 도전보다는 기존의 것들을 더욱 발전시키는 데 집중하세요.",
      specificGuidance: `${mbtiType} 성향과 사주의 조화를 고려할 때, 올해는 특히 인간관계와 소통에 중점을 두는 것이 좋습니다.`
    },
    monthly: {
      current: "이번 달은 기회와 도전이 함께 오는 시기입니다.",
      focus: "인간관계와 소통에 신경쓰면 좋은 결과를 얻을 수 있습니다.",
      caution: "성급한 결정보다는 신중하게 판단하여 행동하세요."
    },
    seasonal: {
      spring: "봄에는 새로운 시작과 계획 수립에 좋은 시기입니다.",
      summer: "여름에는 활발한 활동과 사회적 관계 확장에 유리합니다.",
      autumn: "가을에는 결실과 성과를 거두는 시기입니다.",
      winter: "겨울에는 정리와 성찰, 내년 준비의 시기입니다."
    },
    overall: "당신의 사주와 MBTI 특성을 잘 활용하면 더욱 좋은 운세를 만들어갈 수 있습니다.",
    lifePhase: `현재 ${age}세인 당신은 인생의 ${getLifePhase(age)} 시기에 있으며, 이 시기의 특성을 잘 활용하는 것이 중요합니다.`
  };
}

function getLifePhase(age) {
  if (age < 30) return "기반 구축";
  if (age < 40) return "발전과 성장";
  if (age < 50) return "성숙과 완성";
  if (age < 60) return "지혜와 전수";
  return "완성과 여유";
}

/**
 * MBTI-사주 융합 분석 (대폭 확장)
 */
function generateMBTISajuFusion(mbtiType, sajuData) {
  const dayMaster = sajuData.dayMaster;
  const dayMasterNames = ['갑목', '을목', '병화', '정화', '무토', '기토', '경금', '신금', '임수', '계수'];
  
  return {
    compatibility: `${mbtiType}와 ${dayMasterNames[dayMaster]}의 조합은 현대적 심리학과 전통 사주학이 만나는 독특한 시너지를 보여줍니다.`,
    synergy: {
      cognitive: `${mbtiType}의 인지적 특성과 사주의 에너지적 특성이 조화를 이루어 독특한 사고 패턴을 만듭니다.`,
      emotional: `감정 처리 방식에서 현대적 성격 유형과 전통적 기질이 균형을 이룹니다.`,
      behavioral: `행동 양식에서 두 시스템의 특성이 통합되어 나타납니다.`
    },
    guidance: {
      daily: "일상생활에서 MBTI의 장점을 활용하되, 사주의 균형을 고려한 선택을 하세요.",
      career: "직업 선택에서 MBTI 적성과 사주의 운명적 방향을 모두 고려하면 더 좋은 결과를 얻을 수 있습니다.",
      relationships: "인간관계에서 MBTI의 소통 방식과 사주의 인연 패턴을 이해하면 더 조화로운 관계를 만들 수 있습니다."
    },
    uniqueness: `${mbtiType}와 ${dayMasterNames[dayMaster]}의 조합은 전 세계적으로 매우 드문 독특한 조합으로, 당신만의 특별한 매력과 능력을 만들어냅니다.`,
    development: {
      strengths: "두 시스템의 강점을 모두 활용하여 균형잡힌 성장을 이룰 수 있습니다.",
      integration: "현대적 자기계발과 전통적 수양을 함께 실천하면 더욱 완전한 자아실현이 가능합니다."
    }
  };
}

/**
 * 건강 분석 생성 (확장)
 */
function generateHealthAnalysis(sajuData, mbtiType, birthInfo) {
  const dayMaster = sajuData.dayMaster;
  const age = new Date().getFullYear() - birthInfo.year + 1;
  
  return {
    constitution: `전반적으로 건강한 체질을 가지고 있으며, ${age}세인 현재 건강 관리에 적극적으로 신경써야 할 시기입니다.`,
    strengths: "좋은 회복력과 면역력을 가지고 있으며, 꾸준한 관리로 더욱 건강해질 수 있습니다.",
    cautions: "스트레스 관리와 규칙적인 생활이 중요하며, 특히 현재 연령대에서 주의해야 할 건강 요소들이 있습니다.",
    recommendations: {
      exercise: "규칙적인 운동을 통해 체력을 유지하고, 특히 유산소 운동과 근력 운동을 병행하세요.",
      diet: "균형잡힌 식단을 유지하고, 자신의 체질에 맞는 음식을 선택하세요.",
      lifestyle: "충분한 수면과 휴식을 취하고, 스트레스를 적절히 관리하세요."
    },
    seasonal: {
      spring: "봄에는 해독과 정화에 신경쓰고, 새로운 건강 습관을 시작하기 좋은 시기입니다.",
      summer: "여름에는 수분 섭취와 체온 조절에 주의하고, 활발한 활동을 통해 에너지를 발산하세요.",
      autumn: "가을에는 면역력 강화와 겨울 준비에 집중하세요.",
      winter: "겨울에는 보온과 영양 공급에 신경쓰고, 적절한 실내 운동을 유지하세요."
    },
    ageSpecific: `${age}세인 현재, 특히 주의해야 할 건강 관리 포인트와 권장 사항들을 참고하여 건강한 생활을 유지하세요.`,
    mentalHealth: `${mbtiType} 성향에 맞는 스트레스 해소 방법을 찾고, 정신적 건강도 함께 관리하는 것이 중요합니다.`
  };
}

/**
 * 직업 가이드 생성 (확장)
 */
function generateCareerGuidance(sajuData, mbtiType) {
  const dayMaster = sajuData.dayMaster;
  const dayMasterNames = ['갑목', '을목', '병화', '정화', '무토', '기토', '경금', '신금', '임수', '계수'];
  
  // 일간별 직업 적성 매핑
  const careerByDayMaster = {
    0: { // 갑목
      best: ["CEO", "기업가", "정치가", "교육자", "환경운동가", "건축가"],
      good: ["변호사", "의사", "공무원", "군인", "엔지니어", "프로젝트 매니저"],
      avoid: ["단순반복업무", "매우 세밀한 수공업", "완전히 혼자 하는 일"]
    },
    1: { // 을목
      best: ["예술가", "디자이너", "상담사", "간병인", "플로리스트", "인테리어 디자이너"],
      good: ["교사", "사회복지사", "미용사", "요리사", "마케터", "HR 전문가"],
      avoid: ["매우 강압적인 환경", "극도로 경쟁적인 업무", "감정을 억제해야 하는 일"]
    },
    2: { // 병화
      best: ["연예인", "방송인", "마케터", "영업직", "이벤트 기획자", "강사"],
      good: ["홍보 전문가", "컨설턴트", "여행 가이드", "스포츠 지도자", "쇼핑몰 운영"],
      avoid: ["매우 조용한 환경", "혼자만 하는 연구직", "표현이 제한적인 업무"]
    },
    3: { // 정화
      best: ["전문의", "연구원", "작가", "큐레이터", "보석상", "고급 요리사"],
      good: ["회계사", "감정사", "편집자", "번역가", "품질관리 전문가"],
      avoid: ["시끄러운 환경", "대충해도 되는 일", "품질을 중시하지 않는 업무"]
    },
    4: { // 무토
      best: ["부동산업", "건설업", "은행업", "보험업", "공무원", "농업"],
      good: ["회계사", "세무사", "물류업", "제조업", "호텔업", "레스토랑"],
      avoid: ["매우 불안정한 업무", "계속 변화하는 환경", "즉흥적 판단이 필요한 일"]
    },
    5: { // 기토
      best: ["농업", "식품업", "육아 관련업", "상담업", "복지업", "종교인"],
      good: ["간호사", "영양사", "펜션 운영", "카페 운영", "반려동물 관련업"],
      avoid: ["매우 경쟁적인 환경", "남을 해쳐야 하는 업무", "감정적 배려가 없는 일"]
    },
    6: { // 경금
      best: ["법조인", "군인", "경찰", "외과의", "기계공학자", "도검 관련업"],
      good: ["검사", "감사", "보안업", "무기 제조업", "정밀기계업"],
      avoid: ["애매모호한 업무", "타협이 많이 필요한 일", "감정적 배려가 주요한 업무"]
    },
    7: { // 신금
      best: ["보석상", "시계상", "정밀기기업", "치과의사", "성형외과의", "귀금속업"],
      good: ["장신구 디자이너", "정밀 가공업", "미용업", "악기 제조업"],
      avoid: ["대충해도 되는 일", "품질을 중시하지 않는 업무", "거친 환경의 일"]
    },
    8: { // 임수
      best: ["학자", "연구원", "철학자", "컨설턴트", "해운업", "수산업"],
      good: ["교수", "작가", "번역가", "국제무역업", "여행업", "음료업"],
      avoid: ["매우 단순한 업무", "깊이 있는 사고가 불필요한 일", "피상적인 관계의 업무"]
    },
    9: { // 계수
      best: ["예술가", "음악가", "점술가", "심리상담사", "영상 제작자", "게임 개발자"],
      good: ["광고 기획자", "소설가", "패션 디자이너", "화장품업", "향수업"],
      avoid: ["매우 틀에 박힌 일", "창의성이 전혀 필요없는 업무", "감성이 배제된 일"]
    }
  };

  const careerData = careerByDayMaster[dayMaster] || careerByDayMaster[0];
  
  return {
    aptitude: `${mbtiType} 성향과 ${dayMasterNames[dayMaster]}의 특성을 종합할 때, ${careerData.best.slice(0, 2).join(', ')} 등의 분야에서 뛰어난 능력을 발휘할 수 있습니다.`,
    recommendations: {
      primary: careerData.best,
      secondary: careerData.good,
      emerging: ["AI/빅데이터 활용", "친환경 비즈니스", "디지털 헬스케어", "메타버스 콘텐츠", "스마트시티 구축"]
    },
    toAvoid: {
      types: careerData.avoid,
      reason: `${dayMasterNames[dayMaster]}의 성향상 이러한 업무는 스트레스가 클 수 있으며, 본연의 능력을 발휘하기 어렵습니다.`,
      alternatives: `대신 ${careerData.best[0]}이나 ${careerData.good[0]} 같은 분야를 고려해보시기 바랍니다.`
    },
    development: {
      skills: "지속적인 학습과 자기계발을 통해 전문성을 높이고, 특히 리더십과 소통 능력을 강화하세요.",
      network: "다양한 분야의 사람들과 네트워크를 구축하여 기회를 확장하세요.",
      innovation: "변화하는 시대에 맞는 새로운 기술과 트렌드를 습득하세요."
    },
    environment: {
      ideal: "자율성과 창의성이 보장되는 환경에서 최고의 성과를 낼 수 있습니다.",
      teamwork: "협력적인 팀워크를 통해 시너지를 만들어내는 환경을 선호합니다.",
      growth: "지속적인 성장과 발전 기회가 있는 조직에서 만족도가 높습니다."
    },
    entrepreneurship: {
      potential: "창업이나 독립적인 사업에 대한 잠재력이 높으며, 특히 혁신적인 아이디어를 실현하는 분야에서 성공 가능성이 큽니다.",
      considerations: "사업을 시작할 때는 체계적인 계획과 준비가 중요하며, 신뢰할 수 있는 파트너와의 협력이 도움이 됩니다."
    }
  };
}

/**
 * 궁합 분석 생성 (확장)
 */
function generateCompatibilityAnalysis(sajuData, mbtiType, birthInfo) {
  return {
    romantic: {
      general: "연애에서는 서로의 차이점을 인정하고 존중하는 관계가 좋습니다.",
      ideal: "지적이고 창의적인 상대방과 깊이 있는 관계를 형성할 가능성이 높습니다.",
      caution: "너무 완벽을 추구하지 말고, 상대방의 있는 그대로의 모습을 받아들이는 것이 중요합니다."
    },
    friendship: {
      pattern: "진실하고 깊이 있는 우정을 쌓아가는 타입입니다.",
      strength: "친구들에게 신뢰받고 의지가 되는 존재가 될 수 있습니다.",
      development: "다양한 배경을 가진 사람들과 교류하면서 시야를 넓혀나가세요."
    },
    business: {
      partnership: "비즈니스에서는 신뢰를 바탕으로 한 파트너십이 성공 열쇠입니다.",
      leadership: "팀을 이끌 때는 구성원들의 다양성을 인정하고 활용하는 리더십을 발휘하세요.",
      networking: "업계 내 다양한 인맥을 구축하여 협력 기회를 확장하세요."
    },
    family: {
      dynamics: "가족과는 따뜻하고 조화로운 관계를 유지할 수 있습니다.",
      role: "가족 내에서는 조율자나 조언자 역할을 맡는 경우가 많습니다.",
      growth: "가족 관계를 통해 인간적 성장과 성숙을 이룰 수 있습니다."
    },
    general: {
      communication: "소통에서는 진정성과 이해를 바탕으로 한 대화를 중시합니다.",
      conflict: "갈등 상황에서는 논리적이면서도 감정적 배려를 함께 고려하는 해결 방식을 선호합니다.",
      growth: "인간관계를 통해 지속적으로 성장하고 발전해나가는 타입입니다."
    }
  };
}

/**
 * 시기별 대운 분석 생성
 */
function generateTimePeriodAnalysis(sajuData, mbtiType, birthInfo) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthInfo.year + 1;
  
  // 개인별 고유한 운세를 위한 시드
  const seed = sajuData.dayMaster * 100 + birthInfo.year + birthInfo.month + birthInfo.day;
  
  function generatePeriodScore(yearOffset, category) {
    const value = ((seed + yearOffset * 10 + category) * 9301 + 49297) % 100;
    return Math.floor(value % 3); // 0=좋음, 1=보통, 2=주의
  }
  
  function getPeriodAdvice(score, category) {
    const advice = {
      0: { // 좋음
        '직업': '새로운 기회가 많이 찾아올 시기입니다. 적극적으로 도전해보세요.',
        '재물': '투자나 사업 확장에 좋은 때입니다. 계획적으로 접근하세요.',
        '연애': '좋은 인연을 만날 가능성이 높습니다. 적극적으로 만남을 가져보세요.',
        '건강': '체력이 좋은 상태입니다. 새로운 운동을 시작하기 좋은 때입니다.'
      },
      1: { // 보통
        '직업': '안정적인 상태를 유지하며 꾸준히 노력하는 것이 좋습니다.',
        '재물': '큰 투자보다는 안전한 저축과 관리에 집중하세요.',
        '연애': '기존 관계를 더욱 깊게 발전시키는데 집중하세요.',
        '건강': '규칙적인 생활과 적당한 운동으로 건강을 유지하세요.'
      },
      2: { // 주의
        '직업': '신중한 판단이 필요한 시기입니다. 성급한 결정은 피하세요.',
        '재물': '지출 관리에 특히 신경쓰고, 큰 투자는 미루는 것이 좋습니다.',
        '연애': '오해나 갈등이 생길 수 있으니 소통에 더욱 신경쓰세요.',
        '건강': '스트레스 관리와 정기적인 건강검진이 필요한 시기입니다.'
      }
    };
    return advice[score][category] || '균형잡힌 생활을 유지하시기 바랍니다.';
  }
  
  const periods = {
    current: {
      year: currentYear,
      title: `${currentYear}년 (현재 ${age}세)`,
      career: generatePeriodScore(0, 1),
      wealth: generatePeriodScore(0, 2), 
      love: generatePeriodScore(0, 3),
      health: generatePeriodScore(0, 4)
    },
    year1: {
      year: currentYear + 1,
      title: `${currentYear + 1}년 (${age + 1}세)`,
      career: generatePeriodScore(1, 1),
      wealth: generatePeriodScore(1, 2),
      love: generatePeriodScore(1, 3),
      health: generatePeriodScore(1, 4)
    },
    year3: {
      year: currentYear + 3,
      title: `${currentYear + 3}년 (${age + 3}세)`,
      career: generatePeriodScore(3, 1),
      wealth: generatePeriodScore(3, 2),
      love: generatePeriodScore(3, 3),
      health: generatePeriodScore(3, 4)
    },
    year5: {
      year: currentYear + 5,
      title: `${currentYear + 5}년 (${age + 5}세)`,
      career: generatePeriodScore(5, 1),
      wealth: generatePeriodScore(5, 2),
      love: generatePeriodScore(5, 3),
      health: generatePeriodScore(5, 4)
    },
    year10: {
      year: currentYear + 10,
      title: `${currentYear + 10}년 (${age + 10}세)`,
      career: generatePeriodScore(10, 1),
      wealth: generatePeriodScore(10, 2),
      love: generatePeriodScore(10, 3),
      health: generatePeriodScore(10, 4)
    }
  };
  
  // 각 기간별로 세부 조언 추가
  Object.keys(periods).forEach(key => {
    const period = periods[key];
    period.advice = {
      career: getPeriodAdvice(period.career, '직업'),
      wealth: getPeriodAdvice(period.wealth, '재물'),
      love: getPeriodAdvice(period.love, '연애'),
      health: getPeriodAdvice(period.health, '건강')
    };
    
    // 전체적인 운세 평가
    const total = period.career + period.wealth + period.love + period.health;
    if (total <= 4) {
      period.overall = '매우 좋은 시기입니다. 적극적으로 활동하세요.';
    } else if (total <= 6) {
      period.overall = '전반적으로 안정적인 시기입니다.';
    } else {
      period.overall = '신중하게 행동하며 준비하는 시기입니다.';
    }
  });
  
  return periods;
}

/**
 * 종합 점수 계산 (개선된 개인별 차별화 알고리즘)
 */
function calculateFortuneScores(sajuData, mbtiType) {
  // 더 복잡하고 개인별로 차별화된 시드값 계산
  const basicSeed = sajuData.dayMaster * 1000 + 
                   (sajuData.pillars.year.stem * 100) + 
                   (sajuData.pillars.year.branch * 10) +
                   sajuData.pillars.month.stem;
                   
  const advancedSeed = basicSeed + 
                      (sajuData.pillars.month.branch * 50) +
                      (sajuData.pillars.day.stem * 25) +
                      (sajuData.pillars.day.branch * 7) +
                      (sajuData.pillars.time.stem * 3) +
                      sajuData.pillars.time.branch;
  
  // MBTI도 점수 계산에 반영
  const mbtiHash = mbtiType.split('').reduce((hash, char) => {
    return hash + char.charCodeAt(0);
  }, 0);
  
  const finalSeed = advancedSeed + mbtiHash * 17;
  
  // 더 정교한 유사 랜덤 점수 생성 함수
  function generateScore(base, range, offset, category) {
    // 각 카테고리별로 다른 알고리즘 사용
    let multiplier, additive;
    
    switch(category) {
      case 'overall':
        multiplier = 9301;
        additive = 49297;
        break;
      case 'love':
        multiplier = 7919;
        additive = 65537;
        break;
      case 'career':
        multiplier = 8191;
        additive = 32771;
        break;
      case 'health':
        multiplier = 6151;
        additive = 98317;
        break;
      case 'wealth':
        multiplier = 5381;
        additive = 76543;
        break;
      default:
        multiplier = 9301;
        additive = 49297;
    }
    
    const value = ((finalSeed + offset) * multiplier + additive) % 982451;
    const normalized = value / 982451;
    
    // 일간별 특성도 반영
    let dayMasterBonus = 0;
    if (category === 'career' && sajuData.dayMaster === 0) dayMasterBonus = 3; // 갑목은 직업운 약간 상승
    if (category === 'love' && sajuData.dayMaster === 2) dayMasterBonus = 2;   // 병화는 연애운 약간 상승
    if (category === 'health' && sajuData.dayMaster === 4) dayMasterBonus = 2; // 무토는 건강운 약간 상승
    if (category === 'wealth' && sajuData.dayMaster === 6) dayMasterBonus = 3; // 경금은 재물운 약간 상승
    
    // 오행 균형도 점수에 반영
    const balanceBonus = sajuData.fiveElements.balance > 80 ? 2 : 
                        sajuData.fiveElements.balance > 60 ? 1 : 0;
    
    return Math.min(Math.floor(normalized * range) + base + dayMasterBonus + balanceBonus, base + range - 1);
  }
  
  return {
    overall: generateScore(75, 20, 137, 'overall'),  // 75-94 사이
    love: generateScore(70, 25, 251, 'love'),        // 70-94 사이  
    career: generateScore(80, 15, 389, 'career'),    // 80-94 사이
    health: generateScore(75, 20, 467, 'health'),    // 75-94 사이
    wealth: generateScore(70, 25, 523, 'wealth')     // 70-94 사이
  };
}

// 전역 함수로 내보내기
window.generatePersonalAnalysis = generatePersonalAnalysis;
window.PersonalAnalysis = {
  generatePersonalAnalysis,
  calculateFortuneScores
};