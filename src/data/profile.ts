// Single source of truth for every fact on the site.
// Every figure here traces to the CV source. Change a fact there first, then here.
// Never the other way round.
// Public-safe only. No referees, no identity numbers, no unverified install counts. The WhatsApp
// number is public by choice; it stays out of the CV PDF and the README.

export const site = {
  name: 'Sajon Shrestha',
  title: 'Sajon Shrestha, Flutter and mobile engineer, Kathmandu',
  tagline: 'Mobile engineer, Flutter on top and native Kotlin underneath.',
  description:
    'Sajon Shrestha is a Flutter and mobile engineer in Kathmandu, Nepal. Seven products public on Google Play, one past 100,000 installs. Media playback, subscriptions, release engineering.',
  url: 'https://sajon.com.np',
  email: 'sajonshrestha5@gmail.com',
  whatsapp: { number: '+977 9867232534', url: 'https://wa.me/9779867232534' },
  location: 'Kathmandu, Nepal',
  links: {
    linkedin: 'https://linkedin.com/in/sajonshrestha',
    github: 'https://github.com/Saajonsayrest',
    orcid: 'https://orcid.org/0009-0003-1825-1692',
  },
  cvFile: '/Sajon-Shrestha-CV.pdf',
};

export const nav = [
  { href: '/work/', label: 'Work' },
  { href: '/about/', label: 'About' },
  { href: '/cv/', label: 'CV' },
  { href: '/contact/', label: 'Contact' },
];

export const summary = [
  'Mobile engineer since 2022, Flutter on top and native Kotlin underneath. Seven products public on Google Play, one past 100,000 installs.',
  'I lead mobile delivery for US clients out of Kathmandu, inside a twenty person team, across a twelve hour gap. Client meetings and demos happen on video, in English.',
  'I own the parts teams usually outsource. A forked native video player, subscription billing and the release pipeline itself. Before that, a national internet provider, where a bad release once stopped the support line. That is where the release discipline comes from.',
];

export type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
  place: string;
  period: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    role: 'Software Engineer, Flutter',
    company: 'Webpoint Solutions',
    companyUrl: 'https://webpoint.io',
    place: 'Kathmandu, Nepal (US parent company)',
    period: 'Mar 2026 to present',
    bullets: [
      'Leads mobile delivery for the media and social products built for US clients. Reviews the team’s mobile code.',
      'Owns the media playback layer two Flutter apps share, a forked native player plugin kept working on Android and iOS, Kotlin and ExoPlayer underneath. The hard part is not playing a file, it is adaptive HLS switching and playback state that survives a lifecycle change.',
      'Owns release engineering end to end, CI/CD and code signing through to store rollout. Crash monitoring catches a regression first.',
    ],
  },
  {
    role: 'Mobile App Developer',
    company: 'Classic Tech',
    companyUrl: 'https://classic.com.np',
    place: 'Kathmandu, Nepal',
    period: 'Nov 2023 to Feb 2026',
    bullets: [
      'Sole mobile developer for the whole app portfolio of Nepal’s fifth largest internet provider. The regulator counts 280,000 fixed broadband connections.',
      'Built and maintained four apps past 110,000 installs on Google Play. Classic Tech (100,000+), Classic Engine (10,000+), Dealer Partner (1,000+) and Caro TV Nepal (1,000+).',
      'Emergency hotfixes and store compliance updates shipped inside the deadline they were given. None slipped.',
    ],
  },
  {
    role: 'Flutter Developer',
    company: 'Sulav Pay Pvt. Ltd.',
    place: 'Kathmandu, Nepal',
    period: 'Nov 2022 to Oct 2023',
    bullets: [
      'Carried a year of features and fixes on NCash, a live consumer wallet, inside a Flutter team under a senior lead.',
      'Worked the paths money travels on. QR payments, the transaction flow, biometric login and home screen balance widgets. Most users had never held a banking app. A flow had to survive a wrong tap.',
    ],
  },
  {
    role: 'App Developer Intern',
    company: 'EKbana Solutions',
    companyUrl: 'https://ekbana.com',
    place: 'Lalitpur, Nepal',
    period: 'Aug 2022 to Nov 2022',
    bullets: ['Built Flutter interface components under senior review.'],
  },
];

export type Project = {
  slug: string;
  name: string;
  headline: string;
  context: string;
  stack: string[];
  period: string;
  bullets: string[];
  link?: { label: string; url: string };
  installs?: string;
  status?: string;
  featured?: boolean;
  /** Real launcher icon, copied from the app repo into public/icons. */
  icon?: string;
  /** The app's own primary colour, read from its theme file, not invented. */
  color?: string;
};

export const projects: Project[] = [
  {
    slug: 'wipray',
    name: 'WiPray',
    headline: 'Faith social and media platform',
    context: 'Advent Hub, US client through Webpoint Solutions',
    stack: ['Flutter', 'Kotlin and ExoPlayer', 'StoreKit', 'Play Billing'],
    period: '2026',
    featured: true,
    installs: '1,000+',
    icon: '/icons/wipray.png',
    color: '#00988A', // WiPray mobile/lib/core/theme/app_colors.dart brandPrimary
    link: { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.wipray.mobile' },
    bullets: [
      'Ported a live React Native product to Flutter without pausing the feature roadmap. Every media type the client publishes runs through one feed, with a prayer and praise wall beside it.',
      'Built the in-app subscription layer, StoreKit on iOS and Play Billing on Android. Entitlement is account bound and checked server side, so a paid user keeps access on a new device.',
      'Posted content is screened against the client’s guidelines before it reaches the feed.',
    ],
  },
  {
    slug: 'we-preach',
    name: 'We Preach',
    headline: 'Media streaming platform',
    context: 'US client through Webpoint Solutions',
    stack: ['Flutter', 'Kotlin and ExoPlayer', 'Platform channels', 'HLS'],
    period: '2026',
    status: 'In development, not released yet',
    featured: true,
    icon: '/icons/we-preach.png',
    color: '#EE264F', // launcher icon colour; the in-app primary is navy #102956
    bullets: [
      'Flutter from scratch rather than a port. Scoped and designed before a line was written. Christian media for a worldwide audience, and the whole product turns on playback.',
      'Background and Picture-in-Picture playback on both platforms. Quality follows the connection, and on a weak network the player drops from video to audio rather than sit and buffer.',
      'Uploads resume in the background and survive the app being killed. Over 40 unit and widget test files, with integration suites over playback, upload and the realtime feed.',
    ],
  },
  {
    slug: 'classic-tech',
    name: 'Classic Tech app portfolio',
    headline: 'Four apps for a national internet provider',
    context: 'Classic Tech, Nepal’s fifth largest ISP',
    stack: ['Kotlin', 'Flutter', 'Bloc', 'Riverpod', 'Android on TV boxes'],
    period: '2023 to 2026',
    featured: true,
    installs: '110,000+ across four listings',
    icon: '/icons/classic-tech.png',
    color: '#13753D', // android-support-app res/values/colors.xml green
    link: { label: 'Classic Tech on Google Play', url: 'https://play.google.com/store/apps/details?id=com.classic.np.app' },
    bullets: [
      'One native Kotlin customer app covering bill payment, router settings, IPTV controls, a complaints channel and referrals. Split it across two internet brands with build flavours, so each ships as its own signed app rather than a forked copy.',
      'Built Caro TV, the Flutter mobile app for the company’s live channels, and a second Flutter app inside the set-top box, which answers to a remote and to touch. Tested on real boxes.',
      'Moved Classic Engine, the staff app, from React Native to Flutter as sole developer. Dealer Partner feeds sales leads in and pays out converted referrals, each with the customer’s house on Google Maps.',
    ],
  },
  {
    slug: 'smartsikshya',
    name: 'SmartSikshya',
    headline: 'Multi-tenant school platform',
    context: 'Independent work, paid, live in schools today',
    stack: ['Flutter', 'Riverpod', 'WebSockets', 'Maps'],
    period: '2025 to 2026',
    featured: true,
    icon: '/icons/smartsikshya.png',
    color: '#355C0D', // SmartSikshya lib/core/constants/app_colors.dart primary
    link: { label: 'Six school apps on Google Play', url: 'https://play.google.com/store/apps/developer?id=SmartSoft+Network' },
    bullets: [
      'Five roles from one codebase. Parent, student, teacher, school admin and a cross-school super admin, which is the multi-tenant control plane.',
      'Live GPS vehicle tracking over WebSockets and role-based access control.',
      'Automated the white-label flavour scripts, so a new school brand becomes a signed, store-ready build with nobody editing the project by hand. Six school brands ship from that one codebase as their own listings.',
    ],
  },
  {
    slug: 'audiobooks',
    name: 'Luminate and Jeewit Bachan',
    headline: 'Audio streaming apps',
    context: 'US and international audiobook apps, Webpoint Solutions',
    stack: ['React Native', 'TypeScript', 'Background audio', 'Offline caching'],
    period: '2026',
    installs: '1,000+ (Jeewit Bachan)',
    icon: '/icons/jeewit-bachan.png',
    color: '#1CA3D3', // Jeewit Bachan launcher icon blue
    link: { label: 'Jeewit Bachan on Google Play', url: 'https://play.google.com/store/apps/details?id=com.jeewit.bachan' },
    bullets: [
      'Carried the feature work on two live React Native apps of roughly 70 screens each. Background playback with the screen locked. Offline caching and push notifications.',
    ],
  },
  {
    slug: 'ncash',
    name: 'NCash',
    headline: 'Digital wallet and payments',
    context: 'Sulav Pay, consumer fintech, Nepal',
    stack: ['Flutter', 'Riverpod', 'LocalAuth', 'AES'],
    period: '2022 to 2023',
    icon: '/icons/ncash-mark.png',
    color: '#242424', // ncash lib/app/theme/app_colors.dart kColorPrimary
    bullets: [
      'A year of new features and fixes on a live wallet. QR payments and the transaction flow, for a market where most users had never held a banking app before.',
      'AES encrypted payloads over a typed Retrofit layer, credentials held behind device authentication. Build configuration and asset work brought the app size down far enough to run on cheap hardware.',
    ],
  },
];

export const playListings = [
  { name: 'Classic Tech', installs: '100,000+', url: 'https://play.google.com/store/apps/details?id=com.classic.np.app', note: 'Customer support app, native Kotlin', icon: '/icons/classic-tech.png' },
  { name: 'Classic Engine', installs: '10,000+', url: 'https://play.google.com/store/apps/details?id=com.classic.np.engine', note: 'Staff app, Flutter, migrated from React Native', icon: '/icons/classic-engine.png' },
  { name: 'Caro TV Nepal', installs: '1,000+', url: 'https://play.google.com/store/apps/details?id=com.classic.np.app.carotv', note: 'Live TV, Flutter', icon: '/icons/caro-tv.png' },
  { name: 'Dealer Partner', installs: '1,000+', url: 'https://play.google.com/store/apps/details?id=com.classic.partner.np.app', note: 'Referral and commission app, Flutter', icon: '/icons/dealer-partner.png' },
  { name: 'WiPray', installs: '1,000+', url: 'https://play.google.com/store/apps/details?id=com.wipray.mobile', note: 'Faith social platform, Flutter', icon: '/icons/wipray.png' },
  { name: 'Jeewit Bachan', installs: '1,000+', url: 'https://play.google.com/store/apps/details?id=com.jeewit.bachan', note: 'Devotional audiobooks, React Native', icon: '/icons/jeewit-bachan.png' },
  { name: 'SmartSikshya', installs: 'six school brands', url: 'https://play.google.com/store/apps/developer?id=SmartSoft+Network', note: 'School platform, Flutter', icon: '/icons/smartsikshya.png' },
];

export const services = [
  {
    title: 'Flutter apps, iOS and Android from one codebase',
    body: 'From a scoped brief to two store listings. Riverpod or Bloc, clean architecture, tested. Seven products of mine are public on Google Play.',
  },
  {
    title: 'React Native to Flutter migration',
    body: 'Two full migrations shipped, one of them alone, on live apps with no quiet release window. Feature by feature, never a big-bang switch.',
  },
  {
    title: 'Video and audio playback',
    body: 'Native player modules behind Flutter platform channels. Adaptive HLS, background audio, Picture-in-Picture, media session controls, playback state that survives a lifecycle change.',
  },
  {
    title: 'Subscriptions and payments',
    body: 'StoreKit and Play Billing with account bound entitlement checked server side. QR payments and wallet flows built for users who had never held a banking app.',
  },
  {
    title: 'Release engineering',
    body: 'GitHub Actions, Fastlane, code signing, TestFlight and Play Console, staged rollouts, Crashlytics. The pipeline is owned, not borrowed.',
  },
  {
    title: 'White-label and multi-brand builds',
    body: 'One codebase, many signed apps. Six school brands and two ISP brands ship this way today, with a script instead of a hand edit per brand.',
  },
];

export const skills = [
  { area: 'Cross-platform', items: 'Flutter (primary), iOS and Android from one codebase, Android TV with D-pad and touch, Riverpod, Bloc, Clean Architecture, MVVM' },
  { area: 'React Native', items: 'Feature work in live codebases of roughly 70 screens, plus two full migrations to Flutter' },
  { area: 'Languages', items: 'Dart, Kotlin, TypeScript, JavaScript, Python' },
  { area: 'Native and media', items: 'Kotlin and ExoPlayer on Android, Flutter platform channels, HLS, Picture-in-Picture, background audio, media session and notification controls' },
  { area: 'Networking and data', items: 'REST, Dio, Retrofit, Firebase (Auth, Firestore), OAuth, JWT, OTP, SQLite, offline-first sync' },
  { area: 'Monetisation', items: 'StoreKit, Play Billing, in-app subscriptions, QR payments, digital wallets' },
  { area: 'Release and quality', items: 'GitHub Actions, Fastlane, TestFlight, Play Console, Crashlytics, code signing, staged rollouts, unit, widget and integration testing, app-size tuning' },
];

export const education = {
  degree: 'Bachelor of Engineering, Computer Engineering',
  school: 'Kantipur Engineering College',
  schoolUrl: 'https://kec.edu.np',
  university: 'Tribhuvan University',
  universityUrl: 'https://tu.edu.np',
  place: 'Lalitpur, Nepal',
  period: '2017 to 2022',
  note: 'Tribhuvan University First Division. Final year project RAGE, supervised by Prof. Dr. Subarna Shakya, IOE Pulchowk Campus.',
};

export const research = {
  interests: [
    'Whether code produced by a language model respects the lifecycle and threading contracts of the platform it runs on. A clean compile does not prove it. Neither does a passing test, because the test rarely puts the code in the state where the contract matters. Four years of writing that code by hand is where the question came from, and it is the direction I want for graduate work.',
    'Low latency audio and video playback on hardware with no performance headroom to spare.',
    'Offline first synchronisation, where the device rather than a server is the unit of correctness, which turns conflict resolution into the hard part.',
  ],
  project: {
    name: 'RAGE, real time age, gender and emotion detection',
    context: 'BE final year project, team of four, 2021 to 2022',
    stack: ['Python', 'TensorFlow', 'MTCNN', 'OpenCV'],
    bullets: [
      'MTCNN aligns the face first. Three CNN heads then read the same cropped frame in parallel, so one webcam stream returns all three predictions at once. Alignment is what makes it work. It holds the predictions steady under poor light and a tilted head.',
      'Validation accuracy 79.0% on emotion (FER-2013, 16,175 images), 94.4% on gender (2,307 images), 62.9% on age (23,708 images). Live inference ran at roughly 4 to 5 frames per second on a laptop webcam.',
      'The report states its own limits. Age predictions pull toward the peak of the training distribution, the gender model skews male because the dataset does, and accuracy was capped by dataset size and camera quality.',
    ],
    supervisor: 'Prof. Dr. Subarna Shakya, IOE Pulchowk Campus, Tribhuvan University',
  },
  english: 'IELTS Academic, overall 7.0, CEFR C1.',
};

export const languages = [
  { name: 'Nepali', level: 'Native' },
  { name: 'English', level: 'C1, IELTS 7.0' },
  { name: 'German', level: 'Basic' },
];
