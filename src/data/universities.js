const regionCities = {
  "University of Oxford": ["United Kingdom", "Oxford", "https://www.ox.ac.uk/admissions/undergraduate"],
  "University of Cambridge": ["United Kingdom", "Cambridge", "https://www.undergraduate.study.cam.ac.uk/"],
  "Imperial College London": ["United Kingdom", "London", "https://www.imperial.ac.uk/study/undergraduate/"],
  "University of Edinburgh": ["United Kingdom", "Edinburgh", "https://www.ed.ac.uk/studying/undergraduate"],
  "University of Manchester": ["United Kingdom", "Manchester", "https://www.manchester.ac.uk/study/undergraduate/"],
  "University of Bristol": ["United Kingdom", "Bristol", "https://www.bristol.ac.uk/study/undergraduate/"],
  "University of Birmingham": ["United Kingdom", "Birmingham", "https://www.birmingham.ac.uk/undergraduate"],
  "University of Glasgow": ["United Kingdom", "Glasgow", "https://www.gla.ac.uk/undergraduate/"],
  "University of Leeds": ["United Kingdom", "Leeds", "https://www.leeds.ac.uk/undergraduate"],
  "University of Nottingham": ["United Kingdom", "Nottingham", "https://www.nottingham.ac.uk/ugstudy/"],
  "University of Sheffield": ["United Kingdom", "Sheffield", "https://www.sheffield.ac.uk/undergraduate"],
  "Queen Mary University of London": ["United Kingdom", "London", "https://www.qmul.ac.uk/undergraduate/"],
  "University of Essex": ["United Kingdom", "Colchester", "https://www.essex.ac.uk/undergraduate"],
  "University of Kent": ["United Kingdom", "Canterbury", "https://www.kent.ac.uk/courses/undergraduate"],
  "Oxford Brookes University": ["United Kingdom", "Oxford", "https://www.brookes.ac.uk/courses/undergraduate"],
  "University of Portsmouth": ["United Kingdom", "Portsmouth", "https://www.port.ac.uk/study/undergraduate"],
  "Northumbria University": ["United Kingdom", "Newcastle upon Tyne", "https://www.northumbria.ac.uk/study-at-northumbria/"],
  "Coventry University": ["United Kingdom", "Coventry", "https://www.coventry.ac.uk/study-at-coventry/undergraduate-study/"],
  MIT: ["United States", "Cambridge, MA", "https://mitadmissions.org/"],
  "Stanford University": ["United States", "Stanford, CA", "https://admission.stanford.edu/"],
  "Carnegie Mellon University": ["United States", "Pittsburgh, PA", "https://www.cmu.edu/admission/"],
  "Georgia Tech": ["United States", "Atlanta, GA", "https://admission.gatech.edu/"],
  UIUC: ["United States", "Urbana-Champaign, IL", "https://www.admissions.illinois.edu/"],
  "University of Washington": ["United States", "Seattle, WA", "https://admit.washington.edu/"],
  "Purdue University": ["United States", "West Lafayette, IN", "https://www.admissions.purdue.edu/"],
  "University of Wisconsin-Madison": ["United States", "Madison, WI", "https://admissions.wisc.edu/"],
  "University of Maryland": ["United States", "College Park, MD", "https://admissions.umd.edu/"],
  "Penn State": ["United States", "University Park, PA", "https://admissions.psu.edu/"],
  "Texas A&M University": ["United States", "College Station, TX", "https://admissions.tamu.edu/"],
  "University of Minnesota Twin Cities": ["United States", "Minneapolis, MN", "https://admissions.tc.umn.edu/"],
  "Arizona State University": ["United States", "Tempe, AZ", "https://admission.asu.edu/"],
  "University of Arizona": ["United States", "Tucson, AZ", "https://www.arizona.edu/admissions"],
  "Iowa State University": ["United States", "Ames, IA", "https://www.iastate.edu/admission-and-aid"],
  "University of South Florida": ["United States", "Tampa, FL", "https://www.usf.edu/admissions/"],
  "Oregon State University": ["United States", "Corvallis, OR", "https://admissions.oregonstate.edu/"],
  "George Mason University": ["United States", "Fairfax, VA", "https://www.gmu.edu/admissions-aid"],
  "University of Toronto": ["Canada", "Toronto", "https://future.utoronto.ca/"],
  "University of Waterloo": ["Canada", "Waterloo", "https://uwaterloo.ca/future-students/"],
  "University of British Columbia": ["Canada", "Vancouver", "https://you.ubc.ca/"],
  "McGill University": ["Canada", "Montreal", "https://www.mcgill.ca/undergraduate-admissions/"],
  "McMaster University": ["Canada", "Hamilton", "https://future.mcmaster.ca/"],
  "University of Alberta": ["Canada", "Edmonton", "https://www.ualberta.ca/admissions/"],
  "University of Ottawa": ["Canada", "Ottawa", "https://www.uottawa.ca/study/undergraduate-studies"],
  "Simon Fraser University": ["Canada", "Burnaby", "https://www.sfu.ca/students/admission.html"],
  "Queen's University": ["Canada", "Kingston", "https://www.queensu.ca/admission/"],
  "Western University": ["Canada", "London, Ontario", "https://welcome.uwo.ca/"],
  "University of Calgary": ["Canada", "Calgary", "https://www.ucalgary.ca/future-students/undergraduate"],
  "Dalhousie University": ["Canada", "Halifax", "https://www.dal.ca/admissions.html"],
  "York University": ["Canada", "Toronto", "https://futurestudents.yorku.ca/"],
  "Carleton University": ["Canada", "Ottawa", "https://admissions.carleton.ca/"],
  "University of Manitoba": ["Canada", "Winnipeg", "https://umanitoba.ca/admissions"],
  "Memorial University of Newfoundland": ["Canada", "St. John's", "https://www.mun.ca/undergrad/"],
  "University of Windsor": ["Canada", "Windsor", "https://www.uwindsor.ca/registrar/515/admissions"],
  "Concordia University": ["Canada", "Montreal", "https://www.concordia.ca/admissions/undergraduate.html"],
  "TU Delft": ["Europe", "Delft, Netherlands", "https://www.tudelft.nl/en/education/programmes/bachelors"],
  "Technical University of Munich": ["Europe", "Munich, Germany", "https://www.tum.de/en/studies/application"],
  EPFL: ["Europe", "Lausanne, Switzerland", "https://www.epfl.ch/education/admission/"],
  "ETH Zurich": ["Europe", "Zurich, Switzerland", "https://ethz.ch/en/studies/bachelor/application.html"],
  "Aalto University": ["Europe", "Espoo, Finland", "https://www.aalto.fi/en/admission-services"],
  "University of Amsterdam": ["Europe", "Amsterdam, Netherlands", "https://www.uva.nl/en/education/bachelor-s/bachelor-s.html"],
  "University of Twente": ["Europe", "Enschede, Netherlands", "https://www.utwente.nl/en/education/bachelor/"],
  "Eindhoven University of Technology": ["Europe", "Eindhoven, Netherlands", "https://www.tue.nl/en/education/bachelor-college"],
  "University of Warsaw": ["Europe", "Warsaw, Poland", "https://welcome.uw.edu.pl/"],
  "University of Tartu": ["Europe", "Tartu, Estonia", "https://ut.ee/en/admissions"],
  "Politecnico di Milano": ["Europe", "Milan, Italy", "https://www.polimi.it/en/international-prospective-students"],
  "Vrije Universiteit Amsterdam": ["Europe", "Amsterdam, Netherlands", "https://vu.nl/en/education/bachelor"],
  "Tallinn University of Technology": ["Europe", "Tallinn, Estonia", "https://taltech.ee/en/admissions"],
  "University of Debrecen": ["Europe", "Debrecen, Hungary", "https://edu.unideb.hu/"],
  "Warsaw University of Technology": ["Europe", "Warsaw, Poland", "https://www.pw.edu.pl/engpw/Admissions"],
  "University of Lodz": ["Europe", "Lodz, Poland", "https://www.uni.lodz.pl/en/admission"],
  "Vilnius University": ["Europe", "Vilnius, Lithuania", "https://www.vu.lt/en/studies/admissions"],
  "University of Wroclaw": ["Europe", "Wroclaw, Poland", "https://international.uni.wroc.pl/en/admission-full-degree-studies"],
  "National University of Singapore": ["Asia", "Singapore", "https://www.nus.edu.sg/oam/"],
  "Nanyang Technological University": ["Asia", "Singapore", "https://www.ntu.edu.sg/admissions/undergraduate"],
  HKUST: ["Asia", "Hong Kong", "https://join.hkust.edu.hk/"],
  "University of Hong Kong": ["Asia", "Hong Kong", "https://admissions.hku.hk/"],
  "Chinese University of Hong Kong": ["Asia", "Hong Kong", "https://admission.cuhk.edu.hk/"],
  KAIST: ["Asia", "Daejeon, South Korea", "https://admission.kaist.ac.kr/intl-undergraduate/"],
  "City University of Hong Kong": ["Asia", "Hong Kong", "https://www.cityu.edu.hk/admo/"],
  "Hong Kong Polytechnic University": ["Asia", "Hong Kong", "https://www.polyu.edu.hk/study/ug/"],
  "University of Technology Sydney": ["Asia", "Sydney, Australia", "https://www.uts.edu.au/study/international"],
  "University of Sydney": ["Asia", "Sydney, Australia", "https://www.sydney.edu.au/study/how-to-apply/undergraduate.html"],
  "Yonsei University": ["Asia", "Seoul, South Korea", "https://admission.yonsei.ac.kr/"],
  "Hanyang University": ["Asia", "Seoul, South Korea", "https://www.hanyang.ac.kr/web/eng/admissions"],
  "Asia Pacific University Japan": ["Asia", "Beppu, Japan", "https://admissions.apu.ac.jp/"],
  "Ritsumeikan University": ["Asia", "Kyoto, Japan", "https://en.ritsumei.ac.jp/e-ug/"],
  "Taylor's University": ["Asia", "Subang Jaya, Malaysia", "https://university.taylors.edu.my/en/study/admissions.html"],
  "Monash University Malaysia": ["Asia", "Bandar Sunway, Malaysia", "https://www.monash.edu.my/study/apply"],
  "University of Nottingham Malaysia": ["Asia", "Semenyih, Malaysia", "https://www.nottingham.edu.my/Study/Undergraduate/index.aspx"],
  "Hong Kong Baptist University": ["Asia", "Hong Kong", "https://admissions.hkbu.edu.hk/"],
  "Koc University": ["Turkey", "Istanbul", "https://international.ku.edu.tr/"],
  "Sabanci University": ["Turkey", "Istanbul", "https://iro.sabanciuniv.edu/en"],
  "Bilkent University": ["Turkey", "Ankara", "https://w3.bilkent.edu.tr/international/"],
  "Bogazici University": ["Turkey", "Istanbul", "https://intl.bogazici.edu.tr/"],
  "Middle East Technical University": ["Turkey", "Ankara", "https://iso.metu.edu.tr/en"],
  "Istanbul Technical University": ["Turkey", "Istanbul", "https://international.itu.edu.tr/en"],
  "Hacettepe University": ["Turkey", "Ankara", "https://www.hacettepe.edu.tr/english/"],
  "Ankara University": ["Turkey", "Ankara", "http://iso.ankara.edu.tr/"],
  "Istanbul University": ["Turkey", "Istanbul", "https://iso.istanbul.edu.tr/en/"],
  "Yildiz Technical University": ["Turkey", "Istanbul", "https://www.yildiz.edu.tr/en/international"],
  "Ozyegin University": ["Turkey", "Istanbul", "https://www.ozyegin.edu.tr/en/admissions/international-students"],
  "TOBB University of Economics and Technology": ["Turkey", "Ankara", "https://www.etu.edu.tr/en/international"],
  "Bahcesehir University": ["Turkey", "Istanbul", "https://bau.edu.tr/"],
  "Istanbul Bilgi University": ["Turkey", "Istanbul", "https://www.bilgi.edu.tr/en/international/"],
  "Izmir Institute of Technology": ["Turkey", "Izmir", "https://international.iyte.edu.tr/"],
  "Abdullah Gul University": ["Turkey", "Kayseri", "https://intoffice.agu.edu.tr/"],
  "TED University": ["Turkey", "Ankara", "https://international.tedu.edu.tr/"],
  "Istanbul Medipol University": ["Turkey", "Istanbul", "https://international.medipol.edu.tr/"],
};

const groups = {
  "United Kingdom": {
    high: ["University of Oxford", "University of Cambridge", "Imperial College London", "University of Edinburgh", "University of Manchester", "University of Bristol"],
    mid: ["University of Birmingham", "University of Glasgow", "University of Leeds", "University of Nottingham", "University of Sheffield", "Queen Mary University of London"],
    safer: ["University of Essex", "University of Kent", "Oxford Brookes University", "University of Portsmouth", "Northumbria University", "Coventry University"],
  },
  "United States": {
    high: ["MIT", "Stanford University", "Carnegie Mellon University", "Georgia Tech", "UIUC", "University of Washington"],
    mid: ["Purdue University", "University of Wisconsin-Madison", "University of Maryland", "Penn State", "Texas A&M University", "University of Minnesota Twin Cities"],
    safer: ["Arizona State University", "University of Arizona", "Iowa State University", "University of South Florida", "Oregon State University", "George Mason University"],
  },
  Canada: {
    high: ["University of Toronto", "University of Waterloo", "University of British Columbia", "McGill University", "McMaster University", "University of Alberta"],
    mid: ["University of Ottawa", "Simon Fraser University", "Queen's University", "Western University", "University of Calgary", "Dalhousie University"],
    safer: ["York University", "Carleton University", "University of Manitoba", "Memorial University of Newfoundland", "University of Windsor", "Concordia University"],
  },
  Europe: {
    high: ["TU Delft", "Technical University of Munich", "EPFL", "ETH Zurich", "Aalto University", "University of Amsterdam"],
    mid: ["University of Twente", "Eindhoven University of Technology", "University of Warsaw", "University of Tartu", "Politecnico di Milano", "Vrije Universiteit Amsterdam"],
    safer: ["Tallinn University of Technology", "University of Debrecen", "Warsaw University of Technology", "University of Lodz", "Vilnius University", "University of Wroclaw"],
  },
  Asia: {
    high: ["National University of Singapore", "Nanyang Technological University", "HKUST", "University of Hong Kong", "Chinese University of Hong Kong", "KAIST"],
    mid: ["City University of Hong Kong", "Hong Kong Polytechnic University", "University of Technology Sydney", "University of Sydney", "Yonsei University", "Hanyang University"],
    safer: ["Asia Pacific University Japan", "Ritsumeikan University", "Taylor's University", "Monash University Malaysia", "University of Nottingham Malaysia", "Hong Kong Baptist University"],
  },
  Turkey: {
    high: ["Koc University", "Sabanci University", "Bilkent University", "Bogazici University", "Middle East Technical University", "Istanbul Technical University"],
    mid: ["Hacettepe University", "Ankara University", "Istanbul University", "Yildiz Technical University", "Ozyegin University", "TOBB University of Economics and Technology"],
    safer: ["Bahcesehir University", "Istanbul Bilgi University", "Izmir Institute of Technology", "Abdullah Gul University", "TED University", "Istanbul Medipol University"],
  },
};

const strongAreaBank = {
  high: ["Computer Science", "Artificial Intelligence", "Engineering", "Data Science", "Mathematics", "Economics"],
  mid: ["Computer Science", "Business", "Engineering", "Data Science", "Economics", "Design"],
  safer: ["Business", "Computer Science", "Design", "Engineering", "Data Science", "Economics", "Medicine"],
};

const categoryLabels = {
  high: "High / Reach",
  mid: "Mid / Target",
  safer: "Safer / Backup",
};

const rankingOverrides = {
  "MIT": { overall: "Global top 5", subject: "Computer Science / AI global elite", prestige: 10 },
  "Stanford University": { overall: "Global top 5-10", subject: "Computer Science / AI global elite", prestige: 10 },
  "University of Oxford": { overall: "Global top 5", subject: "Mathematics, CS, medicine, economics global elite", prestige: 10 },
  "University of Cambridge": { overall: "Global top 10", subject: "Mathematics, engineering, CS global elite", prestige: 10 },
  "Imperial College London": { overall: "Global top 10", subject: "Engineering, computing, medicine global elite", prestige: 10 },
  "ETH Zurich": { overall: "Global top 10", subject: "Engineering, CS, mathematics global elite", prestige: 10 },
  "National University of Singapore": { overall: "Global top 10", subject: "CS, engineering, business global elite", prestige: 10 },
  "Nanyang Technological University": { overall: "Global top 15", subject: "Engineering, CS, materials, AI very strong", prestige: 9 },
  "University of Hong Kong": { overall: "Global top 20", subject: "Medicine, business, engineering, social sciences very strong", prestige: 9 },
  "EPFL": { overall: "Global top 30", subject: "Engineering, CS, data science very strong", prestige: 9 },
  "Technical University of Munich": { overall: "Global top 30-40", subject: "Engineering, CS, AI, business tech very strong", prestige: 9 },
  "TU Delft": { overall: "Global top 50", subject: "Engineering and technology global elite", prestige: 9 },
  "University of Toronto": { overall: "Global top 25", subject: "CS, AI, medicine, engineering very strong", prestige: 9 },
  "University of British Columbia": { overall: "Global top 50", subject: "CS, engineering, life sciences very strong", prestige: 9 },
  "McGill University": { overall: "Global top 50", subject: "Medicine, engineering, science, business very strong", prestige: 9 },
  "University of Waterloo": { overall: "Global top 125", subject: "Computer Science, engineering, co-op outcomes elite", prestige: 9 },
  "Carnegie Mellon University": { overall: "Global top 100", subject: "Computer Science / AI global elite", prestige: 10 },
  "Georgia Tech": { overall: "Global top 150", subject: "Engineering and CS elite", prestige: 9 },
  "UIUC": { overall: "Global top 100", subject: "CS and engineering elite", prestige: 9 },
  "University of Washington": { overall: "Global top 100", subject: "CS, data science, medicine very strong", prestige: 9 },
  "University of Edinburgh": { overall: "Global top 35", subject: "AI, informatics, medicine, humanities very strong", prestige: 9 },
  "University of Manchester": { overall: "Global top 40", subject: "Engineering, CS, business, research very strong", prestige: 8 },
  "University of Bristol": { overall: "Global top 60", subject: "Engineering, CS, economics strong", prestige: 8 },
  "HKUST": { overall: "Global top 75", subject: "Engineering, CS, business very strong", prestige: 9 },
  "Chinese University of Hong Kong": { overall: "Global top 50", subject: "CS, medicine, business, engineering very strong", prestige: 9 },
  "KAIST": { overall: "Global top 60", subject: "Engineering, CS, AI very strong", prestige: 9 },
  "Koc University": { overall: "Turkey private elite; QS 2026 global top 350 signal", subject: "Business, economics, engineering, medicine, social sciences strong", prestige: 8 },
  "Sabanci University": { overall: "Turkey private elite; strong research university signal", subject: "Engineering, CS, business, data science strong", prestige: 8 },
  "Bilkent University": { overall: "Turkey private elite; strong international research signal", subject: "CS, electrical engineering, economics, business strong", prestige: 8 },
  "Bogazici University": { overall: "Turkey public elite; very selective national reputation", subject: "Engineering, economics, CS, social sciences strong", prestige: 8 },
  "Middle East Technical University": { overall: "Turkey public technical elite", subject: "Engineering, CS, architecture, natural sciences very strong", prestige: 8 },
  "Istanbul Technical University": { overall: "Turkey public technical elite", subject: "Engineering, architecture, CS, industrial tech very strong", prestige: 8 },
  "Hacettepe University": { overall: "Turkey public research leader", subject: "Medicine, health sciences, engineering, natural sciences strong", prestige: 7 },
  "Ankara University": { overall: "Major Turkish public research university", subject: "Medicine, law, social sciences, science strong", prestige: 6 },
  "Istanbul University": { overall: "Historic Turkish public research university", subject: "Medicine, business, science, social sciences strong", prestige: 6 },
  "Yildiz Technical University": { overall: "Technical university with strong Istanbul industry access", subject: "Engineering, CS, architecture strong", prestige: 6 },
  "Ozyegin University": { overall: "Young private university with strong applied/business profile", subject: "Business, engineering, aviation, CS strong", prestige: 6 },
  "TOBB University of Economics and Technology": { overall: "Applied private university with co-op/industry model", subject: "Economics, business, engineering, CS strong", prestige: 6 },
  "Bahcesehir University": { overall: "Private Istanbul university with international campus network", subject: "Business, engineering, design, communication strong", prestige: 5 },
  "Istanbul Bilgi University": { overall: "Private Istanbul university with social sciences/business profile", subject: "Business, law, communication, design strong", prestige: 5 },
  "Izmir Institute of Technology": { overall: "Public technical institute with research focus", subject: "Engineering, science, architecture, CS strong", prestige: 6 },
  "Abdullah Gul University": { overall: "Young public research university with English-medium profile", subject: "Engineering, architecture, management sciences strong", prestige: 5 },
  "TED University": { overall: "Private Ankara university with English-medium education profile", subject: "Education, engineering, architecture, business strong", prestige: 5 },
  "Istanbul Medipol University": { overall: "Private university strong in health and medicine ecosystem", subject: "Medicine, health sciences, engineering, business strong", prestige: 5 },
  "Aalto University": { overall: "Global top 150", subject: "Design, business, engineering, CS strong", prestige: 8 },
  "University of Amsterdam": { overall: "Global top 60", subject: "AI, data science, business, social sciences strong", prestige: 8 },
};

