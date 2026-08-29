import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const footerLinks = {
        'Explore': [
          { href: '/new-cars', label: 'New Cars' },
          { href: '/car-prices', label: 'Car Prices' },
          { href: '/compare', label: 'Compare Cars' },
          { href: '/find-my-car', label: 'Find My Car' },
        ],
        'Popular Brands': [
          { href: '/new-cars/toyota', label: 'Toyota' },
          { href: '/new-cars/honda', label: 'Honda' },
          { href: '/new-cars/suzuki', label: 'Suzuki' },
          { href: '/new-cars/kia', label: 'Kia' },
        ],
        'Budget Guides': [
          { href: '/best-cars/under-30-lakh', label: 'Under 30 Lakh' },
          { href: '/best-cars/under-40-lakh', label: 'Under 40 Lakh' },
          { href: '/best-cars/under-50-lakh', label: 'Under 50 Lakh' },
          { href: '/best-cars/under-70-lakh', label: 'Under 70 Lakh' },
        ],
        'Company': [
          { href: '/about', label: 'About Us' },
          { href: '/how-we-score', label: 'How We Score' },
          { href: '/guides', label: 'Guides' },
          { href: '/contact', label: 'Contact' },
          { href: '/privacy-policy', label: 'Privacy Policy' },
          { href: '/terms', label: 'Terms of Service' },
        ],
      };

  return (
    <footer className="bg-chacha-card border-t border-chacha-border mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-14 h-14">
                <Image
                  src="/images/logo/vehiclechacha-logo.png"
                  alt="VehicleChacha Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white font-bold">
                Vehicle<span className="text-chacha-yellow">Chacha</span>
              </span>
            </Link>
            <p className="text-chacha-muted text-sm">
              Budget Batao. Gaari Chacha Dhoondhega.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-white font-semibold mb-4">{section}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-chacha-muted hover:text-chacha-yellow transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-chacha-border mt-8 pt-8 text-center">
          <p className="text-chacha-muted text-sm">
            © {new Date().getFullYear()} VehicleChacha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}