import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

const guideContent = {
  'how-to-choose-a-car-in-pakistan': {
    title: 'How to Choose a Car in Pakistan',
    description: 'A comprehensive guide to finding the right car for your budget and lifestyle.',
    readTime: '8 min read',
    date: 'August 2026',
    content: [
      {
        heading: '1. Determine Your Budget',
        text: 'Before you start looking at cars, figure out how much you can afford. Consider not just the purchase price, but also monthly fuel costs, insurance, maintenance, and depreciation. A good rule of thumb is that your total car expenses should not exceed 20% of your monthly income.'
      },
      {
        heading: '2. Consider Your Needs',
        text: 'Think about how you will use the car. Do you need it for daily commuting, family trips, or both? How many people will regularly travel with you? Do you drive mostly in the city or on highways? These factors will help determine the body type, size, and features you need.'
      },
      {
        heading: '3. Research Fuel Economy',
        text: 'Fuel costs are a significant ongoing expense in Pakistan. Compare the fuel economy of different models. A car that costs less upfront but has poor fuel economy could end up costing more in the long run.'
      },
      {
        heading: '4. Check Resale Value',
        text: 'In Pakistan, brands like Toyota, Honda, and Suzuki typically have better resale value. Consider how long you plan to keep the car and factor in potential depreciation when making your decision.'
      },
      {
        heading: '5. Test Drive Multiple Cars',
        text: 'Never buy a car without test driving it first. Visit multiple dealerships and test drive different models. Pay attention to comfort, visibility, handling, and overall driving experience.'
      },
    ],
  },
  'sedan-vs-suv': {
    title: 'Sedan vs SUV: Which is Right for You?',
    description: 'Compare the pros and cons of sedans and SUVs for Pakistani roads.',
    readTime: '6 min read',
    date: 'August 2026',
    content: [
      {
        heading: 'Sedan Advantages',
        text: 'Sedans are more fuel-efficient, easier to park, and generally less expensive than SUVs. They offer a smoother ride on highways and are more stable at high speeds. Popular sedans in Pakistan include Toyota Corolla, Honda City, and Honda Civic.'
      },
      {
        heading: 'SUV Advantages',
        text: 'SUVs offer more space, higher ground clearance (important for rough roads), and better visibility. They are more comfortable for long trips and can handle uneven terrain better. Popular SUVs in Pakistan include Kia Sportage and Hyundai Tucson.'
      },
      {
        heading: 'Making Your Choice',
        text: 'Choose a sedan if you primarily drive in the city, want better fuel economy, and have a smaller family. Choose an SUV if you frequently travel with family, need more space, or regularly encounter rough roads.'
      },
    ],
  },
  'petrol-vs-hybrid': {
    title: 'Petrol vs Hybrid: What Should You Buy?',
    description: 'Understanding the cost benefits of hybrid cars in Pakistan.',
    readTime: '7 min read',
    date: 'August 2026',
    content: [
      {
        heading: 'Petrol Cars',
        text: 'Petrol cars are cheaper to buy and maintain. Parts are widely available, and any mechanic can service them. They are ideal for buyers on a budget who want simplicity and reliability.'
      },
      {
        heading: 'Hybrid Cars',
        text: 'Hybrid cars offer better fuel economy, especially in city driving. They have lower emissions and can save money on fuel in the long run. However, they are more expensive to buy and may have higher maintenance costs.'
      },
      {
        heading: 'Cost Analysis',
        text: 'Calculate your annual fuel costs for both options. If you drive a lot (especially in the city), a hybrid might save you money despite the higher upfront cost. If you drive less, a petrol car might be more economical.'
      },
    ],
  },
  'manual-vs-automatic': {
    title: 'Manual vs Automatic Transmission',
    description: 'Which transmission type is better for your driving needs?',
    readTime: '5 min read',
    date: 'August 2026',
    content: [
      {
        heading: 'Manual Transmission',
        text: 'Manual cars are cheaper to buy and maintain. They offer more control and can be more fuel-efficient in experienced hands. They are ideal for drivers who enjoy engagement and want to save money.'
      },
      {
        heading: 'Automatic Transmission',
        text: 'Automatic cars are easier to drive, especially in city traffic. They reduce driver fatigue and are more convenient for daily commuting. They are ideal for new drivers and those who frequently drive in congested areas.'
      },
      {
        heading: 'Recommendation',
        text: 'If you drive mostly in city traffic, an automatic is worth the extra cost. If you drive on highways and enjoy driving, a manual could save you money.'
      },
    ],
  },
  'car-ownership-costs': {
    title: 'Car Ownership Costs in Pakistan',
    description: 'Understanding the real cost of owning a car beyond the purchase price.',
    readTime: '9 min read',
    date: 'August 2026',
    content: [
      {
        heading: 'Monthly Expenses',
        text: 'Beyond the purchase price, you need to budget for fuel, insurance, maintenance, and token tax. These ongoing costs can add up quickly and should be factored into your decision.'
      },
      {
        heading: 'Fuel Costs',
        text: 'This is usually the largest ongoing expense. Calculate your expected monthly mileage and multiply by the fuel economy of the car you are considering to estimate fuel costs.'
      },
      {
        heading: 'Maintenance',
        text: 'Regular maintenance includes oil changes, tire rotation, brake pads, and other wear items. Japanese brands typically have lower maintenance costs due to parts availability.'
      },
      {
        heading: 'Insurance',
        text: 'Insurance costs vary by car value and insurance provider. Comprehensive insurance is recommended for new cars and provides peace of mind.'
      },
    ],
  },
  'best-family-cars': {
    title: 'Best Family Cars in Pakistan',
    description: 'Top picks for families considering space, safety, and comfort.',
    readTime: '7 min read',
    date: 'August 2026',
    content: [
      {
        heading: 'What to Look For',
        text: 'Family cars should have adequate seating, good safety features, ample boot space, and comfortable ride quality. Fuel economy is also important for family budgets.'
      },
      {
        heading: 'Sedan Options',
        text: 'Sedans like Toyota Corolla and Honda City offer good space for small families. They are fuel-efficient and have good resale value.'
      },
      {
        heading: 'SUV Options',
        text: 'SUVs like Kia Sportage and Hyundai Tucson offer more space and higher ground clearance. They are ideal for larger families and those who travel frequently.'
      },
    ],
  },
};