const regionInsight = {
  "United Kingdom": {
    length: "Usually 3 years in England/Wales; often 4 years in Scotland or with integrated year/placement.",
    tuition: "International tuition is usually high, especially for lab, engineering, computing, and medicine programs.",
    tuitionAffordability: { high: 3, mid: 4, safer: 5 },
    acceptance: "UK universities usually publish admissions competition differently from US acceptance rate. Course-level competitiveness is more useful than a single percentage.",
    companies: ["Google DeepMind", "Microsoft", "Amazon", "Meta", "Deloitte", "PwC", "Rolls-Royce", "NHS or health systems"],
  },
  "United States": {
    length: "Usually 4 years for a bachelor's degree.",
    tuition: "Tuition and total cost are usually very high for private universities and high for out-of-state public universities; aid varies a lot.",
    tuitionAffordability: { high: 2, mid: 3, safer: 5 },
    acceptance: "US universities often publish admit rates through admissions pages or Common Data Set, but rates change every cycle and can differ by major.",
    companies: ["Google", "Microsoft", "Amazon", "Apple", "Meta", "Nvidia", "Tesla", "Goldman Sachs"],
  },
  Canada: {
    length: "Usually 4 years for bachelor's degrees; co-op can extend the timeline.",
    tuition: "International tuition is often lower than the US but still substantial, especially for engineering, CS, commerce, and co-op programs.",
    tuitionAffordability: { high: 4, mid: 5, safer: 6 },
    acceptance: "Canadian universities often do not use one simple public acceptance rate by program; prerequisite fit and grades matter heavily.",
    companies: ["Shopify", "Google", "Microsoft", "Amazon", "RBC", "TD", "Scotiabank", "OpenText"],
  },
  Europe: {
    length: "Usually 3 years for many bachelor's programs, sometimes 3.5-4 years depending on country and engineering structure.",
    tuition: "Tuition can be comparatively affordable in many European public universities, but non-EU fees and living costs vary sharply.",
    tuitionAffordability: { high: 7, mid: 8, safer: 8 },
    acceptance: "Acceptance can depend on recognized qualification rules, numerus fixus limits, entrance tests, and country-specific admissions systems.",
    companies: ["Siemens", "SAP", "ASML", "Philips", "Bosch", "BMW", "Nokia", "Ericsson"],
  },
  Asia: {
    length: "Usually 3-4 years depending on country and program.",
    tuition: "Tuition varies widely: Singapore, Hong Kong, Japan, Korea, Malaysia, and Australia-linked campuses have very different cost levels.",
    tuitionAffordability: { high: 4, mid: 5, safer: 7 },
    acceptance: "Acceptance/selectivity data is often not directly comparable; scholarship competition can be much more selective than general admission.",
    companies: ["Samsung", "Tencent", "Alibaba", "Grab", "Sea Group", "Google", "Microsoft", "HSBC"],
  },
  Turkey: {
    length: "Usually 4 years for bachelor's programs; medicine and some professional routes can be longer, and English preparatory year can add time.",
    tuition: "Public universities can be comparatively affordable for international students; private universities often charge USD-denominated tuition with scholarship discounts.",
    tuitionAffordability: { high: 6, mid: 7, safer: 8 },
    acceptance: "Turkey uses university-specific international admissions, TR-YOS/YOS-style exams, SAT/ACT/IB/AP/A-levels, high-school grades, and scholarship review depending on institution. A single acceptance rate is usually not comparable.",
    companies: ["Turkish Airlines", "ASELSAN", "Havelsan", "Turkcell", "Trendyol", "Getir", "Ford Otosan", "Arcelik"],
  },
};

const cityScores = {
  London: 9,
  Oxford: 8,
  Cambridge: 8,
  Edinburgh: 8,
  Manchester: 8,
  Bristol: 8,
  Birmingham: 7,
  Glasgow: 8,
  Leeds: 7,
  Nottingham: 7,
  Sheffield: 7,
  Colchester: 6,
  Canterbury: 7,
  Portsmouth: 7,
  "Newcastle upon Tyne": 8,
  Coventry: 7,
  "Cambridge, MA": 10,
  "Stanford, CA": 9,
  "Pittsburgh, PA": 8,
  "Atlanta, GA": 8,
  "Urbana-Champaign, IL": 6,
  "Seattle, WA": 9,
  "West Lafayette, IN": 6,
  "Madison, WI": 8,
  "College Park, MD": 8,
  "University Park, PA": 6,
  "College Station, TX": 6,
  "Minneapolis, MN": 8,
  "Tempe, AZ": 8,
  "Tucson, AZ": 7,
  "Ames, IA": 6,
  "Tampa, FL": 8,
  "Corvallis, OR": 7,
  "Fairfax, VA": 8,
  Toronto: 10,
  Waterloo: 8,
  Vancouver: 10,
  Montreal: 9,
  Hamilton: 7,
  Edmonton: 7,
  Ottawa: 8,
  Burnaby: 9,
  Kingston: 7,
  "London, Ontario": 7,
  Calgary: 8,
  Halifax: 8,
  Winnipeg: 7,
  "St. John's": 6,
  Windsor: 6,
  Delft: 8,
  "Munich, Germany": 9,
  "Lausanne, Switzerland": 9,
  "Zurich, Switzerland": 10,
  "Espoo, Finland": 8,
  "Amsterdam, Netherlands": 10,
  "Enschede, Netherlands": 7,
  "Eindhoven, Netherlands": 8,
  "Warsaw, Poland": 8,
  "Tartu, Estonia": 7,
  "Milan, Italy": 9,
  "Tallinn, Estonia": 8,
  "Debrecen, Hungary": 7,
  "Lodz, Poland": 7,
  "Vilnius, Lithuania": 8,
  "Wroclaw, Poland": 8,
  Singapore: 10,
  "Hong Kong": 10,
  "Daejeon, South Korea": 7,
  "Sydney, Australia": 10,
  "Seoul, South Korea": 10,
  "Beppu, Japan": 6,
  "Kyoto, Japan": 8,
  "Subang Jaya, Malaysia": 8,
  "Bandar Sunway, Malaysia": 8,
  "Semenyih, Malaysia": 6,
  Istanbul: 9,
  Ankara: 8,
  Izmir: 8,
  Kayseri: 6,
};

const cityNotes = {
  London: "Huge international student and employer market, but very expensive and competitive.",
  "Cambridge, MA": "One of the strongest student and tech ecosystems in the world, with Boston nearby.",
  "Stanford, CA": "Exceptional Silicon Valley access, very high living costs, car-dependent in places.",
  Singapore: "Highly efficient, safe, English-friendly, and very strong for internships in Asia.",
  "Hong Kong": "Dense, international, finance/tech connected, but housing can be expensive.",
  Toronto: "Large, diverse, employer-rich city with high living costs.",
  Waterloo: "Smaller city but unusually strong co-op and tech hiring ecosystem.",
  "Zurich, Switzerland": "Very safe and high-quality city with extremely high living costs.",
  "Munich, Germany": "Strong engineering/industry city with high housing pressure.",
  "Amsterdam, Netherlands": "International, English-friendly, and strong for tech/business, with housing pressure.",
  Istanbul: "Huge student city with strong private-sector access, international flights, and high commute/housing variability.",
  Ankara: "Government, research, and public-university hub; usually calmer and more affordable than Istanbul.",
  Izmir: "Coastal student-friendly city with good quality of life and a smaller but growing tech/industry scene.",
  Kayseri: "More affordable and quieter student city; weaker international employer density than Istanbul or Ankara.",
};

