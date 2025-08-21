export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option (0-3)
  explanation: string;
  category: string;
}

export interface QuizLevel {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  unlocked: boolean;
  questions: QuizQuestion[];
  timeLimit: number; // seconds per question
  passingScore: number; // percentage to pass
  bestScore?: number;
  bestTime?: number;
  stars?: number;
}

export const quizLevels: QuizLevel[] = [
  {
    id: 1,
    title: "Faith Foundations",
    difficulty: 'Easy',
    description: "Test your knowledge of basic faith principles",
    unlocked: true,
    timeLimit: 30,
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "According to Pastor Chris, what is the most important foundation for a Christian's life?",
        options: ["Prayer", "Faith", "Love", "Hope"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that faith is the fundamental foundation upon which all Christian living is built.",
        category: "Faith"
      },
      {
        id: 2,
        question: "What does Pastor Chris say about the power of God's Word?",
        options: ["It's just for guidance", "It has creative power", "It's historical only", "It's symbolic"],
        correctAnswer: 1,
        explanation: "Pastor Chris emphasizes that God's Word carries creative power and can transform situations.",
        category: "Word of God"
      },
      {
        id: 3,
        question: "According to Pastor Chris's teachings, what should be our attitude toward prosperity?",
        options: ["It's wrong to desire", "It's God's will for us", "It's only spiritual", "It depends on luck"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that prosperity is God's will for His children in all areas of life.",
        category: "Prosperity"
      },
      {
        id: 4,
        question: "What does Pastor Chris teach about speaking in tongues?",
        options: ["It's not for today", "It's only for apostles", "It's for every believer", "It's optional"],
        correctAnswer: 2,
        explanation: "Pastor Chris teaches that speaking in tongues is available for every believer today.",
        category: "Holy Spirit"
      },
      {
        id: 5,
        question: "According to Pastor Chris, what is the primary purpose of prayer?",
        options: ["To beg God", "To fellowship with God", "To change God's mind", "To get things"],
        correctAnswer: 1,
        explanation: "Pastor Chris emphasizes that prayer is primarily about fellowship and communion with God.",
        category: "Prayer"
      }
    ]
  },
  {
    id: 2,
    title: "Divine Healing",
    difficulty: 'Easy',
    description: "Learn about God's healing power and divine health",
    unlocked: false,
    timeLimit: 30,
    passingScore: 70,
    questions: [
      {
        id: 6,
        question: "What does Pastor Chris teach about divine healing?",
        options: ["It's not God's will", "It's for everyone", "It's rare today", "It's only emotional"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that divine healing is God's will for all His children.",
        category: "Healing"
      },
      {
        id: 7,
        question: "According to Pastor Chris, what is divine health?",
        options: ["Perfect physical condition", "God's nature in us", "Good diet and exercise", "Medical treatment"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that divine health is the life and nature of God functioning in our bodies.",
        category: "Divine Health"
      },
      {
        id: 8,
        question: "What does Pastor Chris say about sickness?",
        options: ["It's God's will", "It's from the devil", "It's natural", "It's punishment"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that sickness is not from God but from the enemy.",
        category: "Healing"
      },
      {
        id: 9,
        question: "How should we receive healing according to Pastor Chris?",
        options: ["By begging God", "By faith", "By works", "By suffering"],
        correctAnswer: 1,
        explanation: "Pastor Chris emphasizes that healing is received by faith in God's Word.",
        category: "Faith"
      },
      {
        id: 10,
        question: "What role does the Holy Spirit play in healing according to Pastor Chris?",
        options: ["No role", "He is the healer", "He gives power", "He decides who gets healed"],
        correctAnswer: 2,
        explanation: "Pastor Chris teaches that the Holy Spirit gives us the power to walk in divine health.",
        category: "Holy Spirit"
      }
    ]
  },
  {
    id: 3,
    title: "Holy Spirit Power",
    difficulty: 'Medium',
    description: "Discover the work and gifts of the Holy Spirit",
    unlocked: false,
    timeLimit: 25,
    passingScore: 75,
    questions: [
      {
        id: 11,
        question: "According to Pastor Chris, who is the Holy Spirit?",
        options: ["A force", "God's power", "The third person of the Trinity", "An angel"],
        correctAnswer: 2,
        explanation: "Pastor Chris teaches that the Holy Spirit is the third person of the Trinity, fully God.",
        category: "Holy Spirit"
      },
      {
        id: 12,
        question: "What does Pastor Chris teach about the baptism of the Holy Spirit?",
        options: ["It's the same as salvation", "It's a separate experience", "It's not real", "It's only for pastors"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that the baptism of the Holy Spirit is a distinct experience from salvation.",
        category: "Holy Spirit"
      },
      {
        id: 13,
        question: "According to Pastor Chris, what are the gifts of the Spirit for?",
        options: ["Personal benefit only", "To show off", "To edify the church", "To judge others"],
        correctAnswer: 2,
        explanation: "Pastor Chris teaches that spiritual gifts are given to edify and build up the church.",
        category: "Spiritual Gifts"
      },
      {
        id: 14,
        question: "What does Pastor Chris say about the fruit of the Spirit?",
        options: ["It's optional", "It's the character of God", "It's earned", "It's temporary"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that the fruit of the Spirit is the character and nature of God manifested in us.",
        category: "Holy Spirit"
      },
      {
        id: 15,
        question: "How should we be led according to Pastor Chris?",
        options: ["By feelings", "By circumstances", "By the Spirit", "By others"],
        correctAnswer: 2,
        explanation: "Pastor Chris emphasizes being led by the Spirit through His Word and inner witness.",
        category: "Guidance"
      }
    ]
  },
  {
    id: 4,
    title: "Prosperity & Success",
    difficulty: 'Medium',
    description: "Understanding biblical prosperity and success",
    unlocked: false,
    timeLimit: 25,
    passingScore: 75,
    questions: [
      {
        id: 16,
        question: "What does Pastor Chris teach about tithing?",
        options: ["It's Old Testament only", "It's a commandment for believers", "It's optional", "It's only for the rich"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that tithing is a biblical principle for believers today.",
        category: "Tithing"
      },
      {
        id: 17,
        question: "According to Pastor Chris, what is true prosperity?",
        options: ["Only money", "Spirit, soul, and body", "Good health only", "Material things only"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that biblical prosperity covers spirit, soul, and body - total well-being.",
        category: "Prosperity"
      },
      {
        id: 18,
        question: "What does Pastor Chris say about giving?",
        options: ["Give only when you have extra", "Give to get", "Give cheerfully and generously", "Give reluctantly"],
        correctAnswer: 2,
        explanation: "Pastor Chris teaches that we should give cheerfully and generously as God has prospered us.",
        category: "Giving"
      },
      {
        id: 19,
        question: "How should Christians view money according to Pastor Chris?",
        options: ["Money is evil", "Money is a tool for Kingdom advancement", "Money is everything", "Money is unimportant"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that money is a tool for advancing God's Kingdom and blessing others.",
        category: "Money"
      },
      {
        id: 20,
        question: "What does Pastor Chris teach about God's blessing?",
        options: ["It's only spiritual", "It makes rich and adds no sorrow", "It's temporary", "It's conditional"],
        correctAnswer: 1,
        explanation: "Pastor Chris quotes Proverbs 10:22 - 'The blessing of the Lord makes rich and adds no sorrow.'",
        category: "Blessing"
      }
    ]
  },
  {
    id: 5,
    title: "Character & Excellence",
    difficulty: 'Medium',
    description: "Building godly character and pursuing excellence",
    unlocked: false,
    timeLimit: 20,
    passingScore: 80,
    questions: [
      {
        id: 21,
        question: "What does Pastor Chris teach about excellence?",
        options: ["It's perfectionism", "It's doing your best with God's ability", "It's competition", "It's showing off"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that excellence is doing your best with the ability God has given you.",
        category: "Excellence"
      },
      {
        id: 22,
        question: "According to Pastor Chris, how should Christians work?",
        options: ["As unto men", "As unto the Lord", "For personal gain only", "Reluctantly"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that Christians should work as unto the Lord, giving their best in everything.",
        category: "Work Ethic"
      },
      {
        id: 23,
        question: "What does Pastor Chris say about integrity?",
        options: ["It's optional", "It's the foundation of character", "It's outdated", "It's weakness"],
        correctAnswer: 1,
        explanation: "Pastor Chris emphasizes that integrity is fundamental to godly character.",
        category: "Character"
      },
      {
        id: 24,
        question: "How should we treat others according to Pastor Chris?",
        options: ["Based on their treatment of us", "With love and respect", "Based on their status", "With suspicion"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we should treat all people with love, respect, and dignity.",
        category: "Relationships"
      },
      {
        id: 25,
        question: "What does Pastor Chris teach about humility?",
        options: ["It's thinking less of yourself", "It's putting God and others first", "It's weakness", "It's self-deprecation"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that true humility is putting God first and considering others.",
        category: "Humility"
      }
    ]
  },
  {
    id: 6,
    title: "Ministry & Leadership",
    difficulty: 'Hard',
    description: "Understanding ministry calling and leadership principles",
    unlocked: false,
    timeLimit: 20,
    passingScore: 80,
    questions: [
      {
        id: 26,
        question: "According to Pastor Chris, what is every believer's calling?",
        options: ["To be a pastor", "To be a minister", "To be silent", "To just attend church"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that every believer is called to ministry in some capacity.",
        category: "Ministry"
      },
      {
        id: 27,
        question: "What does Pastor Chris teach about leadership?",
        options: ["It's about authority", "It's about serving others", "It's about power", "It's about position"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that true leadership is about serving and empowering others.",
        category: "Leadership"
      },
      {
        id: 28,
        question: "How should ministers handle God's Word according to Pastor Chris?",
        options: ["Carelessly", "With fear and trembling", "With accuracy and reverence", "As they please"],
        correctAnswer: 2,
        explanation: "Pastor Chris emphasizes the importance of handling God's Word with accuracy and reverence.",
        category: "Ministry"
      },
      {
        id: 29,
        question: "What does Pastor Chris say about church growth?",
        options: ["It's not important", "It's about numbers only", "It's about making disciples", "It's about buildings"],
        correctAnswer: 2,
        explanation: "Pastor Chris teaches that true church growth is about making disciples and impacting lives.",
        category: "Church Growth"
      },
      {
        id: 30,
        question: "According to Pastor Chris, what should motivate ministry?",
        options: ["Personal gain", "Love for God and people", "Competition", "Recognition"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that ministry should be motivated by love for God and compassion for people.",
        category: "Ministry"
      }
    ]
  },
  {
    id: 7,
    title: "End Times & Prophecy",
    difficulty: 'Hard',
    description: "Understanding biblical prophecy and end times",
    unlocked: false,
    timeLimit: 15,
    passingScore: 85,
    questions: [
      {
        id: 31,
        question: "What does Pastor Chris teach about the rapture?",
        options: ["It's not real", "It's after tribulation", "It's before tribulation", "It's symbolic"],
        correctAnswer: 2,
        explanation: "Pastor Chris teaches the pre-tribulation rapture of the church.",
        category: "Prophecy"
      },
      {
        id: 32,
        question: "According to Pastor Chris, what should be our attitude toward Christ's return?",
        options: ["Fear", "Indifference", "Eager expectation", "Worry"],
        correctAnswer: 2,
        explanation: "Pastor Chris teaches that we should eagerly anticipate Christ's return with joy.",
        category: "Second Coming"
      },
      {
        id: 33,
        question: "What does Pastor Chris say about prophecy?",
        options: ["It's not for today", "It's for guidance and encouragement", "It's always about judgment", "It's hard to understand"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that prophecy is for edification, exhortation, and comfort.",
        category: "Prophecy"
      },
      {
        id: 34,
        question: "How should we prepare for Christ's return according to Pastor Chris?",
        options: ["By being fearful", "By living holy and ready", "By predicting dates", "By withdrawing from world"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we should live holy lives and be ready for Christ's return.",
        category: "Preparation"
      },
      {
        id: 35,
        question: "What does Pastor Chris teach about the millennium?",
        options: ["It's symbolic", "It's a literal 1000 years", "It's already here", "It's not in the Bible"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that the millennium is a literal 1000-year reign of Christ on earth.",
        category: "Prophecy"
      }
    ]
  },
  {
    id: 8,
    title: "Christian Living",
    difficulty: 'Hard',
    description: "Practical principles for daily Christian life",
    unlocked: false,
    timeLimit: 15,
    passingScore: 85,
    questions: [
      {
        id: 36,
        question: "According to Pastor Chris, how should Christians handle temptation?",
        options: ["Fight in their own strength", "Resist with God's Word", "Give in occasionally", "Avoid all situations"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we overcome temptation by using God's Word like Jesus did.",
        category: "Temptation"
      },
      {
        id: 37,
        question: "What does Pastor Chris teach about forgiveness?",
        options: ["It's conditional", "It's for our benefit", "It means forgetting", "It's weakness"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that forgiveness benefits us and is a command, not an option.",
        category: "Forgiveness"
      },
      {
        id: 38,
        question: "How should Christians handle conflict according to Pastor Chris?",
        options: ["Avoid it completely", "With love and truth", "With aggression", "By ignoring it"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we should address conflict with love, truth, and wisdom.",
        category: "Relationships"
      },
      {
        id: 39,
        question: "What does Pastor Chris say about worry?",
        options: ["It shows care", "It's sin and faithlessness", "It's natural", "It helps solve problems"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that worry is sin because it shows lack of faith in God's provision.",
        category: "Faith"
      },
      {
        id: 40,
        question: "According to Pastor Chris, what is the Christian's identity?",
        options: ["Sinners saved by grace", "Sons and daughters of God", "Servants only", "Victims of circumstances"],
        correctAnswer: 1,
        explanation: "Pastor Chris emphasizes our identity as sons and daughters of God with all rights and privileges.",
        category: "Identity"
      }
    ]
  },
  {
    id: 9,
    title: "Bible Study & Interpretation",
    difficulty: 'Medium',
    description: "Learning how to study and understand God's Word",
    unlocked: false,
    timeLimit: 25,
    passingScore: 75,
    questions: [
      {
        id: 41,
        question: "According to Pastor Chris, how should we approach Bible study?",
        options: ["Casually", "With prayer and meditation", "Only on Sundays", "When we feel like it"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that Bible study should be done with prayer, meditation, and the Holy Spirit's guidance.",
        category: "Bible Study"
      },
      {
        id: 42,
        question: "What does Pastor Chris teach about interpreting Scripture?",
        options: ["Interpret it literally always", "Use context and compare Scripture with Scripture", "Follow your feelings", "Ask others what they think"],
        correctAnswer: 1,
        explanation: "Pastor Chris emphasizes interpreting Scripture in context and comparing Scripture with Scripture.",
        category: "Hermeneutics"
      },
      {
        id: 43,
        question: "According to Pastor Chris, what is the role of the Holy Spirit in Bible study?",
        options: ["No role", "He reveals truth to us", "He confuses us", "He only helps pastors"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that the Holy Spirit is our teacher and reveals the truth of God's Word to us.",
        category: "Holy Spirit"
      },
      {
        id: 44,
        question: "What does Pastor Chris say about memorizing Scripture?",
        options: ["It's not important", "It's essential for spiritual growth", "It's only for children", "It's optional"],
        correctAnswer: 1,
        explanation: "Pastor Chris emphasizes the importance of memorizing Scripture for spiritual strength and victory.",
        category: "Scripture Memory"
      },
      {
        id: 45,
        question: "How should we apply God's Word according to Pastor Chris?",
        options: ["Only in church", "In every area of life", "When convenient", "Only in difficult times"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that God's Word should be applied to every area of our lives.",
        category: "Application"
      }
    ]
  },
  {
    id: 10,
    title: "Prayer & Intercession",
    difficulty: 'Medium',
    description: "Understanding different types of prayer and intercession",
    unlocked: false,
    timeLimit: 25,
    passingScore: 75,
    questions: [
      {
        id: 46,
        question: "What does Pastor Chris teach about the prayer of faith?",
        options: ["It's begging God", "It's believing you receive when you pray", "It's repeating words", "It's emotional pleading"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that the prayer of faith believes you receive when you pray, not when you see results.",
        category: "Prayer"
      },
      {
        id: 47,
        question: "According to Pastor Chris, what is intercessory prayer?",
        options: ["Praying for yourself only", "Standing in the gap for others", "Praying in tongues only", "Praying for material things"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that intercessory prayer is standing in the gap and praying for others.",
        category: "Intercession"
      },
      {
        id: 48,
        question: "What does Pastor Chris say about praying in the Spirit?",
        options: ["It's not biblical", "It's praying in tongues", "It's emotional prayer", "It's only for special people"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that praying in the Spirit includes praying in tongues and being led by the Spirit.",
        category: "Prayer"
      },
      {
        id: 49,
        question: "How should we approach God in prayer according to Pastor Chris?",
        options: ["With fear and trembling", "With boldness and confidence", "With doubt", "With hesitation"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we should approach God with boldness and confidence as His children.",
        category: "Prayer"
      },
      {
        id: 50,
        question: "What does Pastor Chris teach about persistent prayer?",
        options: ["Give up if not answered quickly", "Keep praying until you see results", "Pray once and forget", "Pray only when desperate"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we should persist in prayer until we see the manifestation of our faith.",
        category: "Prayer"
      }
    ]
  },
  {
    id: 11,
    title: "Worship & Praise",
    difficulty: 'Easy',
    description: "Understanding true worship and the power of praise",
    unlocked: false,
    timeLimit: 30,
    passingScore: 70,
    questions: [
      {
        id: 51,
        question: "What does Pastor Chris teach about worship?",
        options: ["It's only singing", "It's a lifestyle", "It's only in church", "It's emotional expression"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that worship is a lifestyle, not just singing songs.",
        category: "Worship"
      },
      {
        id: 52,
        question: "According to Pastor Chris, what is the purpose of praise?",
        options: ["To feel good", "To magnify God and defeat enemies", "To show off", "To get attention"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that praise magnifies God and defeats our enemies.",
        category: "Praise"
      },
      {
        id: 53,
        question: "What does Pastor Chris say about worshiping in spirit and truth?",
        options: ["It's optional", "It's God's requirement", "It's only for leaders", "It's emotional worship"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that God seeks those who worship in spirit and truth.",
        category: "Worship"
      },
      {
        id: 54,
        question: "How should we approach worship according to Pastor Chris?",
        options: ["Casually", "With reverence and joy", "With fear", "With indifference"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we should worship with both reverence and joy.",
        category: "Worship"
      },
      {
        id: 55,
        question: "What does Pastor Chris teach about the power of praise?",
        options: ["It has no power", "It releases God's power", "It's just emotion", "It's only for good times"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that praise releases God's power and brings victory.",
        category: "Praise"
      }
    ]
  },
  {
    id: 12,
    title: "Evangelism & Witnessing",
    difficulty: 'Medium',
    description: "Sharing the gospel and being effective witnesses",
    unlocked: false,
    timeLimit: 25,
    passingScore: 75,
    questions: [
      {
        id: 56,
        question: "What does Pastor Chris teach about evangelism?",
        options: ["It's only for pastors", "It's every believer's responsibility", "It's optional", "It's outdated"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that evangelism is every believer's responsibility and privilege.",
        category: "Evangelism"
      },
      {
        id: 57,
        question: "According to Pastor Chris, how should we share the gospel?",
        options: ["With fear", "With love and boldness", "With force", "With indifference"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we should share the gospel with love and boldness.",
        category: "Witnessing"
      },
      {
        id: 58,
        question: "What does Pastor Chris say about being a witness?",
        options: ["It's only talking", "It's living and speaking the truth", "It's forcing others", "It's being silent"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that being a witness involves both living and speaking the truth.",
        category: "Witnessing"
      },
      {
        id: 59,
        question: "How should we approach unbelievers according to Pastor Chris?",
        options: ["With judgment", "With love and compassion", "With fear", "With superiority"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we should approach unbelievers with love and compassion.",
        category: "Evangelism"
      },
      {
        id: 60,
        question: "What does Pastor Chris teach about the power of testimony?",
        options: ["It's not important", "It's powerful and effective", "It's only for special people", "It's outdated"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that personal testimony is powerful and effective in evangelism.",
        category: "Testimony"
      }
    ]
  },
  {
    id: 13,
    title: "Family & Relationships",
    difficulty: 'Medium',
    description: "Building godly families and healthy relationships",
    unlocked: false,
    timeLimit: 25,
    passingScore: 75,
    questions: [
      {
        id: 61,
        question: "What does Pastor Chris teach about marriage?",
        options: ["It's a contract", "It's a covenant before God", "It's optional", "It's outdated"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that marriage is a sacred covenant before God, not just a contract.",
        category: "Marriage"
      },
      {
        id: 62,
        question: "According to Pastor Chris, what is the foundation of a godly family?",
        options: ["Money", "Education", "God's Word and love", "Social status"],
        correctAnswer: 2,
        explanation: "Pastor Chris teaches that God's Word and love are the foundation of a godly family.",
        category: "Family"
      },
      {
        id: 63,
        question: "What does Pastor Chris say about parenting?",
        options: ["It's easy", "It requires wisdom and God's guidance", "It's not important", "It's only for mothers"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that parenting requires wisdom and God's guidance.",
        category: "Parenting"
      },
      {
        id: 64,
        question: "How should husbands love their wives according to Pastor Chris?",
        options: ["As they feel like", "As Christ loved the church", "Only when convenient", "Based on performance"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that husbands should love their wives as Christ loved the church.",
        category: "Marriage"
      },
      {
        id: 65,
        question: "What does Pastor Chris teach about family prayer?",
        options: ["It's not necessary", "It's essential for family unity", "It's only for problems", "It's optional"],
        correctAnswer: 1,
        explanation: "Pastor Chris emphasizes that family prayer is essential for family unity and spiritual growth.",
        category: "Family"
      }
    ]
  },
  {
    id: 14,
    title: "Spiritual Warfare",
    difficulty: 'Hard',
    description: "Understanding and engaging in spiritual warfare",
    unlocked: false,
    timeLimit: 20,
    passingScore: 80,
    questions: [
      {
        id: 66,
        question: "What does Pastor Chris teach about spiritual warfare?",
        options: ["It's not real", "It's real and we have authority", "It's only for pastors", "It's scary"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that spiritual warfare is real and believers have authority in Christ.",
        category: "Spiritual Warfare"
      },
      {
        id: 67,
        question: "According to Pastor Chris, what are our weapons in spiritual warfare?",
        options: ["Physical weapons", "The Word of God and prayer", "Emotions", "Intelligence"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that our weapons are the Word of God, prayer, and the authority of Christ.",
        category: "Weapons"
      },
      {
        id: 68,
        question: "What does Pastor Chris say about the devil?",
        options: ["He's equal to God", "He's defeated and we have authority over him", "He's too powerful", "He doesn't exist"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that the devil is defeated and believers have authority over him.",
        category: "Spiritual Warfare"
      },
      {
        id: 69,
        question: "How should we resist the devil according to Pastor Chris?",
        options: ["With fear", "With the Word of God and faith", "With anger", "With avoidance"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we resist the devil with the Word of God and faith.",
        category: "Resistance"
      },
      {
        id: 70,
        question: "What does Pastor Chris teach about our authority in Christ?",
        options: ["We have no authority", "We have all authority over the enemy", "It's limited", "It's only for special people"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that believers have all authority over the enemy through Christ.",
        category: "Authority"
      }
    ]
  },
  {
    id: 15,
    title: "Grace & Righteousness",
    difficulty: 'Medium',
    description: "Understanding God's grace and our righteousness in Christ",
    unlocked: false,
    timeLimit: 25,
    passingScore: 75,
    questions: [
      {
        id: 71,
        question: "What does Pastor Chris teach about grace?",
        options: ["It's a license to sin", "It's God's unmerited favor and power", "It's only for salvation", "It's earned"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that grace is God's unmerited favor and the power to live righteously.",
        category: "Grace"
      },
      {
        id: 72,
        question: "According to Pastor Chris, what is our righteousness?",
        options: ["Our good works", "The righteousness of Christ given to us", "Our religious activities", "Our moral behavior"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that our righteousness is the righteousness of Christ given to us by faith.",
        category: "Righteousness"
      },
      {
        id: 73,
        question: "What does Pastor Chris say about trying to earn God's favor?",
        options: ["It's necessary", "It's impossible and unnecessary", "It's optional", "It's recommended"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we cannot earn God's favor - it's given by grace through faith.",
        category: "Grace"
      },
      {
        id: 74,
        question: "How should we live according to Pastor Chris?",
        options: ["By the law", "By grace through faith", "By our own strength", "By religious rules"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we should live by grace through faith, not by the law.",
        category: "Grace"
      },
      {
        id: 75,
        question: "What does Pastor Chris teach about our standing before God?",
        options: ["We're sinners", "We're righteous in Christ", "We're neutral", "It depends on our behavior"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that in Christ, we are righteous and accepted before God.",
        category: "Righteousness"
      }
    ]
  },
  {
    id: 16,
    title: "Kingdom Principles",
    difficulty: 'Hard',
    description: "Understanding God's Kingdom and its principles",
    unlocked: false,
    timeLimit: 20,
    passingScore: 80,
    questions: [
      {
        id: 76,
        question: "What does Pastor Chris teach about the Kingdom of God?",
        options: ["It's only future", "It's here now and coming", "It's only spiritual", "It's not real"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that the Kingdom of God is both present now and coming in fullness.",
        category: "Kingdom"
      },
      {
        id: 77,
        question: "According to Pastor Chris, what is Kingdom authority?",
        options: ["Power over people", "Authority to serve and bless", "Control over others", "Political power"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that Kingdom authority is for serving and blessing others.",
        category: "Authority"
      },
      {
        id: 78,
        question: "What does Pastor Chris say about Kingdom priorities?",
        options: ["Seek first the Kingdom", "Seek material things first", "Seek personal success", "Seek comfort"],
        correctAnswer: 0,
        explanation: "Pastor Chris emphasizes seeking first the Kingdom of God and His righteousness.",
        category: "Priorities"
      },
      {
        id: 79,
        question: "How should we advance the Kingdom according to Pastor Chris?",
        options: ["Through force", "Through love and service", "Through politics", "Through isolation"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we advance the Kingdom through love, service, and sharing the gospel.",
        category: "Kingdom"
      },
      {
        id: 80,
        question: "What does Pastor Chris teach about Kingdom citizenship?",
        options: ["It's automatic", "It's through faith in Christ", "It's earned", "It's temporary"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we become Kingdom citizens through faith in Christ.",
        category: "Citizenship"
      }
    ]
  },
  {
    id: 17,
    title: "Victory & Overcoming",
    difficulty: 'Medium',
    description: "Living in victory and overcoming challenges",
    unlocked: false,
    timeLimit: 25,
    passingScore: 75,
    questions: [
      {
        id: 81,
        question: "What does Pastor Chris teach about victory in Christ?",
        options: ["It's automatic", "It's through faith and obedience", "It's impossible", "It's only for some"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that victory comes through faith in Christ and obedience to His Word.",
        category: "Victory"
      },
      {
        id: 82,
        question: "According to Pastor Chris, how do we overcome trials?",
        options: ["By avoiding them", "By faith and God's Word", "By complaining", "By giving up"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we overcome trials by faith and standing on God's Word.",
        category: "Trials"
      },
      {
        id: 83,
        question: "What does Pastor Chris say about being more than conquerors?",
        options: ["It's impossible", "It's our identity in Christ", "It's only for pastors", "It's temporary"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that being more than conquerors is our identity in Christ.",
        category: "Conquerors"
      },
      {
        id: 84,
        question: "How should we face challenges according to Pastor Chris?",
        options: ["With fear", "With faith and courage", "With doubt", "With avoidance"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we should face challenges with faith and courage.",
        category: "Challenges"
      },
      {
        id: 85,
        question: "What does Pastor Chris teach about God's strength in weakness?",
        options: ["God doesn't help", "His strength is made perfect in weakness", "We must be strong", "Weakness is sin"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that God's strength is made perfect in our weakness.",
        category: "Strength"
      }
    ]
  },
  {
    id: 18,
    title: "Love & Compassion",
    difficulty: 'Easy',
    description: "Understanding God's love and showing compassion",
    unlocked: false,
    timeLimit: 30,
    passingScore: 70,
    questions: [
      {
        id: 86,
        question: "What does Pastor Chris teach about God's love?",
        options: ["It's conditional", "It's unconditional and everlasting", "It's earned", "It's temporary"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that God's love is unconditional and everlasting.",
        category: "Love"
      },
      {
        id: 87,
        question: "According to Pastor Chris, how should we love others?",
        options: ["As ourselves", "Only if they're nice", "Conditionally", "When convenient"],
        correctAnswer: 0,
        explanation: "Pastor Chris teaches that we should love others as ourselves.",
        category: "Love"
      },
      {
        id: 88,
        question: "What does Pastor Chris say about compassion?",
        options: ["It's weakness", "It's God's nature in us", "It's optional", "It's only for leaders"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that compassion is God's nature manifested in us.",
        category: "Compassion"
      },
      {
        id: 89,
        question: "How should we treat the needy according to Pastor Chris?",
        options: ["Ignore them", "With love and practical help", "With judgment", "With indifference"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we should treat the needy with love and practical help.",
        category: "Compassion"
      },
      {
        id: 90,
        question: "What does Pastor Chris teach about loving enemies?",
        options: ["It's impossible", "It's God's command", "It's optional", "It's weakness"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that loving enemies is God's command and shows His nature.",
        category: "Love"
      }
    ]
  },
  {
    id: 19,
    title: "Wisdom & Understanding",
    difficulty: 'Medium',
    description: "Seeking and applying godly wisdom",
    unlocked: false,
    timeLimit: 25,
    passingScore: 75,
    questions: [
      {
        id: 91,
        question: "What does Pastor Chris teach about wisdom?",
        options: ["It's only for the educated", "It comes from fearing God", "It's natural", "It's not important"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that true wisdom comes from fearing and reverencing God.",
        category: "Wisdom"
      },
      {
        id: 92,
        question: "According to Pastor Chris, how do we get understanding?",
        options: ["Through education only", "Through God's Word and Spirit", "Through experience only", "Through others"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that understanding comes through God's Word and the Holy Spirit.",
        category: "Understanding"
      },
      {
        id: 93,
        question: "What does Pastor Chris say about making decisions?",
        options: ["Follow your heart", "Seek God's wisdom", "Do what feels right", "Ask others"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we should seek God's wisdom in making decisions.",
        category: "Decisions"
      },
      {
        id: 94,
        question: "How should we handle confusion according to Pastor Chris?",
        options: ["Give up", "Seek God's clarity", "Make quick decisions", "Ignore it"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we should seek God's clarity when confused.",
        category: "Clarity"
      },
      {
        id: 95,
        question: "What does Pastor Chris teach about the fear of the Lord?",
        options: ["It's being afraid", "It's reverence and awe", "It's outdated", "It's not needed"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that the fear of the Lord is reverence and awe, not terror.",
        category: "Fear of God"
      }
    ]
  },
  {
    id: 20,
    title: "Joy & Thanksgiving",
    difficulty: 'Easy',
    description: "Living with joy and gratitude",
    unlocked: false,
    timeLimit: 30,
    passingScore: 70,
    questions: [
      {
        id: 96,
        question: "What does Pastor Chris teach about joy?",
        options: ["It's based on circumstances", "It's from the Lord", "It's temporary", "It's not important"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that true joy comes from the Lord, not circumstances.",
        category: "Joy"
      },
      {
        id: 97,
        question: "According to Pastor Chris, what is the will of God?",
        options: ["To be miserable", "To rejoice always", "To be serious", "To be neutral"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that it's God's will for us to rejoice always.",
        category: "Joy"
      },
      {
        id: 98,
        question: "What does Pastor Chris say about thanksgiving?",
        options: ["It's only for good times", "It's for all things", "It's optional", "It's not biblical"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we should give thanks in all things.",
        category: "Thanksgiving"
      },
      {
        id: 99,
        question: "How should we approach life according to Pastor Chris?",
        options: ["With complaints", "With joy and gratitude", "With worry", "With indifference"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we should approach life with joy and gratitude.",
        category: "Attitude"
      },
      {
        id: 100,
        question: "What does Pastor Chris teach about contentment?",
        options: ["It's impossible", "It's learned through Christ", "It's natural", "It's not needed"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that contentment is learned through Christ who strengthens us.",
        category: "Contentment"
      }
    ]
  },
  {
    id: 21,
    title: "Faith & Confession",
    difficulty: 'Hard',
    description: "The power of faith and positive confession",
    unlocked: false,
    timeLimit: 20,
    passingScore: 80,
    questions: [
      {
        id: 101,
        question: "What does Pastor Chris teach about the prayer of faith?",
        options: ["It's begging", "It believes it receives", "It's emotional", "It's repeating words"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that the prayer of faith believes it receives when it prays.",
        category: "Faith"
      },
      {
        id: 102,
        question: "According to Pastor Chris, what is confession?",
        options: ["Admitting sin", "Agreeing with God's Word", "Talking a lot", "Praying loudly"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that confession is agreeing with God's Word.",
        category: "Confession"
      },
      {
        id: 103,
        question: "What does Pastor Chris say about speaking God's Word?",
        options: ["It's not important", "It releases power", "It's just talking", "It's optional"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that speaking God's Word releases its power.",
        category: "Word"
      },
      {
        id: 104,
        question: "How should we use our words according to Pastor Chris?",
        options: ["Carelessly", "To create and build", "To complain", "To criticize"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we should use our words to create and build.",
        category: "Words"
      },
      {
        id: 105,
        question: "What does Pastor Chris teach about faith without works?",
        options: ["It's dead", "It's enough", "It's optional", "It's not mentioned"],
        correctAnswer: 0,
        explanation: "Pastor Chris teaches that faith without works is dead.",
        category: "Faith"
      }
    ]
  },
  {
    id: 22,
    title: "Purpose & Calling",
    difficulty: 'Medium',
    description: "Discovering and fulfilling God's purpose",
    unlocked: false,
    timeLimit: 25,
    passingScore: 75,
    questions: [
      {
        id: 106,
        question: "What does Pastor Chris teach about God's purpose?",
        options: ["It's hidden", "It's revealed in His Word", "It's random", "It's not important"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that God's purpose is revealed in His Word.",
        category: "Purpose"
      },
      {
        id: 107,
        question: "According to Pastor Chris, what is our primary purpose?",
        options: ["To make money", "To glorify God", "To be happy", "To be successful"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that our primary purpose is to glorify God.",
        category: "Purpose"
      },
      {
        id: 108,
        question: "What does Pastor Chris say about discovering our calling?",
        options: ["It's impossible", "It's through prayer and God's Word", "It's by chance", "It's not needed"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we discover our calling through prayer and God's Word.",
        category: "Calling"
      },
      {
        id: 109,
        question: "How should we pursue our purpose according to Pastor Chris?",
        options: ["Half-heartedly", "With passion and excellence", "When convenient", "Only on Sundays"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we should pursue our purpose with passion and excellence.",
        category: "Purpose"
      },
      {
        id: 110,
        question: "What does Pastor Chris teach about God's plan?",
        options: ["It's unclear", "It's good and perfect", "It's random", "It's not real"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that God's plan is good and perfect for our lives.",
        category: "Plan"
      }
    ]
  },
  {
    id: 23,
    title: "Transformation & Renewal",
    difficulty: 'Hard',
    description: "Being transformed by God's Word and Spirit",
    unlocked: false,
    timeLimit: 20,
    passingScore: 80,
    questions: [
      {
        id: 111,
        question: "What does Pastor Chris teach about transformation?",
        options: ["It's instant", "It's by renewing the mind", "It's impossible", "It's not needed"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that transformation comes by renewing the mind with God's Word.",
        category: "Transformation"
      },
      {
        id: 112,
        question: "According to Pastor Chris, how do we renew our minds?",
        options: ["By education", "By God's Word", "By experience", "By others"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we renew our minds by studying and meditating on God's Word.",
        category: "Renewal"
      },
      {
        id: 113,
        question: "What does Pastor Chris say about old vs new nature?",
        options: ["They're the same", "We put off old, put on new", "Old nature wins", "It doesn't matter"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we put off the old nature and put on the new nature in Christ.",
        category: "Nature"
      },
      {
        id: 114,
        question: "How should we grow spiritually according to Pastor Chris?",
        options: ["Naturally", "Through intentional effort", "By chance", "Only in church"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that spiritual growth requires intentional effort and discipline.",
        category: "Growth"
      },
      {
        id: 115,
        question: "What does Pastor Chris teach about being conformed to Christ?",
        options: ["It's automatic", "It's a process", "It's impossible", "It's not biblical"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that being conformed to Christ's image is a lifelong process.",
        category: "Conformity"
      }
    ]
  },
  {
    id: 24,
    title: "Stewardship & Responsibility",
    difficulty: 'Medium',
    description: "Being good stewards of God's gifts",
    unlocked: false,
    timeLimit: 25,
    passingScore: 75,
    questions: [
      {
        id: 116,
        question: "What does Pastor Chris teach about stewardship?",
        options: ["It's only about money", "It's about all God's gifts", "It's not important", "It's optional"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that stewardship is about managing all of God's gifts responsibly.",
        category: "Stewardship"
      },
      {
        id: 117,
        question: "According to Pastor Chris, what are we responsible for?",
        options: ["Everything", "Our gifts and opportunities", "Nothing", "Only money"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we're responsible for our gifts and opportunities.",
        category: "Responsibility"
      },
      {
        id: 118,
        question: "What does Pastor Chris say about time management?",
        options: ["It's not important", "It's good stewardship", "It's impossible", "It's optional"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that managing time well is part of good stewardship.",
        category: "Time"
      },
      {
        id: 119,
        question: "How should we use our talents according to Pastor Chris?",
        options: ["Hide them", "Use them for God's glory", "Only for profit", "When convenient"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that we should use our talents for God's glory.",
        category: "Talents"
      },
      {
        id: 120,
        question: "What does Pastor Chris teach about accountability?",
        options: ["It's not needed", "It's important for growth", "It's only for leaders", "It's optional"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that accountability is important for spiritual growth.",
        category: "Accountability"
      }
    ]
  },
  {
    id: 25,
    title: "Pastor Chris Master",
    difficulty: 'Hard',
    description: "Ultimate challenge with Pastor Chris's most important teachings",
    unlocked: false,
    timeLimit: 15,
    passingScore: 85,
    questions: [
      {
        id: 121,
        question: "What is the foundation of Pastor Chris's ministry?",
        options: ["Education", "The Word of Faith", "Experience", "Tradition"],
        correctAnswer: 1,
        explanation: "Pastor Chris's ministry is founded on the Word of Faith - teaching God's Word with power.",
        category: "Foundation"
      },
      {
        id: 122,
        question: "According to Pastor Chris, what is the believer's authority?",
        options: ["Limited", "Complete in Christ", "Non-existent", "Only for pastors"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that believers have complete authority in Christ over all circumstances.",
        category: "Authority"
      },
      {
        id: 123,
        question: "What does Pastor Chris emphasize most in his teachings?",
        options: ["Rules", "God's love and grace", "Judgment", "Fear"],
        correctAnswer: 1,
        explanation: "Pastor Chris emphasizes God's love, grace, and the believer's identity in Christ.",
        category: "Emphasis"
      },
      {
        id: 124,
        question: "How should believers live according to Pastor Chris?",
        options: ["In fear", "In victory and dominion", "In defeat", "In confusion"],
        correctAnswer: 1,
        explanation: "Pastor Chris teaches that believers should live in victory and dominion through Christ.",
        category: "Living"
      },
      {
        id: 125,
        question: "What is the ultimate goal of Pastor Chris's ministry?",
        options: ["Personal fame", "Building God's Kingdom", "Making money", "Political power"],
        correctAnswer: 1,
        explanation: "Pastor Chris's ultimate goal is building God's Kingdom and reaching souls for Christ.",
        category: "Goal"
      }
    ]
  }
];

export const getQuizLevelById = (id: number): QuizLevel | undefined => {
  return quizLevels.find(level => level.id === id);
};

export const unlockNextQuizLevel = (currentLevelId: number): void => {
  const nextLevel = quizLevels.find(level => level.id === currentLevelId + 1);
  if (nextLevel) {
    nextLevel.unlocked = true;
  }
};

export const resetAllQuizLevels = (): void => {
  quizLevels.forEach(level => {
    level.unlocked = level.id === 1;
  });
};

export const loadUnlockedQuizLevels = (completedLevels: Set<number>): void => {
  quizLevels.forEach(level => {
    if (level.id === 1) {
      level.unlocked = true; // First level is always unlocked
    } else {
      // Unlock level if previous level is completed
      level.unlocked = completedLevels.has(level.id - 1);
    }
  });
};
