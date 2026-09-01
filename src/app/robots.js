export default function robots() {
    return {
      rules: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/admin/', '/api/admin/', '/api/upload/'],
        },
        {
          userAgent: 'Googlebot',
          allow: '/',
          disallow: ['/admin/', '/api/admin/'],
        },
      ],
      sitemap: 'https://vehiclechacha.vercel.app/sitemap.xml',
      host: 'https://vehiclechacha.vercel.app',
    };
  }