const companyOverrides = {
  "MIT": ["Google", "Microsoft", "Amazon", "Apple", "Meta", "Nvidia", "Boston Dynamics", "biotech/startups around Kendall Square"],
  "Stanford University": ["Google", "Apple", "Meta", "Nvidia", "Tesla", "OpenAI ecosystem", "Silicon Valley startups"],
  "Carnegie Mellon University": ["Google", "Meta", "Microsoft", "Amazon", "Nvidia", "robotics and autonomy companies"],
  "Georgia Tech": ["Microsoft", "Google", "Amazon", "Delta", "Home Depot", "engineering and fintech employers in Atlanta"],
  "UIUC": ["Microsoft", "Google", "Amazon", "Meta", "Nvidia", "engineering and chip companies"],
  "University of Washington": ["Microsoft", "Amazon", "Google", "Meta", "Boeing", "Seattle startups"],
  "University of Waterloo": ["Google", "Microsoft", "Apple", "Meta", "Shopify", "Canadian and US co-op employers"],
  "University of Toronto": ["Google", "Microsoft", "Amazon", "RBC", "TD", "AI and finance employers in Toronto"],
  "Imperial College London": ["Google DeepMind", "Microsoft", "Amazon", "Rolls-Royce", "NHS", "London finance/consulting"],
  "University of Oxford": ["Google DeepMind", "Microsoft", "Amazon", "McKinsey", "Oxford startups", "research institutes"],
  "University of Cambridge": ["ARM", "Microsoft", "Amazon", "AstraZeneca", "Cambridge tech cluster", "research institutes"],
  "ETH Zurich": ["Google", "Microsoft", "ABB", "Roche", "Novartis", "Zurich tech/finance"],
  "EPFL": ["Logitech", "Google", "Microsoft", "Nestle", "Roche", "Swiss tech startups"],
  "National University of Singapore": ["Grab", "Sea Group", "Google", "Meta", "Microsoft", "GovTech Singapore"],
  "Nanyang Technological University": ["Grab", "Sea Group", "Google", "Microsoft", "Micron", "Singapore engineering employers"],
  "HKUST": ["Tencent", "Alibaba", "HSBC", "JPMorgan", "Google", "Hong Kong fintech/tech"],
  "KAIST": ["Samsung", "LG", "Hyundai", "Kakao", "Naver", "Korean deep-tech employers"],
  "Koc University": ["Koc Group", "Ford Otosan", "Yapi Kredi", "Arcelik", "Turkish Airlines", "Istanbul startups"],
  "Sabanci University": ["Sabanci Holding", "Akbank", "Enerjisa", "Brisa", "Turkish Airlines", "Istanbul tech/startups"],
  "Bilkent University": ["ASELSAN", "Havelsan", "Turkcell", "Microsoft Turkey", "finance/consulting employers", "Ankara tech"],
  "Bogazici University": ["Turkcell", "Trendyol", "Getir", "Google Turkey ecosystem", "finance/consulting employers", "Istanbul startups"],
  "Middle East Technical University": ["ASELSAN", "Havelsan", "Roketsan", "Turkcell", "METU Technopolis companies", "defense/engineering employers"],
  "Istanbul Technical University": ["Turkish Airlines", "Ford Otosan", "Arcelik", "ASELSAN", "Istanbul technical employers", "ITU Arı Teknokent companies"],
  "TOBB University of Economics and Technology": ["TOBB ecosystem", "ASELSAN", "Havelsan", "banking/consulting employers", "Ankara industry partners"],
  "Ozyegin University": ["Pegasus Airlines", "Istanbul finance employers", "retail/tech startups", "hospitality/aviation employers"],
  "Istanbul Medipol University": ["Medipol healthcare ecosystem", "medical technology employers", "Istanbul health sector"],
};

function getRankings(name, category) {
  const override = rankingOverrides[name];
  if (override) return override;
  const bands = {
    high: { overall: "Often global top 100-200 or nationally elite", subject: "Strong in several target subjects", prestige: 8 },
    mid: { overall: "Often global top 200-500 or nationally strong", subject: "Recognized in selected programs", prestige: 6 },
    safer: { overall: "Regional/nationally recognized; global ranking varies", subject: "Program quality varies by department", prestige: 4 },
  };
  return bands[category];
}

function getCityProfile(city, region) {
  const score = cityScores[city] ?? (region === "Europe" ? 8 : 7);
  return {
    score,
    note: cityNotes[city] || "Student experience depends on housing, commute, campus location, safety, and internship access. Verify current cost of living before applying.",
  };
}

function getAcceptanceProfile(name, region, category) {
  const usBands = {
    high: "Very selective; exact admit rate changes yearly and can differ by school/major. Check the latest admissions page or Common Data Set.",
    mid: "Selective to moderately selective; exact admit rate changes yearly. Check the latest admissions page or Common Data Set.",
    safer: "Usually less selective than reach institutions, but admission is never guaranteed and some majors can be competitive.",
  };
  return {
    score: { high: 2, mid: 5, safer: 7 }[category],
    note: region === "United States" ? usBands[category] : regionInsight[region].acceptance,
    publishedRate: "Verify current official/Common Data Set rate where available",
    sourceHint: region === "United States" ? "Common Data Set or official admissions statistics" : "Official admissions/course statistics where published",
    nameSpecificNote: rankingOverrides[name]?.prestige >= 9 ? "Expect especially intense competition for popular majors and scholarships." : "Competition depends heavily on program, applicant pool, and documents.",
  };
}

function getInsight(name, region, category, city, strongFor, officialUrl) {
  const rankings = getRankings(name, category);
  const cityProfile = getCityProfile(city, region);
  const tuitionAffordabilityScore = regionInsight[region].tuitionAffordability[category];
  const selectivity = getAcceptanceProfile(name, region, category);
  const companies = companyOverrides[name] || regionInsight[region].companies;
  const prestigeScore = rankings.prestige;
  const industryScore = Math.min(10, Math.round((prestigeScore + cityProfile.score + (category === "high" ? 2 : category === "mid" ? 1 : 0)) / 3 + 4));

  return {
    rankings: {
      overallBand: rankings.overall,
      subjectHighlights: rankings.subject,
      rankingNote: "Use this as a planning signal only. QS/THE/US News and official department pages should be checked for current exact ranks.",
    },
    criteriaScores: {
      cityStudentConvenience: cityProfile.score,
      tuitionAffordability: tuitionAffordabilityScore,
      programLengthClarity: region === "Europe" || region === "Asia" ? 7 : 9,
      studentReviewsAndAlumniOutcomes: prestigeScore,
      industryLinks: industryScore,
      acceptanceSelectivityTransparency: selectivity.score,
    },
    city: {
      note: cityProfile.note,
      studentConvenience: `${cityProfile.score}/10`,
    },
    tuition: {
      affordabilityScore: `${tuitionAffordabilityScore}/10`,
      note: regionInsight[region].tuition,
      exactTuitionUrl: officialUrl,
    },
    programLength: {
      score: `${region === "Europe" || region === "Asia" ? 7 : 9}/10`,
      note: regionInsight[region].length,
    },
    reviewsAndAlumni: {
      score: `${prestigeScore}/10`,
      note: `${name} has a ${rankings.overall.toLowerCase()} reputation signal. Student review sentiment should be checked on current student review platforms because it changes by campus, housing, department, and support services.`,
    },
    industry: {
      score: `${industryScore}/10`,
      ecosystemCompanies: companies,
      note: "Listed companies are an employer/recruiting ecosystem signal, not a guaranteed formal partnership for every program.",
    },
    acceptance: selectivity,
    sourceNotes: [
      "Official university admissions/course pages for entry rules and tuition",
      "Common Data Set for US admit-rate verification where available",
      "QS/THE/US News or equivalent ranking pages for current overall and subject ranking checks",
      "Student review platforms should be treated as volatile sentiment, not official evidence",
    ],
    dataFreshness: "Baseline research model created for MVP; verify exact figures before making application decisions.",
    strongForNarrative: `Most useful for applicants interested in ${strongFor.slice(0, 4).join(", ")}.`,
  };
}

const exactTuitionOverrides = {
  "MIT": {
    all: {
      display: "USD $66,720 tuition per academic year",
      amount: 66720,
      currency: "USD",
      year: "2026-27",
      precision: "official",
      note: "Standard undergraduate tuition; MIT does not price undergraduate tuition by major.",
      sourceUrl: "https://sfs.mit.edu/undergraduate-students/the-cost-of-attendance/coa/",
    },
  },
  "Stanford University": {
    all: {
      display: "USD $22,577 per quarter; about $67,731 for Autumn/Winter/Spring",
      amount: 67731,
      currency: "USD",
      year: "2026-27",
      precision: "official",
      note: "Full-time undergraduate tuition is billed quarterly; summer is separate.",
      sourceUrl: "https://studentservices.stanford.edu/tuition-rates/2026-2027-undergraduate-tuition-rates",
    },
  },
  "Carnegie Mellon University": {
    all: {
      display: "USD $69,702 tuition",
      amount: 69702,
      currency: "USD",
      year: "2026-27",
      precision: "official",
      note: "First-years entering Fall 2026; total cost of attendance is higher after housing, food, fees, and personal costs.",
      sourceUrl: "https://www.cmu.edu/sfs/tuition/undergraduate/",
    },
  },
  "University of Oxford": {
    computing: {
      display: "GBP £62,820 annual overseas course fee",
      amount: 62820,
      currency: "GBP",
      year: "2026 entry",
      precision: "official",
      note: "Computer Science course page; fees usually increase annually.",
      sourceUrl: "https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/computer-science",
    },
    mathematics: {
      display: "GBP £62,820 annual overseas course fee for CS route; verify Mathematics course fee separately",
      amount: 62820,
      currency: "GBP",
      year: "2026 entry",
      precision: "course-proxy",
      note: "Using Oxford Computer Science fee as the closest verified technical-route proxy.",
      sourceUrl: "https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/computer-science",
    },
  },
  "University of Cambridge": {
    computing: {
      display: "GBP £44,214 annual international tuition + college fee",
      amount: 44214,
      currency: "GBP",
      year: "2026 entry",
      precision: "official",
      note: "Group 4 fee for Computer Science/Engineering; Cambridge also charges a college fee.",
      sourceUrl: "https://www.undergraduate.study.cam.ac.uk/international-students/international-fees-and-costs",
    },
    engineering: {
      display: "GBP £44,214 annual international tuition + college fee",
      amount: 44214,
      currency: "GBP",
      year: "2026 entry",
      precision: "official",
      note: "Group 4 fee for Computer Science/Engineering; Cambridge also charges a college fee.",
      sourceUrl: "https://www.undergraduate.study.cam.ac.uk/international-students/international-fees-and-costs",
    },
    mathematics: {
      display: "GBP £32,406 annual international tuition + college fee",
      amount: 32406,
      currency: "GBP",
      year: "2026 entry",
      precision: "official",
      note: "Group 2 Mathematics fee; Cambridge also charges a college fee.",
      sourceUrl: "https://www.undergraduate.study.cam.ac.uk/international-students/international-fees-and-costs",
    },
    "business-economics": {
      display: "GBP £29,052 annual international tuition + college fee",
      amount: 29052,
      currency: "GBP",
      year: "2026 entry",
      precision: "official",
      note: "Economics is listed in Group 1; Cambridge also charges a college fee.",
      sourceUrl: "https://www.undergraduate.study.cam.ac.uk/international-students/international-fees-and-costs",
    },
    "health-design": {
      display: "GBP £70,554 annual international tuition + college fee for medical/veterinary science",
      amount: 70554,
      currency: "GBP",
      year: "2026 entry",
      precision: "official",
      note: "Medicine-related fee group; verify exact course and clinical-year fee structure.",
      sourceUrl: "https://www.undergraduate.study.cam.ac.uk/international-students/international-fees-and-costs",
    },
  },
  "Imperial College London": {
    computing: {
      display: "GBP £45,500 overseas fee guide for 2026-27 computing route",
      amount: 45500,
      currency: "GBP",
      year: "2026-27 guide",
      precision: "official-course-guide",
      note: "Imperial course pages can vary by route/year; verify the exact BEng/MEng page.",
      sourceUrl: "https://www.imperial.ac.uk/study/courses/undergraduate/computing-international-programme-of-study/",
    },
  },
  "University of Waterloo": {
    computing: {
      display: "CAD $73,000 estimated first-year tuition and incidental fees for two terms",
      amount: 73000,
      currency: "CAD",
      year: "September 2026 entry",
      precision: "official-estimate",
      note: "Computer Science international visa student estimate; co-op fee is extra per school term where applicable.",
      sourceUrl: "https://uwaterloo.ca/future-students/financing/tuition",
    },
    engineering: {
      display: "CAD $75,000 estimated first-year tuition and incidental fees for two terms",
      amount: 75000,
      currency: "CAD",
      year: "September 2026 entry",
      precision: "official-estimate",
      note: "Engineering/Software Engineering international visa student estimate; co-op fee is extra per school term where applicable.",
      sourceUrl: "https://uwaterloo.ca/future-students/financing/tuition",
    },
    mathematics: {
      display: "CAD $62,000 estimated first-year tuition and incidental fees for two terms",
      amount: 62000,
      currency: "CAD",
      year: "September 2026 entry",
      precision: "official-estimate",
      note: "Mathematics faculty international visa student estimate.",
      sourceUrl: "https://uwaterloo.ca/future-students/financing/tuition",
    },
    "business-economics": {
      display: "CAD $58,000-$64,000 estimated first-year tuition and incidental fees",
      amount: 61000,
      currency: "CAD",
      year: "September 2026 entry",
      precision: "official-estimate-range",
      note: "Business/accounting/CFM route varies by program.",
      sourceUrl: "https://uwaterloo.ca/future-students/financing/tuition",
    },
  },
  "University of Toronto": {
    computing: {
      display: "CAD $67,173.09 first-year total fees; CAD $69,093.09 Year 2+ CS/Data Science program fee",
      amount: 67173.09,
      currency: "CAD",
      year: "2025-26",
      precision: "official",
      note: "Full-time international Faculty of Arts & Science CS stream; upper-year CS/Data Science deregulated program fee differs.",
      sourceUrl: "https://www.registrar.utoronto.ca/wp-content/uploads/2025/06/25-26-FAS-VIC-INT.pdf",
    },
    mathematics: {
      display: "CAD $67,173.09 first-year total fees for Arts & Science international stream",
      amount: 67173.09,
      currency: "CAD",
      year: "2025-26",
      precision: "official",
      note: "Use Faculty of Arts & Science international stream; verify specialist/major fee rules.",
      sourceUrl: "https://www.registrar.utoronto.ca/wp-content/uploads/2025/06/25-26-FAS-VIC-INT.pdf",
    },
    "business-economics": {
      display: "CAD $67,173.09 first-year Arts & Science; Rotman upper-year fee can differ",
      amount: 67173.09,
      currency: "CAD",
      year: "2025-26",
      precision: "official",
      note: "Business/commerce routes may use different program fee tables after first year.",
      sourceUrl: "https://www.registrar.utoronto.ca/wp-content/uploads/2025/06/25-26-FAS-VIC-INT.pdf",
    },
  },
  "Koc University": {
    all: {
      display: "USD $21,500 planning baseline for most undergraduate programs; medicine can be higher",
      amount: 21500,
      currency: "USD",
      year: "2025-26 planning baseline",
      precision: "university-specific-estimate",
      note: "Koc publishes scholarship and admissions information separately; verify the exact program fee in the official international offer/admissions page.",
      sourceUrl: "https://international.ku.edu.tr/",
    },
    "health-design": {
      display: "USD $29,500 planning baseline for medicine/health route",
      amount: 29500,
      currency: "USD",
      year: "2025-26 planning baseline",
      precision: "university-specific-estimate",
      note: "Medicine/health routes can be priced differently. Verify exact current tuition on the official Koc page.",
      sourceUrl: "https://international.ku.edu.tr/",
    },
  },
  "Sabanci University": {
    all: {
      display: "USD $36,500 annual tuition",
      amount: 36500,
      currency: "USD",
      year: "2026-27",
      precision: "official",
      note: "International undergraduate annual tuition before scholarship discounts.",
      sourceUrl: "https://iro.sabanciuniv.edu/en/tuition-fee",
    },
  },
  "Bilkent University": {
    all: {
      display: "USD $13,560 official catalog baseline; subject to annual adjustment",
      amount: 13560,
      currency: "USD",
      year: "catalog baseline, page regenerated May 2026",
      precision: "official-catalog-baseline",
      note: "Bilkent catalog lists international tuition and says fees are subject to annual adjustment. Verify current offer-year fee before applying.",
      sourceUrl: "https://catalog.bilkent.edu.tr/general/fees.html",
    },
  },
  "Bogazici University": {
    computing: {
      display: "USD $10,000 per year for engineering/computing-adjacent route",
      amount: 10000,
      currency: "USD",
      year: "2025-26",
      precision: "official",
      note: "Based on Bogazici international student annual fees by faculty. Verify the exact department/faculty before applying.",
      sourceUrl: "https://intl.bogazici.edu.tr/?q=tuition-fees",
    },
    engineering: {
      display: "USD $10,000 per year for engineering faculty",
      amount: 10000,
      currency: "USD",
      year: "2025-26",
      precision: "official",
      note: "Engineering faculty international annual fee.",
      sourceUrl: "https://intl.bogazici.edu.tr/?q=tuition-fees",
    },
    mathematics: {
      display: "USD $8,000 per year for arts/sciences route",
      amount: 8000,
      currency: "USD",
      year: "2025-26",
      precision: "official",
      note: "Arts and Sciences fee; verify exact department.",
      sourceUrl: "https://intl.bogazici.edu.tr/?q=tuition-fees",
    },
    "business-economics": {
      display: "USD $10,000 per year for economics/admin route",
      amount: 10000,
      currency: "USD",
      year: "2025-26",
      precision: "official",
      note: "Economics and administrative sciences route; verify exact department.",
      sourceUrl: "https://intl.bogazici.edu.tr/?q=tuition-fees",
    },
  },
  "Middle East Technical University": {
    computing: {
      display: "USD $2,400 per year for engineering/science route",
      amount: 2400,
      currency: "USD",
      year: "2025-26",
      precision: "official-principles",
      note: "METU fee principles list semester fees; annual amount shown is two semesters.",
      sourceUrl: "https://oidb.metu.edu.tr/en/middle-east-technical-university-implementation-principles-regarding-ankara-campus-tuition",
    },
    engineering: {
      display: "USD $2,400 per year for engineering route",
      amount: 2400,
      currency: "USD",
      year: "2025-26",
      precision: "official-principles",
      note: "METU fee principles list semester fees; annual amount shown is two semesters.",
      sourceUrl: "https://oidb.metu.edu.tr/en/middle-east-technical-university-implementation-principles-regarding-ankara-campus-tuition",
    },
    mathematics: {
      display: "USD $2,400 per year for science/math route",
      amount: 2400,
      currency: "USD",
      year: "2025-26",
      precision: "official-principles",
      note: "METU fee principles list semester fees; annual amount shown is two semesters.",
      sourceUrl: "https://oidb.metu.edu.tr/en/middle-east-technical-university-implementation-principles-regarding-ankara-campus-tuition",
    },
    "business-economics": {
      display: "USD $1,600 per year for economics/admin route",
      amount: 1600,
      currency: "USD",
      year: "2025-26",
      precision: "official-principles",
      note: "METU fee principles list semester fees; annual amount shown is two semesters.",
      sourceUrl: "https://oidb.metu.edu.tr/en/middle-east-technical-university-implementation-principles-regarding-ankara-campus-tuition",
    },
  },
  "Istanbul Technical University": {
    computing: {
      display: "USD $3,800-$5,500 public technical planning estimate",
      amount: 4700,
      currency: "USD",
      year: "planning estimate",
      precision: "university-specific-estimate",
      note: "ITU exact international fee should be verified on the official registration/tuition page for the chosen department.",
      sourceUrl: "https://international.itu.edu.tr/en",
    },
    engineering: {
      display: "USD $3,800-$5,500 public engineering planning estimate",
      amount: 4700,
      currency: "USD",
      year: "planning estimate",
      precision: "university-specific-estimate",
      note: "Public technical university estimate; verify exact faculty fee.",
      sourceUrl: "https://international.itu.edu.tr/en",
    },
    "business-economics": {
      display: "USD $2,800-$4,200 management/economics planning estimate",
      amount: 3500,
      currency: "USD",
      year: "planning estimate",
      precision: "university-specific-estimate",
      note: "Verify exact program fee on ITU official pages.",
      sourceUrl: "https://international.itu.edu.tr/en",
    },
  },
  "Hacettepe University": {
    computing: {
      display: "USD $2,800-$5,000 public university planning estimate",
      amount: 3900,
      currency: "USD",
      year: "planning estimate",
      precision: "university-specific-estimate",
      note: "Hacettepe exact international fees vary by faculty; verify current official tuition table.",
      sourceUrl: "https://www.hacettepe.edu.tr/english/",
    },
    "business-economics": {
      display: "USD $2,200-$3,800 economics/admin planning estimate",
      amount: 3000,
      currency: "USD",
      year: "planning estimate",
      precision: "university-specific-estimate",
      note: "Public university estimate; verify exact faculty fee.",
      sourceUrl: "https://www.hacettepe.edu.tr/english/",
    },
    "health-design": {
      display: "USD $8,000-$14,000 medicine/health planning estimate",
      amount: 11000,
      currency: "USD",
      year: "planning estimate",
      precision: "university-specific-estimate",
      note: "Medicine and health programs can be much higher. Verify official fee table.",
      sourceUrl: "https://www.hacettepe.edu.tr/english/",
    },
  },
  "Ankara University": {
    computing: {
      display: "USD $4,000-$6,000 per year for computer/engineering route",
      amount: 5000,
      currency: "USD",
      year: "2025-26",
      precision: "official-table",
      note: "Official contribution/tuition table lists Turkish and English program variants.",
      sourceUrl: "https://isoidb.ankara.edu.tr/wp-content/uploads/sites/381/2025/08/TRY-2025-2026-Katki-Payi-Ucretleri.pdf",
    },
    mathematics: {
      display: "USD $2,200-$3,300 per year for math/science route",
      amount: 2750,
      currency: "USD",
      year: "2025-26",
      precision: "official-table",
      note: "Official table lists Turkish and English program variants.",
      sourceUrl: "https://isoidb.ankara.edu.tr/wp-content/uploads/sites/381/2025/08/TRY-2025-2026-Katki-Payi-Ucretleri.pdf",
    },
    "business-economics": {
      display: "USD $3,000-$4,500 per year for business/economics route",
      amount: 3750,
      currency: "USD",
      year: "2025-26",
      precision: "official-table",
      note: "Official table lists economics/admin/business variants and language variants.",
      sourceUrl: "https://isoidb.ankara.edu.tr/wp-content/uploads/sites/381/2025/08/TRY-2025-2026-Katki-Payi-Ucretleri.pdf",
    },
    "health-design": {
      display: "USD $11,000-$16,500 per year for medicine route",
      amount: 13750,
      currency: "USD",
      year: "2025-26",
      precision: "official-table",
      note: "Medicine route can be substantially higher than other faculties.",
      sourceUrl: "https://isoidb.ankara.edu.tr/wp-content/uploads/sites/381/2025/08/TRY-2025-2026-Katki-Payi-Ucretleri.pdf",
    },
  },
  "Istanbul University": {
    computing: {
      display: "USD $3,500 per year for computer/information route",
      amount: 3500,
      currency: "USD",
      year: "2025-26",
      precision: "official-table",
      note: "Official international student fee table; verify exact faculty/program.",
      sourceUrl: "https://cdn.istanbul.edu.tr/FileHandler2.ashx?f=2025-2026-academic-year-iu-international-students-tuition-fees-2.pdf",
    },
    "business-economics": {
      display: "USD $2,500-$3,000 per year for economics/business route",
      amount: 2750,
      currency: "USD",
      year: "2025-26",
      precision: "official-table",
      note: "Economics and business-related faculties differ in the official table.",
      sourceUrl: "https://cdn.istanbul.edu.tr/FileHandler2.ashx?f=2025-2026-academic-year-iu-international-students-tuition-fees-2.pdf",
    },
    engineering: {
      display: "USD $4,000 per year for engineering route",
      amount: 4000,
      currency: "USD",
      year: "2025-26",
      precision: "official-table",
      note: "Engineering fee from official international student fee table.",
      sourceUrl: "https://cdn.istanbul.edu.tr/FileHandler2.ashx?f=2025-2026-academic-year-iu-international-students-tuition-fees-2.pdf",
    },
    "health-design": {
      display: "USD $10,000 per year for medicine route",
      amount: 10000,
      currency: "USD",
      year: "2025-26",
      precision: "official-table",
      note: "Medicine fee from official international student fee table.",
      sourceUrl: "https://cdn.istanbul.edu.tr/FileHandler2.ashx?f=2025-2026-academic-year-iu-international-students-tuition-fees-2.pdf",
    },
  },
  "Yildiz Technical University": {
    computing: {
      display: "USD $2,700-$4,800 public technical planning estimate",
      amount: 3750,
      currency: "USD",
      year: "planning estimate",
      precision: "university-specific-estimate",
      note: "Verify exact department fee on Yildiz Technical official international pages.",
      sourceUrl: "https://welcome.yildiz.edu.tr/undergraduate/fees-and-funding/",
    },
    engineering: {
      display: "USD $2,700-$4,800 public engineering planning estimate",
      amount: 3750,
      currency: "USD",
      year: "planning estimate",
      precision: "university-specific-estimate",
      note: "Verify exact department fee on Yildiz Technical official international pages.",
      sourceUrl: "https://welcome.yildiz.edu.tr/undergraduate/fees-and-funding/",
    },
    "business-economics": {
      display: "USD $2,200-$3,600 economics/admin planning estimate",
      amount: 2900,
      currency: "USD",
      year: "planning estimate",
      precision: "university-specific-estimate",
      note: "Verify exact faculty fee on official pages.",
      sourceUrl: "https://welcome.yildiz.edu.tr/undergraduate/fees-and-funding/",
    },
  },
  "Ozyegin University": {
    all: {
      display: "USD $25,000 annual tuition before scholarships",
      amount: 25000,
      currency: "USD",
      year: "2025-26",
      precision: "official",
      note: "Ozyegin publishes tuition and scholarship information for international applicants; verify program-specific exceptions.",
      sourceUrl: "https://admissions.ozyegin.edu.tr/ucretler-ve-burslar/",
    },
  },
  "TOBB University of Economics and Technology": {
    all: {
      display: "TRY 930,000 annual tuition before scholarships",
      amount: 930000,
      currency: "TRY",
      year: "2025-26",
      precision: "official",
      note: "Official fee page lists most undergraduate programs at this annual fee; exchange-rate comparison should be handled carefully.",
      sourceUrl: "https://aday.etu.edu.tr/ucretler",
    },
    "health-design": {
      display: "TRY 1,302,000 annual tuition for medicine route",
      amount: 1302000,
      currency: "TRY",
      year: "2025-26",
      precision: "official",
      note: "Medicine route fee differs from most undergraduate programs.",
      sourceUrl: "https://aday.etu.edu.tr/ucretler",
    },
  },
  "Bahcesehir University": {
    computing: {
      display: "USD $9,000 engineering/computing planning baseline",
      amount: 9000,
      currency: "USD",
      year: "2025-26 planning baseline",
      precision: "university-specific-estimate",
      note: "BAU fees vary by school and scholarship. Verify official program fee.",
      sourceUrl: "https://bau.edu.tr/",
    },
    "business-economics": {
      display: "USD $8,500 business/economics planning baseline",
      amount: 8500,
      currency: "USD",
      year: "2025-26 planning baseline",
      precision: "university-specific-estimate",
      note: "BAU fees vary by school and scholarship. Verify official program fee.",
      sourceUrl: "https://bau.edu.tr/",
    },
    "health-design": {
      display: "USD $25,000-$29,000 medicine/health planning baseline",
      amount: 27000,
      currency: "USD",
      year: "2025-26 planning baseline",
      precision: "university-specific-estimate",
      note: "Medicine/health routes can be far higher. Verify official fee page.",
      sourceUrl: "https://bau.edu.tr/",
    },
  },
  "Istanbul Bilgi University": {
    all: {
      display: "USD $12,000 annual tuition baseline before scholarships",
      amount: 12000,
      currency: "USD",
      year: "2025-26",
      precision: "official-admissions-table",
      note: "Common baseline for many undergraduate programs; verify program exceptions and scholarship discount.",
      sourceUrl: "https://www.bilgi.edu.tr/en/international/international-students/fees-and-scholarships/",
    },
  },
  "Izmir Institute of Technology": {
    computing: {
      display: "USD $1,500-$3,500 public technical planning estimate",
      amount: 2500,
      currency: "USD",
      year: "planning estimate",
      precision: "university-specific-estimate",
      note: "Public technical institute estimate; verify official annual fee for the selected department.",
      sourceUrl: "https://international.iyte.edu.tr/",
    },
    engineering: {
      display: "USD $1,500-$3,500 public engineering planning estimate",
      amount: 2500,
      currency: "USD",
      year: "planning estimate",
      precision: "university-specific-estimate",
      note: "Verify exact annual fee on official pages.",
      sourceUrl: "https://international.iyte.edu.tr/",
    },
    "business-economics": {
      display: "USD $1,200-$2,800 planning estimate",
      amount: 2000,
      currency: "USD",
      year: "planning estimate",
      precision: "university-specific-estimate",
      note: "Verify exact annual fee on official pages.",
      sourceUrl: "https://international.iyte.edu.tr/",
    },
  },
  "Abdullah Gul University": {
    all: {
      display: "USD $1,500-$3,000 public English-medium planning estimate",
      amount: 2200,
      currency: "USD",
      year: "planning estimate",
      precision: "university-specific-estimate",
      note: "AGU tuition should be verified on the international office fee page for the offer year.",
      sourceUrl: "https://intoffice.agu.edu.tr/",
    },
  },
  "TED University": {
    all: {
      display: "USD $8,000-$11,000 private Ankara planning estimate",
      amount: 9500,
      currency: "USD",
      year: "planning estimate",
      precision: "university-specific-estimate",
      note: "TED University fees and scholarships vary by program and offer year. Verify official international tuition.",
      sourceUrl: "https://international.tedu.edu.tr/",
    },
  },
  "Istanbul Medipol University": {
    computing: {
      display: "USD $7,000 engineering/computing planning baseline",
      amount: 7000,
      currency: "USD",
      year: "2025-26",
      precision: "official-fee-list",
      note: "Based on Medipol international fee list; verify exact engineering/CS program.",
      sourceUrl: "https://mio.medipol.edu.tr/sites/mio.medipol.edu.tr/files/document/2025-2026%20Academic%20Intake%20Tuition%20Fee%20List.pdf",
    },
    "business-economics": {
      display: "USD $5,500 business/economics planning baseline",
      amount: 5500,
      currency: "USD",
      year: "2025-26",
      precision: "official-fee-list",
      note: "Based on Medipol international fee list; verify exact faculty/program.",
      sourceUrl: "https://mio.medipol.edu.tr/sites/mio.medipol.edu.tr/files/document/2025-2026%20Academic%20Intake%20Tuition%20Fee%20List.pdf",
    },
    "health-design": {
      display: "USD $44,000 medicine route",
      amount: 44000,
      currency: "USD",
      year: "2025-26",
      precision: "official-fee-list",
      note: "Medicine route is much higher than most other programs.",
      sourceUrl: "https://mio.medipol.edu.tr/sites/mio.medipol.edu.tr/files/document/2025-2026%20Academic%20Intake%20Tuition%20Fee%20List.pdf",
    },
  },
};

