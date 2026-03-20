'use client'

import { ExternalLink, BookmarkPlus, Bookmark } from 'lucide-react'
import { useState } from 'react'

type Conference = {
  name: string
  when: string
  where: string
  deadline: string
  url: string
  category: string
}

export default function ConferencesPage() {
  const [savedConferences, setSavedConferences] = useState<string[]>([])
  const [filter, setFilter] = useState<string>('all')

  const toggleSave = (confName: string) => {
    setSavedConferences(prev => 
      prev.includes(confName) 
        ? prev.filter(c => c !== confName)
        : [...prev, confName]
    )
  }

  const conferences: Conference[] = [
    // Machine Learning & AI
    {
      name: 'NeurIPS 2026',
      when: 'Dec 6-12, 2026',
      where: 'Vancouver, Canada',
      deadline: 'May 16, 2026',
      url: 'https://neurips.cc/',
      category: 'machine learning',
    },
    {
      name: 'ICML 2026',
      when: 'Jul 12-18, 2026',
      where: 'Vienna, Austria',
      deadline: 'Feb 2, 2026',
      url: 'https://icml.cc/',
      category: 'machine learning',
    },
    {
      name: 'ICLR 2027',
      when: 'May 3-7, 2027',
      where: 'Kigali, Rwanda',
      deadline: 'Sep 28, 2026 (Oct 5, 2026)',
      url: 'https://iclr.cc/',
      category: 'machine learning',
    },
    {
      name: 'AAAI 2027',
      when: 'Feb 22-Mar 2, 2027',
      where: 'San Francisco, USA',
      deadline: 'Aug 8, 2026 (Aug 15, 2026)',
      url: 'https://aaai.org/aaai-conference/',
      category: 'artificial intelligence',
    },
    {
      name: 'IJCAI 2026',
      when: 'Aug 22-29, 2026',
      where: 'Jeju, South Korea',
      deadline: 'Jan 15, 2026 (Jan 22, 2026)',
      url: 'https://www.ijcai.org/',
      category: 'artificial intelligence',
    },
    
    // Computer Vision
    {
      name: 'CVPR 2026',
      when: 'Jun 14-19, 2026',
      where: 'Seattle, USA',
      deadline: 'Nov 15, 2025',
      url: 'https://cvpr.thecvf.com/',
      category: 'computer vision',
    },
    {
      name: 'ICCV 2027',
      when: 'Oct 10-17, 2027',
      where: 'Montreal, Canada',
      deadline: 'Mar 10, 2027',
      url: 'https://iccv2027.thecvf.com/',
      category: 'computer vision',
    },
    {
      name: 'ECCV 2026',
      when: 'Sep 6-12, 2026',
      where: 'Milan, Italy',
      deadline: 'Mar 7, 2026',
      url: 'https://eccv2026.ecva.net/',
      category: 'computer vision',
    },
    {
      name: 'WACV 2027',
      when: 'Jan 4-8, 2027',
      where: 'Hawaii, USA',
      deadline: 'Jul 15, 2026',
      url: 'https://wacv2027.thecvf.com/',
      category: 'computer vision',
    },
    
    // NLP
    {
      name: 'ACL 2026',
      when: 'Jul 26-31, 2026',
      where: 'Bangkok, Thailand',
      deadline: 'Feb 15, 2026',
      url: 'https://2026.aclweb.org/',
      category: 'NLP',
    },
    {
      name: 'EMNLP 2026',
      when: 'Nov 8-12, 2026',
      where: 'Abu Dhabi, UAE',
      deadline: 'Jun 1, 2026',
      url: 'https://2026.emnlp.org/',
      category: 'NLP',
    },
    {
      name: 'NAACL 2027',
      when: 'Jun 6-11, 2027',
      where: 'Toronto, Canada',
      deadline: 'Dec 15, 2026',
      url: 'https://2027.naacl.org/',
      category: 'NLP',
    },
    {
      name: 'COLING 2026',
      when: 'Aug 17-22, 2026',
      where: 'Seoul, South Korea',
      deadline: 'Apr 20, 2026',
      url: 'https://coling2026.org/',
      category: 'NLP',
    },
    
    // Robotics
    {
      name: 'ICRA 2026',
      when: 'May 18-22, 2026',
      where: 'Philadelphia, USA',
      deadline: 'Sep 15, 2025',
      url: 'https://2026.ieee-icra.org/',
      category: 'robotics',
    },
    {
      name: 'IROS 2026',
      when: 'Oct 4-8, 2026',
      where: 'Prague, Czech Republic',
      deadline: 'Mar 1, 2026',
      url: 'https://iros2026.org/',
      category: 'robotics',
    },
    {
      name: 'CoRL 2026',
      when: 'Nov 15-18, 2026',
      where: 'Singapore',
      deadline: 'Jun 20, 2026',
      url: 'https://www.robot-learning.org/',
      category: 'robotics',
    },
    {
      name: 'RSS 2026',
      when: 'Jul 12-16, 2026',
      where: 'Ann Arbor, USA',
      deadline: 'Jan 31, 2026',
      url: 'https://roboticsconference.org/',
      category: 'robotics',
    },
    
    // HCI
    {
      name: 'CHI 2026',
      when: 'May 9-14, 2026',
      where: 'Boston, USA',
      deadline: 'Sep 15, 2025',
      url: 'https://chi2026.acm.org/',
      category: 'HCI',
    },
    {
      name: 'UIST 2026',
      when: 'Oct 11-14, 2026',
      where: 'Tokyo, Japan',
      deadline: 'Apr 1, 2026',
      url: 'https://uist.acm.org/2026/',
      category: 'HCI',
    },
    {
      name: 'IUI 2027',
      when: 'Mar 23-26, 2027',
      where: 'Sydney, Australia',
      deadline: 'Oct 1, 2026',
      url: 'https://iui.acm.org/2027/',
      category: 'HCI',
    },
    
    // Workshops
    {
      name: 'NeurIPS Workshops 2026',
      when: 'Dec 13-14, 2026',
      where: 'Vancouver, Canada',
      deadline: 'Sep-Oct 2026',
      url: 'https://neurips.cc/',
      category: 'workshops',
    },
    {
      name: 'ICML Workshops 2026',
      when: 'Jul 19, 2026',
      where: 'Vienna, Austria',
      deadline: 'Apr-May 2026',
      url: 'https://icml.cc/',
      category: 'workshops',
    },
    {
      name: 'ICLR Workshops 2027',
      when: 'May 8, 2027',
      where: 'Kigali, Rwanda',
      deadline: 'Feb-Mar 2027',
      url: 'https://iclr.cc/',
      category: 'workshops',
    },
  ]

  const categories = ['all', 'machine learning', 'artificial intelligence', 'computer vision', 'NLP', 'robotics', 'HCI', 'workshops']
  
  const filteredConferences = filter === 'all' 
    ? conferences 
    : conferences.filter(c => c.category === filter)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary-dark mb-2">Call For Papers</h1>
        <p className="text-gray-600">
          Browse upcoming conferences and workshops. Click <BookmarkPlus className="inline w-4 h-4" /> to save to your watchlist.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === cat
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat === 'all' ? 'All' : cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* WikiCFP-style Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Event</th>
                <th className="px-4 py-3 text-left font-semibold">When</th>
                <th className="px-4 py-3 text-left font-semibold">Where</th>
                <th className="px-4 py-3 text-left font-semibold">Deadline</th>
                <th className="px-4 py-3 text-center font-semibold w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredConferences.map((conf, idx) => (
                <tr 
                  key={idx}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <a 
                      href={conf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-light font-medium flex items-center gap-2 group"
                    >
                      {conf.name}
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {conf.when}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {conf.where}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {conf.deadline}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleSave(conf.name)}
                      className={`p-2 rounded-lg transition-all ${
                        savedConferences.includes(conf.name)
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title={savedConferences.includes(conf.name) ? 'Remove from watchlist' : 'Add to watchlist'}
                    >
                      {savedConferences.includes(conf.name) ? (
                        <Bookmark className="w-4 h-4 fill-current" />
                      ) : (
                        <BookmarkPlus className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Saved conferences count */}
      {savedConferences.length > 0 && (
        <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-primary-dark font-medium">
            📌 You have {savedConferences.length} conference{savedConferences.length > 1 ? 's' : ''} in your watchlist
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Sign up to save your watchlist permanently and receive deadline reminders.
          </p>
        </div>
      )}

      {/* Footer note */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> Deadlines shown are approximate and may include multiple phases (abstract/paper). 
          Always verify dates on the official conference website. Dates in parentheses indicate paper submission deadlines 
          when different from abstract deadlines.
        </p>
      </div>
    </div>
  )
}
