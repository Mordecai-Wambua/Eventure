import { useState } from 'react';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What types of events can I find on Eventure?',
      answer: 'Eventure offers a wide range of events including concerts, workshops, and conferences.'
    },
    {
      question: 'How do I purchase tickets for an event?',
      answer: 'To purchase tickets, simply select the event you\'re interested in and proceed to checkout. You can pay securely using various payment methods.'
    },
    {
      question: 'Can I create my own event on Eventure?',
      answer: 'Yes, as an Organizer, you can easily create and manage your events on Eventure. Simply sign in to your dashboard to get started.'
    },
    {
      question: 'Is Eventure available worldwide?',
      answer: 'Eventure is currently available in select regions, but we are expanding rapidly to bring our platform to more users globally.'
    },
    {
      question: 'How can I contact Eventure support?',
      answer: 'If you have any questions or need assistance, our support team is available 24/7. Simply reach out to us via email or live chat for prompt help.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-16 px-8" id='faq-section'>
      <h1 className="text-3xl font-bold text-center mb-6">Eventure FAQ</h1>
      <h2 className="text-center text-gray-600 mb-10">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-md">
            <div
              className="p-4 cursor-pointer bg-gray-100 flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <span>{activeIndex === index ? '-' : '+'}</span>
            </div>
            {activeIndex === index && (
              <div className="p-4 bg-white border-t">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