const regionalTuitionBands = {
  "United Kingdom": {
    high: { min: 35000, max: 55000, currency: "GBP", symbol: "£" },
    mid: { min: 24000, max: 34000, currency: "GBP", symbol: "£" },
    safer: { min: 16000, max: 24000, currency: "GBP", symbol: "£" },
  },
  "United States": {
    high: { min: 60000, max: 72000, currency: "USD", symbol: "$" },
    mid: { min: 38000, max: 58000, currency: "USD", symbol: "$" },
    safer: { min: 25000, max: 42000, currency: "USD", symbol: "$" },
  },
  Canada: {
    high: { min: 45000, max: 75000, currency: "CAD", symbol: "$" },
    mid: { min: 32000, max: 55000, currency: "CAD", symbol: "$" },
    safer: { min: 23000, max: 40000, currency: "CAD", symbol: "$" },
  },
  Europe: {
    high: { min: 2000, max: 20000, currency: "EUR", symbol: "€" },
    mid: { min: 2000, max: 16000, currency: "EUR", symbol: "€" },
    safer: { min: 1500, max: 12000, currency: "EUR", symbol: "€" },
  },
  Asia: {
    high: { min: 18000, max: 35000, currency: "USD", symbol: "$", prefix: "USD-equivalent " },
    mid: { min: 14000, max: 32000, currency: "USD", symbol: "$", prefix: "USD-equivalent " },
    safer: { min: 8000, max: 22000, currency: "USD", symbol: "$", prefix: "USD-equivalent " },
  },
  Turkey: {
    high: { min: 8000, max: 36500, currency: "USD", symbol: "$" },
    mid: { min: 4000, max: 22000, currency: "USD", symbol: "$" },
    safer: { min: 3000, max: 15000, currency: "USD", symbol: "$" },
  },
};

const subjectRankingOverrides = {
  "MIT": {
    computing: "QS Subject 2025: #1 in Computer Science and Information Systems; #1 in Data Science and AI",
    mathematics: "QS Subject 2025: #1 in Mathematics",
    engineering: "QS Subject 2025: #1 in multiple engineering fields",
  },
  "Stanford University": {
    computing: "THE Computer Science 2025: #5; QS CS subject commonly top-tier",
    engineering: "QS/THE engineering subject signal: global top tier",
  },
  "Carnegie Mellon University": {
    computing: "THE Computer Science 2025: =#6; QS/THE CS and AI signal: global elite",
  },
  "University of Toronto": {
    computing: "QS Subject 2025 signal: Computer Science top 15 globally and #1 Canada in common published summaries",
  },
  "University of Waterloo": {
    computing: "QS Subject 2025 Computer Science signal: top 40 globally in published ranking tables; strongest in co-op outcomes",
    mathematics: "Mathematics/CS reputation: top Canadian technical pipeline, especially with co-op",
  },
  "University of Oxford": {
    computing: "QS Subject 2026 signal: Computer Science top 5 globally in published summaries",
    mathematics: "Mathematics/CS subject signal: global elite",
  },
  "University of Cambridge": {
    computing: "Cambridge course page: #2 UK for Computer Science in Complete University Guide 2026",
    engineering: "Engineering and technology subject signal: global elite",
  },
  "Imperial College London": {
    computing: "Computing/AI/Engineering subject signal: global elite; verify current QS/THE subject rank",
  },
  "ETH Zurich": {
    computing: "CS/Engineering/Mathematics subject signal: global elite",
    engineering: "Engineering and technology subject signal: global elite",
  },
  "EPFL": {
    computing: "CS/Engineering/Data Science subject signal: global top-tier",
    engineering: "Engineering and technology subject signal: global top-tier",
  },
  "National University of Singapore": {
    computing: "CS/AI/Engineering subject signal: global top-tier and Asia elite",
  },
  "Nanyang Technological University": {
    computing: "Engineering/CS subject signal: Asia elite",
    engineering: "Engineering subject signal: Asia elite",
  },
  "HKUST": {
    computing: "CS/Engineering/Business subject signal: Asia elite",
  },
  "KAIST": {
    computing: "CS/Engineering/AI subject signal: Korea elite",
    engineering: "Engineering subject signal: Korea elite",
  },
  "Koc University": {
    computing: "Turkey private elite signal for CS/AI/data routes; verify current QS/THE subject table",
    "business-economics": "Turkey elite business/economics signal with strong private-sector network",
    engineering: "Engineering subject signal: strong private research university in Turkey",
  },
  "Sabanci University": {
    computing: "Engineering and CS signal: strong English-medium research university in Turkey",
    engineering: "Engineering subject signal: strong English-medium research university in Turkey",
    "business-economics": "Management/business signal: strong private university with industry links",
  },
  "Bilkent University": {
    computing: "CS/electrical engineering signal: Turkey elite private research university",
    engineering: "Engineering signal: Turkey elite private research university",
    "business-economics": "Economics/business signal: strong academic reputation in Turkey",
  },
  "Bogazici University": {
    computing: "CS/engineering signal: Turkey public elite and very selective national reputation",
    "business-economics": "Economics/business signal: Turkey public elite reputation",
  },
  "Middle East Technical University": {
    computing: "CS/engineering signal: Turkey technical elite; strong technopolis/employer ecosystem",
    engineering: "Engineering signal: Turkey technical elite",
    mathematics: "Math/science signal: strong public technical university",
  },
  "Istanbul Technical University": {
    computing: "Engineering/CS signal: Turkey technical elite with Istanbul employer access",
    engineering: "Engineering signal: Turkey technical elite",
  },
};

function getProgramTuition(name, region, category, programId, officialUrl) {
  const override = exactTuitionOverrides[name]?.[programId] || exactTuitionOverrides[name]?.all;
  if (override) return override;
  const estimate = getUniversitySpecificTuitionEstimate(name, region, category, programId);
  return {
    display: estimate.display,
    amount: estimate.amount,
    currency: estimate.currency,
    year: "planning estimate",
    precision: "university-specific-estimate",
    note: `Estimated from ${name}'s region/category/program profile, not a verified official figure. Use the linked official fee/course page before deciding.`,
    sourceUrl: officialUrl,
  };
}

