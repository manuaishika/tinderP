import { Calendar, ExternalLink, BookmarkPlus } from 'lucide-react'
import Link from 'next/link'

export default async function ConferencesPage() {
  const conferences = {
    'Machine Learning & AI': [
      {
        name: 'NeurIPS 2026',
        fullName: 'Neural Information Processing Systems',
        abstractDeadline: 'May 2026',
        paperDeadline: 'May 2026',
        conferenceDate: 'December 2026',
        location: 'Vancouver, Canada',
        url: 'https://neurips.cc/',
        description: 'One of the top machine learning conferences',
      },
      {
        name: 'ICML 2026',
        fullName: 'International Conference on Machine Learning',
        abstractDeadline: 'February 2026',
        paperDeadline: 'February 2026',
        conferenceDate: 'July 2026',
        location: 'Vienna, Austria',
        url: 'https://icml.cc/',
        description: 'Premier machine learning conference',
      },
      {
        name: 'ICLR 2027',
        fullName: 'International Conference on Learning Representations',
        abstractDeadline: 'September 2026',
        paperDeadline: 'October 2026',
        conferenceDate: 'May 2027',
        location: 'Kigali, Rwanda',
        url: 'https://iclr.cc/',
        description: 'Leading deep learning and representation learning conference',
      },
      {
        name: 'AAAI 2027',
        fullName: 'Association for the Advancement of Artificial Intelligence',
        abstractDeadline: 'August 2026',
        paperDeadline: 'August 2026',
        conferenceDate: 'February 2027',
        location: 'San Francisco, USA',
        url: 'https://aaai.org/aaai-conference/',
        description: 'Major AI conference covering all aspects of artificial intelligence',
      },
      {
        name: 'IJCAI 2026',
        fullName: 'International Joint Conference on Artificial Intelligence',
        abstractDeadline: 'January 2026',
        paperDeadline: 'January 2026',
        conferenceDate: 'August 2026',
        location: 'Jeju, South Korea',
        url: 'https://www.ijcai.org/',
        description: 'Premier international AI conference',
      },
    ],
    'Computer Vision': [
      {
        name: 'CVPR 2026',
        fullName: 'Computer Vision and Pattern Recognition',
        abstractDeadline: 'November 2025',
        paperDeadline: 'November 2025',
        conferenceDate: 'June 2026',
        location: 'Seattle, USA',
        url: 'https://cvpr.thecvf.com/',
        description: 'Top computer vision conference',
      },
      {
        name: 'ICCV 2027',
        fullName: 'International Conference on Computer Vision',
        abstractDeadline: 'March 2027',
        paperDeadline: 'March 2027',
        conferenceDate: 'October 2027',
        location: 'Montreal, Canada',
        url: 'https://iccv2027.thecvf.com/',
        description: 'Premier computer vision conference',
      },
      {
        name: 'ECCV 2026',
        fullName: 'European Conference on Computer Vision',
        abstractDeadline: 'March 2026',
        paperDeadline: 'March 2026',
        conferenceDate: 'September 2026',
        location: 'Milan, Italy',
        url: 'https://eccv2026.ecva.net/',
        description: 'Major European computer vision conference',
      },
      {
        name: 'WACV 2027',
        fullName: 'Winter Conference on Applications of Computer Vision',
        abstractDeadline: 'July 2026',
        paperDeadline: 'July 2026',
        conferenceDate: 'January 2027',
        location: 'Hawaii, USA',
        url: 'https://wacv2027.thecvf.com/',
        description: 'Applications-focused computer vision conference',
      },
    ],
    'Natural Language Processing': [
      {
        name: 'ACL 2026',
        fullName: 'Association for Computational Linguistics',
        abstractDeadline: 'February 2026',
        paperDeadline: 'February 2026',
        conferenceDate: 'July 2026',
        location: 'Bangkok, Thailand',
        url: 'https://2026.aclweb.org/',
        description: 'Top NLP conference',
      },
      {
        name: 'EMNLP 2026',
        fullName: 'Empirical Methods in Natural Language Processing',
        abstractDeadline: 'May 2026',
        paperDeadline: 'June 2026',
        conferenceDate: 'November 2026',
        location: 'Abu Dhabi, UAE',
        url: 'https://2026.emnlp.org/',
        description: 'Major NLP conference focusing on empirical methods',
      },
      {
        name: 'NAACL 2026',
        fullName: 'North American Chapter of the ACL',
        abstractDeadline: 'December 2025',
        paperDeadline: 'January 2026',
        conferenceDate: 'June 2026',
        location: 'Mexico City, Mexico',
        url: 'https://2026.naacl.org/',
        description: 'North American NLP conference',
      },
      {
        name: 'COLING 2026',
        fullName: 'International Conference on Computational Linguistics',
        abstractDeadline: 'March 2026',
        paperDeadline: 'March 2026',
        conferenceDate: 'August 2026',
        location: 'Turin, Italy',
        url: 'https://coling2026.org/',
        description: 'Biennial computational linguistics conference',
      },
    ],
    'Robotics & Autonomous Systems': [
      {
        name: 'ICRA 2026',
        fullName: 'International Conference on Robotics and Automation',
        abstractDeadline: 'September 2025',
        paperDeadline: 'September 2025',
        conferenceDate: 'May 2026',
        location: 'Philadelphia, USA',
        url: 'https://www.icra2026.org/',
        description: 'Premier robotics conference',
      },
      {
        name: 'RSS 2026',
        fullName: 'Robotics: Science and Systems',
        abstractDeadline: 'January 2026',
        paperDeadline: 'February 2026',
        conferenceDate: 'July 2026',
        location: 'Daegu, South Korea',
        url: 'https://roboticsconference.org/',
        description: 'Single-track robotics conference',
      },
      {
        name: 'IROS 2026',
        fullName: 'Intelligent Robots and Systems',
        abstractDeadline: 'March 2026',
        paperDeadline: 'March 2026',
        conferenceDate: 'October 2026',
        location: 'Abu Dhabi, UAE',
        url: 'https://www.iros2026.org/',
        description: 'IEEE/RSJ conference on intelligent robots',
      },
    ],
    'Human-Computer Interaction': [
      {
        name: 'CHI 2026',
        fullName: 'Conference on Human Factors in Computing Systems',
        abstractDeadline: 'September 2025',
        paperDeadline: 'September 2025',
        conferenceDate: 'May 2026',
        location: 'Yokohama, Japan',
        url: 'https://chi2026.acm.org/',
        description: 'Premier HCI conference',
      },
      {
        name: 'UIST 2026',
        fullName: 'User Interface Software and Technology',
        abstractDeadline: 'April 2026',
        paperDeadline: 'April 2026',
        conferenceDate: 'October 2026',
        location: 'Tokyo, Japan',
        url: 'https://uist.acm.org/2026/',
        description: 'Innovation in UI and interactive systems',
      },
    ],
    'Workshops & Specialized': [
      {
        name: 'NeurIPS Workshops 2026',
        fullName: 'NeurIPS Workshop Program',
        abstractDeadline: 'Varies by workshop',
        paperDeadline: 'September-October 2026',
        conferenceDate: 'December 2026',
        location: 'Vancouver, Canada',
        url: 'https://neurips.cc/',
        description: 'Various workshops at NeurIPS covering specialized topics',
      },
      {
        name: 'ICML Workshops 2026',
        fullName: 'ICML Workshop Program',
        abstractDeadline: 'Varies by workshop',
        paperDeadline: 'April-May 2026',
        conferenceDate: 'July 2026',
        location: 'Vienna, Austria',
        url: 'https://icml.cc/',
        description: 'Workshops at ICML on cutting-edge ML topics',
      },
      {
        name: 'ICLR Workshops 2027',
        fullName: 'ICLR Workshop Program',
        abstractDeadline: 'Varies by workshop',
        paperDeadline: 'February-March 2027',
        conferenceDate: 'May 2027',
        location: 'Kigali, Rwanda',
        url: 'https://iclr.cc/',
        description: 'Focused workshops on deep learning topics',
      },
    ],
    'Journals': [
      {
        name: 'JMLR',
        fullName: 'Journal of Machine Learning Research',
        abstractDeadline: 'Rolling',
        paperDeadline: 'Rolling',
        conferenceDate: 'N/A',
        location: 'Online',
        url: 'https://jmlr.org/',
        description: 'Top-tier machine learning journal',
      },
      {
        name: 'TPAMI',
        fullName: 'IEEE Transactions on Pattern Analysis and Machine Intelligence',
        abstractDeadline: 'Rolling',
        paperDeadline: 'Rolling',
        conferenceDate: 'N/A',
        location: 'Online',
        url: 'https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=34',
        description: 'Premier journal for pattern analysis and machine intelligence',
      },
      {
        name: 'TACL',
        fullName: 'Transactions of the Association for Computational Linguistics',
        abstractDeadline: 'Rolling',
        paperDeadline: 'Rolling',
        conferenceDate: 'N/A',
        location: 'Online',
        url: 'https://transacl.org/',
        description: 'Top-tier computational linguistics journal',
      },
    ],
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary-dark mb-4">Conferences & Journals</h1>
        <p className="text-gray-600 text-lg mb-2">
          Browse upcoming conferences, workshops, and journals organized by category.
        </p>
        <p className="text-gray-500 text-sm">
          Updated for 2026-2027. Deadlines are approximate - always check official websites.
        </p>
      </div>

      <div className="space-y-12">
        {Object.entries(conferences).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-2xl font-semibold text-primary-dark mb-6 border-b-2 border-primary pb-2">
              {category}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((conf, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:scale-105 border-l-4 border-primary"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{conf.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{conf.fullName}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                        title="Save to watchlist (requires login)"
                      >
                        <BookmarkPlus className="w-5 h-5 text-primary" />
                      </button>
                      <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">{conf.description}</p>
                  <div className="space-y-2 mb-4 text-sm">
                    {conf.abstractDeadline !== 'Rolling' && conf.abstractDeadline !== 'Varies by workshop' && (
                      <p className="text-gray-500">
                        <strong>Abstract:</strong> {conf.abstractDeadline}
                      </p>
                    )}
                    {conf.paperDeadline !== 'Rolling' && !conf.paperDeadline.includes('Varies') && (
                      <p className="text-gray-500">
                        <strong>Paper:</strong> {conf.paperDeadline}
                      </p>
                    )}
                    {conf.conferenceDate !== 'N/A' && (
                      <p className="text-gray-500">
                        <strong>Date:</strong> {conf.conferenceDate}
                      </p>
                    )}
                    {conf.location && conf.location !== 'Online' && (
                      <p className="text-gray-500">
                        <strong>Location:</strong> {conf.location}
                      </p>
                    )}
                  </div>
                  <a
                    href={conf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-medium text-sm"
                  >
                    Visit Website <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
