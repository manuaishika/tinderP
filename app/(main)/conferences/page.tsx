import { Calendar, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default async function ConferencesPage() {
  const conferences = {
    'Machine Learning & AI': [
      {
        name: 'NeurIPS 2025',
        fullName: 'Neural Information Processing Systems',
        abstractDeadline: 'May 2025',
        paperDeadline: 'May 2025',
        conferenceDate: 'December 2025',
        location: 'Vancouver, Canada',
        url: 'https://neurips.cc/',
        description: 'One of the top machine learning conferences',
      },
      {
        name: 'ICML 2025',
        fullName: 'International Conference on Machine Learning',
        abstractDeadline: 'January 2025',
        paperDeadline: 'February 2025',
        conferenceDate: 'July 2025',
        location: 'Vienna, Austria',
        url: 'https://icml.cc/',
        description: 'Premier machine learning conference',
      },
      {
        name: 'ICLR 2025',
        fullName: 'International Conference on Learning Representations',
        abstractDeadline: 'September 2024',
        paperDeadline: 'September 2024',
        conferenceDate: 'May 2025',
        location: 'Vienna, Austria',
        url: 'https://iclr.cc/',
        description: 'Leading deep learning and representation learning conference',
      },
      {
        name: 'AAAI 2025',
        fullName: 'Association for the Advancement of Artificial Intelligence',
        abstractDeadline: 'August 2024',
        paperDeadline: 'August 2024',
        conferenceDate: 'February 2025',
        location: 'Vancouver, Canada',
        url: 'https://aaai.org/aaai-conference/',
        description: 'Major AI conference covering all aspects of artificial intelligence',
      },
    ],
    'Computer Vision': [
      {
        name: 'CVPR 2025',
        fullName: 'Computer Vision and Pattern Recognition',
        abstractDeadline: 'November 2024',
        paperDeadline: 'November 2024',
        conferenceDate: 'June 2025',
        location: 'Seattle, USA',
        url: 'https://cvpr.thecvf.com/',
        description: 'Top computer vision conference',
      },
      {
        name: 'ICCV 2025',
        fullName: 'International Conference on Computer Vision',
        abstractDeadline: 'March 2025',
        paperDeadline: 'March 2025',
        conferenceDate: 'October 2025',
        location: 'Paris, France',
        url: 'https://iccv2025.thecvf.com/',
        description: 'Premier computer vision conference',
      },
      {
        name: 'ECCV 2025',
        fullName: 'European Conference on Computer Vision',
        abstractDeadline: 'March 2025',
        paperDeadline: 'March 2025',
        conferenceDate: 'September 2025',
        location: 'Milan, Italy',
        url: 'https://eccv2024.ecva.net/',
        description: 'Major European computer vision conference',
      },
    ],
    'Natural Language Processing': [
      {
        name: 'ACL 2025',
        fullName: 'Association for Computational Linguistics',
        abstractDeadline: 'January 2025',
        paperDeadline: 'February 2025',
        conferenceDate: 'July 2025',
        location: 'Bangkok, Thailand',
        url: 'https://2025.aclweb.org/',
        description: 'Top NLP conference',
      },
      {
        name: 'EMNLP 2025',
        fullName: 'Empirical Methods in Natural Language Processing',
        abstractDeadline: 'May 2025',
        paperDeadline: 'May 2025',
        conferenceDate: 'November 2025',
        location: 'Miami, USA',
        url: 'https://2025.emnlp.org/',
        description: 'Major NLP conference focusing on empirical methods',
      },
      {
        name: 'NAACL 2025',
        fullName: 'North American Chapter of the ACL',
        abstractDeadline: 'December 2024',
        paperDeadline: 'December 2024',
        conferenceDate: 'June 2025',
        location: 'Mexico City, Mexico',
        url: 'https://2025.naacl.org/',
        description: 'North American NLP conference',
      },
    ],
    'Workshops': [
      {
        name: 'NeurIPS Workshops 2025',
        fullName: 'NeurIPS Workshop Program',
        abstractDeadline: 'Varies',
        paperDeadline: 'Varies',
        conferenceDate: 'December 2025',
        location: 'Vancouver, Canada',
        url: 'https://neurips.cc/',
        description: 'Various workshops at NeurIPS covering specialized topics',
      },
      {
        name: 'ICML Workshops 2025',
        fullName: 'ICML Workshop Program',
        abstractDeadline: 'Varies',
        paperDeadline: 'Varies',
        conferenceDate: 'July 2025',
        location: 'Vienna, Austria',
        url: 'https://icml.cc/',
        description: 'Workshops at ICML on cutting-edge ML topics',
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Conferences & Journals</h1>
        <p className="text-gray-600 text-lg mb-2">
          Browse upcoming conferences, workshops, and journals organized by category.
        </p>
        <p className="text-gray-500 text-sm">
          You don&apos;t need an account to explore this list.{' '}
          <Link href="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Sign up
          </Link>{' '}
          if you want to save conferences and track deadlines.
        </p>
      </div>

      <div className="space-y-12">
        {Object.entries(conferences).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-2">
              {category}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((conf, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{conf.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{conf.fullName}</p>
                    </div>
                    <Calendar className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">{conf.description}</p>
                  <div className="space-y-2 mb-4 text-sm">
                    {conf.abstractDeadline !== 'Rolling' && conf.abstractDeadline !== 'Varies' && (
                      <p className="text-gray-500">
                        <strong>Abstract:</strong> {conf.abstractDeadline}
                      </p>
                    )}
                    {conf.paperDeadline !== 'Rolling' && conf.paperDeadline !== 'Varies' && (
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
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm"
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