export async function generateMetadata({ params }) {
  const guide = guideContent[params.slug];
  return {
    title: guide ? `${guide.title} | VehicleChacha` : 'Guide Not Found | VehicleChacha',
    description: guide?.description || 'Car buying guide from VehicleChacha',
  };
}

export default function GuideDetailPage({ params }) {
  const guide = guideContent[params.slug];

  if (!guide) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-20">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Guide Not Found</h1>
            <Link href="/guides" className="btn-primary inline-flex items-center gap-2">
              Browse All Guides
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="container-custom max-w-4xl">
          {/* Back Link */}
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-chacha-muted hover:text-chacha-yellow transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Guides
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {guide.title}
            </h1>
            <div className="flex items-center gap-4 text-chacha-muted">
              <span className="inline-flex items-center gap-1">
                <Clock size={16} />
                {guide.readTime}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar size={16} />
                {guide.date}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {guide.content.map((section, index) => (
              <div key={index} className="card-dark p-6">
                <h2 className="text-2xl font-bold text-white mb-3">
                  {section.heading}
                </h2>
                <p className="text-chacha-muted leading-relaxed">
                  {section.text}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="card-dark p-8 mt-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Find Your Car?
            </h2>
            <p className="text-chacha-muted mb-6">
              Let Chacha help you find the perfect car for your needs.
            </p>
            <Link
              href="/find-my-car"
              className="btn-primary inline-flex items-center gap-2 px-8 py-3"
            >
              Start Find My Car
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}