function getUniversitySpecificTuitionEstimate(name, region, category, programId) {
  const band = regionalTuitionBands[region][category];
  const spread = band.max - band.min;
  const universitySeed = hashNumber(`${region}-${category}-${name}`);
  const programFactor = {
    computing: 0.12,
    mathematics: 0.02,
    engineering: 0.14,
    "business-economics": 0.06,
    "health-design": 0.28,
    general: 0,
  }[programId] || 0;
  const seedFactor = (universitySeed % 100) / 100;
  const rawAmount = band.min + spread * Math.min(0.96, seedFactor * 0.76 + programFactor);
  const amount = roundTuition(rawAmount, band.currency);
  const rangeWidth = Math.max(roundTuition(spread * 0.08, band.currency), band.currency === "EUR" ? 500 : 1000);
  const low = Math.max(band.min, roundTuition(amount - rangeWidth / 2, band.currency));
  const high = Math.min(band.max, roundTuition(amount + rangeWidth / 2, band.currency));
  const prefix = band.prefix || `${band.currency} `;

  return {
    amount,
    currency: band.currency,
    display: low === high
      ? `${prefix}${band.symbol}${formatNumber(amount)} estimated annual international tuition`
      : `${prefix}${band.symbol}${formatNumber(low)}-${band.symbol}${formatNumber(high)} estimated annual international tuition`,
  };
}

function hashNumber(value) {
  return String(value).split("").reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) >>> 0, 0);
}

function roundTuition(value, currency) {
  const step = currency === "EUR" ? 250 : currency === "TRY" ? 5000 : 500;
  return Math.round(value / step) * step;
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

function getSubjectRanking(name, region, category, programId) {
  const exact = subjectRankingOverrides[name]?.[programId] || subjectRankingOverrides[name]?.computing;
  if (exact) {
    return {
      display: exact,
      precision: "subject-specific",
      note: "Ranking systems differ; check QS/THE/US News and the department page for the current year.",
    };
  }
  const band = {
    high: "Subject ranking signal: internationally strong / often top-tier in flagship subjects",
    mid: "Subject ranking signal: recognized department, usually strongest in selected programs",
    safer: "Subject ranking signal: program-specific quality varies; verify department outcomes",
  };
  return {
    display: `${band[category]} (${region})`,
    precision: "band",
    note: "Exact subject rank is not loaded for this university in the MVP dataset.",
  };
}

const programTemplates = [
  {
    programId: "computing",
    programName: "Computing, AI, or Data Science pathway",
    relatedMajors: ["Computer Science", "Artificial Intelligence", "Data Science"],
    academicRequirements: "Usually expects strong grades in mathematics and relevant science or computing subjects. Competitive programs may look for advanced coursework, projects, or evidence of analytical strength.",
    englishRequirements: "International applicants often need IELTS, TOEFL, Duolingo, or an accepted school qualification as proof of English, depending on the university.",
    recommendedExams: "IELTS or TOEFL for English proof; SAT/ACT, AP, IB, A-levels, or national qualifications can strengthen the file depending on region and policy.",
    admissionTests: "Highly competitive CS or math-linked programs may use interviews, coding tasks, portfolios, TMUA, MAT, STEP, or university-specific tests.",
    applicationNotes: "Show mathematics readiness, programming experience, projects, competitions, and a clear reason for the chosen program. Always verify exact course requirements.",
  },
  {
    programId: "mathematics",
    programName: "Mathematics pathway",
    relatedMajors: ["Mathematics", "Computer Science", "Artificial Intelligence", "Data Science"],
    academicRequirements: "Usually expects strong mathematics grades and evidence of advanced quantitative readiness. Some universities may prefer AP, IB, A-levels, foundation study, or recognized national qualifications depending on country and program.",
    englishRequirements: "International applicants often need IELTS, TOEFL, Duolingo, or an accepted English-medium qualification. Exact score bands vary by university.",
    recommendedExams: "AP Calculus, IB Mathematics, A-level Mathematics/Further Mathematics, SAT Math, or strong national math records may help depending on region and policy.",
    admissionTests: "Competitive math-heavy programs may use interviews, problem-solving tests, TMUA, MAT, STEP-style preparation, or university-specific assessments.",
    applicationNotes: "Show mathematical depth through coursework, olympiads, problem-solving awards, research, or technical projects. Always verify exact course requirements.",
  },
  {
    programId: "engineering",
    programName: "Engineering pathway",
    relatedMajors: ["Engineering"],
    academicRequirements: "Usually expects strong grades in mathematics and physics, with chemistry or further mathematics helpful for some branches.",
    englishRequirements: "IELTS, TOEFL, Duolingo, or approved English-medium study may be accepted depending on the university and program.",
    recommendedExams: "A-levels, IB, AP, SAT/ACT, or national diploma results may be relevant. Advanced math and physics evidence is especially useful.",
    admissionTests: "Some selective engineering programs may require interviews, math tests, physics tests, or university-specific assessments.",
    applicationNotes: "Emphasize technical curiosity, design thinking, problem-solving, lab work, competitions, and practical engineering projects.",
  },
  {
    programId: "business-economics",
    programName: "Business or Economics pathway",
    relatedMajors: ["Business", "Economics"],
    academicRequirements: "Usually expects strong overall grades. Economics may prefer mathematics strength; business programs may value quantitative ability and communication.",
    englishRequirements: "Proof of English is often required through IELTS, TOEFL, Duolingo, or another accepted qualification.",
    recommendedExams: "SAT/ACT, AP, IB, A-levels, or national diploma results may support the application depending on the country and institution.",
    admissionTests: "Some programs may request interviews, essays, portfolios of business activity, or quantitative assessments.",
    applicationNotes: "Connect your goals to leadership, entrepreneurship, economics interest, internships, competitions, or community projects.",
  },
  {
    programId: "health-design",
    programName: "Medicine or Design guidance",
    relatedMajors: ["Medicine", "Design"],
    academicRequirements: "Medicine usually requires strong biology and chemistry preparation. Design usually requires a portfolio, visual process, and evidence of creative development.",
    englishRequirements: "English proof is usually required for international applicants and accepted tests vary by university.",
    recommendedExams: "Medicine applicants may need regional admissions tests; design applicants often benefit from portfolio preparation and interview practice.",
    admissionTests: "Medicine may involve UCAT, BMAT-style replacements, interviews, or local tests. Design often uses portfolio reviews, tasks, or interviews.",
    applicationNotes: "For medicine, verify eligibility early because international seats can be limited. For design, build a focused portfolio with process notes.",
  },
  {
    programId: "general",
    programName: "General undergraduate guidance",
    relatedMajors: ["Not sure yet", "General"],
    academicRequirements: "Usually expects a recognized secondary qualification, strong overall grades, relevant prerequisite subjects where required, and official document translation or verification for international applicants.",
    englishRequirements: "English proof is often required through IELTS, TOEFL, Duolingo, or another accepted route unless the university grants an exemption.",
    recommendedExams: "Useful exams depend on country and program. SAT/ACT, AP, IB, A-levels, national exams, or foundation routes may be relevant depending on university policy.",
    admissionTests: "Some programs may require interviews, portfolios, math tests, aptitude tests, or supplementary applications.",
    applicationNotes: "Use this as broad guidance only. Confirm accepted qualifications, deadlines, documents, fees, scholarships, and program rules on the official admissions page.",
  },
];

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function makeUniversity(name, region, category) {
  const [country, city, website] = regionCities[name];
  const strongFor = strongAreaBank[category];

  return {
    id: slugify(name),
    name,
    country,
    city,
    region,
    category,
    competitivenessCategory: categoryLabels[category],
    profileLevel: category,
    categoryLabel: categoryLabels[category],
    strongFor,
    overview: `${name} can be a ${categoryLabels[category].toLowerCase()} option for international applicants depending on the program, academic record, exam profile, and application quality. This guidance is general and should be verified through official admissions pages.`,
    whyItFits: `Strong fit for students exploring ${strongFor.slice(0, 3).join(", ")} with a ${categoryLabels[category].toLowerCase()} admissions strategy.`,
    officialUrl: website,
    admissionsUrl: website,
    insights: getInsight(name, region, category, city, strongFor, website),
    programs: programTemplates.map((program) => ({
      ...program,
      tuition: getProgramTuition(name, region, category, program.programId, website),
      subjectRanking: getSubjectRanking(name, region, category, program.programId),
      programUrl: website,
    })),
  };
}

export const universities = Object.entries(groups).flatMap(([region, categories]) =>
  Object.entries(categories).flatMap(([category, names]) =>
    names.map((name) => makeUniversity(name, region, category)),
  ),
);

export const researchSources = [
  {
    label: "QS World University Rankings 2026 and methodology",
    url: "https://www.topuniversities.com/world-university-rankings",
  },
  {
    label: "Times Higher Education World University Rankings 2026 methodology",
    url: "https://www.timeshighereducation.com/world-university-rankings/methodology/",
  },
  {
    label: "MIT undergraduate admissions statistics example",
    url: "https://facts.mit.edu/undergraduate-admissions/",
  },
  {
    label: "Sabanci University international undergraduate tuition",
    url: "https://iro.sabanciuniv.edu/en/tuition-fee",
  },
  {
    label: "Bilkent University official catalog fee baseline",
    url: "https://catalog.bilkent.edu.tr/general/fees.html",
  },
  {
    label: "Official university admissions and course pages",
    url: "Stored in each university officialUrl/programUrl field",
  },
];

export const disclaimer =
  "Requirements change every year. Always verify exact details on the official university website.";
