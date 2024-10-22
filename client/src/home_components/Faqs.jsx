import { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'What types of events can I find on Eventure?',
      answer: 'Eventure offers a wide range of events including concerts, workshops, and conferences.',
      category: 'general'
    },
    {
      question: 'How do I purchase tickets for an event?',
      answer: 'To purchase tickets, simply select the event you\'re interested in and proceed to checkout. You can pay securely using various payment methods.',
      category: 'tickets'
    },
    {
      question: 'Can I create my own event on Eventure?',
      answer: 'Yes, as an Organizer, you can easily create and manage your events on Eventure. Simply sign in to your dashboard to get started.',
      category: 'organizers'
    },
    {
      question: 'Is Eventure available worldwide?',
      answer: 'Eventure is currently available in select regions, but we are expanding rapidly to bring our platform to more users globally.',
      category: 'general'
    },
    {
      question: 'How can I contact Eventure support?',
      answer: 'If you have any questions or need assistance, our support team is available 24/7. Simply reach out to us via email or live chat for prompt help.',
      category: 'support'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8" id='faq-section'>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <HelpCircle className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FAQ
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Find answers to commonly asked questions about Eventure
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-12 py-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300
                placeholder-gray-400 text-gray-700"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden
                transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-5 flex justify-between items-center gap-4"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 
                    ${activeIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              
              <div 
                className={`grid transition-all duration-300 ease-in-out
                  ${activeIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-5 pt-2 text-gray-600">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* No Results Message */}
          {searchQuery && filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No matching questions found.</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms.</p>
            </div>
          )}
        </div>

        {/* Contact Support Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Can&apos;t find what you&apos;re looking for?{' '}
            <a href="#contact" className="text-blue-500 hover:text-blue-600 font-medium">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQs;